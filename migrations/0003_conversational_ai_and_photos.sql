-- Add persistent onboarding, coaching preferences and conversation memory.
ALTER TABLE users ADD COLUMN goal_details TEXT;
ALTER TABLE users ADD COLUMN activity_level TEXT;
ALTER TABLE users ADD COLUMN weekly_schedule TEXT;
ALTER TABLE users ADD COLUMN current_program TEXT;
ALTER TABLE users ADD COLUMN current_week INTEGER;
ALTER TABLE users ADD COLUMN food_preferences TEXT;
ALTER TABLE users ADD COLUMN food_allergies TEXT;
ALTER TABLE users ADD COLUMN food_availability TEXT;
ALTER TABLE users ADD COLUMN sleep_schedule TEXT;
ALTER TABLE users ADD COLUMN coaching_style TEXT;
ALTER TABLE users ADD COLUMN memory_summary TEXT;
ALTER TABLE users ADD COLUMN onboarding_status TEXT NOT NULL DEFAULT 'in_progress';

ALTER TABLE messages ADD COLUMN has_image INTEGER NOT NULL DEFAULT 0;

-- Image files are forwarded to the configured AI provider and are never stored in D1.
-- Only metadata is kept so the conversation history can show that an image was sent.
CREATE TABLE IF NOT EXISTS photo_uploads (
  photo_id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  message_id TEXT NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE,
  mime_type TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_photo_uploads_user_created ON photo_uploads(user_id, created_at);
