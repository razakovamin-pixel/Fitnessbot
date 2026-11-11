-- Seeded only from the user-provided nutrition guide and workout files.
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Оценка процента жира: тезисы исходного гайда', 'оценка формы', 'процент жира bf сушка форма тела пресс', 'Chad:
💊Перед самой сушкой определяем желанный процент жира и процент жира на данный момент (таблица сверху).

🤖Именно процент жира (бф) показывает реальную форму тела,а не цифра на весах.Два человека могут весить одинаково,но выглядеть по-разному из-за разного процента жира и мышечной массы.

☠️Как примерно определить свой процент жира?

• 20-25% пресс почти не виден, есть мягкость в области живота и боков + мышцы выражены слабо.

• 15-18%, появляется рельеф груди и плеч, верх пресса может быть слегка заметен, форма тела выглядит спортивнее.

• 12-14%, хорошо видно пресс, появляется выраженный рельеф рук и груди.

• 10-12% чёткий пресс и сосудистость, максимально сухая форма без экстремального дефицита.

• Ниже 10% это очень сухая форма, глубокая прорисовка мышц.', 'питание.txt, строки 1-17', 4);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Расчёт БЖУ: пример из исходного гайда', 'макронутриенты', 'бжу белки жиры углеводы макронутриенты', 'Формула для расчета БЖУ.

Пример:Твой вес составляет 70кг (!для примера! беру минимальные значения).
-Белки:70•1.3=91
-Углеводы:70•1=70
-Жиры:70•0.2=14
По итогу в день ты ешь 91гр белка,70гр углеводов и 14гр жиров.', 'питание.txt, строки 18-25', 3);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Дефицит калорий: тезисы исходного гайда', 'калории', 'дефицит калорий сушка калораж похудение', 'Дефицит калорий на сушке:

Для сушки нам необходим дефицит калорий.Смотри,ты делаешь такой дефицит,чтобы не срываться и при этом плюс минус быстро сушиться.

Снижай калораж постепенно: в первый день ты ешь 1800 калорий на второй уже 1600 и так далее…В течении 7-8 дней уменьшай по немногу,чтобы организм успел перестроиться.Не забывай,что сушиться тебе не неделю,а больше так что настраивай свой организм.😉

Чем ниже калораж тем быстрее похудение.', 'питание.txt, строки 26-33', 2);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Метаболизм и формула BMR: пример из исходного гайда', 'энергетический обмен', 'метаболизм bmr формула базовый обмен калории активность', 'Считаем метаболизм - сколько хотим скидывать:

В 1кг ЖИРА ~ 7700 калл.
100 грамм ЖИРА ~ 770 калл.

Например:
Дефицит 700ккал в день - 4900 в неделю: 7700-4900 = -0.64кг жира в неделю
Дефицит 1300 ккал в день(АГРЕССИВНЫЙ дефицит) - 9100 в неделю: ~7700 - 9100=-1.2кг жира в неделю.

💊Как определить подходящий дефицит калорий?!

- Отнимаем базовый метаболизм от того сколько вы съели.

•Считаем метаболизм:
Калькулятор метаболизма (тыкай)

•Не открывается?Вот формула:
Where:
W is body weight in kg
H is body height in cm
A is age
BMR = 10W + 6.25H - 5A + 5

ПРИМЕР:
Я вешу НАПРИМЕР 70кг при росте 175см и мне 17лет,считаю : 10•70кг + 6.25•175см - 5•17лет + 5 = 1714.
А теперь смотри 1714 - это чисто на существование тела.
Добавь пропорционально калории от активности (скрины вверху).

ПО ИТОГУ:
Мой метаболизм 2356(малая активность)
Я считаю БЖУ: 
119Б(476калл)
175У(700калл)
42Ж(378калл)
В сумме 1554 КАЛЛ.
2356 - 1554 = 802 ДЕФИЦИТ В ДЕНЬ = ~ 5600 в неделю = 0.73кг жира в неделю ~ 3кг в месяц

ВАЖНО!!!Можно менять в зависимости,от того как вы хотите быстро похудеть - чем сильнее дефицит тем будет хуже самочувствие(будут срывы),но зато быстрее.', 'питание.txt, строки 34-72', 3);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Источники белка из исходного гайда', 'питание', 'белок курица индейка говядина тунец творог яйца йогурт рыба', '🍖ОТКУДА БРАТЬ БЕЛОК?🍗

Мясо и рыба :

• Курица.
• Индейка (мягче курицы).
• Говядина ( можно фарш, не более 10% жирности ).
• Тунец (можно консервированный).
• Форель / Лосось.
• Креветки.

• Творог (0-5%).
• Греческий йогурт (2-5%).

• Протеиновый порошок                 ( удобно добирать белок ).
• Протеиновые батончики ( в меру ).

• Яичные белки.
• Яица.', 'питание.txt, строки 73-92', 5);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Источники жиров из исходного гайда', 'питание', 'жиры оливковое масло авокадо рыба орехи', '🥑ОТКУДА БРАТЬ ЖИРЫ?🥑

«Не забивай калории впустую,кушай правильные жиры»

Лучшие источники :

• Оливковое масло ( 1 ложка ~ 90ккал ).
• Авокадо 🥑.
• Жирная рыба ( скумбрия,лосось ).
• Орехи (можно грецкие,миндаль и кешью ).

Удобные :

• Темный шоколад 70% ( в меру).
• Арахисовая паста.', 'питание.txt, строки 93-108', 4);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Источники углеводов из исходного гайда', 'питание', 'углеводы рис картофель гречка макароны хлеб овсянка фрукты', '🍚ОТКУДА БРАТЬ УГЛЕВОДЫ?🍜

«Всё без мусора и скачков сахара»

Для энергии :

• Рис ( белый/басмати/жасмин ).
• Картошка ( обычная или печёная ).
• Гречка.
• Макароны твёрдых сортов.

Без готовки :

• Хлеб цельнозерновой | тостовый цельный.
• Бананы.
• Рисовые хлебцы.
• Овсяные хлопья быстрого приготовления.
• Готовый рис в пакете,2-3 минуты в микроволновке.

Фрукты :

• Ягоды.
• Яблоки.
• Виноград ( в меру ).', 'питание.txt, строки 109-133', 4);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Тренировки и отношение к срывам: исходный гайд', 'тренировки и поведение', 'тренировки новичок опытный подтягивания присед отжимания срыв вина', 'ПРОЙДЕМСЯ ПО ТРЕНИРОВКАМ.💪 

Для тех кто тренировался :

Тренировки оптимизируем на минимум стресса максимум поддержки мышц, меньше сетов - лучше.

Для тех кто никогда не тренировался :

Делаем 3 комбо подтягивания присяд и отжимания до отказа в 3 сетах | 3 раза в неделю.

Что нужно понять:

Пойми,срывы будут. Не задавайся вопросом будут ли они, самое важное в том, как ты на них реагируешь. Осознай, что срыв - это часть твоей игры и он не равен её концу.

Прими это:

• Один срыв не может сделать тебя слабым.
• Главное не идеал,а скорость возврата в режим
• Срыв не ломает результат,ломает чаще всего то,что ты далаешь после срыва.
• Срыв - это не твоя слабость,это сигнал.Сигнал организма о том,что что-то пошло не так.

Как всё обычно начинается:

👀Сорвался - чувствуешь вину, из-за чувства вины заедаешь ещё больше. Заедаешь - ненавидишь себя, из-за ненависти снова срываешься. Это замкнутый круг.

🔨Что делать после срыва:

1)Не паникуй:
Срыв уже случился, прими это и двигайся дальше.(паника только усугубит ситуацию)

2)Один день ничего не изменит:
Всего один день не сделает тебя салом.Не усиливай голодовку после срыва.

3)Вернись в режим вовремя:
После срыва, начни есть так,как ел до него.(Чем быстрее вернёшься, тем меньше ущерб)

4)Анализируй:
Что привело к срыву? Выяви причину,не вини себя.

5)Фокусируйся на цели,а не на прошлом.
Прошлое - оно прошло, не дрочи себя. Есть только сейчас, сейчас - надо работать.

Как делают все / Как нужно делать, чтобы получить результат.', 'питание.txt, строки 134-177', 5);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Снижение вероятности срывов: исходный гайд', 'поведение и восстановление', 'срывы план вода белок сон клетчатка', 'Как уменьшить кол-во срывов:                                                                                                                                                                                                                                                                                           
1. План на день: План отбивает спонтанные решения.
2. Больше воды: Я пью 3 литра в день.
3. Больше белка: 2-3гр на кг.                                                                                                                                                                                                                                             4. Идеальный сон: Спи 7-9 часов.
5. Объёмная еда: Разные овощи / клетчатка.', 'питание.txt, строки 178-183', 3);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Плато и генетический сет-поинт: утверждения исходного гайда', 'плато', 'плато сетпоинт метаболическая адаптация NEAT', 'Олимп:
«Что  делать если вес стоит?»

Плато на сушке:

⚠️Вроде бы ты и ешь меньше, да и тренишь больше, а вес стоит - это метаболическая адаптация.

🍴Ты буквально стоишь на месте: твой дефицит со времен исчезает. Сегодня дефицит -400 ккал, завтра -100 и дальше в полный ноль

🔨 Что не нужно делать:

• Ещё сильнее резать калории.
• Брить жиры и угли под ноль.
• Добавлять кардио на максимум(сделаешь ещё хуже).

💊 Что нужно делать?

Делай рефиды ( 1-2 раза в неделю ), диет-брейки, контроль NEAT , не уходи в моментальный жёсткий дефицит.

Также читай про:«Генетический сет-поинт».

❌ Что такое генетический сет-поинт?

• Генетический сет-поинт - это запрограммированный диапазон процента жира, который ваш мозг считает нормой и защищает во все оружия.

• Именно из-за него кто-то ходит круглый год на низком  проценте жира, а кто-то соблюдая на разные диеты, останавливается на 15-18% жира и дальше не сдвигается.

🔨 Когда вы снижаете процент жира ниже генетического диапазона, организм понимает: еды мало, надо выживать и начинает:снижать расход калорий,уменьшать активность(ты меньше двигаешься),замедлять обмер веществ,сильнее держаться за жир.

‼️Как фиксить?‼️

- Делаем рефиды.
- Поддерживаем мышечную массу.
- Опускаем процент жира медленно.', 'питание.txt, строки 184-217', 3);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Рефиды: описание исходного гайда', 'питание и восстановление', 'рефид рефиды углеводы белок', '🍴Рефиды.

• Сушка для организма - сильный стресс, во время рефида ты повышаешь кол-во углеводов чтобы поддерживать метаболизм и гормоны.Мозг даёт сигнал телу о том,что выживание окончено и можно заново сжигать жир.

• Во время долгой сушки организм адаптируется: замедляется метаболизм, снижается энергия, падает уровень гормона сытости (лептина) и усиливается чувство голода.

🔨 Как делать рефид?

|Белок оставляем как обычно (2гр на кг), жиры снижаем до 35гр, углеводы повышаем до 3-5гр на кг тела.

|Частота рефидов определяется процентом жира в организме: 15-20% - 1 раз в 2 недели, 10-15% - 1 раз в неделю, при 10% и ниже делаем 2 раза в неделю.

|Делай упор на чистые углеводы + делай силовые тренировки (угли пойдут в мышцы).

❌Пример❌:
Было: 1200ккал
Стало 1700-2200ккал.Калории увеличились из-за углей.', 'питание.txt, строки 219-236', 2);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Диет-брейк: описание исходного гайда', 'питание и восстановление', 'диет брейк поддержка калорий плато', '🍴ДИЕТ-БРЕЙК

👀На долгосрочной сушке включается метаболическая адаптация, тело экономит энергия и вследствие этого жир уходит хуже. По итогу ты з#ебываешься и ловишь плато.

🫂Зачем он тебе?

• Если ты долго сушишься и стоишь в плато. Диет-брейк восстановит твой обмен веществ, повысит уровень энергии, поможет дальше терять жир и снизит стресс.

🗣Как правильно делать диет брейк?

• Смотри, ты выходишь на недельную поддержку калорий, при этом держишь белок высоким, жиры и угли возвращаешь в норму.⚠️Самое главное не обжирайся, ешь на поддержке, а не всё подряд.(это будет откат).

❌Если ты только начал сушку и дефицит небольшой - тебе диет-брейк не нужен.', 'питание.txt, строки 237-250', 2);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Активность и восстановление: исходный гайд', 'восстановление', 'метаболизм шаги NEAT сон кардио', 'Как не замедлить метаболизм.☠️

🍴Скажу сразу, полностью не замедлить метаболизм на сушке не выйдет, но можно уменьшить это замедление, чтобы в дальнейшем вес не застаивался на одном месте.

• Кушай белок,он защитит твои мышцы и увеличит расход калорий за счёт термического индекса.

• Не делай слишком много кардио,делай умеренно 2-3 раза в неделю.(лучше просто увеличь кол-во шагов в день)

• Делай силовые тренировки, без нагрузки на мышцы, тело решит, что они тебе больше не нужны. Тело сжигает мышцы - метаболизм падает.

• Следи за сном (спи по 7-9ч),когда мы не высыпаемся у нас повышается гормон голода(грелин) и понижается лептин(гормон сытости).

• Следи за NEAT(скрытый фактор замедления метаболизма), на сушке ты: меньше двигаешься, больше сидишь. Начни ходить по 15к+ шагов в день.

• Делай рефиды (помогут психике и гормоналке).', 'питание.txt, строки 266-281', 4);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Сохранение мышц и NEAT: исходный гайд', 'тренировки и восстановление', 'мышцы силовые тренировки белок креатин NEAT стимуляторы', '💪КАК СОХРАНИТЬ МЫШЦЫ НА СУШКЕ?

🥩Кушаем белок,много белка:2-3гр белка на КГ тела.На переваривание белка тратится около 20-30% калорий, содержащихся в самом белке+белок подавляет аппетит за счет GLP-1.

🦵 Кушаем лейцин (BCAA)
Лейцин - аминокислота, которая напрямую активирует mTORC1 - главный переключатель синтеза мышечного белка.

🦾Тренировки:2-3 силовых тренировки с прогрессией нагрузой.

👀Делай умеренный дефицит(300-500ккал/день).

💊Добавки:
• Креатин 5г/день.

⚠️KAK PODNЯT NEAT?

🕑Ложись спать пораньше:
 • Ранний подъем синхронизирует циркадные ритмы, отптимизируя выброс кортизола и гормон роста,которые поддержат энергию и восстановление.

СТИМУЛЯТОРЫ:

- Кофеин ☕️
- Никотин 👾
- Йохимбин 🌱

Невзначай повышай активность:

• Каждый час-два, вствай и двигайся на 2-3 минуты. Так ты не дашь NEAT упасть до нуля.', 'питание.txt, строки 282-310', 3);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Кортизол: утверждения исходного гайда', 'восстановление', 'кортизол стресс сон восстановление', 'КОРТИЗОЛ☠️

👀Кортизол на сушке - это гормон, который регулирует энергетический обмен и отвечает за адаптацию организма к стрессу, на сушке он всегда держится высоким, ведь дефицит калорий - стресс для организма.

Что он делает?

• Повышает уровень глюкозы в крови и усиливает распад белков,а также даёт тебе энергию в условиях дефицита.

• Кортизол расщепляет жир,но мобилизованные жирные кислоты не сгорают, а реэстерифицируются обратно в жировые клетки, при условии высокого кортизола жирные кислоты направляются в печень, вызывая стеатоз из за чего и происходит мышечная и печёночная инсулинорезистентность.

• При повышенном кортизоле растет аппетит, у тебя растет тяга к быстрым углеводам,так сложнее держать дефицит.

• Также из за кортизола может происходить потеря мышцы, снижение теста (при хроническом стрессе), задержка воды(влияет на электролиты).

Как фиксить?🦾

👾Спи по 7-9 часов, так ты нормализуешь гормональный фон, делай рефиды и избегай перетрена.', 'питание.txt, строки 311-328', 2);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('HIIT: описание исходного гайда', 'кардио', 'hiit интервалы кардио спринт пульс', '🦾HIIT (ИНТЕНСИВНОЕ КАРДИО).

HIIT - это короткие взрывные интервалы нагрузок, если по простому - максимум усилий за короткое время.HIIT≠лучше для жиросжигания, просто экономно по времени.

😉Рекомендую иногда делать интенсивное кардио за место шагов,т.к это увеличивает расход калорий за КОРОТКИЙ промежуток времени, улучшает жиро сжигание после тренировки и самое главнок экономит время.

- Интервалы высокой активности = жоский стресс,активация симпатической нервной системы, вследствие чего усиливается липолиз (расщепление жиров) из-за выброса адреналина.

⚠️Если ты будешь делать HIIT каждый день ты получишь перетрен:

- HIIT - высокий стресс, поэтому легко переборщить. Переборщишь - вырастет кортизол, ухудшится восстановление и ты потеряешь мышцы —> плато.

🤌Как делать правильно?

Делай по 20 минут 2-3 раза в неделю максимум. Работаем:20-30с спринт, после минута отдыха. Ключевое: держи пульс в районе,220-возраст•0.6, при высоком пульсе сжигаем гликоген вместо жира.', 'питание.txt, строки 329-344', 4);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Желчный пузырь и препараты: опасные медицинские советы в исходном гайде', 'медицинские утверждения', 'желчный урсосан удхк магний жиры препарат', '⚠️ЖЕЛЧНЫЙ ПУЗЫРЬ⚠️

👀Смотри,если ты сушишься на большом дефиците,то у тебя есть шансы получить застой желчи.

Почему так происходит?

Желчный - это этакий резервуар. Есть жир - он сокращается - выбрасывает желчь, если же жиров мало - желчь стоит и густеет —> идёт перенасыщение холестерином и образование камне.

🗣По статистике каждый 4-й на ХАРДсушке без жиров ловит проблемы с желчным. Режешь калории в ноль - ты рискуешь.

Хочешь сушиться на высоком дефиците? Лови как фиксить:

- Пей урсосан (УДХК) 600-1200мг/д.
- Делай рефиды с жирами: 1-2 раза в неделю добавляй 30-50г жиров (лосось, яйца, оливковое масло, авокадо).
- Пей магний.
- Не режь жиры в НОЛЬ(0.5/0.8г на кг).', 'питание.txt, строки 345-361', 1);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Белок и чувство насыщения: утверждения исходного гайда', 'питание', 'белок насыщение ozempic glp1', '🥩 БЕЛОК - НАТУРАЛЬНЫЙ ОЗЕМПИК НА СУШКЕ.

Оземпик действует через гормон сытости (GLP-1), а белок влияет на организм иначе, но эффект похож.

🗣Белок - самый сытный макронутриент, он снижает гормон голода (грелир) дольше переваривается, вследствие этого меньше хочется есть.

🍴Почему нужно есть больше белка? Большое кол-во белка помогает держать дефицит калорий почти так же, как препараты, которые подавляют аппетит.

🌱Белок замедляет усвоение углей, следовательно меньше скачков инсулина - меньше срывов (легче не переесть) —> меньше тяга к перекусам.

⚠️Белок в большом количестве сохраняет мышцы при дефиците, организм не будет так сильно их кушать. Плюсом белка является его термический эффект (то сколько организм тратит на переваривание) выше (20-30%), то есть если ты съешь 100ккл белка, организм потратит на его переваривание 30ккл.', 'питание.txt, строки 362-373', 3);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Частые перекусы: исходный гайд', 'питание', 'перекусы голод грелин клетчатка приемы пищи', 'УБИРАЕМ ЧАСТЫЕ ПЕРЕКУСЫ.

👀Смотри, тут нужна система, нет системы = постоянные перекусы. Ты перекусываешь потому, что ешь мало клетчатки, мало белка, часто срываешься на сладкое из-за чего происходят резки скачки сахара, возможно у тебя хаотичный режим питания.

⚠️Перекусы напрямую связаны с грелином и дисбалансом GLP-1.

💊 Почему так происходит?

• При высоком кортизоле у тебя повышается желание кушать, тяга к жирному и сладкому, вследствие этого повышается уровень глюкозы в крови, и ты чаще срываешься на перекусы.

🔨 Как фиксить?

- Белок и клетчатка повышают GLP-1 и значительно понижают гормон голода ( грелин ) + стабилизируют глюкозу, ты меньше хочешь
перекусывать.

- Нормализуй приемы пищи, ешь 2-3 раза в день по времени. Кушай белок в каждом приеме пищи, ешь клетчатку (она даст еще большее насыщение). Не ешь быстрые углеводы, перейди на сложные (гречка,рис…).

- Перестань таскать куски, когда очень много раз откусываешь по одному кусочку от еду, дабы попробовать, так ты копишь калории.', 'питание.txt, строки 374-392', 4);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Клетчатка: исходный гайд', 'питание', 'клетчатка насыщение пищеварение', '🤯КЛЕТЧАТКА НА СУШКЕ.

🍴Клетчатка имба! - Добавляй её в пищу, вкуса она как такого не имеет, но в свою очередь круто насыщает.Также клетчатка уберет довольно частую проблему на сушке - плохой стул.🪑', 'питание.txt, строки 393-396', 4);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Водно-солевой баланс: утверждения исходного гайда', 'гидратация', 'вода соль водный баланс отеки', 'ВОДНО-СОЛЕВОЙ БАЛАНС.

👾Водно-солевой баланс влияет на один из самых важных процессов организма для сушки - липолиз (сжигание жира).

🍴Да, вода участвует в расщеплении жиров, пьешь мало воды - липолиз работает хуже, хуже уходят отёки с лица. Также вода улучшает транспорт жирных кислот и поддерживает нормальный обмен веществ.

🤌Просто пей 2-2.5л воды в день (можно больше), так ты ускоришь свою сушку и в целом улучшишь состояние организма.

• БОНУСЫ:

- Вода заполняет желудок тем самым снижает чувство голода.

- Увеличивает расход калорий, когда ты пьешь воды организм тратит энергию на её нагрев.', 'питание.txt, строки 397-410', 2);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Электролиты: утверждения исходного гайда', 'гидратация', 'электролиты натрий магний калий вода', 'ЭЛЕКТРОЛИТЫ.

🦾Электролиты напрямую влияют на то, как ты сжигаешь жир. Электролиты - это натрий, магний, калий.

👾Электролиты поддерживают водный баланс, (без воды липолиз плохо работает) участвуют у передаче нервных импульсов, влияют на мышечные сокращения и в итоге ты тратишь больше энергии.

👀При дисбалансе электролитов кортизол растет, вследствие этого  хуже жиросжигание.

🌱При нехватке электролитов у тебя падает сила, быстрее устаешь (выносливость падает).

🍴При недостатке натрия (он задерживает воду), ухудшается транспорт нутриентов, вследствие чего метаболизм хуже работает.

Как поддерживать баланс электролитов?

• Иногда подсаливай еду (поддержишь содержание натрия ), кушай фасоль , добавляй немного банана в пищу. Простой способ: купи бады с электролитами.', 'питание.txt, строки 411-426', 3);
INSERT OR IGNORE INTO fitness_knowledge (title, category, keywords, content, source_name, priority) VALUES ('Стимуляторы: опасные рекомендации исходного гайда', 'медицинские утверждения', 'стимуляторы кофеин никотин йохимбин', 'СТИМУЛЯТОРЫ💊 

👀Мало энергии? Больше стал уставать? Тебе нужна помощь стимуляторов.

☠️Скажу сразу, стимулятор≠жиросжигатель, он помогает работать на самой сушке.

СТИМУЛЯТОРЫ:

• Кофеин☕️ 
• Никотин👾
• Йохимбин🌱

⚠️Не бери всё сразу и не увеличивай дозировки. Если переборщишь,то вырастет кортизол, ухудшится сон, перегрузится ЦНС, ухудшишь жиросжигание и вызовешь привыкание.', 'питание.txt, строки 427-440', 1);
INSERT OR IGNORE INTO workout_programs (program_id, name, source_name) VALUES ('bb_loyalty_2_0', 'ББ Loyalty 2.0', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Понедельник', 1, 1, 'Жим (гантели)', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Понедельник', 1, 2, 'сведение рук в кроссовере вниз', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Понедельник', 1, 3, 'тяга вертикального блока', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Понедельник', 1, 4, 'тяга штанги в наклоне', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Понедельник', 1, 5, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Среда', 3, 6, 'присед со штангой', 'тяжелая', '3 х 8', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Среда', 3, 7, 'румынская тяга', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Среда', 3, 8, 'разгибание ног', 'тяжелая', '3 х 12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Среда', 3, 9, 'сгибание ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Среда', 3, 10, 'разведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Среда', 3, 11, 'сведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Среда', 3, 12, 'икры', 'тяжелая', '3 х 15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Пятница', 5, 13, 'жим в кроссовере 45 градусов', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Пятница', 5, 14, 'сведение рук в кроссовере вверх', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Пятница', 5, 15, 'тяга горизонтального блока', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Пятница', 5, 16, 'тяга Т-грифа', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Пятница', 5, 17, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Суббота', 6, 18, 'сгибание на бицепс супинацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Суббота', 6, 19, 'сгибание на бицепс с пронацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 1, 'Суббота', 6, 20, 'французкий жим в блоке из-за головы', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Понедельник', 1, 21, 'Жим (гантели)', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Понедельник', 1, 22, 'сведение рук в кроссовере вниз', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Понедельник', 1, 23, 'тяга вертикального блока', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Понедельник', 1, 24, 'тяга штанги в наклоне', 'средняя', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Понедельник', 1, 25, 'отведения на дельты', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Среда', 3, 26, 'присед со штангой', 'средняя', '3 х 8', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Среда', 3, 27, 'румынская тяга', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Среда', 3, 28, 'разгибание ног', 'средняя', '3 х 12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Среда', 3, 29, 'сгибание ног', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Среда', 3, 30, 'разведение ног', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Среда', 3, 31, 'сведение ног', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Среда', 3, 32, 'икры', 'тяжелая', '3 х 15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Пятница', 5, 33, 'жим в кроссовере 45 градусов', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Пятница', 5, 34, 'сведение рук в кроссовере вверх', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Пятница', 5, 35, 'тяга горизонтального блока', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Пятница', 5, 36, 'тяга Т-грифа', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Пятница', 5, 37, 'отведения на дельты', 'тяжелая', '4 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Суббота', 6, 38, 'сгибание на бицепс с ez грифом снизу', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Суббота', 6, 39, 'сгибание на бицепс с ez грифом сверху', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 2, 'Суббота', 6, 40, 'французкий жим в блоке из-за головы', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Понедельник', 1, 41, 'Жим (гантели)', 'средняя', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Понедельник', 1, 42, 'сведение рук в кроссовере вниз', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Понедельник', 1, 43, 'тяга вертикального блока', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Понедельник', 1, 44, 'тяга штанги в наклоне', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Понедельник', 1, 45, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Среда', 3, 46, 'присед со штангой', 'тяжелая', '5 х 8', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Среда', 3, 47, 'румынская тяга', 'средняя', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Среда', 3, 48, 'разгибание ног', 'тяжелая', '4 х 12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Среда', 3, 49, 'сгибание ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Среда', 3, 50, 'разведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Среда', 3, 51, 'сведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Среда', 3, 52, 'икры', 'тяжелая', '3 х 15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Пятница', 5, 53, 'жим в кроссовере 45 градусов', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Пятница', 5, 54, 'сведение рук в кроссовере вверх', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Пятница', 5, 55, 'тяга горизонтального блока', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Пятница', 5, 56, 'тяга Т-грифа', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Пятница', 5, 57, 'отведения на дельты', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Суббота', 6, 58, 'сгибание на бицепс супинацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Суббота', 6, 59, 'сгибание на бицепс с пронацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 3, 'Суббота', 6, 60, 'французкий жим в блоке из-за головы', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Понедельник', 1, 61, 'Жим (гантели)', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Понедельник', 1, 62, 'сведение рук в кроссовере вниз', 'тяжелая', '4 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Понедельник', 1, 63, 'тяга вертикального блока', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Понедельник', 1, 64, 'тяга штанги в наклоне', 'средняя', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Понедельник', 1, 65, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Среда', 3, 66, 'присед со штангой', 'средняя', '4 х 8', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Среда', 3, 67, 'румынская тяга', 'тяжелая', '5 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Среда', 3, 68, 'разгибание ног', 'средняя', '3 х 12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Среда', 3, 69, 'сгибание ног', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Среда', 3, 70, 'разведение ног', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Среда', 3, 71, 'сведение ног', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Среда', 3, 72, 'икры', 'средняя', '3 х 15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Пятница', 5, 73, 'жим в кроссовере 45 градусов', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Пятница', 5, 74, 'сведение рук в кроссовере вверх', 'тяжелая', '4 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Пятница', 5, 75, 'тяга горизонтального блока', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Пятница', 5, 76, 'тяга Т-грифа', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Пятница', 5, 77, 'отведения на дельты', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Суббота', 6, 78, 'сгибание на бицепс с ez грифом снизу', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Суббота', 6, 79, 'сгибание на бицепс с ez грифом сверху', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 4, 'Суббота', 6, 80, 'французкий жим в блоке из-за головы', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Понедельник', 1, 81, 'Жим (гантели)', 'тяжелая', '5 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Понедельник', 1, 82, 'сведение рук в кроссовере вниз', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Понедельник', 1, 83, 'тяга вертикального блока', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Понедельник', 1, 84, 'тяга штанги в наклоне', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Понедельник', 1, 85, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Среда', 3, 86, 'присед со штангой', 'тяжелая', '4 х 8', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Среда', 3, 87, 'румынская тяга', 'средняя', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Среда', 3, 88, 'разгибание ног', 'тяжелая', '4 х 12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Среда', 3, 89, 'сгибание ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Среда', 3, 90, 'разведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Среда', 3, 91, 'сведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Среда', 3, 92, 'икры', 'тяжелая', '3 х 15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Пятница', 5, 93, 'жим в кроссовере 45 градусов', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Пятница', 5, 94, 'сведение рук в кроссовере вверх', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Пятница', 5, 95, 'тяга горизонтального блока', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Пятница', 5, 96, 'тяга Т-грифа', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Пятница', 5, 97, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Суббота', 6, 98, 'сгибание на бицепс супинацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Суббота', 6, 99, 'сгибание на бицепс с пронацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 5, 'Суббота', 6, 100, 'французкий жим в блоке из-за головы', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Понедельник', 1, 101, 'Жим (гантели)', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Понедельник', 1, 102, 'сведение рук в кроссовере вниз', 'тяжелая', '4 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Понедельник', 1, 103, 'тяга вертикального блока', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Понедельник', 1, 104, 'тяга штанги в наклоне', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Понедельник', 1, 105, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Среда', 3, 106, 'присед со штангой', 'средняя', '4 х 8', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Среда', 3, 107, 'румынская тяга', 'тяжелая', '5 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Среда', 3, 108, 'разгибание ног', 'средняя', '3 х 12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Среда', 3, 109, 'сгибание ног', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Среда', 3, 110, 'разведение ног', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Среда', 3, 111, 'сведение ног', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Среда', 3, 112, 'икры', 'средняя', '3 х 15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Пятница', 5, 113, 'жим в кроссовере 45 градусов', 'тяжелая', '5 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Пятница', 5, 114, 'сведение рук в кроссовере вверх', 'тяжелая', '4 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Пятница', 5, 115, 'тяга горизонтального блока', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Пятница', 5, 116, 'тяга Т-грифа', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Пятница', 5, 117, 'отведения на дельты', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Суббота', 6, 118, 'сгибание на бицепс с ez грифом снизу', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Суббота', 6, 119, 'сгибание на бицепс с ez грифом сверху', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 6, 'Суббота', 6, 120, 'французкий жим в блоке из-за головы', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Понедельник', 1, 121, 'Жим (гантели)', 'тяжелая', '5 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Понедельник', 1, 122, 'сведение рук в кроссовере вниз', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Понедельник', 1, 123, 'тяга вертикального блока', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Понедельник', 1, 124, 'тяга штанги в наклоне', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Понедельник', 1, 125, 'отведения на дельты', 'тяжелая', '4 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Среда', 3, 126, 'присед со штангой', 'тяжелая', '5 х 8', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Среда', 3, 127, 'румынская тяга', 'средняя', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Среда', 3, 128, 'разгибание ног', 'тяжелая', '4 х 12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Среда', 3, 129, 'сгибание ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Среда', 3, 130, 'разведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Среда', 3, 131, 'сведение ног', 'средняя', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Среда', 3, 132, 'икры', 'тяжелая', '3 х 15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Пятница', 5, 133, 'жим в кроссовере 45 градусов', 'средняя', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Пятница', 5, 134, 'сведение рук в кроссовере вверх', 'средняя', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Пятница', 5, 135, 'тяга горизонтального блока', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Пятница', 5, 136, 'тяга Т-грифа', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Пятница', 5, 137, 'отведения на дельты', 'тяжелая', '3 х 12-15', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Суббота', 6, 138, 'сгибание на бицепс супинацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Суббота', 6, 139, 'сгибание на бицепс с пронацией', 'тяжелая', '3 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty_2_0', 7, 'Суббота', 6, 140, 'французкий жим в блоке из-за головы', 'тяжелая', '4 х 8-12', 'ББ loyalty 2.0 (1).xlsx');
INSERT OR IGNORE INTO workout_programs (program_id, name, source_name) VALUES ('bb_loyalty', 'ББ Loyalty', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Понедельник', 1, 1, 'жим лежа(гантели)', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Понедельник', 1, 2, 'бабочка на грудь', 'средняя', '2х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Понедельник', 1, 3, 'свидение рук в кроссовере вниз', 'средняя', '2х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Понедельник', 1, 4, 'тяга вертикального блока', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Понедельник', 1, 5, 'тяга Т-грифа', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Понедельник', 1, 6, 'пуловер в блоке', 'средняя', '2х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Среда', 3, 7, 'присед со штангой', 'тяжелая', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Среда', 3, 8, 'румынская тяга', 'средняя', '3х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Среда', 3, 9, 'разгибание ног', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Среда', 3, 10, 'сгибание ног', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Среда', 3, 11, 'свидение ног в тренажере', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Среда', 3, 12, 'икры', 'тяжелая', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Пятница', 5, 13, 'жим лежа 30градусов', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Пятница', 5, 14, 'жим от груди сидя', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Пятница', 5, 15, 'свидение рук в кроссовере вверх', 'средняя', '2х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Пятница', 5, 16, 'тяга горизонтального блока', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Пятница', 5, 17, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Пятница', 5, 18, 'вертикальная тяга', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Суббота', 6, 19, 'сгибание на бицепс с субпинацией', 'средняя', '3х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Суббота', 6, 20, 'сгибание на бицепс лежа 45градусов', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Суббота', 6, 21, 'французский жим лежа', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Суббота', 6, 22, 'разгибание с косичкой', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 1, 'Суббота', 6, 23, 'отведение на дельты', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Понедельник', 1, 24, 'жим лежа(гантели)', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Понедельник', 1, 25, 'бабочка на грудь', 'тяжелая', '2х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Понедельник', 1, 26, 'свидение рук в кроссовере вниз', 'средняя', '2х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Понедельник', 1, 27, 'тяга вертикального блока', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Понедельник', 1, 28, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Понедельник', 1, 29, 'пуловер в блоке', 'средняя', '2х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Среда', 3, 30, 'присед со штангой', 'средняя', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Среда', 3, 31, 'румынская тяга', 'тяжелая', '3х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Среда', 3, 32, 'разгибание ног', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Среда', 3, 33, 'сгибание ног', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Среда', 3, 34, 'свидение ног в тренажере', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Среда', 3, 35, 'икры', 'средняя', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Пятница', 5, 36, 'жим лежа 30градусов', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Пятница', 5, 37, 'жим от груди сидя', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Пятница', 5, 38, 'свидение рук в кроссовере вверх', 'тяжелая', '2х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Пятница', 5, 39, 'тяга горизонтального блока', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Пятница', 5, 40, 'тяга Т-грифа', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Пятница', 5, 41, 'вертикальная тяга', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Суббота', 6, 42, 'сгибание на бицепс с субпинацией', 'тяжелая', '3х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Суббота', 6, 43, 'сгибание на бицепс лежа 45градусов', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Суббота', 6, 44, 'французский жим лежа', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Суббота', 6, 45, 'разгибание с косичкой', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 2, 'Суббота', 6, 46, 'отведение на дельты', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Понедельник', 1, 47, 'жим лежа(гантели)', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Понедельник', 1, 48, 'бабочка на грудь', 'средняя', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Понедельник', 1, 49, 'свидение рук в кроссовере вниз', 'тяжелая', '2х12-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Понедельник', 1, 50, 'тяга вертикального блока', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Понедельник', 1, 51, 'тяга Т-грифа', 'тяжелая', '3х12-6-4 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Понедельник', 1, 52, 'пуловер в блоке', 'средняя', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Среда', 3, 53, 'присед со штангой', 'тяжелая', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Среда', 3, 54, 'румынская тяга', 'средняя', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Среда', 3, 55, 'разгибание ног', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Среда', 3, 56, 'сгибание ног', 'средняя', '4х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Среда', 3, 57, 'свидение ног в тренажере', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Среда', 3, 58, 'икры', 'тяжелая', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Пятница', 5, 59, 'жим лежа 30градусов', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Пятница', 5, 60, 'жим от груди сидя', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Пятница', 5, 61, 'свидение рук в кроссовере вверх', 'тяжелая', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Пятница', 5, 62, 'тяга горизонтального блока', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Пятница', 5, 63, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Пятница', 5, 64, 'вертикальная тяга', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Суббота', 6, 65, 'сгибание на бицепс с субпинацией', 'средняя', '3х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Суббота', 6, 66, 'сгибание на бицепс лежа 45градусов', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Суббота', 6, 67, 'французский жим лежа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Суббота', 6, 68, 'разгибание с косичкой', 'тяжелая', '3х12-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 3, 'Суббота', 6, 69, 'отведение на дельты', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Понедельник', 1, 70, 'жим лежа(гантели)', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Понедельник', 1, 71, 'бабочка на грудь', 'тяжелая', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Понедельник', 1, 72, 'свидение рук в кроссовере вниз', 'средняя', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Понедельник', 1, 73, 'тяга вертикального блока', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Понедельник', 1, 74, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Понедельник', 1, 75, 'пуловер в блоке', 'тяжелая', '2х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Среда', 3, 76, 'присед со штангой', 'средняя', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Среда', 3, 77, 'румынская тяга', 'тяжелая', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Среда', 3, 78, 'разгибание ног', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Среда', 3, 79, 'сгибание ног', 'тяжелая', '4х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Среда', 3, 80, 'свидение ног в тренажере', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Среда', 3, 81, 'икры', 'средняя', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Пятница', 5, 82, 'жим лежа 30градусов', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Пятница', 5, 83, 'жим от груди сидя', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Пятница', 5, 84, 'свидение рук в кроссовере вверх', 'средняя', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Пятница', 5, 85, 'тяга горизонтального блока', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Пятница', 5, 86, 'тяга Т-грифа', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Пятница', 5, 87, 'вертикальная тяга', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Суббота', 6, 88, 'сгибание на бицепс с субпинацией', 'тяжелая', '3х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Суббота', 6, 89, 'сгибание на бицепс лежа 45градусов', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Суббота', 6, 90, 'французский жим лежа', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Суббота', 6, 91, 'разгибание с косичкой', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 4, 'Суббота', 6, 92, 'отведение на дельты', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Понедельник', 1, 93, 'жим лежа(гантели)', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Понедельник', 1, 94, 'бабочка на грудь', 'средняя', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Понедельник', 1, 95, 'свидение рук в кроссовере вниз', 'тяжелая', '3х12-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Понедельник', 1, 96, 'тяга вертикального блока', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Понедельник', 1, 97, 'тяга Т-грифа', 'тяжелая', '3х12-6-4 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Понедельник', 1, 98, 'пуловер в блоке', 'средняя', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Среда', 3, 99, 'присед со штангой', 'тяжелая', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Среда', 3, 100, 'румынская тяга', 'средняя', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Среда', 3, 101, 'разгибание ног', 'тяжелая', '3х8-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Среда', 3, 102, 'сгибание ног', 'средняя', '4х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Среда', 3, 103, 'свидение ног в тренажере', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Среда', 3, 104, 'икры', 'тяжелая', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Пятница', 5, 105, 'жим лежа 30градусов', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Пятница', 5, 106, 'жим от груди сидя', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Пятница', 5, 107, 'свидение рук в кроссовере вверх', 'тяжелая', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Пятница', 5, 108, 'тяга горизонтального блока', 'средняя', '3х12-6-4 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Пятница', 5, 109, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Пятница', 5, 110, 'вертикальная тяга', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Суббота', 6, 111, 'сгибание на бицепс с субпинацией', 'средняя', '3х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Суббота', 6, 112, 'сгибание на бицепс лежа 45градусов', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Суббота', 6, 113, 'французский жим лежа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Суббота', 6, 114, 'разгибание с косичкой', 'тяжелая', '3х12-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 5, 'Суббота', 6, 115, 'отведение на дельты', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Понедельник', 1, 116, 'жим лежа(гантели)', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Понедельник', 1, 117, 'бабочка на грудь', 'тяжелая', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Понедельник', 1, 118, 'свидение рук в кроссовере вниз', 'средняя', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Понедельник', 1, 119, 'тяга вертикального блока', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Понедельник', 1, 120, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Понедельник', 1, 121, 'пуловер в блоке', 'тяжелая', '2х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Среда', 3, 122, 'присед со штангой', 'средняя', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Среда', 3, 123, 'румынская тяга', 'тяжелая', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Среда', 3, 124, 'разгибание ног', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Среда', 3, 125, 'сгибание ног', 'тяжелая', '4х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Среда', 3, 126, 'свидение ног в тренажере', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Среда', 3, 127, 'икры', 'средняя', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Пятница', 5, 128, 'жим лежа 30градусов', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Пятница', 5, 129, 'жим от груди сидя', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Пятница', 5, 130, 'свидение рук в кроссовере вверх', 'средняя', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Пятница', 5, 131, 'тяга горизонтального блока', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Пятница', 5, 132, 'тяга Т-грифа', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Пятница', 5, 133, 'вертикальная тяга', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Суббота', 6, 134, 'сгибание на бицепс с субпинацией', 'тяжелая', '3х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Суббота', 6, 135, 'сгибание на бицепс лежа 45градусов', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Суббота', 6, 136, 'французский жим лежа', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Суббота', 6, 137, 'разгибание с косичкой', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 6, 'Суббота', 6, 138, 'отведение на дельты', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Понедельник', 1, 139, 'жим лежа(гантели)', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Понедельник', 1, 140, 'бабочка на грудь', 'средняя', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Понедельник', 1, 141, 'свидение рук в кроссовере вниз', 'тяжелая', '4х12-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Понедельник', 1, 142, 'тяга вертикального блока', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Понедельник', 1, 143, 'тяга Т-грифа', 'тяжелая', '3х12-6-4 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Понедельник', 1, 144, 'пуловер в блоке', 'средняя', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Среда', 3, 145, 'присед со штангой', 'средняя', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Среда', 3, 146, 'румынская тяга', 'тяжелая', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Среда', 3, 147, 'разгибание ног', 'средняя', '3х8-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Среда', 3, 148, 'сгибание ног', 'тяжелая', '4х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Среда', 3, 149, 'свидение ног в тренажере', 'средняя', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Среда', 3, 150, 'икры', 'тяжелая', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Пятница', 5, 151, 'жим лежа 30градусов', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Пятница', 5, 152, 'жим от груди сидя', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Пятница', 5, 153, 'свидение рук в кроссовере вверх', 'средняя', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Пятница', 5, 154, 'тяга горизонтального блока', 'средняя', '4х12-6-4 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Пятница', 5, 155, 'тяга Т-грифа', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Пятница', 5, 156, 'вертикальная тяга', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Суббота', 6, 157, 'сгибание на бицепс с субпинацией', 'средняя', '4х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Суббота', 6, 158, 'сгибание на бицепс лежа 45градусов', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Суббота', 6, 159, 'французский жим лежа', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Суббота', 6, 160, 'разгибание с косичкой', 'средняя', '3х12-6-6 дроп сет', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 7, 'Суббота', 6, 161, 'отведение на дельты', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Понедельник', 1, 162, 'жим лежа(гантели)', 'средняя', '5х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Понедельник', 1, 163, 'бабочка на грудь', 'тяжелая', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Понедельник', 1, 164, 'свидение рук в кроссовере вниз', 'тяжелая', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Понедельник', 1, 165, 'тяга вертикального блока', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Понедельник', 1, 166, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Понедельник', 1, 167, 'пуловер в блоке', 'тяжелая', '3х12-15', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Среда', 3, 168, 'присед со штангой', 'тяжелая', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Среда', 3, 169, 'румынская тяга', 'средняя', '4х6-8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Среда', 3, 170, 'разгибание ног', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Среда', 3, 171, 'сгибание ног', 'средняя', '4х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Среда', 3, 172, 'свидение ног в тренажере', 'тяжелая', '3х8-10', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Среда', 3, 173, 'икры', 'тяжелая', '3х40-60', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Пятница', 5, 174, 'жим лежа 30градусов', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Пятница', 5, 175, 'жим от груди сидя', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Пятница', 5, 176, 'свидение рук в кроссовере вверх', 'средняя', '3х10-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Пятница', 5, 177, 'тяга горизонтального блока', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Пятница', 5, 178, 'тяга Т-грифа', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Пятница', 5, 179, 'вертикальная тяга', 'тяжелая', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Суббота', 6, 180, 'сгибание на бицепс с субпинацией', 'тяжелая', '3х8', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Суббота', 6, 181, 'сгибание на бицепс лежа 45градусов', 'средняя', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Суббота', 6, 182, 'французский жим лежа', 'средняя', '4х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Суббота', 6, 183, 'разгибание с косичкой', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
INSERT OR IGNORE INTO workout_exercises (program_id, week_no, day_name, day_order, exercise_order, exercise_name, intensity, sets_reps, source_name) VALUES ('bb_loyalty', 8, 'Суббота', 6, 184, 'отведение на дельты', 'тяжелая', '3х8-12', 'ББ loyalty (1).xlsx');
