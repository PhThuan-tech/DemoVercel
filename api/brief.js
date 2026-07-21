const content = {
  vi: {
    defaultProject: "du an moi",
    tooLong: "Thong tin qua dai, vui long rut gon brief.",
    badEmail: "Email chua dung dinh dang.",
    badPayload: "Khong doc duoc du lieu gui len API.",
    dbDisabled: "Chua cau hinh Supabase env vars.",
    dbError: "Khong luu duoc vao Supabase.",
    noGoal: "Chua co muc tieu cu the",
    noContact: "Chua cung cap email",
    summary: "{project} nen tap trung vao {priority}.",
    steps: [
      "Chot thong diep hero va CTA chinh",
      "Them 2-3 section the hien gia tri san pham",
      "Ket noi form voi email, CRM, Google Sheet hoac Notion",
    ],
  },
  en: {
    defaultProject: "new project",
    tooLong: "The brief is too long. Please shorten it.",
    badEmail: "The email address is not valid.",
    badPayload: "The API could not read the submitted data.",
    dbDisabled: "Supabase environment variables are not configured.",
    dbError: "Could not save to Supabase.",
    noGoal: "No specific goal provided",
    noContact: "No email provided",
    summary: "{project} should focus on {priority}.",
    steps: [
      "Lock the hero message and main CTA",
      "Add 2-3 sections that prove the product value",
      "Connect the form to email, CRM, Google Sheets, or Notion",
    ],
  },
};

const styleNotes = {
  modern: {
    tone: "clean, confident, conversion-focused",
    palette: "teal, warm amber, soft rose",
    priority: {
      vi: "hero ro rang, card gon, CTA noi bat",
      en: "a strong hero, crisp cards, and a clear CTA",
    },
  },
  minimal: {
    tone: "quiet, focused, editorial",
    palette: "warm neutral, ink, muted teal",
    priority: {
      vi: "khoang trang, typography va kha nang doc nhanh",
      en: "spacing, typography, and fast scanning",
    },
  },
  dynamic: {
    tone: "energetic, expressive, product-led",
    palette: "teal, coral, sunlit yellow",
    priority: {
      vi: "motion, trang thai vui mat va visual dam chat san pham",
      en: "motion, playful states, and bold product visuals",
    },
  },
};

function readBody(request) {
  if (request.body && typeof request.body === "object") {
    return Promise.resolve(JSON.stringify(request.body));
  }

  if (typeof request.body === "string") {
    return Promise.resolve(request.body);
  }

  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100000) {
        request.destroy();
        reject(new Error("Payload too large"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function fillTemplate(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, value),
    template,
  );
}

async function saveBriefToSupabase(record) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      saved: false,
      reason: "missing_env",
    };
  }

  const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/briefs`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(record),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      saved: false,
      reason: "supabase_error",
      error: payload?.message || response.statusText,
    };
  }

  return {
    saved: true,
    row: Array.isArray(payload) ? payload[0] : payload,
  };
}

module.exports = async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rawBody = await readBody(request);
    const payload = rawBody ? JSON.parse(rawBody) : {};
    const language = payload.language === "en" ? "en" : "vi";
    const dictionary = content[language];
    const project = String(payload.project || "").trim();
    const email = String(payload.email || "").trim();
    const goal = String(payload.goal || "").trim();
    const style = styleNotes[payload.style] ? payload.style : "modern";
    const safeProject = project || dictionary.defaultProject;

    if (project.length > 80 || email.length > 120 || goal.length > 500) {
      return response.status(400).json({ error: dictionary.tooLong });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({ error: dictionary.badEmail });
    }

    const selectedStyle = styleNotes[style];
    const referenceId = `PS-${Date.now().toString(36).toUpperCase()}`;
    const summary = fillTemplate(dictionary.summary, {
      project: safeProject,
      priority: selectedStyle.priority[language],
    });
    const createdAt = new Date().toISOString();
    const storage = await saveBriefToSupabase({
      reference_id: referenceId,
      project: safeProject,
      email: email || null,
      style,
      goal: goal || null,
      language,
      summary,
      next_steps: dictionary.steps,
      design_direction: {
        tone: selectedStyle.tone,
        palette: selectedStyle.palette,
      },
      created_at: createdAt,
    });

    return response.status(200).json({
      referenceId,
      project: safeProject,
      language,
      summary,
      nextSteps: dictionary.steps,
      designDirection: {
        tone: selectedStyle.tone,
        palette: selectedStyle.palette,
      },
      receivedGoal: goal || dictionary.noGoal,
      contact: email || dictionary.noContact,
      storage: {
        saved: storage.saved,
        reason:
          storage.reason === "missing_env"
            ? dictionary.dbDisabled
            : storage.reason === "supabase_error"
              ? dictionary.dbError
              : null,
        id: storage.row?.id || null,
        error: storage.error || null,
      },
      createdAt,
    });
  } catch (error) {
    return response.status(400).json({
      error: content.vi.badPayload,
    });
  }
};
