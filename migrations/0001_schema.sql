-- Fitness Boss: Cloudflare D1 schema
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY,
  name TEXT,
  age INTEGER,
  height_cm REAL,
  weight_kg REAL,
  goal TEXT,
  experience TEXT,
  equipment TEXT,
  restrictions TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  message_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS daily_checkins (
  checkin_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  checkin_date TEXT NOT NULL,
  sleep_hours REAL,
  steps INTEGER,
  energy INTEGER CHECK (energy BETWEEN 1 AND 5),
  notes TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS meal_logs (
  meal_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  eaten_at TEXT NOT NULL,
  meal_type TEXT,
  description TEXT NOT NULL,
  hunger_before INTEGER CHECK (hunger_before BETWEEN 1 AND 5),
  fullness_after INTEGER CHECK (fullness_after BETWEEN 1 AND 5),
  water_ml INTEGER,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS workout_programs (
  program_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  source_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workout_exercises (
  exercise_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_id TEXT NOT NULL REFERENCES workout_programs(program_id) ON DELETE CASCADE,
  week_no INTEGER NOT NULL,
  day_name TEXT NOT NULL,
  day_order INTEGER NOT NULL,
  exercise_order INTEGER NOT NULL,
  exercise_name TEXT NOT NULL,
  intensity TEXT,
  sets_reps TEXT,
  source_name TEXT NOT NULL,
  UNIQUE(program_id, week_no, day_name, exercise_order)
);

CREATE TABLE IF NOT EXISTS workout_logs (
  log_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  program_id TEXT REFERENCES workout_programs(program_id),
  week_no INTEGER,
  day_name TEXT,
  exercise_name TEXT NOT NULL,
  sets_done INTEGER,
  reps_done INTEGER,
  load_kg REAL,
  rpe REAL,
  notes TEXT,
  completed_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fitness_knowledge (
  knowledge_id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  keywords TEXT NOT NULL,
  content TEXT NOT NULL,
  source_name TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 0,
  UNIQUE(title, source_name)
);

CREATE INDEX IF NOT EXISTS idx_messages_user_created ON messages(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_checkins_user_date ON daily_checkins(user_id, checkin_date);
CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meal_logs(user_id, eaten_at);
CREATE INDEX IF NOT EXISTS idx_workout_logs_user_date ON workout_logs(user_id, completed_at);
CREATE INDEX IF NOT EXISTS idx_workout_lookup ON workout_exercises(program_id, week_no, day_order, exercise_order);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON fitness_knowledge(category, priority);
