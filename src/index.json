const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };
const MAX_JSON_BYTES = 12 * 1024 * 1024;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGES = 3;

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
  memorySummary: { column: "memory_summary", type: "text", max: 4000 },
};

const SYSTEM_PROMPT = `Ты — «Фитнес Босс»: живой, внимательный AI-собеседник и персональный помощник по тренировкам, питанию, восстановлению и привычкам.

ТВОЯ РОЛЬ — НЕ ГЕНЕРАТОР ШАБЛОННЫХ ПЛАНОВ:
- Общайся естественно, как постоянный персональный собеседник. Отвечай на конкретный вопрос, обсуждай ситуацию, разбирай сомнения, помогай корректировать уже выбранный курс.
- Не выдавай расписание тренировок или меню автоматически. Предлагай готовую программу, меню или расчёты только когда человек прямо об этом просит.
- Не превращай каждый ответ в анкету. Если профиль неполный, задай один самый полезный вопрос в конце ответа. Не переспрашивай уже известные сведения.
- Учитывай всю историю, сохранённый профиль, цели, ограничения, записи и выбранную пользователем программу. Помни планы между сообщениями.
- Если человек меняет цель или обстоятельства, уточни и помоги обновить его курс, а не продолжай слепо старую схему.

ПЕРСОНАЛИЗАЦИЯ И ПРОФИЛЬ:
- В начале диалога последовательно выясни: возраст; главную цель и желаемый результат; рост и при необходимости другие параметры; опыт тренировок; где и с каким оборудованием человек занимается; удобный график; ограничения, травмы или боль; пищевые предпочтения и аллергии; какую из загруженных программ он выбрал (если выбрал).
- Возраст — обязательный ранний вопрос. Не определяй возраст по фотографии и не делай предположений о нём.
- Не собирай всё одним длинным опросником: используй сведения, которые человек уже сообщил, и уточняй по одному пункту за раз.
- Когда человек явно сообщает новый факт о себе, цели, ограничениях или предпочтениях, заполни соответствующее поле profile_updates в JSON-ответе. Не выдумывай значения. Если факт неясен — оставь поле null.
- memory_summary должен сохранять краткую устойчивую сводку: цели, выбранная программа, текущий контекст, предпочтения и важные ограничения. Не записывай предположения как факты.

ИСТОЧНИКИ:
- Основные загруженные материалы: FITNESS_KNOWLEDGE (фрагменты пользовательского гайда по питанию, сушке, тренировкам и восстановлению) и две отдельные программы TRAINING_PROGRAMS: «ББ loyalty» и «ББ loyalty 2.0».
- Используй их как базовые пользовательские материалы, но не подменяй их содержимое выдуманными пунктами. Не смешивай две программы. Сохраняй точные названия упражнений, недель, дней, интенсивности и подходов/повторений.
- Не цитируй целую программу, если вопрос об этом не просит. В обычном разговоре используй релевантный фрагмент и объясняй его человеческим языком.
- Ясно отличай: «в твоём загруженном гайде написано…» от общих знаний модели. Если в файлах ответа нет, скажи об этом, а затем можешь дать общий ответ, явно обозначив, что это не из файлов.
- Не повторяй ошибки или опасные советы исходника как установленные факты. В частности, спорные заявления о кортизоле, «сет-поинте», рефидах, локальном жиросжигании, воде, электролитах и темпах похудения требуют оговорок. Не выдавай сомнительные механизмы за доказанные.

ФОТОГРАФИИ И ВИЗУАЛЬНЫЙ АНАЛИЗ:
- Если пришло изображение, обязательно рассмотри его и свяжи наблюдения с вопросом пользователя. Не отвечай так, будто изображения не было.
- Опиши только то, что действительно видно. Для фото спортивной техники можно осторожно прокомментировать положение тела и видимые ошибки, учитывая, что один кадр не показывает движение целиком.
- Для фото формы/прогресса можно описать нейтральные видимые детали, одежду, освещение, ракурс и качество снимка; предложить, как делать сопоставимые фото прогресса. Не оценивай привлекательность и не унижай человека.
- Не определяй точный процент жира, массу мышц, состояние внутренних органов, гормонов или диагнозы по фото. Не обещай, что сможешь измерить их визуально.
- Фото не является надёжным способом оценить здоровье или точный состав тела. Не делай медицинских выводов.
- Если в профиле возраст меньше 18 лет, не оценивай «сушку», жирность тела, сексуализированную внешность, привлекательность или изменения тела по фотографии. Можно помочь с техникой упражнений, осанкой в нейтральной формулировке, экипировкой и общими спортивными вопросами.
- Если изображение размыто, обрезано или не позволяет сделать вывод, честно скажи, что именно не видно, и попроси другой ракурс только при реальной необходимости.

БЕЗОПАСНОСТЬ:
- Если возраст меньше 18 лет: не рассчитывай BMR/TDEE, дефицит калорий, калории для похудения, БЖУ для сушки или целевой процент жира; не составляй план похудения/сушки. Не поощряй ограничение еды, обязательные взвешивания, тренировки через боль или работу до отказа. Помогай с техникой, постепенным освоением упражнений, полноценным регулярным питанием и восстановлением. При запросе о похудении направляй к родителю/опекуну и врачу или квалифицированному диетологу по подросткам.
- Не назначай экстремальный дефицит, голодание, обезвоживание, обнуление жиров/углеводов, чрезмерное кардио или тренировки до отказа как обязательное правило.
- Не превращай исходные формулы по БЖУ/калориям в универсальные нормы. Не назначай лекарства, гормоны, препараты для желчного пузыря, высокие дозы витаминов, стимуляторы, никотин, йохимбин или добавки и не указывай их дозировки.
- Не утверждай, что вода, соль, электролиты, массаж или упражнения локально сжигают жир либо гарантированно убирают отёки. Не ставь диагнозы.
- При острой боли в груди, обмороке, выраженной одышке, сильной боли или других острых симптомах посоветуй прекратить нагрузку и обратиться за медицинской помощью.
- При признаках расстройства пищевого поведения, навязчивого контроля еды/веса или самонаказания после переедания не давай ограничительные схемы и посоветуй обратиться к близкому взрослому/специалисту.

ФОРМАТ ОТВЕТА:
- Верни строго JSON-объект с ключами: reply (строка), profile_updates (объект), memory_summary (строка или null).
- В profile_updates используй только ключи: name, age, heightCm, weightKg, goal, goalDetails, experience, activityLevel, equipment, weeklySchedule, currentProgram, currentWeek, restrictions, foodPreferences, foodAllergies, foodAvailability, sleepSchedule, coachingStyle.
- Ставь null для неизвестных полей. Не включай ключ в profile_updates, если пользователь не сообщил нового достоверного значения.
- В reply пиши обычный русский текст без JSON внутри. Будь конкретным, но не чрезмерно многословным.`;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...headers } });
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const configured = env.CORS_ORIGIN || "*";
  const allowOrigin = configured === "*" || !origin || configured === origin ? configured : "null";
  return {
    "access-control-allow-origin": allowOrigin,
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

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function authorized(request, env) {
  const secret = env.APP_TOKEN;
  if (!secret) return false;
  const header = request.headers.get("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  return safeEqual(token, secret);
}

async function readJson(request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_JSON_BYTES) throw new Error("Тело запроса слишком большое. Максимум JSON-запроса — 12 МБ.");
  let raw;
  try { raw = await request.text(); } catch { throw new Error("Не удалось прочитать тело запроса."); }
  if (new TextEncoder().encode(raw).byteLength > MAX_JSON_BYTES) throw new Error("Тело запроса слишком большое. Максимум — 12 МБ.");
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

async function getProfile(db, userId) {
  return db.prepare("SELECT * FROM users WHERE user_id = ?").bind(userId).first();
}

async function createSession(db, initial = {}) {
  const userId = crypto.randomUUID();
  const now = nowIso();
  await db.prepare("INSERT INTO users (user_id, created_at, updated_at, onboarding_status) VALUES (?, ?, ?, 'in_progress')")
    .bind(userId, now, now).run();
  await applyProfileUpdates(db, userId, initial, true);
  const profile = await getProfile(db, userId);
  const onboarding = onboardingState(profile);
  const welcomeMessage = nextOnboardingQuestion(profile);
  await db.prepare("INSERT INTO messages (message_id, user_id, role, content, created_at, has_image) VALUES (?, ?, 'assistant', ?, ?, 0)")
    .bind(crypto.randomUUID(), userId, welcomeMessage, nowIso()).run();
  return { userId, profile, onboarding, welcomeMessage };
}

function nextOnboardingQuestion(profile) {
  if (!profile?.age) return "Привет! Я Фитнес Босс. Сначала познакомимся: сколько тебе лет?";
  if (!profile.goal) return "Отлично. Какую главную цель ты хочешь достичь с тренировками и питанием?";
  if (!profile.experience) return "Какой у тебя сейчас опыт тренировок? Например: новичок, несколько месяцев или занимаешься давно.";
  if (!profile.equipment) return "Где ты тренируешься и какое оборудование у тебя доступно?";
  if (!profile.weekly_schedule) return "Сколько раз в неделю тебе реально удобно заниматься и в какие дни?";
  if (!profile.restrictions) return "Есть ли травмы, боль, медицинские ограничения или другие моменты, которые нужно учитывать? Если нет — так и скажи.";
  if (!profile.food_preferences) return "Какие продукты ты обычно ешь и какие предпочитаешь? Есть ли особенности питания?";
  if (!profile.food_allergies) return "Есть ли у тебя пищевые аллергии или продукты, которые нельзя употреблять? Если нет — скажи, что аллергий нет.";
  return "Профиль создан. Расскажи, что сейчас хочешь разобрать: тренировки, питание, восстановление или свой прогресс?";
}

function onboardingState(profile) {
  if (!profile) return { complete: false, missing: ["age", "goal", "experience", "equipment", "restrictions", "food_preferences"] };
  const checks = [
    ["age", "возраст"], ["goal", "цель"], ["experience", "опыт тренировок"],
    ["equipment", "место и оборудование"], ["weekly_schedule", "график"],
    ["restrictions", "ограничения и травмы"], ["food_preferences", "пищевые предпочтения"],
    ["food_allergies", "пищевые аллергии"],
  ];
  const missing = checks.filter(([key]) => profile[key] === null || profile[key] === undefined || profile[key] === "").map(([, label]) => label);
  return { complete: missing.length === 0, missing };
}

function normalizeImage(input) {
  if (typeof input === "string") return { dataUrl: input };
  if (input && typeof input === "object" && typeof input.dataUrl === "string") return input;
  throw new Error("Фото должно передаваться как data URL в поле image или images[].dataUrl.");
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
    const match = normalized.dataUrl.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)[\r\n]*$/i);
    if (!match) throw new Error("Поддерживаются только фото JPEG, PNG или WEBP в формате Base64 data URL.");
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

async function applyProfileUpdates(db, userId, updates, explicit = false) {
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) return [];
  const assignments = [];
  const values = [];
  const profileBefore = await getProfile(db, userId);
  const parsedAge = updates.age !== undefined ? num(updates.age, 6, 100) : undefined;
  const ageCandidate = parsedAge === undefined ? (profileBefore?.age ?? null) : parsedAge;
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
        const normalizedProgram = value.toLowerCase();
        if (normalizedProgram.includes("2.0") || normalizedProgram.includes("2,0")) value = "bb_loyalty_2_0";
        else if (normalizedProgram.includes("loyalty") || normalizedProgram.includes("лоялти")) value = "bb_loyalty";
      }
    }
    // Do not store body weight for minors; the AI may still use age and training context.
    if (key === "weightKg" && (ageCandidate === null || ageCandidate < 18)) continue;
    assignments.push(`${config.column} = ?`);
    values.push(value);
  }
  if (ageCandidate !== null && ageCandidate < 18 && profileBefore?.weight_kg !== null && profileBefore?.weight_kg !== undefined) {
    assignments.push("weight_kg = NULL");
  }
  if (assignments.length) {
    assignments.push("updated_at = ?");
    values.push(nowIso(), userId);
    await db.prepare(`UPDATE users SET ${assignments.join(", ")} WHERE user_id = ?`).bind(...values).run();
  }
  const profileAfter = await getProfile(db, userId);
  const state = onboardingState(profileAfter);
  if (state.complete && profileAfter.onboarding_status !== "complete") {
    await db.prepare("UPDATE users SET onboarding_status = 'complete', updated_at = ? WHERE user_id = ?").bind(nowIso(), userId).run();
  } else if (!state.complete && profileAfter.onboarding_status !== "in_progress") {
    await db.prepare("UPDATE users SET onboarding_status = 'in_progress', updated_at = ? WHERE user_id = ?").bind(nowIso(), userId).run();
  }
  return assignments;
}

function profileContext(profile) {
  if (!profile) return "Профиль пользователя отсутствует. В начале диалога выясни возраст — не делай персональных расчётов до этого.";
  const map = [
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
  const entries = map.map(([label, value]) => `${label}: ${value === null || value === undefined || value === "" ? "не указано" : value}`);
  return `Постоянный профиль пользователя (это сохранённые данные, учитывай их в каждом ответе):\n${entries.join("\n")}\nСтатус знакомства: ${profile.onboarding_status || "in_progress"}.\nДолговременная сводка: ${profile.memory_summary || "пока нет"}`;
}

async function getRecentActivity(db, userId) {
  const [checkins, meals, workouts] = await Promise.all([
    db.prepare("SELECT checkin_date, sleep_hours, steps, energy, notes FROM daily_checkins WHERE user_id = ? ORDER BY checkin_date DESC LIMIT 5").bind(userId).all(),
    db.prepare("SELECT eaten_at, meal_type, description, hunger_before, fullness_after, notes FROM meal_logs WHERE user_id = ? ORDER BY eaten_at DESC LIMIT 5").bind(userId).all(),
    db.prepare("SELECT program_id, week_no, day_name, exercise_name, sets_done, reps_done, load_kg, rpe, notes, completed_at FROM workout_logs WHERE user_id = ? ORDER BY completed_at DESC LIMIT 8").bind(userId).all(),
  ]);
  return {
    checkins: checkins.results || [],
    meals: meals.results || [],
    workouts: workouts.results || [],
  };
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
  const m = message.toLowerCase();
  let programId = null;
  if (m.includes("2.0") || m.includes("2,0") || m.includes("два ноль")) programId = "bb_loyalty_2_0";
  else if (m.includes("бб loyalty") || m.includes("bb loyalty") || m.includes("бб лоялти")) programId = "bb_loyalty";
  else if (profile?.current_program === "bb_loyalty" || profile?.current_program === "bb_loyalty_2_0") programId = profile.current_program;
  const patterns = [/(\d{1,2})\s*(?:-?я?\s*)?недел/i, /недел[ьяи]\s*(\d{1,2})/i, /week\s*(\d{1,2})/i];
  let weekNo = null;
  for (const pattern of patterns) {
    const match = m.match(pattern);
    if (match) { weekNo = Number(match[1]); break; }
  }
  if (weekNo === null && profile?.current_week) weekNo = profile.current_week;
  return { programId, weekNo };
}

async function retrieveKnowledge(db, message) {
  const stop = new Set(["что", "как", "для", "это", "мне", "можно", "если", "или", "чтобы", "какой", "какая", "какие", "почему", "сколько", "после", "перед", "тогда", "нужно", "надо", "будет", "есть", "про", "мой", "моя", "мои", "твой", "тебя", "меня", "при", "чем", "the", "and", "for", "with"]);
  const words = [...new Set((message.toLowerCase().match(/[a-zа-яё0-9.]{3,}/giu) || []).filter((word) => !stop.has(word)))].slice(0, 12);
  const result = await db.prepare("SELECT title, category, keywords, content, source_name, priority FROM fitness_knowledge").all();
  const rows = result.results || [];
  const ranked = rows.map((row) => {
    const haystack = `${row.title} ${row.category} ${row.keywords} ${row.content}`.toLowerCase();
    return { ...row, score: words.reduce((sum, word) => sum + (haystack.includes(word) ? 1 : 0), 0) };
  }).filter((row) => row.score > 0).sort((a, b) => b.score - a.score || b.priority - a.priority);
  return (ranked.length ? ranked : rows.sort((a, b) => b.priority - a.priority)).slice(0, 8);
}

function sourceContext(rows) {
  return rows.map((row) => `### ${row.title} [${row.category}]\nИсточник: ${row.source_name}\n${row.content}`).join("\n\n").slice(0, 18_000);
}

function workoutContext(rows) {
  if (!rows.length) return "Конкретная программа/неделя не выбрана или не найдена.";
  return rows.map((row) => `Неделя ${row.week_no} — ${row.day_name}: ${row.exercise_name}; интенсивность: ${row.intensity || "не указана"}; подходы × повторения: ${row.sets_reps || "не указано"}. Источник: ${row.source_name}.`).join("\n");
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
  const profileUpdates = data.profile_updates && typeof data.profile_updates === "object" && !Array.isArray(data.profile_updates) ? data.profile_updates : {};
  const memorySummary = typeof data.memory_summary === "string" ? data.memory_summary.trim().slice(0, 4000) : null;
  return { reply, profileUpdates, memorySummary };
}

async function callModel(env, messages) {
  if (!env.AI_BASE_URL || !env.AI_API_KEY) throw new Error("Не настроены AI_BASE_URL и/или AI_API_KEY в Cloudflare Secrets.");
  const base = String(env.AI_BASE_URL).replace(/\/+$/, "");
  const url = base.endsWith("/chat/completions") ? base : `${base}/chat/completions`;
  const model = env.AI_MODEL || "gemini-3.8-flash";
  const common = { model, messages, temperature: 0.45, stream: false, max_tokens: 2500 };
  let response = await fetch(url, {
    method: "POST",
    headers: { "authorization": `Bearer ${env.AI_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ ...common, response_format: { type: "json_object" } }),
  });
  let raw = await response.text();
  // Some OpenAI-compatible providers do not implement JSON mode. Retry once without it.
  if (!response.ok && (response.status === 400 || response.status === 422) && /response.?format|json.?object|structured/i.test(raw)) {
    response = await fetch(url, {
      method: "POST",
      headers: { "authorization": `Bearer ${env.AI_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify(common),
    });
    raw = await response.text();
  }
  if (!response.ok) throw new Error(`AI API вернул HTTP ${response.status}: ${raw.slice(0, 900)}`);
  let payload;
  try { payload = JSON.parse(raw); } catch { throw new Error("AI API вернул не-JSON ответ."); }
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === "string") return { content, model };
  if (Array.isArray(content)) {
    const text = content.map((part) => typeof part === "string" ? part : part?.text || "").join("\n").trim();
    if (text) return { content: text, model };
  }
  throw new Error("В ответе AI API нет choices[0].message.content. Проверь OpenAI-compatible base URL.");
}

async function handleSession(request, env) {
  const body = await readJson(request).catch(() => ({}));
  if (body.userId) {
    const userId = str(body.userId, 80);
    const existing = await getProfile(env.DB, userId);
    if (existing) return json({ userId, profile: existing, onboarding: onboardingState(existing) });
  }
  const result = await createSession(env.DB, body.profile || {});
  return json({ ...result, photoPolicy: "Фото передаётся AI-провайдеру для анализа и не сохраняется как файл в D1." }, 201);
}

async function handleChat(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80) || crypto.randomUUID();
  const message = str(body.message, 8_000) || (body.image || body.images ? "Посмотри, пожалуйста, это фото и прокомментируй его в контексте моей цели." : null);
  if (!message) return json({ error: "Нужно передать message или хотя бы одно фото." }, 400);
  const consent = body.consentToAiProcessing === true;
  const images = validateImages(body);
  if (images.length && !consent) return json({ error: "Для отправки фото внешнему AI-провайдеру передай consentToAiProcessing: true. Фото не хранится в D1, но передаётся на обработку провайдеру из AI_BASE_URL." }, 400);

  let profile = await getProfile(env.DB, userId);
  if (!profile) {
    const now = nowIso();
    await env.DB.prepare("INSERT OR IGNORE INTO users (user_id, created_at, updated_at, onboarding_status) VALUES (?, ?, ?, 'in_progress')").bind(userId, now, now).run();
    profile = await getProfile(env.DB, userId);
  }

  const knowledge = await retrieveKnowledge(env.DB, message);
  const { programId, weekNo } = findProgramRequest(message, profile);
  const programRows = programId ? await getProgramExercises(env.DB, programId, weekNo) : [];
  const programIndex = await listPrograms(env.DB);
  const [historyResult, activity] = await Promise.all([
    env.DB.prepare("SELECT role, content FROM messages WHERE user_id = ? ORDER BY created_at DESC LIMIT 18").bind(userId).all(),
    getRecentActivity(env.DB, userId),
  ]);
  const history = (historyResult.results || []).reverse().map((row) => ({ role: row.role, content: row.content }));

  const programContext = programRows.length
    ? `ПРОГРАММА, КОТОРУЮ МОЖНО ИСПОЛЬЗОВАТЬ ДЛЯ ОТВЕТА (${programId}, неделя ${weekNo ?? "все найденные"}):\n${workoutContext(programRows)}`
    : `Индекс программ: ${JSON.stringify(programIndex)}. Если пользователь не выбрал программу, не навязывай выбор.`;
  const context = `${SYSTEM_PROMPT}\n\n${profileContext(profile)}\n\n${programContext}\n\nПоследняя активность (фактические записи пользователя, не додумывай):\n${JSON.stringify(activity)}\n\nРелевантные материалы пользователя:\n${sourceContext(knowledge)}`;

  const userContent = [{ type: "text", text: message }];
  for (const img of images) userContent.push({ type: "image_url", image_url: { url: img.dataUrl } });
  const modelMessages = [{ role: "system", content: context }, ...history, { role: "user", content: images.length ? userContent : message }];

  const userMessageId = crypto.randomUUID();
  const savedUserText = images.length ? `${message}\n[Прикреплено фото: ${images.map((img) => `${img.mimeType}, ${img.sizeBytes} байт`).join("; ")}. Сам файл не сохраняется.]` : message;
  await env.DB.prepare("INSERT INTO messages (message_id, user_id, role, content, created_at, has_image) VALUES (?, ?, 'user', ?, ?, ?)")
    .bind(userMessageId, userId, savedUserText, nowIso(), images.length ? 1 : 0).run();
  if (images.length) {
    const statements = images.map((img) => env.DB.prepare("INSERT INTO photo_uploads (photo_id, user_id, message_id, mime_type, size_bytes, created_at) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(crypto.randomUUID(), userId, userMessageId, img.mimeType, img.sizeBytes, nowIso()));
    await env.DB.batch(statements);
  }

  try {
    const result = await callModel(env, modelMessages);
    const parsed = parseModelJson(result.content);
    await applyProfileUpdates(env.DB, userId, parsed.profileUpdates, false);
    if (parsed.memorySummary) {
      await env.DB.prepare("UPDATE users SET memory_summary = ?, updated_at = ? WHERE user_id = ?")
        .bind(parsed.memorySummary, nowIso(), userId).run();
    }
    const assistantMessageId = crypto.randomUUID();
    await env.DB.prepare("INSERT INTO messages (message_id, user_id, role, content, created_at, has_image) VALUES (?, ?, 'assistant', ?, ?, 0)")
      .bind(assistantMessageId, userId, parsed.reply, nowIso()).run();
    profile = await getProfile(env.DB, userId);
    return json({
      userId,
      reply: parsed.reply,
      model: result.model,
      profile,
      onboarding: onboardingState(profile),
      imagesProcessed: images.length,
      imageStorage: "not_stored",
      sources: [...new Set(knowledge.map((row) => row.source_name))],
    });
  } catch (error) {
    return json({ error: error.message || "Ошибка AI API.", userId, userMessageSaved: true }, 502);
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
  const userId = str(body.userId, 80) || crypto.randomUUID();
  const existing = await getProfile(env.DB, userId);
  if (!existing) {
    const now = nowIso();
    await env.DB.prepare("INSERT INTO users (user_id, created_at, updated_at, onboarding_status) VALUES (?, ?, ?, 'in_progress')").bind(userId, now, now).run();
  }
  const updates = body.profile && typeof body.profile === "object" ? body.profile : body;
  await applyProfileUpdates(env.DB, userId, updates, true);
  const profile = await getProfile(env.DB, userId);
  return json({ userId, profile, onboarding: onboardingState(profile) }, existing ? 200 : 201);
}

async function handleCheckin(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  if (!userId) return json({ error: "Нужен userId." }, 400);
  if (!(await getProfile(env.DB, userId))) return json({ error: "Сначала создай сессию через POST /api/session." }, 404);
  const sleep = num(body.sleepHours, 0, 24);
  const steps = num(body.steps, 0, 100_000);
  const energy = num(body.energy, 1, 5);
  if (sleep === undefined || steps === undefined || energy === undefined) return json({ error: "Проверь sleepHours (0–24), steps (0–100000), energy (1–5)." }, 400);
  const id = crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO daily_checkins (checkin_id, user_id, checkin_date, sleep_hours, steps, energy, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(id, userId, str(body.date, 10) || nowIso().slice(0, 10), sleep, steps, energy, str(body.notes, 1000), nowIso()).run();
  return json({ ok: true, checkinId: id }, 201);
}

async function handleMealLog(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  const description = str(body.description, 2_000);
  if (!userId || !description) return json({ error: "Нужны userId и description." }, 400);
  if (!(await getProfile(env.DB, userId))) return json({ error: "Сначала создай сессию через POST /api/session." }, 404);
  const hunger = num(body.hungerBefore, 1, 5);
  const fullness = num(body.fullnessAfter, 1, 5);
  const water = num(body.waterMl, 0, 20_000);
  if (hunger === undefined || fullness === undefined || water === undefined) return json({ error: "Проверь hungerBefore/fullnessAfter (1–5) и waterMl (0–20000)." }, 400);
  const id = crypto.randomUUID();
  await env.DB.prepare("INSERT INTO meal_logs (meal_id, user_id, eaten_at, meal_type, description, hunger_before, fullness_after, water_ml, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, userId, str(body.eatenAt, 40) || nowIso(), str(body.mealType, 40), description, hunger, fullness, water, str(body.notes, 1000)).run();
  return json({ ok: true, mealId: id }, 201);
}

async function handleWorkoutLog(request, env) {
  const body = await readJson(request);
  const userId = str(body.userId, 80);
  const programId = str(body.programId, 80);
  const exercise = str(body.exerciseName, 180);
  if (!userId || !exercise) return json({ error: "Нужны userId и exerciseName." }, 400);
  if (!(await getProfile(env.DB, userId))) return json({ error: "Сначала создай сессию через POST /api/session." }, 404);
  const sets = num(body.setsDone, 0, 30);
  const reps = num(body.repsDone, 0, 200);
  const load = num(body.loadKg, 0, 1000);
  const rpe = num(body.rpe, 1, 10);
  if ([sets, reps, load, rpe].some((value) => value === undefined)) return json({ error: "Проверь setsDone (0–30), repsDone (0–200), loadKg (0–1000), rpe (1–10)." }, 400);
  const id = crypto.randomUUID();
  await env.DB.prepare("INSERT INTO workout_logs (log_id, user_id, program_id, week_no, day_name, exercise_name, sets_done, reps_done, load_kg, rpe, notes, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(id, userId, programId, num(body.weekNo, 1, 52), str(body.dayName, 40), exercise, sets, reps, load, rpe, str(body.notes, 1000), str(body.completedAt, 40) || nowIso()).run();
  return json({ ok: true, workoutLogId: id }, 201);
}

async function handlePrograms(request, env) {
  const url = new URL(request.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const programId = parts.length >= 3 ? parts[2] : null;
  if (!programId) return json({ programs: await listPrograms(env.DB) });
  const valid = await env.DB.prepare("SELECT program_id, name, source_name FROM workout_programs WHERE program_id = ?").bind(programId).first();
  if (!valid) return json({ error: "Программа не найдена." }, 404);
  const weekRaw = url.searchParams.get("week");
  const week = weekRaw === null ? null : num(weekRaw, 1, 52);
  if (weekRaw !== null && week === undefined) return json({ error: "Неделя должна быть числом от 1 до 52." }, 400);
  return json({ program: valid, exercises: await getProgramExercises(env.DB, programId, week) });
}

async function handleHistory(request, env) {
  const url = new URL(request.url);
  const userId = str(url.searchParams.get("userId"), 80);
  if (!userId) return json({ error: "Нужен userId." }, 400);
  const limit = Math.max(1, Math.min(100, Number(url.searchParams.get("limit") || 30)));
  const [messages, workouts, meals, checkins, photos] = await Promise.all([
    env.DB.prepare("SELECT role, content, created_at, has_image FROM messages WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT * FROM workout_logs WHERE user_id = ? ORDER BY completed_at DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT * FROM meal_logs WHERE user_id = ? ORDER BY eaten_at DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT * FROM daily_checkins WHERE user_id = ? ORDER BY checkin_date DESC LIMIT ?").bind(userId, limit).all(),
    env.DB.prepare("SELECT photo_id, message_id, mime_type, size_bytes, created_at FROM photo_uploads WHERE user_id = ? ORDER BY created_at DESC LIMIT ?").bind(userId, limit).all(),
  ]);
  return json({
    messages: (messages.results || []).reverse(), workouts: workouts.results || [], meals: meals.results || [],
    checkins: checkins.results || [], photos: photos.results || [],
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
    env.DB.prepare("DELETE FROM users WHERE user_id = ?").bind(userId),
  ]);
  return json({ ok: true, deletedUserId: userId });
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      try {
        await env.DB.prepare("SELECT 1 AS ok").first();
        return json({ ok: true, service: "fitness-boss", database: "connected", mode: "conversational-ai", vision: "enabled" }, 200, cors);
      } catch (error) { return json({ ok: false, error: error.message }, 503, cors); }
    }
    if (!authorized(request, env)) return json({ error: "Unauthorized. Проверь APP_TOKEN." }, 401, cors);
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
      else return json({ error: "Маршрут не найден." }, 404, cors);
      return withCors(response, cors);
    } catch (error) {
      return json({ error: error.message || "Internal error" }, 400, cors);
    }
  },
};
