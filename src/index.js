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

const SYSTEM_PROMPT = `Ты — КЛОУЧ, прямолинейный, требовательный, но безопасный персональный AI-коуч по тренировкам, восстановлению и уходу за собой.

СТИЛЬ КЛОУЧА:
- Если спрашивают, кто ты, отвечай: «Я Клоуч».
- Отвечай по-русски, коротко и конкретно; обычный текст, без Markdown и HTML в поле reply.
- Будь требовательным, но не унижай, не оскорбляй и не стыди пользователя.
- Давай рекомендации по шагам; если не хватает данных, задай один самый полезный вопрос.
- Используй сохранённый профиль, историю, фактические логи и выбранную программу; не проси повторять известное.
- После пропуска тренировки или переедания помогай спокойно вернуться к обычному режиму. Не назначай голодание, ограничения еды или кардио как наказание.
- Не обещай гарантированных изменений внешности.

БАЗОВАЯ РОЛЬ И ПРАВИЛА:
- Ты — «Клоуч»: постоянный AI-собеседник и помощник по тренировкам, питанию, восстановлению и привычкам.

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
- FITNESS_KNOWLEDGE — пользовательские исходники, а не проверенная медицинская или спортивная методичка. Когда пересказываешь их, указывай, что это утверждение источника; отделяй его от проверенных фактов и исправляй явные ошибки. Не следуй рекомендациям по лекарствам, гормонам, стимуляторам, высоким дозам добавок, жёсткому дефициту или косметическим процедурам.
- Не превращай программу с тяжёлой интенсивностью в безусловное назначение. Для несовершеннолетнего показывай её только как исходный шаблон для обсуждения с тренером/взрослым специалистом; не предлагай максимальные веса, работу через боль или отказные подходы.

ФОТО:
- Если приложено фото, оно передано модели в составе multimodal user message как image_url с Base64 data URL. Обязательно анализируй само изображение, а не только текстовое описание. Если API не поддерживает vision или вернул ошибку обработки изображения, прямо сообщи об этом; никогда не делай вид, что видел фото. Описывай только видимое.
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

const BUILTIN_PROGRAMS = [{"program_id":"bb_loyalty","name":"ББ loyalty","description":"Программа из пользовательской таблицы: 8 недель, 4 тренировочных дня в неделю. Названия и параметры упражнений сохранены по исходному файлу.","source_name":"ББ loyalty.xlsx","duration_weeks":8,"days_per_week":4,"total_exercises":184,"weeks":[{"week":1,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"тяжелая","sets_reps":"3х8-12","source_row":4},{"exercise_name":"бабочка на грудь","intensity":"средняя","sets_reps":"2х12-15","source_row":5},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"средняя","sets_reps":"2х10-12","source_row":6},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"3х8-12","source_row":7},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х8-12","source_row":8},{"exercise_name":"пуловер в блоке","intensity":"средняя","sets_reps":"2х12-15","source_row":9}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"4х6-8","source_row":11},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"3х6-8","source_row":12},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"3х8-10","source_row":13},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"3х8-10","source_row":14},{"exercise_name":"свидение ног в тренажере","intensity":"тяжелая","sets_reps":"3х8-10","source_row":15},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3х40-60","source_row":16}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"тяжелая","sets_reps":"4х8-12","source_row":18},{"exercise_name":"жим от груди сидя","intensity":"средняя","sets_reps":"3х8-12","source_row":19},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"средняя","sets_reps":"2х10-12","source_row":20},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"3х8-12","source_row":21},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":22},{"exercise_name":"вертикальная тяга","intensity":"тяжелая","sets_reps":"4х8-12","source_row":23}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"средняя","sets_reps":"3х8","source_row":25},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"тяжелая","sets_reps":"3х8-12","source_row":26},{"exercise_name":"французский жим лежа","intensity":"средняя","sets_reps":"4х8-12","source_row":27},{"exercise_name":"разгибание с косичкой","intensity":"средняя","sets_reps":"3х8-12","source_row":28},{"exercise_name":"отведение на дельты","intensity":"тяжелая","sets_reps":"3х8-12","source_row":29}]}]},{"week":2,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"средняя","sets_reps":"3х8-12","source_row":33},{"exercise_name":"бабочка на грудь","intensity":"тяжелая","sets_reps":"2х12-15","source_row":34},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"средняя","sets_reps":"2х10-12","source_row":35},{"exercise_name":"тяга вертикального блока","intensity":"тяжелая","sets_reps":"3х8-12","source_row":36},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":37},{"exercise_name":"пуловер в блоке","intensity":"средняя","sets_reps":"2х12-15","source_row":38}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"средняя","sets_reps":"4х6-8","source_row":40},{"exercise_name":"румынская тяга","intensity":"тяжелая","sets_reps":"3х6-8","source_row":41},{"exercise_name":"разгибание ног","intensity":"средняя","sets_reps":"3х8-10","source_row":42},{"exercise_name":"сгибание ног","intensity":"тяжелая","sets_reps":"3х8-10","source_row":43},{"exercise_name":"свидение ног в тренажере","intensity":"средняя","sets_reps":"3х8-10","source_row":44},{"exercise_name":"икры","intensity":"средняя","sets_reps":"3х40-60","source_row":45}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"средняя","sets_reps":"4х8-12","source_row":47},{"exercise_name":"жим от груди сидя","intensity":"средняя","sets_reps":"3х8-12","source_row":48},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"тяжелая","sets_reps":"2х10-12","source_row":49},{"exercise_name":"тяга горизонтального блока","intensity":"средняя","sets_reps":"3х8-12","source_row":50},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х8-12","source_row":51},{"exercise_name":"вертикальная тяга","intensity":"тяжелая","sets_reps":"4х8-12","source_row":52}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"тяжелая","sets_reps":"3х8","source_row":54},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"средняя","sets_reps":"3х8-12","source_row":55},{"exercise_name":"французский жим лежа","intensity":"тяжелая","sets_reps":"4х8-12","source_row":56},{"exercise_name":"разгибание с косичкой","intensity":"средняя","sets_reps":"3х8-12","source_row":57},{"exercise_name":"отведение на дельты","intensity":"средняя","sets_reps":"3х8-12","source_row":58}]}]},{"week":3,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"тяжелая","sets_reps":"4х8-12","source_row":62},{"exercise_name":"бабочка на грудь","intensity":"средняя","sets_reps":"3х12-15","source_row":63},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"тяжелая","sets_reps":"2х12-6-6 дроп сет","source_row":64},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"3х8-12","source_row":65},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х12-6-4 дроп сет","source_row":66},{"exercise_name":"пуловер в блоке","intensity":"средняя","sets_reps":"3х12-15","source_row":67}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"4х6-8","source_row":69},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"4х6-8","source_row":70},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"3х8-10","source_row":71},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"4х8-10","source_row":72},{"exercise_name":"свидение ног в тренажере","intensity":"тяжелая","sets_reps":"3х8-10","source_row":73},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3х40-60","source_row":74}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"средняя","sets_reps":"3х8-12","source_row":76},{"exercise_name":"жим от груди сидя","intensity":"тяжелая","sets_reps":"3х8-12","source_row":77},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"тяжелая","sets_reps":"3х10-12","source_row":78},{"exercise_name":"тяга горизонтального блока","intensity":"средняя","sets_reps":"3х8-12","source_row":79},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":80},{"exercise_name":"вертикальная тяга","intensity":"тяжелая","sets_reps":"4х8-12","source_row":81}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"средняя","sets_reps":"3х8","source_row":83},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"тяжелая","sets_reps":"3х8-12","source_row":84},{"exercise_name":"французский жим лежа","intensity":"средняя","sets_reps":"3х8-12","source_row":85},{"exercise_name":"разгибание с косичкой","intensity":"тяжелая","sets_reps":"3х12-6-6 дроп сет","source_row":86},{"exercise_name":"отведение на дельты","intensity":"тяжелая","sets_reps":"3х8-12","source_row":87}]}]},{"week":4,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"средняя","sets_reps":"4х8-12","source_row":91},{"exercise_name":"бабочка на грудь","intensity":"тяжелая","sets_reps":"3х12-15","source_row":92},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"средняя","sets_reps":"3х10-12","source_row":93},{"exercise_name":"тяга вертикального блока","intensity":"тяжелая","sets_reps":"4х8-12","source_row":94},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":95},{"exercise_name":"пуловер в блоке","intensity":"тяжелая","sets_reps":"2х12-15","source_row":96}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"средняя","sets_reps":"4х6-8","source_row":98},{"exercise_name":"румынская тяга","intensity":"тяжелая","sets_reps":"4х6-8","source_row":99},{"exercise_name":"разгибание ног","intensity":"средняя","sets_reps":"3х8-10","source_row":100},{"exercise_name":"сгибание ног","intensity":"тяжелая","sets_reps":"4х8-10","source_row":101},{"exercise_name":"свидение ног в тренажере","intensity":"средняя","sets_reps":"3х8-10","source_row":102},{"exercise_name":"икры","intensity":"средняя","sets_reps":"3х40-60","source_row":103}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"тяжелая","sets_reps":"4х8-12","source_row":105},{"exercise_name":"жим от груди сидя","intensity":"тяжелая","sets_reps":"3х8-12","source_row":106},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3х10-12","source_row":107},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"3х8-12","source_row":108},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х8-12","source_row":109},{"exercise_name":"вертикальная тяга","intensity":"средняя","sets_reps":"4х8-12","source_row":110}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"тяжелая","sets_reps":"3х8","source_row":112},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"средняя","sets_reps":"3х8-12","source_row":113},{"exercise_name":"французский жим лежа","intensity":"тяжелая","sets_reps":"4х8-12","source_row":114},{"exercise_name":"разгибание с косичкой","intensity":"средняя","sets_reps":"3х8-12","source_row":115},{"exercise_name":"отведение на дельты","intensity":"средняя","sets_reps":"3х8-12","source_row":116}]}]},{"week":5,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"тяжелая","sets_reps":"4х8-12","source_row":120},{"exercise_name":"бабочка на грудь","intensity":"средняя","sets_reps":"3х12-15","source_row":121},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"тяжелая","sets_reps":"3х12-6-6 дроп сет","source_row":122},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"3х8-12","source_row":123},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х12-6-4 дроп сет","source_row":124},{"exercise_name":"пуловер в блоке","intensity":"средняя","sets_reps":"3х12-15","source_row":125}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"4х6-8","source_row":127},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"4х6-8","source_row":128},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"3х8-6-6 дроп сет","source_row":129},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"4х8-10","source_row":130},{"exercise_name":"свидение ног в тренажере","intensity":"тяжелая","sets_reps":"3х8-10","source_row":131},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3х40-60","source_row":132}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"средняя","sets_reps":"3х8-12","source_row":134},{"exercise_name":"жим от груди сидя","intensity":"тяжелая","sets_reps":"3х8-12","source_row":135},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"тяжелая","sets_reps":"3х10-12","source_row":136},{"exercise_name":"тяга горизонтального блока","intensity":"средняя","sets_reps":"3х12-6-4 дроп сет","source_row":137},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":138},{"exercise_name":"вертикальная тяга","intensity":"тяжелая","sets_reps":"4х8-12","source_row":139}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"средняя","sets_reps":"3х8","source_row":141},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"тяжелая","sets_reps":"3х8-12","source_row":142},{"exercise_name":"французский жим лежа","intensity":"средняя","sets_reps":"3х8-12","source_row":143},{"exercise_name":"разгибание с косичкой","intensity":"тяжелая","sets_reps":"3х12-6-6 дроп сет","source_row":144},{"exercise_name":"отведение на дельты","intensity":"тяжелая","sets_reps":"3х8-12","source_row":145}]}]},{"week":6,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"средняя","sets_reps":"4х8-12","source_row":149},{"exercise_name":"бабочка на грудь","intensity":"тяжелая","sets_reps":"3х12-15","source_row":150},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"средняя","sets_reps":"3х10-12","source_row":151},{"exercise_name":"тяга вертикального блока","intensity":"тяжелая","sets_reps":"4х8-12","source_row":152},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":153},{"exercise_name":"пуловер в блоке","intensity":"тяжелая","sets_reps":"2х12-15","source_row":154}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"средняя","sets_reps":"4х6-8","source_row":156},{"exercise_name":"румынская тяга","intensity":"тяжелая","sets_reps":"4х6-8","source_row":157},{"exercise_name":"разгибание ног","intensity":"средняя","sets_reps":"3х8-10","source_row":158},{"exercise_name":"сгибание ног","intensity":"тяжелая","sets_reps":"4х8-10","source_row":159},{"exercise_name":"свидение ног в тренажере","intensity":"средняя","sets_reps":"3х8-10","source_row":160},{"exercise_name":"икры","intensity":"средняя","sets_reps":"3х40-60","source_row":161}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"тяжелая","sets_reps":"4х8-12","source_row":163},{"exercise_name":"жим от груди сидя","intensity":"тяжелая","sets_reps":"3х8-12","source_row":164},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3х10-12","source_row":165},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"3х8-12","source_row":166},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х8-12","source_row":167},{"exercise_name":"вертикальная тяга","intensity":"средняя","sets_reps":"4х8-12","source_row":168}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"тяжелая","sets_reps":"3х8","source_row":170},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"средняя","sets_reps":"3х8-12","source_row":171},{"exercise_name":"французский жим лежа","intensity":"тяжелая","sets_reps":"4х8-12","source_row":172},{"exercise_name":"разгибание с косичкой","intensity":"средняя","sets_reps":"3х8-12","source_row":173},{"exercise_name":"отведение на дельты","intensity":"средняя","sets_reps":"3х8-12","source_row":174}]}]},{"week":7,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"тяжелая","sets_reps":"4х8-12","source_row":178},{"exercise_name":"бабочка на грудь","intensity":"средняя","sets_reps":"3х12-15","source_row":179},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"тяжелая","sets_reps":"4х12-6-6 дроп сет","source_row":180},{"exercise_name":"тяга вертикального блока","intensity":"тяжелая","sets_reps":"3х8-12","source_row":181},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х12-6-4 дроп сет","source_row":182},{"exercise_name":"пуловер в блоке","intensity":"средняя","sets_reps":"3х12-15","source_row":183}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"средняя","sets_reps":"4х6-8","source_row":185},{"exercise_name":"румынская тяга","intensity":"тяжелая","sets_reps":"4х6-8","source_row":186},{"exercise_name":"разгибание ног","intensity":"средняя","sets_reps":"3х8-6-6 дроп сет","source_row":187},{"exercise_name":"сгибание ног","intensity":"тяжелая","sets_reps":"4х8-10","source_row":188},{"exercise_name":"свидение ног в тренажере","intensity":"средняя","sets_reps":"3х8-10","source_row":189},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3х40-60","source_row":190}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"тяжелая","sets_reps":"3х8-12","source_row":192},{"exercise_name":"жим от груди сидя","intensity":"тяжелая","sets_reps":"3х8-12","source_row":193},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3х10-12","source_row":194},{"exercise_name":"тяга горизонтального блока","intensity":"средняя","sets_reps":"4х12-6-4 дроп сет","source_row":195},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3х8-12","source_row":196},{"exercise_name":"вертикальная тяга","intensity":"тяжелая","sets_reps":"4х8-12","source_row":197}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"средняя","sets_reps":"4х8","source_row":199},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"тяжелая","sets_reps":"3х8-12","source_row":200},{"exercise_name":"французский жим лежа","intensity":"тяжелая","sets_reps":"3х8-12","source_row":201},{"exercise_name":"разгибание с косичкой","intensity":"средняя","sets_reps":"3х12-6-6 дроп сет","source_row":202},{"exercise_name":"отведение на дельты","intensity":"средняя","sets_reps":"3х8-12","source_row":203}]}]},{"week":8,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"жим лежа(гантели)","intensity":"средняя","sets_reps":"5х8-12","source_row":207},{"exercise_name":"бабочка на грудь","intensity":"тяжелая","sets_reps":"3х12-15","source_row":208},{"exercise_name":"свидение рук в кроссовере вниз","intensity":"тяжелая","sets_reps":"3х10-12","source_row":209},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"4х8-12","source_row":210},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":211},{"exercise_name":"пуловер в блоке","intensity":"тяжелая","sets_reps":"3х12-15","source_row":212}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"4х6-8","source_row":214},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"4х6-8","source_row":215},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"3х8-10","source_row":216},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"4х8-10","source_row":217},{"exercise_name":"свидение ног в тренажере","intensity":"тяжелая","sets_reps":"3х8-10","source_row":218},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3х40-60","source_row":219}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим лежа 30градусов","intensity":"средняя","sets_reps":"4х8-12","source_row":221},{"exercise_name":"жим от груди сидя","intensity":"тяжелая","sets_reps":"3х8-12","source_row":222},{"exercise_name":"свидение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3х10-12","source_row":223},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"3х8-12","source_row":224},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3х8-12","source_row":225},{"exercise_name":"вертикальная тяга","intensity":"тяжелая","sets_reps":"4х8-12","source_row":226}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с субпинацией","intensity":"тяжелая","sets_reps":"3х8","source_row":228},{"exercise_name":"сгибание на бицепс лежа 45градусов","intensity":"средняя","sets_reps":"3х8-12","source_row":229},{"exercise_name":"французский жим лежа","intensity":"средняя","sets_reps":"4х8-12","source_row":230},{"exercise_name":"разгибание с косичкой","intensity":"тяжелая","sets_reps":"3х8-12","source_row":231},{"exercise_name":"отведение на дельты","intensity":"тяжелая","sets_reps":"3х8-12","source_row":232}]}]}]},{"program_id":"bb_loyalty_2_0","name":"ББ loyalty 2.0","description":"Программа из пользовательской таблицы: 7 недель, 4 тренировочных дня в неделю. Названия и параметры упражнений сохранены по исходному файлу.","source_name":"ББ loyalty 2.0.xlsx","duration_weeks":7,"days_per_week":4,"total_exercises":140,"weeks":[{"week":1,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"Жим (гантели)","intensity":"средняя","sets_reps":"3 х 8-12","source_row":4},{"exercise_name":"сведение рук в кроссовере вниз","intensity":"средняя","sets_reps":"3 х 12-15","source_row":5},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"3 х 8-12","source_row":6},{"exercise_name":"тяга штанги в наклоне","intensity":"средняя","sets_reps":"3 х 8-12","source_row":7},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":8}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"3 х 8","source_row":10},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"3 х 8-12","source_row":11},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"3 х 12","source_row":12},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":13},{"exercise_name":"разведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":14},{"exercise_name":"сведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":15},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3 х 15","source_row":16}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим в кроссовере 45 градусов","intensity":"средняя","sets_reps":"3 х 8-12","source_row":18},{"exercise_name":"сведение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3 х 12-15","source_row":19},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":20},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":21},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":22}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс супинацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":24},{"exercise_name":"сгибание на бицепс с пронацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":25},{"exercise_name":"французкий жим в блоке из-за головы","intensity":"средняя","sets_reps":"3 х 8-12","source_row":26}]}]},{"week":2,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"Жим (гантели)","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":30},{"exercise_name":"сведение рук в кроссовере вниз","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":31},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"3 х 8-12","source_row":32},{"exercise_name":"тяга штанги в наклоне","intensity":"средняя","sets_reps":"4 х 8-12","source_row":33},{"exercise_name":"отведения на дельты","intensity":"средняя","sets_reps":"3 х 12-15","source_row":34}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"средняя","sets_reps":"3 х 8","source_row":36},{"exercise_name":"румынская тяга","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":37},{"exercise_name":"разгибание ног","intensity":"средняя","sets_reps":"3 х 12","source_row":38},{"exercise_name":"сгибание ног","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":39},{"exercise_name":"разведение ног","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":40},{"exercise_name":"сведение ног","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":41},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3 х 15","source_row":42}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим в кроссовере 45 градусов","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":44},{"exercise_name":"сведение рук в кроссовере вверх","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":45},{"exercise_name":"тяга горизонтального блока","intensity":"средняя","sets_reps":"3 х 8-12","source_row":46},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3 х 8-12","source_row":47},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"4 х 12-15","source_row":48}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с ez грифом снизу","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":50},{"exercise_name":"сгибание на бицепс с ez грифом сверху","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":51},{"exercise_name":"французкий жим в блоке из-за головы","intensity":"средняя","sets_reps":"3 х 8-12","source_row":52}]}]},{"week":3,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"Жим (гантели)","intensity":"средняя","sets_reps":"4 х 8-12","source_row":56},{"exercise_name":"сведение рук в кроссовере вниз","intensity":"средняя","sets_reps":"3 х 12-15","source_row":57},{"exercise_name":"тяга вертикального блока","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":58},{"exercise_name":"тяга штанги в наклоне","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":59},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":60}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"5 х 8","source_row":62},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"4 х 8-12","source_row":63},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"4 х 12","source_row":64},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":65},{"exercise_name":"разведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":66},{"exercise_name":"сведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":67},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3 х 15","source_row":68}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим в кроссовере 45 градусов","intensity":"средняя","sets_reps":"3 х 8-12","source_row":70},{"exercise_name":"сведение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3 х 12-15","source_row":71},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":72},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":73},{"exercise_name":"отведения на дельты","intensity":"средняя","sets_reps":"3 х 12-15","source_row":74}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс супинацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":76},{"exercise_name":"сгибание на бицепс с пронацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":77},{"exercise_name":"французкий жим в блоке из-за головы","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":78}]}]},{"week":4,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"Жим (гантели)","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":82},{"exercise_name":"сведение рук в кроссовере вниз","intensity":"тяжелая","sets_reps":"4 х 12-15","source_row":83},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"3 х 8-12","source_row":84},{"exercise_name":"тяга штанги в наклоне","intensity":"средняя","sets_reps":"4 х 8-12","source_row":85},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":86}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"средняя","sets_reps":"4 х 8","source_row":88},{"exercise_name":"румынская тяга","intensity":"тяжелая","sets_reps":"5 х 8-12","source_row":89},{"exercise_name":"разгибание ног","intensity":"средняя","sets_reps":"3 х 12","source_row":90},{"exercise_name":"сгибание ног","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":91},{"exercise_name":"разведение ног","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":92},{"exercise_name":"сведение ног","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":93},{"exercise_name":"икры","intensity":"средняя","sets_reps":"3 х 15","source_row":94}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим в кроссовере 45 градусов","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":96},{"exercise_name":"сведение рук в кроссовере вверх","intensity":"тяжелая","sets_reps":"4 х 12-15","source_row":97},{"exercise_name":"тяга горизонтального блока","intensity":"средняя","sets_reps":"3 х 8-12","source_row":98},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":99},{"exercise_name":"отведения на дельты","intensity":"средняя","sets_reps":"3 х 12-15","source_row":100}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с ez грифом снизу","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":102},{"exercise_name":"сгибание на бицепс с ez грифом сверху","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":103},{"exercise_name":"французкий жим в блоке из-за головы","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":104}]}]},{"week":5,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"Жим (гантели)","intensity":"тяжелая","sets_reps":"5 х 8-12","source_row":108},{"exercise_name":"сведение рук в кроссовере вниз","intensity":"средняя","sets_reps":"3 х 12-15","source_row":109},{"exercise_name":"тяга вертикального блока","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":110},{"exercise_name":"тяга штанги в наклоне","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":111},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":112}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"4 х 8","source_row":114},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"4 х 8-12","source_row":115},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"4 х 12","source_row":116},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":117},{"exercise_name":"разведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":118},{"exercise_name":"сведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":119},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3 х 15","source_row":120}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим в кроссовере 45 градусов","intensity":"средняя","sets_reps":"3 х 8-12","source_row":122},{"exercise_name":"сведение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3 х 12-15","source_row":123},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":124},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":125},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":126}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс супинацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":128},{"exercise_name":"сгибание на бицепс с пронацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":129},{"exercise_name":"французкий жим в блоке из-за головы","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":130}]}]},{"week":6,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"Жим (гантели)","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":134},{"exercise_name":"сведение рук в кроссовере вниз","intensity":"тяжелая","sets_reps":"4 х 12-15","source_row":135},{"exercise_name":"тяга вертикального блока","intensity":"средняя","sets_reps":"3 х 8-12","source_row":136},{"exercise_name":"тяга штанги в наклоне","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":137},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":138}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"средняя","sets_reps":"4 х 8","source_row":140},{"exercise_name":"румынская тяга","intensity":"тяжелая","sets_reps":"5 х 8-12","source_row":141},{"exercise_name":"разгибание ног","intensity":"средняя","sets_reps":"3 х 12","source_row":142},{"exercise_name":"сгибание ног","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":143},{"exercise_name":"разведение ног","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":144},{"exercise_name":"сведение ног","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":145},{"exercise_name":"икры","intensity":"средняя","sets_reps":"3 х 15","source_row":146}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим в кроссовере 45 градусов","intensity":"тяжелая","sets_reps":"5 х 8-12","source_row":148},{"exercise_name":"сведение рук в кроссовере вверх","intensity":"тяжелая","sets_reps":"4 х 12-15","source_row":149},{"exercise_name":"тяга горизонтального блока","intensity":"средняя","sets_reps":"3 х 8-12","source_row":150},{"exercise_name":"тяга Т-грифа","intensity":"средняя","sets_reps":"3 х 8-12","source_row":151},{"exercise_name":"отведения на дельты","intensity":"средняя","sets_reps":"3 х 12-15","source_row":152}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс с ez грифом снизу","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":154},{"exercise_name":"сгибание на бицепс с ez грифом сверху","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":155},{"exercise_name":"французкий жим в блоке из-за головы","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":156}]}]},{"week":7,"days":[{"day_name":"ПОНЕДЕЛЬНИК","day_order":1,"exercises":[{"exercise_name":"Жим (гантели)","intensity":"тяжелая","sets_reps":"5 х 8-12","source_row":160},{"exercise_name":"сведение рук в кроссовере вниз","intensity":"средняя","sets_reps":"3 х 12-15","source_row":161},{"exercise_name":"тяга вертикального блока","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":162},{"exercise_name":"тяга штанги в наклоне","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":163},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"4 х 12-15","source_row":164}]},{"day_name":"СРЕДА","day_order":2,"exercises":[{"exercise_name":"присед со штангой","intensity":"тяжелая","sets_reps":"5 х 8","source_row":166},{"exercise_name":"румынская тяга","intensity":"средняя","sets_reps":"4 х 8-12","source_row":167},{"exercise_name":"разгибание ног","intensity":"тяжелая","sets_reps":"4 х 12","source_row":168},{"exercise_name":"сгибание ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":169},{"exercise_name":"разведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":170},{"exercise_name":"сведение ног","intensity":"средняя","sets_reps":"3 х 8-12","source_row":171},{"exercise_name":"икры","intensity":"тяжелая","sets_reps":"3 х 15","source_row":172}]},{"day_name":"ПЯТНИЦА","day_order":3,"exercises":[{"exercise_name":"жим в кроссовере 45 градусов","intensity":"средняя","sets_reps":"4 х 8-12","source_row":174},{"exercise_name":"сведение рук в кроссовере вверх","intensity":"средняя","sets_reps":"3 х 12-15","source_row":175},{"exercise_name":"тяга горизонтального блока","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":176},{"exercise_name":"тяга Т-грифа","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":177},{"exercise_name":"отведения на дельты","intensity":"тяжелая","sets_reps":"3 х 12-15","source_row":178}]},{"day_name":"СУББОТА","day_order":4,"exercises":[{"exercise_name":"сгибание на бицепс супинацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":180},{"exercise_name":"сгибание на бицепс с пронацией","intensity":"тяжелая","sets_reps":"3 х 8-12","source_row":181},{"exercise_name":"французкий жим в блоке из-за головы","intensity":"тяжелая","sets_reps":"4 х 8-12","source_row":182}]}]}]}];

const BUILTIN_KNOWLEDGE = [{"id":"uploaded_fitness_01","category":"cutting_reference","title":"Материал о сушке, проценте жира и расчётах","keywords":"сушка, процент жира, бф, дефицит, калории, BMR, БЖУ","content":"Chad:\n💊Перед самой сушкой определяем желанный процент жира и процент жира на данный момент (таблица сверху).\n\n🤖Именно процент жира (бф) показывает реальную форму тела,а не цифра на весах.Два человека могут весить одинаково,но выглядеть по-разному из-за разного процента жира и мышечной массы.\n\n☠️Как примерно определить свой процент жира?\n\n• 20-25% пресс почти не виден, есть мягкость в области живота и боков + мышцы выражены слабо.\n\n• 15-18%, появляется рельеф груди и плеч, верх пресса может быть слегка заметен, форма тела выглядит спортивнее.\n\n• 12-14%, хорошо видно пресс, появляется выраженный рельеф рук и груди.\n\n• 10-12% чёткий пресс и сосудистость, максимально сухая форма без экстремального дефицита.\n\n• Ниже 10% это очень сухая форма, глубокая прорисовка мышц.\n\nФормула для расчета БЖУ.\n\nПример:Твой вес составляет 70кг (!для примера! беру минимальные значения).\n-Белки:70•1.3=91\n-Углеводы:70•1=70\n-Жиры:70•0.2=14\nПо итогу в день ты ешь 91гр белка,70гр углеводов и 14гр жиров.\n\nДефицит калорий на сушке:\n\nДля сушки нам необходим дефицит калорий.Смотри,ты делаешь такой дефицит,чтобы не срываться и при этом плюс минус быстро сушиться.\n\nСнижай калораж постепенно: в первый день ты ешь 1800 калорий на второй уже 1600 и так далее…В течении 7-8 дней уменьшай по немногу,чтобы организм успел перестроиться.Не забывай,что сушиться тебе не неделю,а больше так что настраивай свой организм.😉\n\nЧем ниже калораж тем быстрее похудение.\n\nСчитаем метаболизм - сколько хотим скидывать:\n\nВ 1кг ЖИРА ~ 7700 калл.\n100 грамм ЖИРА ~ 770 калл.\n\nНапример:\nДефицит 700ккал в день - 4900 в неделю: 7700-4900 = -0.64кг жира в неделю\nДефицит 1300 ккал в день(АГРЕССИВНЫЙ дефицит) - 9100 в неделю: ~7700 - 9100=-1.2кг жира в неделю.\n\n💊Как определить подходящий дефицит калорий?!\n\n- Отнимаем базовый метаболизм от того сколько вы съели.\n\n•Считаем метаболизм:\nКалькулятор метаболизма (тыкай)\n\n•Не открывается?Вот формула:\nWhere:\nW is body weight in kg\nH is body height in cm\nA is age\nBMR = 10W + 6.25H - 5A + 5\n\nПРИМЕР:\nЯ вешу НАПРИМЕР 70кг при росте 175см и мне 17лет,считаю : 10•70кг + 6.25•175см - 5•17лет + 5 = 1714.\nА теперь смотри 1714 - это чисто на существование тела.\nДобавь пропорционально калории от активности (скрины вверху).\n\nПО ИТОГУ:\nМой метаболизм 2356(малая активность)\nЯ считаю БЖУ: \n119Б(476калл)\n175У(700калл)\n42Ж(378калл)\nВ сумме 1554 КАЛЛ.\n2356 - 1554 = 802 ДЕФИЦИТ В ДЕНЬ = ~ 5600 в неделю = 0.73кг жира в неделю ~ 3кг в месяц\n\nВАЖНО!!!Можно менять в зависимости,от того как вы хотите быстро похудеть - чем сильнее дефицит тем будет хуже самочувствие(будут срывы),но зато быстрее.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"1-72"},{"id":"uploaded_fitness_02","category":"food_sources_reference","title":"Материал об источниках белков, жиров и углеводов","keywords":"белок, жиры, углеводы, продукты, питание","content":"🍖ОТКУДА БРАТЬ БЕЛОК?🍗\n\nМясо и рыба :\n\n• Курица.\n• Индейка (мягче курицы).\n• Говядина ( можно фарш, не более 10% жирности ).\n• Тунец (можно консервированный).\n• Форель / Лосось.\n• Креветки.\n\n• Творог (0-5%).\n• Греческий йогурт (2-5%).\n\n• Протеиновый порошок                 ( удобно добирать белок ).\n• Протеиновые батончики ( в меру ).\n\n• Яичные белки.\n• Яица.\n\n🥑ОТКУДА БРАТЬ ЖИРЫ?🥑\n\n«Не забивай калории впустую,кушай правильные жиры»\n\nЛучшие источники :\n\n• Оливковое масло ( 1 ложка ~ 90ккал ).\n• Авокадо 🥑.\n• Жирная рыба ( скумбрия,лосось ).\n• Орехи (можно грецкие,миндаль и кешью ).\n\nУдобные :\n\n• Темный шоколад 70% ( в меру).\n• Арахисовая паста.\n\n🍚ОТКУДА БРАТЬ УГЛЕВОДЫ?🍜\n\n«Всё без мусора и скачков сахара»\n\nДля энергии :\n\n• Рис ( белый/басмати/жасмин ).\n• Картошка ( обычная или печёная ).\n• Гречка.\n• Макароны твёрдых сортов.\n\nБез готовки :\n\n• Хлеб цельнозерновой | тостовый цельный.\n• Бананы.\n• Рисовые хлебцы.\n• Овсяные хлопья быстрого приготовления.\n• Готовый рис в пакете,2-3 минуты в микроволновке.\n\nФрукты :\n\n• Ягоды.\n• Яблоки.\n• Виноград ( в меру ).","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"73-132"},{"id":"uploaded_fitness_03","category":"training_and_habits_reference","title":"Материал о тренировках для начинающих и пищевом поведении","keywords":"тренировка, новичок, подтягивания, приседания, отжимания, срывы, привычки","content":"ПРОЙДЕМСЯ ПО ТРЕНИРОВКАМ.💪 \n\nДля тех кто тренировался :\n\nТренировки оптимизируем на минимум стресса максимум поддержки мышц, меньше сетов - лучше.\n\nДля тех кто никогда не тренировался :\n\nДелаем 3 комбо подтягивания присяд и отжимания до отказа в 3 сетах | 3 раза в неделю.\n\nЧто нужно понять:\n\nПойми,срывы будут. Не задавайся вопросом будут ли они, самое важное в том, как ты на них реагируешь. Осознай, что срыв - это часть твоей игры и он не равен её концу.\n\nПрими это:\n\n• Один срыв не может сделать тебя слабым.\n• Главное не идеал,а скорость возврата в режим\n• Срыв не ломает результат,ломает чаще всего то,что ты далаешь после срыва.\n• Срыв - это не твоя слабость,это сигнал.Сигнал организма о том,что что-то пошло не так.\n\nКак всё обычно начинается:\n\n👀Сорвался - чувствуешь вину, из-за чувства вины заедаешь ещё больше. Заедаешь - ненавидишь себя, из-за ненависти снова срываешься. Это замкнутый круг.\n\n🔨Что делать после срыва:\n\n1)Не паникуй:\nСрыв уже случился, прими это и двигайся дальше.(паника только усугубит ситуацию)\n\n2)Один день ничего не изменит:\nВсего один день не сделает тебя салом.Не усиливай голодовку после срыва.\n\n3)Вернись в режим вовремя:\nПосле срыва, начни есть так,как ел до него.(Чем быстрее вернёшься, тем меньше ущерб)\n\n4)Анализируй:\nЧто привело к срыву? Выяви причину,не вини себя.\n\n5)Фокусируйся на цели,а не на прошлом.\nПрошлое - оно прошло, не дрочи себя. Есть только сейчас, сейчас - надо работать.\n\nКак делают все / Как нужно делать, чтобы получить результат.\n\nКак уменьшить кол-во срывов:                                                                                                                                                                                                                                                                                           \n1. План на день: План отбивает спонтанные решения.\n2. Больше воды: Я пью 3 литра в день.\n3. Больше белка: 2-3гр на кг.                                                                                                                                                                                                                                             4. Идеальный сон: Спи 7-9 часов.\n5. Объёмная еда: Разные овощи / клетчатка.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"134-182"},{"id":"uploaded_fitness_04","category":"plateau_and_refeed_reference","title":"Материал о плато, адаптации, рефидах и диет-брейках","keywords":"плато, рефид, диет-брейк, адаптация, сет-поинт","content":"Олимп:\n«Что  делать если вес стоит?»\n\nПлато на сушке:\n\n⚠️Вроде бы ты и ешь меньше, да и тренишь больше, а вес стоит - это метаболическая адаптация.\n\n🍴Ты буквально стоишь на месте: твой дефицит со времен исчезает. Сегодня дефицит -400 ккал, завтра -100 и дальше в полный ноль\n\n🔨 Что не нужно делать:\n\n• Ещё сильнее резать калории.\n• Брить жиры и угли под ноль.\n• Добавлять кардио на максимум(сделаешь ещё хуже).\n\n💊 Что нужно делать?\n\nДелай рефиды ( 1-2 раза в неделю ), диет-брейки, контроль NEAT , не уходи в моментальный жёсткий дефицит.\n\nТакже читай про:«Генетический сет-поинт».\n\n❌ Что такое генетический сет-поинт?\n\n• Генетический сет-поинт - это запрограммированный диапазон процента жира, который ваш мозг считает нормой и защищает во все оружия.\n\n• Именно из-за него кто-то ходит круглый год на низком  проценте жира, а кто-то соблюдая на разные диеты, останавливается на 15-18% жира и дальше не сдвигается.\n\n🔨 Когда вы снижаете процент жира ниже генетического диапазона, организм понимает: еды мало, надо выживать и начинает:снижать расход калорий,уменьшать активность(ты меньше двигаешься),замедлять обмер веществ,сильнее держаться за жир.\n\n‼️Как фиксить?‼️\n\n- Делаем рефиды.\n- Поддерживаем мышечную массу.\n- Опускаем процент жира медленно.\n\n🍴Рефиды.\n\n• Сушка для организма - сильный стресс, во время рефида ты повышаешь кол-во углеводов чтобы поддерживать метаболизм и гормоны.Мозг даёт сигнал телу о том,что выживание окончено и можно заново сжигать жир.\n\n• Во время долгой сушки организм адаптируется: замедляется метаболизм, снижается энергия, падает уровень гормона сытости (лептина) и усиливается чувство голода.\n\n🔨 Как делать рефид?\n\n|Белок оставляем как обычно (2гр на кг), жиры снижаем до 35гр, углеводы повышаем до 3-5гр на кг тела.\n\n|Частота рефидов определяется процентом жира в организме: 15-20% - 1 раз в 2 недели, 10-15% - 1 раз в неделю, при 10% и ниже делаем 2 раза в неделю.\n\n|Делай упор на чистые углеводы + делай силовые тренировки (угли пойдут в мышцы).\n\n❌Пример❌:\nБыло: 1200ккал\nСтало 1700-2200ккал.Калории увеличились из-за углей.\n\n🍴ДИЕТ-БРЕЙК\n\n👀На долгосрочной сушке включается метаболическая адаптация, тело экономит энергия и вследствие этого жир уходит хуже. По итогу ты з#ебываешься и ловишь плато.\n\n🫂Зачем он тебе?\n\n• Если ты долго сушишься и стоишь в плато. Диет-брейк восстановит твой обмен веществ, повысит уровень энергии, поможет дальше терять жир и снизит стресс.\n\n🗣Как правильно делать диет брейк?\n\n• Смотри, ты выходишь на недельную поддержку калорий, при этом держишь белок высоким, жиры и угли возвращаешь в норму.⚠️Самое главное не обжирайся, ешь на поддержке, а не всё подряд.(это будет откат).\n\n❌Если ты только начал сушку и дефицит небольшой - тебе диет-брейк не нужен.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"184-250"},{"id":"uploaded_fitness_05","category":"metabolism_and_muscle_reference","title":"Материал о метаболизме, сохранении мышц и NEAT","keywords":"метаболизм, мышцы, NEAT, шаги, силовые, кардио","content":"ПОСТЫ НА ТЕМУ СУШКИ:\n— «Как контролировать срывы?»\n— «Что  делать если вес стоит?»\n— «Как убрать частые перекусы?»\n         ПОСТЫ:\n         — Дефицит калорий\n         — Кортизол\n         — HIIT\n         — Желчный на сушке\n         — Белок на сушке\n         — Клетчатка на сушке\n         — Водно-солевой баланс\n         — Электролиты на сушке\n         — СТИМУЛЯТОРЫ\n\nКак не замедлить метаболизм.☠️\n\n🍴Скажу сразу, полностью не замедлить метаболизм на сушке не выйдет, но можно уменьшить это замедление, чтобы в дальнейшем вес не застаивался на одном месте.\n\n• Кушай белок,он защитит твои мышцы и увеличит расход калорий за счёт термического индекса.\n\n• Не делай слишком много кардио,делай умеренно 2-3 раза в неделю.(лучше просто увеличь кол-во шагов в день)\n\n• Делай силовые тренировки, без нагрузки на мышцы, тело решит, что они тебе больше не нужны. Тело сжигает мышцы - метаболизм падает.\n\n• Следи за сном (спи по 7-9ч),когда мы не высыпаемся у нас повышается гормон голода(грелин) и понижается лептин(гормон сытости).\n\n• Следи за NEAT(скрытый фактор замедления метаболизма), на сушке ты: меньше двигаешься, больше сидишь. Начни ходить по 15к+ шагов в день.\n\n• Делай рефиды (помогут психике и гормоналке).\n\n💪КАК СОХРАНИТЬ МЫШЦЫ НА СУШКЕ?\n\n🥩Кушаем белок,много белка:2-3гр белка на КГ тела.На переваривание белка тратится около 20-30% калорий, содержащихся в самом белке+белок подавляет аппетит за счет GLP-1.\n\n🦵 Кушаем лейцин (BCAA)\nЛейцин - аминокислота, которая напрямую активирует mTORC1 - главный переключатель синтеза мышечного белка.\n\n🦾Тренировки:2-3 силовых тренировки с прогрессией нагрузой.\n\n👀Делай умеренный дефицит(300-500ккал/день).\n\n💊Добавки:\n• Креатин 5г/день.\n\n⚠️KAK PODNЯT NEAT?\n\n🕑Ложись спать пораньше:\n • Ранний подъем синхронизирует циркадные ритмы, отптимизируя выброс кортизола и гормон роста,которые поддержат энергию и восстановление.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"251-300"},{"id":"uploaded_fitness_06","category":"cortisol_and_hiit_reference","title":"Материал о кортизоле и интервальном кардио HIIT","keywords":"кортизол, HIIT, интервалы, кардио, стресс","content":"СТИМУЛЯТОРЫ:\n\n- Кофеин ☕️\n- Никотин 👾\n- Йохимбин 🌱\n\nНевзначай повышай активность:\n\n• Каждый час-два, вствай и двигайся на 2-3 минуты. Так ты не дашь NEAT упасть до нуля.\n\nКОРТИЗОЛ☠️\n\n👀Кортизол на сушке - это гормон, который регулирует энергетический обмен и отвечает за адаптацию организма к стрессу, на сушке он всегда держится высоким, ведь дефицит калорий - стресс для организма.\n\nЧто он делает?\n\n• Повышает уровень глюкозы в крови и усиливает распад белков,а также даёт тебе энергию в условиях дефицита.\n\n• Кортизол расщепляет жир,но мобилизованные жирные кислоты не сгорают, а реэстерифицируются обратно в жировые клетки, при условии высокого кортизола жирные кислоты направляются в печень, вызывая стеатоз из за чего и происходит мышечная и печёночная инсулинорезистентность.\n\n• При повышенном кортизоле растет аппетит, у тебя растет тяга к быстрым углеводам,так сложнее держать дефицит.\n\n• Также из за кортизола может происходить потеря мышцы, снижение теста (при хроническом стрессе), задержка воды(влияет на электролиты).\n\nКак фиксить?🦾\n\n👾Спи по 7-9 часов, так ты нормализуешь гормональный фон, делай рефиды и избегай перетрена.\n\n🦾HIIT (ИНТЕНСИВНОЕ КАРДИО).\n\nHIIT - это короткие взрывные интервалы нагрузок, если по простому - максимум усилий за короткое время.HIIT≠лучше для жиросжигания, просто экономно по времени.\n\n😉Рекомендую иногда делать интенсивное кардио за место шагов,т.к это увеличивает расход калорий за КОРОТКИЙ промежуток времени, улучшает жиро сжигание после тренировки и самое главнок экономит время.\n\n- Интервалы высокой активности = жоский стресс,активация симпатической нервной системы, вследствие чего усиливается липолиз (расщепление жиров) из-за выброса адреналина.\n\n⚠️Если ты будешь делать HIIT каждый день ты получишь перетрен:\n\n- HIIT - высокий стресс, поэтому легко переборщить. Переборщишь - вырастет кортизол, ухудшится восстановление и ты потеряешь мышцы —> плато.\n\n🤌Как делать правильно?\n\nДелай по 20 минут 2-3 раза в неделю максимум. Работаем:20-30с спринт, после минута отдыха. Ключевое: держи пульс в районе,220-возраст•0.6, при высоком пульсе сжигаем гликоген вместо жира.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"301-343"},{"id":"uploaded_fitness_07","category":"gallbladder_reference","title":"Материал о желчном пузыре на сушке","keywords":"желчный пузырь, жиры, урсосан, УДХК","content":"⚠️ЖЕЛЧНЫЙ ПУЗЫРЬ⚠️\n\n👀Смотри,если ты сушишься на большом дефиците,то у тебя есть шансы получить застой желчи.\n\nПочему так происходит?\n\nЖелчный - это этакий резервуар. Есть жир - он сокращается - выбрасывает желчь, если же жиров мало - желчь стоит и густеет —> идёт перенасыщение холестерином и образование камне.\n\n🗣По статистике каждый 4-й на ХАРДсушке без жиров ловит проблемы с желчным. Режешь калории в ноль - ты рискуешь.\n\nХочешь сушиться на высоком дефиците? Лови как фиксить:\n\n- Пей урсосан (УДХК) 600-1200мг/д.\n- Делай рефиды с жирами: 1-2 раза в неделю добавляй 30-50г жиров (лосось, яйца, оливковое масло, авокадо).\n- Пей магний.\n- Не режь жиры в НОЛЬ(0.5/0.8г на кг).","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"345-360"},{"id":"uploaded_fitness_08","category":"protein_and_snacking_reference","title":"Материал о белке и частых перекусах","keywords":"белок, сытость, перекусы, грелин, GLP-1","content":"🥩 БЕЛОК - НАТУРАЛЬНЫЙ ОЗЕМПИК НА СУШКЕ.\n\nОземпик действует через гормон сытости (GLP-1), а белок влияет на организм иначе, но эффект похож.\n\n🗣Белок - самый сытный макронутриент, он снижает гормон голода (грелир) дольше переваривается, вследствие этого меньше хочется есть.\n\n🍴Почему нужно есть больше белка? Большое кол-во белка помогает держать дефицит калорий почти так же, как препараты, которые подавляют аппетит.\n\n🌱Белок замедляет усвоение углей, следовательно меньше скачков инсулина - меньше срывов (легче не переесть) —> меньше тяга к перекусам.\n\n⚠️Белок в большом количестве сохраняет мышцы при дефиците, организм не будет так сильно их кушать. Плюсом белка является его термический эффект (то сколько организм тратит на переваривание) выше (20-30%), то есть если ты съешь 100ккл белка, организм потратит на его переваривание 30ккл.\n\nУБИРАЕМ ЧАСТЫЕ ПЕРЕКУСЫ.\n\n👀Смотри, тут нужна система, нет системы = постоянные перекусы. Ты перекусываешь потому, что ешь мало клетчатки, мало белка, часто срываешься на сладкое из-за чего происходят резки скачки сахара, возможно у тебя хаотичный режим питания.\n\n⚠️Перекусы напрямую связаны с грелином и дисбалансом GLP-1.\n\n💊 Почему так происходит?\n\n• При высоком кортизоле у тебя повышается желание кушать, тяга к жирному и сладкому, вследствие этого повышается уровень глюкозы в крови, и ты чаще срываешься на перекусы.\n\n🔨 Как фиксить?\n\n- Белок и клетчатка повышают GLP-1 и значительно понижают гормон голода ( грелин ) + стабилизируют глюкозу, ты меньше хочешь\nперекусывать.\n\n- Нормализуй приемы пищи, ешь 2-3 раза в день по времени. Кушай белок в каждом приеме пищи, ешь клетчатку (она даст еще большее насыщение). Не ешь быстрые углеводы, перейди на сложные (гречка,рис…).\n\n- Перестань таскать куски, когда очень много раз откусываешь по одному кусочку от еду, дабы попробовать, так ты копишь калории.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"362-392"},{"id":"uploaded_fitness_09","category":"fiber_water_electrolytes_reference","title":"Материал о клетчатке, воде и электролитах","keywords":"клетчатка, вода, натрий, калий, магний, электролиты","content":"🤯КЛЕТЧАТКА НА СУШКЕ.\n\n🍴Клетчатка имба! - Добавляй её в пищу, вкуса она как такого не имеет, но в свою очередь круто насыщает.Также клетчатка уберет довольно частую проблему на сушке - плохой стул.🪑\n\nВОДНО-СОЛЕВОЙ БАЛАНС.\n\n👾Водно-солевой баланс влияет на один из самых важных процессов организма для сушки - липолиз (сжигание жира).\n\n🍴Да, вода участвует в расщеплении жиров, пьешь мало воды - липолиз работает хуже, хуже уходят отёки с лица. Также вода улучшает транспорт жирных кислот и поддерживает нормальный обмен веществ.\n\n🤌Просто пей 2-2.5л воды в день (можно больше), так ты ускоришь свою сушку и в целом улучшишь состояние организма.\n\n• БОНУСЫ:\n\n- Вода заполняет желудок тем самым снижает чувство голода.\n\n- Увеличивает расход калорий, когда ты пьешь воды организм тратит энергию на её нагрев.\n\nЭЛЕКТРОЛИТЫ.\n\n🦾Электролиты напрямую влияют на то, как ты сжигаешь жир. Электролиты - это натрий, магний, калий.\n\n👾Электролиты поддерживают водный баланс, (без воды липолиз плохо работает) участвуют у передаче нервных импульсов, влияют на мышечные сокращения и в итоге ты тратишь больше энергии.\n\n👀При дисбалансе электролитов кортизол растет, вследствие этого  хуже жиросжигание.\n\n🌱При нехватке электролитов у тебя падает сила, быстрее устаешь (выносливость падает).\n\n🍴При недостатке натрия (он задерживает воду), ухудшается транспорт нутриентов, вследствие чего метаболизм хуже работает.\n\nКак поддерживать баланс электролитов?\n\n• Иногда подсаливай еду (поддержишь содержание натрия ), кушай фасоль , добавляй немного банана в пищу. Простой способ: купи бады с электролитами.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"393-426"},{"id":"uploaded_fitness_10","category":"stimulants_reference","title":"Материал о стимуляторах","keywords":"кофеин, никотин, йохимбин, стимуляторы","content":"СТИМУЛЯТОРЫ💊 \n\n👀Мало энергии? Больше стал уставать? Тебе нужна помощь стимуляторов.\n\n☠️Скажу сразу, стимулятор≠жиросжигатель, он помогает работать на самой сушке.\n\nСТИМУЛЯТОРЫ:\n\n• Кофеин☕️ \n• Никотин👾\n• Йохимбин🌱\n\n⚠️Не бери всё сразу и не увеличивай дозировки. Если переборщишь,то вырастет кортизол, ухудшится сон, перегрузится ЦНС, ухудшишь жиросжигание и вызовешь привыкание.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"427-439"},{"id":"uploaded_fitness_11","category":"hair_and_brows_reference","title":"Материал об уходе за линией роста волос и бровями","keywords":"волосы, миноксидил, брови, дермароллер, прическа","content":"Chad:\nРаботаем с хайрлайном (линией роста волос):\n\nПокупаем миноксидил (5%) и мажем по линии роста волос, пытаемся максимально приблизиться к квадратной форме (картинки сверху).\n\nПодбираем прическу:\n\nОпределяем форму лица и тип волос, исходя из этого выбираем прическу.\n\nКак определить? Определяем по картинкам выше/через нейронку.\n\nРАБОТАЕМ С БРОВЯМИ:\n\n🔜Покупаем:Дермороллер, миноксидил 5% и касторовое масло.\n\nКак работаем: 6 дней мажем миноксидил (учись с ним работать) перед сном и касторовое масло с утра (как мазать?Видос сверху). На 7 день берем мезороллер и проходимся по бровям (показано в видосе сверху) / В ЭТОТ ДЕНЬ МЫ НИЧЕГО НЕ МАЖЕМ.\n\n⚠️Перед работай с мезороллером, ОБЯЗАТЕЛЬНО ОБРАБОТАЙ ЕГО СПИРТОМ.\n\n❌Перед тем как мазать, промой брови.\n\nУЛУЧШАЕМ ВНЕШНИЙ ВИД БРОВЕЙ\n\nРовняем брови. Берём:пинцет; бритву для бровей и щётку для бровей.\n\nБазовая стрижка:\n\n• Возьми пинцет и выщипай свою монобровь.\n\n• Возьми щётку для бровей и расчеши волосы вбок (левую влево,правую вправо). Отделяем щётку зону которая показана на фото, бреем её бритвой для бровей, лишние волоски выщипываем пинцетом. Делаем аккуратно(можешь сбрить себе бровь).\n\n«Уголки бровей должны смотреть вверх, они не должны смотреть вниз, также ровняем и отращиваем до идеала»\n\nДОП. СОВЕТ:\n\n- Если твои глаза расположены слишком близко друг к другу, делаем брови подальше друг от друга.\n\n- Если твои глаза расположены слишком далеко друг от друга, делаем брови поближе друг к другу.\n\nБОНУС К ВНЕШКЕ:\n\nСделай (покрась) свои брови и ресницы на 1-2 тона темнее.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"441-482"},{"id":"uploaded_fitness_12","category":"height_and_sleep_reference","title":"Материал о росте, сне и методике Берга","keywords":"рост, сон, осанка, методика Берга, витамин D3, гормон роста","content":"Олимп:\nГАЙД НА РОСТ\n\n☠️Скажу сразу,если тебе меньше 21 года - всё гуд. Если старше, то без операций изменить свой рост будет очень трудно,так как в этом возрасте зоны роста закрываются.\n\nПитание:\n\n🍖Правильно питайся: За день употребляй 2гр белка на кг своего веса, то есть если ты весишь 75кг, то ты должен съесть 150гр белка за день. От куда брать белок?\n\nСон:\n\n💤Спи по 8-9 часов. Больше всего гормона роста вырабатывается во сне. Ложись спать до 22.00.\n\nОсанка и упражнения для роста:\n\n🔨Всегда держи спину ровной. Когда сутулишься визуально теряешь ~3см своего роста. Укрепляй свой позвоночник.\n\nЧитай дополнение.\n\n💤ГАЙД НА СОН:\n\n• Первое и самое главное правило: ложись в одно и тоже время. Не ляжешь спать во время - будешь досыпать на следующий день и не выспишься.\n\n• Проснулся - пошёл видеть солнце, сделай прогулку на 10-20мин. Таким образом ты повышаешь уровень кортизола с утра -> вечером он будет низким ( проще уснуть ).\n\n• Ложись спать до 10.00. Ляжешь позже - не выспишься.\n\n• Не можешь уснуть? - Прими холодную ванну за час до сна. | Используй метод солдата - ложишься на живот, правую руку под подушку, а левую вверх и ногу под себя чуть чуть.\n\n• Кушай D3  / цинк  /  магний.\n\nМетодика Берга:\n\n👀Скажу сразу, при помощи данной методики можно увеличить рост на 3-5см ( в зависимости от роста )\n\nСама Метода: МЕТОДА. Выполняй как показано на видосах все 15 упражнений .\n\nКак работает?\n\n• Выполняя данные упражнения ты растягиваешь свои мышцы/позвоночник (увеличиваешь промежутки между позвонками). \n\n• В данной методе ты работаешь с осанкой. Осанка визуально добавит пару сантиметров.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"484-526"},{"id":"uploaded_fitness_13","category":"skincare_reference","title":"Материал об уходе за кожей","keywords":"кожа, очищение, AHA, BHA, SPF, увлажнение, ниацинамид","content":"ГАЙД НА КОЖУ: \n\n• Гайд на чистую кожу.\n• Гайд на типы кожи.\nПосты будут пополняться…\n\nГАЙД НА ЧИСТУЮ КОЖУ:\n\nОчищение:\n\n👀Умывайся два раза в день. Утром, чтобы убрать то, что выделилось за ночь. Вечером,чтобы смыть пыль,пот и т.д.\n\nИспользуй гель или мягкую пенку. Мыло не юзаем - сушит и нарушает барьер.\n\n❌Что нельзя делать:\n\n• Умываться мылом.\n • Тереть лицо полотенцем.\n • Ложиться спать с мэйком.\n\nОтшелушивание: Как убрать шероховатости?\n\nКожа обновляется не сама по себе. Ороговевшие клетки нужно убирать, иначе поры забиваются.\n\nДва варика:\n\n👾Механический скраб - раз в неделю, с мелкими мягкими частицами. Много не наносим, эначе травмируем кожу.\n\n👾Химический пилинг - работает делективнее и глубже. В его составе - кислоты, которые растворяют мёртвые клетки, не повреждая живые.\n\nИщем средства с :\n\n🗣AHA - кислоты (альфа-гидроксикислоты) — работают на поверхности. Растворяют связи между ороговевшими клетками, убирают шелушения, выравнивают тон и текстуру. Основные представители: гликолевая, миндальная, молочная.\n\n🗣BHA - кислоты (бета-гидроксикислоты) - это сициловая кислота. Она проникает внутрь пор, растворяет кожное сало и грязь. Поэтому BHA - лучшее решение против чёрных точек и закрытых комедонов.\n\nЮзаем кислоты 2-3 раза в неделю, вечером. Утром после них - обязательно SPF\n\nУвлажнение:\n\nУвлажнение - нужно всем. Даже жирной коже. Если не увлажнять, она пытается компенсировать сухость и выделяет ещё больше себума.\n\nУтром и вечером после умывания наносим крем. Для жирной кожи - лёгкий гель, для сухой - более плотный.\n\n‼️Ищи в составе:\n\n• Гиалуроновую кислоту - притягивает и удерживает влагу.\n• Церамиды - восстанавливают\n• Защитный барьер масла (ши; жожоба; авокадо) - питают и закрывают влагу внутри.\n\nНаноси крем на чуть влажную кожу - работает лучше.\n\nСияние и тон:\n\nПосле умывания используем тонер. Он подготавливает кожу к следующим средствам.\n\nВитамин C (утром) - мощный антиоксидант. Осветляет пигментацию, выравнивает тон, защищает от свободных радикалов и добавляет сияние.\n\nНиацинамид (витамин D3) - если есть проблема жирного блеска и расширенных пор. Регулирует работу сальных желёз, сужает поры, успокаивает воспаления.\n\nSPF - обязаловка.\n\nСолнцезащита нужна каждый день. Даже зимой. Даже в пасмурную погоду.\n\nУльтрафиолет разрушает коллаген и вызывает пигментацию. Без SPF все усилия по уходу теряют смысл.\n\nВыбирай защиту SPF 30-50, наноси утром последним слоем.\n\nБонусное влияние на кожу:\n\n- Меняй наволочку раз в 2-3 дня.\n- Не трогай лицо руками в течении всего дня.\n- Пей достаточное кол-во воды.\n- Следи за питанием. Сахар и молочка - провоцируют высыпания.\n\nЧто требует для качественного ухода?\n\n1. Пенка\n2. Гидрофильное масло (мицеллярка)\n3. Тонер\n4. Сыворотка\n5. Крем\n\nДОПОЛНЕНИЕ (РОСТ):\n\nЧто делать? Пройдемся сразу по пунктам:\n\n1) 7-10к единиц д3.\n2) Магний обязаловка, д3 без магния работать не будет и наоборот.\n3) Солнце.\n4) Сон. (Не будет работать без первого и второго)\n5) Ходьба.\n6) Если юзать что то по отдельности, а не всё вместе, то них@ра работать не будет ( в разы хуже чем всё вместе ).\n\n• Если прям совсем не устраивает свой рост, берем гормон роста препарат. (Изучай эту тему)\n\n😉ВИДЫ ТИПОВ КОЖИ И КАК ОПРЕДЕЛИТЬ СВОЙ\n\nСкажу сразу, уход за кожей-дело супер индивидуальное, так как у каждого свой тип кожи и к каждому нужен свой подход.\n\nОпределяем тип кожи.\n\nПри неправильном уходе за кожей лица, вы можете только сделать хуже своей коже.\n\n• Нормальный тип кожи - характеризуется сбалансированным содержанием влаги и кожного сала (себума).\nПризнаки: матовость, средняя плотность, малозаметная пористость, малый блеск в зоне лоб-нос-подбородок.\n\n• Сухой тип кожи - тонкая и нежная, с почти незаметными порами, матовость и отсутствие жирного блеска, склонность к шелушению , время от времени - ощущение сухости, стянутости.\n\n• Жирный тип кожи - плотновата и грубовата, есть расширенность пор, повышенное салоотделение, склонность к проявлению чёрных точек, закупоривание пор.\n\n• Комбинированная (смешанная кожа) - встречается чаще всего и объединяет признаки жирной и сухой - повышенное салоотделение и заметные поры только в Т-зоне, время от времени появляются подкожные комедоны.\n\n• Чувствительный тип кожи - реагирует на все что можно стресс, питание, недосып, погодные изменения, самый раздражающий тип кожи. За счёт ослабленного барьерного слоя повышается дискомфорт, появляется шелушение, зуд, покраснение.\n\nКАК ОПРЕДЕЛИТЬ ТИП КОЖИ?\n\n1) Чистим лицо\n\nУмой лицо любым очищающим средством ( пенкой для умывания или гелем для умывания ) аккуратно промокните лицо бумажным полотенцем.\n\n2) Ждём\n\nОжидайте 1-2 часа (не наносим никаких средств),чтобы кожа могла восстановить свой естественный баланс.\n\n3) Наблюдаем\n\n• Если кожа стянутая и шелушится - это может быть сухая кожа.\n\n• Если появляется блеск и жирность - это жирная кожа.\n\n• Если в Т-зоне жирно, а на щеках нормально и сухо - это комбинированная кожа.\n\nГАЙД НА ЗОНУ ГЛАЗ:","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"527-660"},{"id":"uploaded_fitness_14","category":"eyes_reference","title":"Материал о зоне глаз и тёмных кругах","keywords":"глаза, брови, ресницы, синяки под глазами, патчи, массаж","content":"ГАЙД НА ЗОНУ ГЛАЗ: \n\nБрови\n\n🔨Тёмные и густые брови выглядят куда более привлекательнее, чем тонкие и светлые, т.к. делают наши глаза более выразительными. Если вам повезло родится с тёмными густыми бровями, то вам повезло, а если нет - изучи это.\n\nРесницы\n\n🔨Длинные и густые ресницы тоже выглядят очень привлекательно, чтобы сделать их длиннее - изучи это.\n\nНаклон глаз\n\nГоворят что его изменить нельзя, но по личному опыту скажу, что вполне возможно.\n\n🗣: Поставь два указательных пальца на внешние уголки глаз ( на концах бровей), зажми и натяни брови ближе к висками и вверх, затем прищурь глаза и просто моргай.\n\n• Делай данное упражнение 30 сек в 3 подходах. После него у вас может быть размыто зрение, но это временный эффект (длится 1-2 минуты).\n\nКАК УБРАТЬ СИНЯКИ ПОД ГЛАЗАМИ?\n\n Если сосуды просто просвечивают через тонкую кожу - полностью не убрать, можно сделать почти незаметными.\n\n Лёд:\n\nЛёд работает сразу, но эффект временный (действует 3 часа).\n\n • Заверни пару кубиков в салфетку. Голым льдом ты обожжешь кожу. Приложи к векам на 30-60с. Холод резко сужает сосуды, кровь уходит - синева бледнеет+уходят отёки.\n\n Чайные пакетики:\n\n Бери чёрный или зелёный.\n\n• Заварил, вытащил, отжал и закинул в холодильник на 10мин. Можно в морозилку на 3, если времени мало. Потом положи на закрытые глаза и лежи так 15 минут.\n\n Патчи для глаз:\n\nОни всегда должны быть холодными.\n\n Чекай состав при выборе: нужен кофеин - от мешков, витамин С - осветляет, гиалуронка - увлажняет (кожа плотнее, синяк меньше видно).\n\n • Наноси на чистую кожу, максимально близко в ресницам (чтобы закрыть всю синюю зону). Держи сколько написано на упаковке (15-30мин), не переживай - высохший патч вытянет влагу обратно. \n\nВыбираем рабочий крем\n\n Ищем в составе:\n\n- Витамин С\n- Кофеин\n- Ретинол\n- Ниацинамид\n- Пептиды\n\n Массаж:\n\n • Делай утром и вечером по 2мин.⚠️Обязательно наноси крем или масло, чтобы пальцы скользили. Подушечками пальцев легонько стучи по косточке под глазом от виска в носу (работаем около минуты). Потом поставить пальцы у виска и мелкими вибрирующими движениями «стряхивать» жидкость к ушам. Холодным роллер (храним в холодильнике) прокатывай зону под глазами от внутреннего уголка к внешнему.\n\nЧитай дополнение.\n\nЧТО УБИВАЕТ ТВОИ ГЛАЗА КАЖДЫЙ ДЕНЬ:\n\n👀 Привычка тереть глаза.\n\n• Травмируешь капилляры, они лопаются - синяк становится только темнее. Запрети себе касаться век.\n\n🐟Соль на ночь.\n\n• Соленая рыба, орешки, чипсв перед сном = утром мешки под глазами. Соль задерживает воду и она скапливается под глазами.\n\n🥃 Курение и алкоголь.\n\n• Никотин сужает сосуды - кожа хуже питается и истончается. Алкоголь задерживает воду и расширяет сосуды. На утро синева+отёки.\n\n👾 Спишь на низкой подушке.\n\n• Подушка должна быть высокой, чтобы голова была выше тела. Во время сна на низкой подушке жидкость за ночь стекает к голове и собирается под глазами.\n\nНе сиди в телефоне перед сном. Свет напрягает глаза, кровь застаивается. \n\nЧитай дополнение.\n\n🦾ОБРАЗ ЖИЗНИ: \n\n• Спи по 7-8 часов и желательно на спине.\n\n•Пей воду. Обезвоженная кожа становится тоньше и синяки заметнее.\n\n• Проверь своё железо. При анемии часто бывают темные круги и бледность.\n\n• Спорт и ходьба разгоняют кровь по всему тела.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"660-748"},{"id":"uploaded_fitness_15","category":"edema_reference","title":"Материал об отёках","keywords":"отёки, соль, вода, лимфодренаж, калий","content":"КАК ИЗБАВИТЬСЯ ОТ ОТЁКОВ?\n\nСледим за питанием: Убираем сахар и соль. Отёки - это реакция на соль, а жир - реакция ра избыток калорий (в особенности сахар).\n\n🧂Соль:\n\nУбери соленья, колбасы, копчёности, соусы, чипсы и фастфуд. Вся еда продаваемая в пачках содержит скрытую соль.\n\n🍭Сахар (мучное):\n\nИменно эта шляпа даёт скачки инсулина, который запирает жир в клетках. Убери булочки, конфетки, сладкие напитки (всякие соки, газировки, сладкий кофе). Замени на сложные углеводы (овсянка, гречка, бурый рис) в первой половине дня.\n\n👾Продукты:\n\nБелок:\n\nКушай достаточно белка. Белок (курица, рыба, творог, яйца) вытягивают лишнюю жидкость из тканей в кровоток, откуда она выводится почками. Без белка отёки не уходят.\n\nКалий:\n\nКалий вытесняет натрий (соль). Кушай продукты, богатые калием: авокадо; курага; бананы; шпинат; брокколи.\n\n🦾Движение (лимфодренаж):\n\nЕсли ты мало двигаешься, лимфа застаивается. Жир тоже уходит только тогда, когда мышцы работают и требуют энергии.\n\nЛимфодренажные упражнения:\n\nКаждое утро делай виброгимнастику (минута на пятках) и упражнение берёзка.\n\nКардио:\n\nНе убивайся в зале. Достаточно быстрой ходьбы (10-15к шагов) или лёгкой пробежки. Это запускает лимфоток и сердце начинает эффективнее перекачивать кровь.\n\n💤 Сон и контраст:\n\nСон и стресс:\n\nГормон стресса (кортизол) задерживает натрий и воду. Хронический недосып = вечные отёки и жир на животе. Спи не менее 7-8 часов.\n\nКонтрастный душ:\n\nЧередую холодную и горячую воду. Это тренирует сосуды, они перестают быть вялыми и жидкими.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"750-793"},{"id":"uploaded_fitness_16","category":"jawline_reference","title":"Материал о линии челюсти и осанке","keywords":"челюсть, второй подбородок, chin tucks, мьюинг, осанка","content":"ГАЙД НА ИДЕАЛЬНУЮ ЧЕЛЮГУ\n\n Одна из немногих причин плохой челюсти - второй подбородок.\n\nОт чего появляется?\n\n1. Лишний вес\n2. Возраст\n3. Осанка\n4. Отёки от соли и алкоголя\n5. Генетика ( исправимо) \n\n👉Перейдём к упражнениям:\n\n «Chin tucks» - специально делай второй подбородок и держи 10 секунд, работаем по 5 раз.\n\n «Жираф» - кулаки под подбородок и дави головой вниз, а кулаками вверх.10 раз.\n\n «Поцелуй в потолок» - запрокинь голову и тянись губами вверх. Держи 5 секунд, работает по 10 раз.\n\n «Язык к носу» - тянись языком к носу, чувствуй напряжение под подбородком.10 раз по 5 секунд.\n\n 🦾Массажи:\n\n • Похлопывания тыльной стороной ладони по зоне под подбородком - минуту.\n\n • Щипки пальцами по всей площади - минуту.\n\n • Косточками пальцев веди от подбородка к ушам с нажимом. 15 раз.\n\n • Ложками из холодильника води снизу вверх - отёк уйдет мгновенно.\n\n🥩Питание и вода:\n\n • Исключи из рациона: сладкое, мучное, жареное и соль - они дают отёки + жир.\n\n • Пей норму воды. Кушай овер дох@я белка и добавляй овощи. Ешь рыбий жир и орехи.\n\n 🤫Мьюнинг:\n\nДержи язык правильно,прижатым к верхнему небу: • Весь язык, целиком. Кончик сразу за передними зубами,⚠️ не касается их. Дыши носом и сомкни зубы (держим так постоянно). \n\n🗿Осанка:\n\nСледи за осанкой: Сидя за компом, следи чтобы уши были над плечами. Держи телефон на уровне глаз, не отпускай голову.","source_name":"питание.txt — исходный пользовательский материал; медицинские и физиологические утверждения не проверены","priority":10,"source_lines":"794-838"}];

const seededDatabaseBindings = new WeakSet();

async function ensureBuiltInContent(db) {
  if (!db || typeof db.prepare !== "function") throw new Error("Не настроен D1 binding DB.");
  if (seededDatabaseBindings.has(db)) return;
  const programCountsResult = await db.prepare(`SELECT p.program_id, COUNT(e.exercise_id) AS exercise_rows FROM workout_programs p LEFT JOIN workout_exercises e ON e.program_id = p.program_id WHERE p.program_id IN ('bb_loyalty', 'bb_loyalty_2_0') GROUP BY p.program_id`).all();
  const counts = new Map((programCountsResult.results || []).map(row => [row.program_id, Number(row.exercise_rows || 0)]));
  const knowledgeIdsResult = await db.prepare("SELECT id FROM fitness_knowledge WHERE id LIKE 'uploaded_fitness_%'").all();
  const knowledgeIds = new Set((knowledgeIdsResult.results || []).map(row => row.id));
  const statements = [];
  for (const program of BUILTIN_PROGRAMS) {
    const expected = program.total_exercises;
    if ((counts.get(program.program_id) || 0) >= expected) continue;
    statements.push(db.prepare(`INSERT OR IGNORE INTO workout_programs (program_id, name, description, source_name, created_at) VALUES (?, ?, ?, ?, ?)` )
      .bind(program.program_id, program.name, program.description, program.source_name, nowIso()));
    for (const week of program.weeks) {
      for (const day of week.days) {
        for (let i = 0; i < day.exercises.length; i++) {
          const exercise = day.exercises[i];
          const exerciseId = `${program.program_id}_w${week.week}_d${day.day_order}_e${i+1}`;
          statements.push(db.prepare(`INSERT OR IGNORE INTO workout_exercises (exercise_id, program_id, week_no, day_order, day_name, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` )
            .bind(exerciseId, program.program_id, week.week, day.day_order, day.day_name, i + 1, exercise.exercise_name, exercise.intensity, exercise.sets_reps, program.source_name));
        }
      }
    }
  }
  for (const item of BUILTIN_KNOWLEDGE) {
    if (knowledgeIds.has(item.id)) continue;
    statements.push(db.prepare(`INSERT OR IGNORE INTO fitness_knowledge (id, category, title, keywords, content, source_name, priority) VALUES (?, ?, ?, ?, ?, ?, ?)` )
      .bind(item.id, item.category, item.title, item.keywords, item.content, item.source_name, item.priority));
  }
  for (let i = 0; i < statements.length; i += 50) await db.batch(statements.slice(i, i + 50));
  seededDatabaseBindings.add(db);
}

function detectExplicitProgramSelection(message) {
  const normalized = String(message || "").toLowerCase();
  const selectionIntent = /(выбираю|выбрал|выбрала|выбрать|назначь|установи|моя программ|начинаю|перехожу на|хочу.*программ|буду.*(заниматься|тренироваться)|(заниматься|тренироваться).*по)/u.test(normalized);
  if (!selectionIntent) return null;
  if (normalized.includes("2.0") || normalized.includes("2,0") || normalized.includes("два ноль")) return "bb_loyalty_2_0";
  if (normalized.includes("бб loyalty") || normalized.includes("bb loyalty") || normalized.includes("бб лоялти")) return "bb_loyalty";
  return null;
}

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
  await ensureBuiltInContent(env.DB);
  await ensureUser(env.DB, userId);
  const selectedProgram = detectExplicitProgramSelection(message);
  if (selectedProgram) {
    await env.DB.prepare("UPDATE users SET current_program = ?, current_week = 1, updated_at = ? WHERE user_id = ?")
      .bind(selectedProgram, nowIso(), userId).run();
  }
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
  // OpenAI-compatible multimodal format. Gemini models behind an OpenAI-compatible
  // gateway receive the actual Base64 image payload here (not merely a photo marker).
  // Do not strip image parts on retries: a text-only retry would mislead the user.
  for (const image of images) userContent.push({
    type: "image_url",
    image_url: { url: image.dataUrl, detail: "auto" },
  });
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
  await ensureBuiltInContent(env.DB);
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
