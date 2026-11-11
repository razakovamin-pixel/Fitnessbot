const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
const MAX_JSON_BYTES = 12 * 1024 * 1024;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGES = 3;
const HISTORY_LIMIT = 18;
const KNOWLEDGE_LIMIT = 500;

const PROFILE_FIELDS = {
  name: { column: "name", type: "text", max: 100 },
  age: { column: "age", type: "number", min: 6, max: 100 },
  heightCm: { column: "height_cm", type: "number", min: 80, max: 250 },
  weightKg: { column: "weight_kg", type: "number", min: 20, max: 350 },
  goal: { column: "goal", type: "text", max: 500 },
  goalDetails: { column: "goal_details", type: "text", max: 1500 },
  experience: { column: "experience", type: "text", max: 300 },
  activityLevel: { column: "activity_level", type: "text", max: 150 },
  equipment: { column: "equipment", type: "text", max: 500 },
  weeklySchedule: { column: "weekly_schedule", type: "text", max: 500 },
  currentProgram: { column: "current_program", type: "text", max: 100 },
  currentWeek: { column: "current_week", type: "number", min: 1, max: 52 },
  restrictions: { column: "restrictions", type: "text", max: 1500 },
  foodPreferences: { column: "food_preferences", type: "text", max: 1000 },
  foodAllergies: { column: "food_allergies", type: "text", max: 1000 },
  foodAvailability: { column: "food_availability", type: "text", max: 1000 },
  sleepSchedule: { column: "sleep_schedule", type: "text", max: 300 },
  coachingStyle: { column: "coaching_style", type: "text", max: 300 },
};

const SYSTEM_PROMPT = `Ты — «Фитнес Босс»: постоянный AI-собеседник и помощник по тренировкам, питанию, восстановлению и привычкам.

РОЛЬ И СТИЛЬ:
- Общайся естественно и предметно. Отвечай на вопрос пользователя, обсуждай сомнения и помогай принимать решения.
- Не выдавай шаблонную программу тренировок или меню автоматически. Делай это, когда пользователь просит.
- Не превращай каждый ответ в длинную анкету. Если не хватает важной информации, задай один полезный вопрос.
- Учитывай историю переписки, профиль, ограничения, записи и выбранную программу.
- Не выдумывай сведения о пользователе, упражнения, продукты, данные источников или результаты анализа фото.

ПРОФИЛЬ:
- Постепенно выясняй возраст, цель, рост, опыт, место и оборудование, график, ограничения, пищевые предпочтения и аллергии.
- Возраст — обязательный ранний вопрос. Не определяй возраст по фото.
- Если пользователь явно сообщает новый факт о себе, заполни соответствующее поле profile_updates. Не меняй поля на основе догадок.
- memory_summary — краткая устойчивая сводка только из подтверждённых фактов.

ИСТОЧНИКИ:
- В базе могут находиться материалы FITNESS_KNOWLEDGE и две отдельные программы: «ББ loyalty» и «ББ loyalty 2.0».
- Не смешивай программы. Сохраняй названия упражнений, недели, дни, интенсивность, подходы и повторения точно по базе.
- Отличай содержание пользовательских файлов от общих знаний. Если в базе нет нужной информации, прямо скажи об этом.
- Не повторяй опасные или сомнительные утверждения пользовательских материалов как доказанные факты.

ФОТО:
- Если приложено фото, обязательно учитывай его. Описывай только видимое.
- По одному кадру нельзя надёжно оценить движение целиком, точный процент жира, мышечную массу, гормоны, органы или поставить диагноз.
- Для фото техники можно осторожно отметить видимое положение тела и ограничения одного кадра.
- Если возраст меньше 18 лет, не оценивай по фото жирность, сушку, привлекательность или изменения тела. Можно обсуждать технику, осанку и экипировку нейтрально.

БЕЗОПАСНОСТЬ:
- Если возраст меньше 18 лет: не рассчитывай BMR/TDEE, дефицит калорий, калории для похудения, БЖУ для сушки или целевой процент жира; не составляй планы похудения/сушки. Не поощряй ограничение еды, обязательные взвешивания, тренировки через боль или работу до отказа. При запросах о похудении рекомендуй обсудить их с родителем/опекуном и врачом или квалифицированным специалистом по подростковому питанию.
- Не назначай экстремальный дефицит, голодание, обезвоживание, обнуление макронутриентов, чрезмерное кардио или обязательную работу до отказа.
- Не назначай лекарства, гормоны, высокие дозы витаминов, стимуляторы, никотин, йохимбин или дозировки добавок.
- Не утверждай, что вода, соль, массаж или упражнения локально сжигают жир. Не ставь диагнозы.
- При обмороке, боли в груди, выраженной одышке или сильной боли посоветуй прекратить нагрузку и обратиться за медицинской помощью.

ФОРМАТ:
Верни строго JSON-объект с ключами:
{"reply":"ответ пользователю","profile_updates":{},"memory_summary":null}
В profile_updates используй только: name, age, heightCm, weightKg, goal, goalDetails, experience, activityLevel, equipment, weeklySchedule, currentProgram, currentWeek, restrictions, foodPreferences, foodAllergies, foodAvailability, sleepSchedule, coachingStyle.
Не включай поля, для которых пользователь не сообщил новое достоверное значение. В reply пиши обычный русский текст.`;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...headers },
  });
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const configured = env.CORS_ORIGIN || "*";
  const allowed = configured === "*" || !origin || configured === origin ? (origin || configured) : "null";
  return {
    "access-control-allow-origin": allowed,
    "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "authorization,content-type",
    "access-control-max-age": "86400",
    vary: "Origin",
  };
}

function withCors(response, cors) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(cors)) headers.set(key, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function readJson(request) {
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (declaredLength > MAX_JSON_BYTES) throw new Error("Тело запроса слишком большое. Максимум 12 МБ.");
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_JSON_BYTES) throw new Error("Тело запроса слишком большое. Максимум 12 МБ.");
  try { return JSON.parse(raw); } catch { throw new Error("Ожидается корректный JSON."); }
}

function str(value, max = 500) {
  if (value === undefined || value === null) return null;
  const result = String(value).trim();
  return result ? result.slice(0, max) : null;
}

function num(value, min, max) {
  if (value === undefined || value === null || value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) return undefined;
  return parsed;
}

function nowIso() { return new Date().toISOString(); }

function errorMessage(error, fallback = "Внутренняя ошибка.") {
  return error && typeof error.message === "string" ? error.message.slice(0, 1000) : fallback;
}

async function getProfile(db, userId) {
  return db.prepare("SELECT * FROM users WHERE user_id = ?").bind(userId).first();
}

async function ensureUser(db, userId) {
  const now = nowIso();
  await db.prepare(`INSERT OR IGNORE INTO users (user_id, created_at, updated_at, onboarding_status)
    VALUES (?, ?, ?, 'in_progress')`).bind(userId, now, now).run();
  return getProfile(db, userId);
}

async function insertMessage(db, userId, role, content, hasImage = false) {
  const messageId = crypto.randomUUID();
  await db.prepare(`INSERT INTO messages (message_id, user_id, role, content, created_at, has_image)
    VALUES (?, ?, ?, ?, ?, ?)`)
    .bind(messageId, userId, role, content, nowIso(), hasImage ? 1 : 0).run();
  return messageId;
}

async function createSession(db, initial = {}) {
  const userId = crypto.randomUUID();
  await ensureUser(db, userId);
  await applyProfileUpdates(db, userId, initial);
  const profile = await getProfile(db, userId);
  const welcomeMessage = nextOnboardingQuestion(profile);
  await insertMessage(db, userId, "assistant", welcomeMessage, false);
  return { userId, profile, onboarding: onboardingState(profile), welcomeMessage };
}

function nextOnboardingQuestion(profile) {
  if (!profile?.age) return "Привет! Я Фитнес Босс. Сначала познакомимся: сколько тебе лет?";
  if (!profile.goal) return "Какую главную цель ты хочешь достичь с тренировками и питанием?";
  if (!profile.experience) return "Какой у тебя сейчас опыт тренировок: новичок, несколько месяцев или занимаешься давно?";
  if (!profile.equipment) return "Где ты тренируешься и какое оборудование тебе доступно?";
  if (!profile.weekly_schedule) return "Сколько раз в неделю тебе удобно заниматься и в какие дни?";
  if (!profile.restrictions) return "Есть ли травмы, боль или ограничения, которые нужно учитывать? Если нет — так и скажи.";
  if (!profile.food_preferences) return "Какие продукты ты обычно ешь и какие предпочитаешь?";
  if (!profile.food_allergies) return "Есть ли пищевые аллергии или продукты, которые нельзя употреблять? Если нет — скажи, что аллергий нет.";
  return "Профиль создан. Что сейчас разберём: тренировки, питание, восстановление или прогресс?";
}

function onboardingState(profile) {
  const checks = [
    ["age", "возраст"], ["goal", "цель"], ["experience", "опыт тренировок"],
    ["equipment", "место и оборудование"], ["weekly_schedule", "график"],
    ["restrictions", "ограничения и травмы"], ["food_preferences", "пищевые предпочтения"],
    ["food_allergies", "пищевые аллергии"],
  ];
  const missing = checks.filter(([key]) => !profile || profile[key] === null || profile[key] === undefined || profile[key] === "")
    .map(([, label]) => label);
  return { complete: missing.length === 0, missing };
}

function normalizeImage(input) {
  if (typeof input === "string") return { dataUrl: input };
  if (input && typeof input === "object" && typeof input.dataUrl === "string") return input;
  throw new Error("Фото должно передаваться как data URL Base64.");
}

function validateImages(body) {
  let raw = [];
  if (body.image !== undefined && body.image !== null) raw.push(body.image);
  if (Array.isArray(body.images)) raw = raw.concat(body.images);
  if (raw.length > MAX_IMAGES) throw new Error(`Можно отправить не более ${MAX_IMAGES} фотографий за одно сообщение.`);

  const images = [];
  let totalBytes = 0;
  for (const item of raw) {
    const normalized = normalizeImage(item);
    const match = normalized.dataUrl.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+/\r\n]+={0,2})$/i);
    if (!match) throw new Error("Поддерживаются JPEG, PNG и WEBP в формате Base64 data URL.");
    const mimeType = match[1].toLowerCase() === "image/jpg" ? "image/jpeg" : match[1].toLowerCase();
    const base64 = match[2].replace(/\s/g, "");
    if (base64.length % 4 !== 0) throw new Error("Повреждённая Base64-строка изображения.");
    const estimatedBytes = Math.floor(base64.length * 3 / 4) - (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);
    if (estimatedBytes <= 0 || estimatedBytes > MAX_IMAGE_BYTES) throw new Error("Размер одного изображения не должен превышать 4 МБ.");
    totalBytes += estimatedBytes;
    if (totalBytes > MAX_TOTAL_IMAGE_BYTES) throw new Error("Общий размер фотографий не должен превышать 8 МБ.");
    images.push({ dataUrl: `data:${mimeType};base64,${base64}`, mimeType, sizeBytes: estimatedBytes });
  }
  return images;
}

async function applyProfileUpdates(db, userId, updates) {
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) return;
  const before = await getProfile(db, userId);
  const parsedAge = Object.prototype.hasOwnProperty.call(updates, "age") ? num(updates.age, 6, 100) : undefined;
  const ageCandidate = parsedAge === undefined ? (before?.age ?? null) : parsedAge;
  const assignments = [];
  const values = [];

  for (const [key, config] of Object.entries(PROFILE_FIELDS)) {
    if (!Object.prototype.hasOwnProperty.call(updates, key) || updates[key] === null || updates[key] === undefined) continue;
    let value;
    if (config.type === "number") {
      value = num(updates[key], config.min, config.max);
      if (value === undefined || value === null) continue;
    } else {
      value = str(updates[key], config.max);
      if (!value) continue;
      if (key === "currentProgram") {
        const normalized = value.toLowerCase();
        if (normalized.includes("2.0") || normalized.includes("2,0")) value = "bb_loyalty_2_0";
        else if (normalized.includes("loyalty") || normalized.includes("лоялти")) value = "bb_loyalty";
      }
    }
    if (key === "weightKg" && (ageCandidate === null || ageCandidate < 18)) continue;
    assignments.push(`${config.column} = ?`);
    values.push(value);
  }

  if (ageCandidate !== null && ageCandidate < 18 && before?.weight_kg !== null && before?.weight_kg !== undefined) {
    assignments.push("weight_kg = NULL");
  }
  if (assignments.length) {
    assignments.push("updated_at = ?");
    values.push(nowIso(), userId);
    await db.prepare(`UPDATE users SET ${assignments.join(", ")} WHERE user_id = ?`).bind(...values).run();
  }

  const after = await getProfile(db, userId);
  const state = onboardingState(after);
  const nextStatus = state.complete ? "complete" : "in_progress";
  if (after.onboarding_status !== nextStatus) {
    await db.prepare("UPDATE users SET onboarding_status = ?, updated_at = ? WHERE user_id = ?")
      .bind(nextStatus, nowIso(), userId).run();
  }
}

function profileContext(profile) {
  if (!profile) return "Профиль отсутствует. Сначала выясни возраст; не делай персональных расчётов до этого.";
  const fields = [
    ["имя", profile.name], ["возраст", profile.age], ["рост, см", profile.height_cm],
    ["вес, кг", profile.age >= 18 ? profile.weight_kg : null], ["цель", profile.goal],
    ["детали цели", profile.goal_details], ["опыт", profile.experience],
    ["общая активность", profile.activity_level], ["оборудование и место", profile.equipment],
    ["расписание", profile.weekly_schedule], ["текущая программа", profile.current_program],
    ["текущая неделя", profile.current_week], ["ограничения/травмы/боль", profile.restrictions],
    ["пищевые предпочтения", profile.food_preferences], ["аллергии", profile.food_allergies],
    ["доступные продукты", profile.food_availability], ["режим сна", profile.sleep_schedule],
    ["стиль общения", profile.coaching_style],
  ];
  const lines = fields.map(([label, value]) => `${label}: ${value === null || value === undefined || value === "" ? "не указано" : value}`);
  return `Сохранённый профиль пользователя:\n${lines.join("\n")}\nСтатус знакомства: ${profile.onboarding_status || "in_progress"}.\nДолговременная сводка: ${profile.memory_summary || "пока нет"}`;
}

async function getRecentActivity(db, userId) {
  const [checkins, meals, workouts] = await Promise.all([
    db.prepare("SELECT checkin_date, sleep_hours, steps, energy, notes FROM daily_checkins WHERE user_id = ? ORDER BY checkin_date DESC LIMIT 5").bind(userId).all(),
    db.prepare("SELECT eaten_at, meal_type, description, hunger_before, fullness_after, notes FROM meal_logs WHERE user_id = ? ORDER BY eaten_at DESC LIMIT 5").bind(userId).all(),
    db.prepare("SELECT program_id, week_no, day_name, exercise_name, sets_done, reps_done, load_kg, rpe, notes, completed_at FROM workout_logs WHERE user_id = ? ORDER BY completed_at DESC LIMIT 8").bind(userId).all(),
  ]);
  return { checkins: checkins.results || [], meals: meals.results || [], workouts: workouts.results || [] };
}

async function listPrograms(db) {
  const result = await db.prepare(`
    SELECT p.program_id, p.name, p.source_name,
           MIN(e.week_no) AS first_week, MAX(e.week_no) AS last_week,
           COUNT(e.exercise_id) AS exercise_rows
    FROM workout_programs p
    LEFT JOIN workout_exercises e ON e.program_id = p.program_id
    GROUP BY p.program_id, p.name, p.source_name ORDER BY p.name
  `).all();
  return result.results || [];
}

async function getProgramExercises(db, programId, weekNo = null) {
  let sql = `SELECT week_no, day_name, exercise_order, exercise_name, intensity, sets_reps, source_name
    FROM workout_exercises WHERE program_id = ?`;
  const args = [programId];
  if (weekNo !== null) { sql += " AND week_no = ?"; args.push(weekNo); }
  sql += " ORDER BY week_no, day_order, exercise_order LIMIT 100";
  const result = await db.prepare(sql).bind(...args).all();
  return result.results || [];
}

function findProgramRequest(message, profile) {
  const normalized = message.toLowerCase();
  let programId = null;
  if (normalized.includes("2.0") || normalized.includes("2,0") || normalized.includes("два ноль")) programId = "bb_loyalty_2_0";
  else if (normalized.includes("бб loyalty") || normalized.includes("bb loyalty") || normalized.includes("бб лоялти")) programId = "bb_loyalty";
  else if (["bb_loyalty", "bb_loyalty_2_0"].includes(profile?.current_program)) programId = profile.current_program;
  const patterns = [/(\d{1,2})\s*(?:-?я?\s*)?недел/i, /недел[ьяи]\s*(\d{1,2})/i, /week\s*(\d{1,2})/i];
  let weekNo = null;
  for (const pattern of patterns) {
    const match = normalized.match(pattern);
    if (match) { weekNo = Number(match[1]); break; }
  }
  if (weekNo === null && profile?.current_week) weekNo = profile.current_week;
  return { programId, weekNo };
}

async function retrieveKnowledge(db, message) {
  const stop = new Set(["что", "как", "для", "это", "мне", "можно", "если", "или", "чтобы", "какой", "какая", "какие", "почему", "сколько", "после", "перед", "тогда", "нужно", "надо", "будет", "есть", "про", "мой", "моя", "мои", "твой", "тебя", "меня", "при", "чем", "the", "and", "for", "with"]);
  const words = [...new Set((message.toLowerCase().match(/[a-zа-яё0-9.]{3,}/giu) || []).filter(word => !stop.has(word)))].slice(0, 12);
  const result = await db.prepare("SELECT title, category, keywords, content, source_name, priority FROM fitness_knowledge ORDER BY priority DESC LIMIT ?")
    .bind(KNOWLEDGE_LIMIT).all();
  const rows = result.results || [];
  const ranked = rows.map(row => {
    const haystack = `${row.title} ${row.category} ${row.keywords} ${row.content}`.toLowerCase();
    return { ...row, score: words.reduce((sum, word) => sum + (haystack.includes(word) ? 1 : 0), 0) };
  }).filter(row => row.score > 0).sort((a, b) => b.score - a.score || (b.priority || 0) - (a.priority || 0));
  return (ranked.length ? ranked : rows).slice(0, 8);
}

function sourceContext(rows) {
  if (!rows.length) return "В базе пока нет загруженных материалов по питанию и общим темам.";
  return rows.map(row => `### ${row.title} [${row.category || "без категории"}]\nИсточник: ${row.source_name || "не указан"}\n${row.content}`).join("\n\n").slice(0, 18000);
}

function workoutContext(rows) {
  if (!rows.length) return "Конкретная программа/неделя не выбрана или не найдена в базе.";
  return rows.map(row => `Неделя ${row.week_no} — ${row.day_name}: ${row.exercise_name}; интенсивность: ${row.intensity || "не указана"}; подходы × повторения: ${row.sets_reps || "не указано"}. Источник: ${row.source_name || "не указан"}.`).join("\n");
}

function parseModelJson(content) {
  if (typeof content !== "string") return { reply: "Не удалось разобрать ответ модели.", profileUpdates: {}, memorySummary: null };
  const cleaned = content.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  let data;
  try { data = JSON.parse(cleaned); } catch {
    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");
    if (first >= 0 && last > first) {
      try { data = JSON.parse(cleaned.slice(first, last + 1)); } catch { data = null; }
    }
  }
  if (!data || typeof data !== "object") return { reply: content, profileUpdates: {}, memorySummary: null };
  const reply = typeof data.reply === "string" && data.reply.trim() ? data.reply.trim() : content;
  const allowed = new Set(Object.keys(PROFILE_FIELDS));
  const updates = {};
  if (data.profile_updates && typeof data.profile_updates === "object" && !Array.isArray(data.profile_updates)) {
    for (const [key, value] of Object.entries(data.profile_updates)) if (allowed.has(key)) updates[key] = value;
  }
  const memorySummary = typeof data.memory_summary === "string" ? data.memory_summary.trim().slice(0, 4000) : null;
  return { reply, profileUpdates: updates, memorySummary };
}

async function callModel(env, messages) {
  if (!env.AI_BASE_URL || !env.AI_API_KEY || !env.AI_MODEL) {
    throw new Error("Настрой AI_BASE_URL, AI_API_KEY и AI_MODEL в Cloudflare Variables and Secrets.");
  }
  const base = String(env.AI_BASE_URL).replace(/\/+$/, "");
  const endpoint = base.endsWith("/chat/completions") ? base : `${base}/chat/completions`;
  const common = { model: env.AI_MODEL, messages, temperature: 0.45, stream: false, max_tokens: 2200 };
  const headers = { authorization: `Bearer ${env.AI_API_KEY}`, "content-type": "application/json" };
  let response = await fetch(endpoint, {
    method: "POST", headers,
    body: JSON.stringify({ ...common, response_format: { type: "json_object" } }),
    signal: AbortSignal.timeout(45000),
  });
  let raw = await response.text();
  if (!response.ok && [400, 422].includes(response.status) && /response.?format|json.?object|structured/i.test(raw)) {
    response = await fetch(endpoint, {
      method: "POST", headers, body: JSON.stringify(common), signal: AbortSignal.timeout(45000),
    });
    raw = await response.text();
  }
  if (!response.ok) throw new Error(`AI API вернул HTTP ${response.status}: ${raw.slice(0, 700)}`);
  let payload;
  try { payload = JSON.parse(raw); } catch { throw new Error("AI API вернул ответ не в формате JSON."); }
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === "string" && content.trim()) return { content, model: env.AI_MODEL };
  if (Array.isArray(content)) {
    const text = content.map(part => typeof part === "string" ? part : part?.text || "").join("\n").trim();
    if (text) return { content: text, model: env.AI_MODEL };
  }
  throw new Error("В ответе API нет choices[0].message.content. Проверь совместимость провайдера с OpenAI Chat Completions.");
}

async function processChat(env, userId, message, images = []) {
  if (!env.DB) throw new Error("Не настроен D1 binding DB.");
  await ensureUser(env.DB, userId);
  const profile = await getProfile(env.DB, userId);
  const [knowledge, historyResult, activity, programIndex] = await Promise.all([
    retrieveKnowledge(env.DB, message),
    env.DB.prepare("SELECT role, content FROM messages WHERE user_id = ? ORDER BY created_at DESC, rowid DESC LIMIT ?").bind(userId, HISTORY_LIMIT).all(),
    getRecentActivity(env.DB, userId),
    listPrograms(env.DB),
  ]);
  const history = (historyResult.results || []).reverse().map(row => ({ role: row.role, content: row.content }));
  const { programId, weekNo } = findProgramRequest(message, profile);
  const programRows = programId ? await getProgramExercises(env.DB, programId, weekNo) : [];
  const programContext = programRows.length
    ? `Данные выбранной программы (${programId}, неделя ${weekNo ?? "все найденные"}):\n${workoutContext(programRows)}`
    : `Индекс программ в базе: ${JSON.stringify(programIndex)}. Если пользователь не выбрал программу, не навязывай выбор.`;
  const context = `${SYSTEM_PROMPT}\n\n${profileContext(profile)}\n\n${programContext}\n\nПоследняя активность (только фактические записи):\n${JSON.stringify(activity)}\n\nРелевантные материалы пользователя:\n${sourceContext(knowledge)}`;
  const userContent = [{ type: "text", text: message }];
  for (const image of images) userContent.push({ type: "image_url", image_url: { url: image.dataUrl } });
  const modelMessages = [
    { role: "system", content: context },
    ...history,
    { role: "user", content: images.length ? userContent : message },
  ];

  const savedUserText = images.length
    ? `${message}\n[Прикреплено фото: ${images.map(image => `${image.mimeType}, ${image.sizeBytes} байт`).join("; ")}. Файл не сохраняется в D1.]`
    : message;
  const userMessageId = await insertMessage(env.DB, userId, "user", savedUserText, images.length > 0);
  if (images.length) {
    const statements = images.map(image => env.DB.prepare(`INSERT INTO photo_uploads
      (photo_id, user_id, message_id, mime_type, size_bytes, created_at) VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(crypto.randomUUID(), userId, userMessageId, image.mimeType, image.sizeBytes, nowIso()));
    await env.DB.batch(statements);
  }

  const result = await callModel(env, modelMessages);
  const parsed = parseModelJson(result.content);
  await applyProfileUpdates(env.DB, userId, parsed.profileUpdates);
  if (parsed.memorySummary) {
    await env.DB.prepare("UPDATE users SET memory_summary = ?, updated_at = ? WHERE user_id = ?")
      .bind(parsed.memorySummary, nowIso(), userId).run();
  }
  await insertMessage(env.DB, userId, "assistant", parsed.reply, false);
  const updatedProfile = await getProfile(env.DB, userId);
  return {
    userId,
    reply: parsed.reply,
    model: result.model,
    profile: updatedProfile,
    onboarding: onboardingState(updatedProfile),
    imagesProcessed: images.length,
    imageStorage: "not_stored",
    sources: [...new Set(knowledge.map(row => row.source_name).filter(Boolean))],
  };
}

async function handleSession(request, env) {
  const body = await readJson(request);
  if (body.userId) {
    const userId = str(body.userId, 80);
    const existing = await getProfile(env.DB, userId);
    if (existing) return json({ userId, profile: existing, onboarding: onboardingState(existing) });
  }
  return json(await createSession(env.DB, body.profile || {}), 201);
}

async function handleChat(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  if (!userId) return json({ error: "Передай userId. Сначала создай сессию через POST /api/session." }, 400);
  const message = str(body.message, 8000) || (body.image || body.images ? "Посмотри, пожалуйста, это фото и прокомментируй его в контексте моего вопроса." : null);
  if (!message) return json({ error: "Нужно передать message или хотя бы одно фото." }, 400);
  const images = validateImages(body);
  if (images.length && body.consentToAiProcessing !== true) {
    return json({ error: "Фото будет передано внешнему AI-провайдеру из AI_BASE_URL. Для подтверждения передай consentToAiProcessing: true." }, 400);
  }
  try {
    return json(await processChat(env, userId, message, images));
  } catch (error) {
    console.error("CHAT_ERROR", errorMessage(error));
    return json({ error: errorMessage(error, "Ошибка AI API."), userId }, 502);
  }
}

async function handleProfile(request, env) {
  if (request.method === "GET") {
    const userId = str(new URL(request.url).searchParams.get("userId"), 80);
    if (!userId) return json({ error: "Нужен userId." }, 400);
    const profile = await getProfile(env.DB, userId);
    return profile ? json({ profile, onboarding: onboardingState(profile) }) : json({ error: "Профиль не найден." }, 404);
  }
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  if (!userId) return json({ error: "Нужен userId." }, 400);
  const existing = await getProfile(env.DB, userId);
  if (!existing) return json({ error: "Профиль не найден. Сначала создай сессию." }, 404);
  await applyProfileUpdates(env.DB, userId, body.profile && typeof body.profile === "object" ? body.profile : body);
  const profile = await getProfile(env.DB, userId);
  return json({ userId, profile, onboarding: onboardingState(profile) });
}

async function handleCheckin(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  if (!userId || !(await getProfile(env.DB, userId))) return json({ error: "Нужен существующий userId." }, 404);
  const sleep = num(body.sleepHours, 0, 24);
  const steps = num(body.steps, 0, 100000);
  const energy = num(body.energy, 1, 5);
  if ([sleep, steps, energy].some(value => value === undefined)) return json({ error: "Проверь sleepHours (0–24), steps (0–100000), energy (1–5)." }, 400);
  await env.DB.prepare(`INSERT INTO daily_checkins
    (checkin_id, user_id, checkin_date, sleep_hours, steps, energy, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), userId, str(body.date, 10) || nowIso().slice(0, 10), sleep, steps, energy, str(body.notes, 1000), nowIso()).run();
  return json({ ok: true }, 201);
}

async function handleMealLog(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  const description = str(body.description, 2000);
  if (!userId || !description) return json({ error: "Нужны userId и description." }, 400);
  if (!(await getProfile(env.DB, userId))) return json({ error: "Профиль не найден." }, 404);
  const hunger = num(body.hungerBefore, 1, 5);
  const fullness = num(body.fullnessAfter, 1, 5);
  const water = num(body.waterMl, 0, 20000);
  if ([hunger, fullness, water].some(value => value === undefined)) return json({ error: "Проверь hungerBefore/fullnessAfter (1–5) и waterMl (0–20000)." }, 400);
  await env.DB.prepare(`INSERT INTO meal_logs
    (meal_id, user_id, eaten_at, meal_type, description, hunger_before, fullness_after, water_ml, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), userId, str(body.eatenAt, 40) || nowIso(), str(body.mealType, 40), description, hunger, fullness, water, str(body.notes, 1000)).run();
  return json({ ok: true }, 201);
}

async function handleWorkoutLog(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  const exercise = str(body.exerciseName, 180);
  if (!userId || !exercise) return json({ error: "Нужны userId и exerciseName." }, 400);
  if (!(await getProfile(env.DB, userId))) return json({ error: "Профиль не найден." }, 404);
  const sets = num(body.setsDone, 0, 30);
  const reps = num(body.repsDone, 0, 200);
  const load = num(body.loadKg, 0, 1000);
  const rpe = num(body.rpe, 1, 10);
  const weekNo = num(body.weekNo, 1, 52);
  if ([sets, reps, load, rpe, weekNo].some(value => value === undefined)) return json({ error: "Проверь setsDone (0–30), repsDone (0–200), loadKg (0–1000), rpe (1–10), weekNo (1–52)." }, 400);
  await env.DB.prepare(`INSERT INTO workout_logs
    (log_id, user_id, program_id, week_no, day_name, exercise_name, sets_done, reps_done, load_kg, rpe, notes, completed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(crypto.randomUUID(), userId, str(body.programId, 80), weekNo, str(body.dayName, 40), exercise, sets, reps, load, rpe, str(body.notes, 1000), str(body.completedAt, 40) || nowIso()).run();
  return json({ ok: true }, 201);
}

async function handlePrograms(request, env) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const programId = parts.length >= 3 ? parts[2] : null;
  if (!programId) return json({ programs: await listPrograms(env.DB) });
  const program = await env.DB.prepare("SELECT program_id, name, source_name FROM workout_programs WHERE program_id = ?").bind(programId).first();
  if (!program) return json({ error: "Программа не найдена." }, 404);
  const weekRaw = url.searchParams.get("week");
  const week = weekRaw === null ? null : num(weekRaw, 1, 52);
  if (weekRaw !== null && (week === undefined || week === null)) return json({ error: "Неделя должна быть числом от 1 до 52." }, 400);
  return json({ program, exercises: await getProgramExercises(env.DB, programId, week) });
}

async function handleHistory(request, env) {
  const url = new URL(request.url);
  const userId = str(url.searchParams.get("userId"), 80);
  if (!userId) return json({ error: "Нужен userId." }, 400);
  const parsedLimit = Number(url.searchParams.get("limit") || 30);
  const limit = Number.isFinite(parsedLimit) ? Math.max(1, Math.min(100, Math.floor(parsedLimit))) : 30;
  const [messages, workouts, meals, checkins, photos] = await Promise.all([
    env.DB.prepare("SELECT role, content, created_at, has_image FROM messages WHERE user_id = ? ORDER BY created_at DESC, rowid DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT * FROM workout_logs WHERE user_id = ? ORDER BY completed_at DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT * FROM meal_logs WHERE user_id = ? ORDER BY eaten_at DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT * FROM daily_checkins WHERE user_id = ? ORDER BY checkin_date DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT photo_id, message_id, mime_type, size_bytes, created_at FROM photo_uploads WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(userId, limit).all(),
  ]);
  return json({
    messages: (messages.results || []).reverse(), workouts: workouts.results || [],
    meals: meals.results || [], checkins: checkins.results || [], photos: photos.results || [],
  });
}

async function deleteUserData(request, env) {
  const userId = str(new URL(request.url).searchParams.get("userId"), 80);
  if (!userId) return json({ error: "Нужен userId в query string." }, 400);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM photo_uploads WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM messages WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM workout_logs WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM meal_logs WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM daily_checkins WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM photo_consents WHERE user_id = ?").bind(userId),
    env.DB.prepare("DELETE FROM users WHERE user_id = ?").bind(userId),
  ]);
  return json({ ok: true, deletedUserId: userId });
}

async function telegramApi(env, method, payload) {
  if (!env.TELEGRAM_BOT_TOKEN) throw new Error("Не задан TELEGRAM_BOT_TOKEN.");
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) throw new Error(`Telegram API ${method} failed: ${data.description || response.status}`);
  return data.result;
}

function splitTelegramText(text, max = 3900) {
  const chars = Array.from(String(text || ""));
  const chunks = [];
  while (chars.length) {
    let end = Math.min(max, chars.length);
    if (end < chars.length) {
      const newline = chars.lastIndexOf("\n", end);
      if (newline > Math.floor(max * 0.6)) end = newline + 1;
    }
    chunks.push(chars.splice(0, end).join(""));
  }
  return chunks.length ? chunks : ["Пустой ответ."];
}

async function telegramSend(env, chatId, text) {
  for (const part of splitTelegramText(text)) {
    await telegramApi(env, "sendMessage", { chat_id: chatId, text: part, disable_web_page_preview: true });
  }
}

async function telegramPhotoToDataUrl(env, message) {
  let fileId = null;
  let mimeType = "image/jpeg";
  if (Array.isArray(message.photo) && message.photo.length) {
    const largest = message.photo[message.photo.length - 1];
    fileId = largest.file_id;
    mimeType = "image/jpeg";
  } else if (message.document?.file_id && String(message.document.mime_type || "").startsWith("image/")) {
    fileId = message.document.file_id;
    mimeType = String(message.document.mime_type).toLowerCase();
    if (!["image/jpeg", "image/png", "image/webp"].includes(mimeType)) {
      throw new Error("Поддерживаются изображения JPEG, PNG и WEBP.");
    }
  }
  if (!fileId) return null;

  const file = await telegramApi(env, "getFile", { file_id: fileId });
  if (file.file_size && file.file_size > MAX_IMAGE_BYTES) throw new Error("Фото слишком большое. Максимальный размер — 4 МБ.");
  if (!file.file_path) throw new Error("Telegram не вернул путь к фотографии.");
  const download = await fetch(`https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${file.file_path}`);
  if (!download.ok) throw new Error("Не удалось скачать фото из Telegram.");
  const buffer = await download.arrayBuffer();
  if (buffer.byteLength > MAX_IMAGE_BYTES) throw new Error("Фото слишком большое. Максимальный размер — 4 МБ.");
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  const base64 = btoa(binary);
  return { dataUrl: `data:${mimeType};base64,${base64}`, mimeType, sizeBytes: bytes.length };
}

async function hasPhotoConsent(db, userId) {
  const row = await db.prepare("SELECT consented_at FROM photo_consents WHERE user_id = ?").bind(userId).first();
  return Boolean(row?.consented_at);
}

async function setPhotoConsent(db, userId, enabled) {
  if (enabled) {
    await db.prepare(`INSERT INTO photo_consents (user_id, consented_at) VALUES (?, ?)
      ON CONFLICT(user_id) DO UPDATE SET consented_at = excluded.consented_at`)
      .bind(userId, nowIso()).run();
  } else {
    await db.prepare("DELETE FROM photo_consents WHERE user_id = ?").bind(userId).run();
  }
}

async function claimTelegramUpdate(db, updateId) {
  const id = String(updateId);
  const existing = await db.prepare("SELECT status, updated_at FROM telegram_updates WHERE update_id = ?").bind(id).first();
  if (existing?.status === "completed") return false;
  if (existing?.status === "processing") {
    const lastUpdate = Date.parse(existing.updated_at || "");
    if (Number.isFinite(lastUpdate) && Date.now() - lastUpdate < 120000) return false;
  }
  await db.prepare(`INSERT INTO telegram_updates (update_id, status, created_at, updated_at)
    VALUES (?, 'processing', ?, ?)
    ON CONFLICT(update_id) DO UPDATE SET status = 'processing', updated_at = excluded.updated_at`)
    .bind(id, nowIso(), nowIso()).run();
  return true;
}

async function setTelegramUpdateStatus(db, updateId, status) {
  await db.prepare("UPDATE telegram_updates SET status = ?, updated_at = ? WHERE update_id = ?")
    .bind(status, nowIso(), String(updateId)).run();
}

async function processTelegramUpdate(update, env) {
  const message = update?.message;
  if (!message?.chat?.id || !message?.from?.id) return;
  if (message.chat.type !== "private") return;
  const chatId = String(message.chat.id);
  const userId = String(message.from.id);
  await ensureUser(env.DB, userId);

  const rawText = str(message.text || message.caption, 8000) || "";
  const command = rawText.split(/\s+/, 1)[0].split("@")[0].toLowerCase();

  if (command === "/start" || command === "/help") {
    const profile = await getProfile(env.DB, userId);
    const reply = command === "/start"
      ? `Привет! Я Фитнес Босс — твой AI-собеседник по тренировкам, питанию и восстановлению.\n\n${nextOnboardingQuestion(profile)}`
      : "Я могу обсуждать тренировки, питание, восстановление, вести историю занятий и анализировать фото техники. Команды: /start, /privacy, /consent, /revoke_consent.";
    await insertMessage(env.DB, userId, "assistant", reply, false);
    await telegramSend(env, chatId, reply);
    return;
  }

  if (command === "/privacy") {
    await telegramSend(env, chatId, "Текстовые сообщения и история диалога сохраняются в базе D1. Фотографии не сохраняются как файлы в D1, но для анализа передаются внешнему AI-провайдеру, указанному в AI_BASE_URL. Перед первой отправкой фото нужно дать согласие командой /consent. Отозвать его можно командой /revoke_consent.");
    return;
  }

  if (command === "/consent") {
    await setPhotoConsent(env.DB, userId, true);
    await telegramSend(env, chatId, "Согласие сохранено. Когда отправишь фото, оно будет передано внешнему AI-провайдеру для анализа и не будет сохраняться как файл в D1. Отозвать согласие можно командой /revoke_consent.");
    return;
  }

  if (command === "/revoke_consent") {
    await setPhotoConsent(env.DB, userId, false);
    await telegramSend(env, chatId, "Согласие на передачу фотографий отозвано. Текстовый чат продолжает работать.");
    return;
  }

  const hasPhoto = (Array.isArray(message.photo) && message.photo.length > 0) || Boolean(message.document?.mime_type?.startsWith("image/"));
  let images = [];
  if (hasPhoto) {
    if (!(await hasPhotoConsent(env.DB, userId))) {
      await telegramSend(env, chatId, "Перед анализом фото нужно подтвердить, что ты согласен передать его внешнему AI-провайдеру. Прочитай /privacy и, если согласен, отправь /consent. После этого отправь фото ещё раз.");
      return;
    }
    const image = await telegramPhotoToDataUrl(env, message);
    if (image) images = [image];
  }

  const text = rawText || (images.length ? "Проанализируй это изображение и прокомментируй его с учётом моего вопроса." : "");
  if (!text && !images.length) return;
  await telegramApi(env, "sendChatAction", { chat_id: chatId, action: "typing" }).catch(() => null);
  const result = await processChat(env, userId, text || "Посмотри это фото.", images);
  await telegramSend(env, chatId, result.reply);
}

async function handleTelegramWebhook(request, env, ctx) {
  if (!env.TG_WEBHOOK_SECRET) return json({ error: "Не настроен TG_WEBHOOK_SECRET." }, 503);
  const supplied = request.headers.get("X-Telegram-Bot-Api-Secret-Token") || "";
  if (!safeEqual(supplied, env.TG_WEBHOOK_SECRET)) return json({ error: "Unauthorized" }, 401);
  let update;
  try { update = await readJson(request); } catch (error) { return json({ error: errorMessage(error) }, 400); }
  if (!Number.isInteger(update?.update_id)) return json({ ok: true, ignored: true });

  const task = (async () => {
    try {
      const claimed = await claimTelegramUpdate(env.DB, update.update_id);
      if (!claimed) return;
      await processTelegramUpdate(update, env);
      await setTelegramUpdateStatus(env.DB, update.update_id, "completed");
    } catch (error) {
      console.error("TELEGRAM_UPDATE_ERROR", errorMessage(error));
      await setTelegramUpdateStatus(env.DB, update.update_id, "failed").catch(() => null);
      const chatId = update?.message?.chat?.id;
      if (chatId) await telegramSend(env, String(chatId), "Не удалось обработать сообщение. Проверь настройки API или повтори попытку позже.").catch(() => null);
    }
  })();

  if (ctx?.waitUntil) {
    ctx.waitUntil(task);
    return json({ ok: true, accepted: true });
  }
  await task;
  return json({ ok: true });
}

async function handleSetTelegramWebhook(request, env) {
  const body = await readJson(request);
  const webhookUrl = str(body.url, 1000);
  if (!webhookUrl) return json({ error: "Передай url вебхука." }, 400);
  let parsed;
  try { parsed = new URL(webhookUrl); } catch { return json({ error: "Некорректный URL." }, 400); }
  if (parsed.protocol !== "https:" || !parsed.pathname.endsWith("/telegram/webhook")) {
    return json({ error: "Нужен HTTPS URL, заканчивающийся на /telegram/webhook." }, 400);
  }
  if (!env.TELEGRAM_BOT_TOKEN || !env.TG_WEBHOOK_SECRET) return json({ error: "Не настроены TELEGRAM_BOT_TOKEN и TG_WEBHOOK_SECRET." }, 503);
  if (!/^[A-Za-z0-9_-]{1,256}$/.test(env.TG_WEBHOOK_SECRET)) {
    return json({ error: "TG_WEBHOOK_SECRET должен содержать только латинские буквы, цифры, дефис или подчёркивание; длина 1–256 символов." }, 400);
  }
  const result = await telegramApi(env, "setWebhook", {
    url: parsed.toString(),
    secret_token: env.TG_WEBHOOK_SECRET,
    allowed_updates: ["message"],
    drop_pending_updates: false,
  });
  return json({ ok: true, webhookSet: result });
}

async function handleTelegramWebhookInfo(env) {
  const result = await telegramApi(env, "getWebhookInfo", {});
  return json({ ok: true, result });
}

export default {
  async fetch(request, env, ctx) {
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const url = new URL(request.url);

    if (url.pathname === "/health" && request.method === "GET") {
      try {
        await env.DB.prepare("SELECT 1 AS ok").first();
        return json({ ok: true, service: "fitness-boss", database: "connected", telegramConfigured: Boolean(env.TELEGRAM_BOT_TOKEN && env.TG_WEBHOOK_SECRET), aiConfigured: Boolean(env.AI_BASE_URL && env.AI_API_KEY && env.AI_MODEL) });
      } catch (error) {
        return json({ ok: false, error: errorMessage(error, "D1 unavailable") }, 503);
      }
    }

    if (url.pathname === "/telegram/webhook" && request.method === "POST") {
      const response = await handleTelegramWebhook(request, env, ctx);
      return withCors(response, cors);
    }

    try {
      let response;
      if (url.pathname === "/api/session" && request.method === "POST") response = await handleSession(request, env);
      else if (url.pathname === "/api/chat" && request.method === "POST") response = await handleChat(request, env);
      else if (url.pathname === "/api/profile" && ["GET", "POST", "PATCH"].includes(request.method)) response = await handleProfile(request, env);
      else if (url.pathname === "/api/checkin" && request.method === "POST") response = await handleCheckin(request, env);
      else if (url.pathname === "/api/meal-log" && request.method === "POST") response = await handleMealLog(request, env);
      else if (url.pathname === "/api/workout-log" && request.method === "POST") response = await handleWorkoutLog(request, env);
      else if (url.pathname === "/api/programs" && request.method === "GET") response = await handlePrograms(request, env);
      else if (url.pathname.startsWith("/api/programs/") && request.method === "GET") response = await handlePrograms(request, env);
      else if (url.pathname === "/api/history" && request.method === "GET") response = await handleHistory(request, env);
      else if (url.pathname === "/api/user" && request.method === "DELETE") response = await deleteUserData(request, env);
      else if (url.pathname === "/admin/telegram/set-webhook" && request.method === "POST") response = await handleSetTelegramWebhook(request, env);
      else if (url.pathname === "/admin/telegram/webhook-info" && request.method === "GET") response = await handleTelegramWebhookInfo(env);
      else response = json({ error: "Маршрут не найден." }, 404);
      return withCors(response, cors);
    } catch (error) {
      console.error("WORKER_ERROR", errorMessage(error));
      return withCors(json({ error: errorMessage(error) }, 500), cors);
    }
  },
};
