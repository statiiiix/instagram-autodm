-- Adds the follow gate to a database created before it existed.
ALTER TABLE rules ADD COLUMN require_follow INTEGER NOT NULL DEFAULT 0;
ALTER TABLE rules ADD COLUMN gate_message TEXT;
ALTER TABLE rules ADD COLUMN not_following_message TEXT;
ALTER TABLE rules ADD COLUMN button_label TEXT;

CREATE TABLE IF NOT EXISTS pending (
  user_id    TEXT    NOT NULL,
  rule_id    INTEGER NOT NULL,
  media_id   TEXT    NOT NULL,
  username   TEXT,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, rule_id, media_id)
);
