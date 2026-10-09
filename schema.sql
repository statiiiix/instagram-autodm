-- Comment-to-DM bot storage (Cloudflare D1).

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

-- A rule sends `message` as a DM to anyone whose comment contains one of `keywords`.
-- It applies to every post when all_media = 1, otherwise to the posts listed in rule_media.
CREATE TABLE IF NOT EXISTS rules (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  keywords     TEXT    NOT NULL,            -- JSON array of strings
  message      TEXT    NOT NULL,
  public_reply TEXT,
  all_media    INTEGER NOT NULL DEFAULT 0,
  enabled      INTEGER NOT NULL DEFAULT 1,
  -- Follow gate: DM gate_message with a button first; send `message` only to followers.
  require_follow        INTEGER NOT NULL DEFAULT 0,
  gate_message          TEXT,
  not_following_message TEXT,
  button_label          TEXT,
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS rule_media (
  rule_id   INTEGER NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
  media_id  TEXT    NOT NULL,
  caption   TEXT,
  permalink TEXT,
  PRIMARY KEY (rule_id, media_id)
);
CREATE INDEX IF NOT EXISTS rule_media_by_media ON rule_media(media_id);

-- One row per (post, person, rule) so each person gets a rule's DM once per post.
CREATE TABLE IF NOT EXISTS sent (
  media_id   TEXT    NOT NULL,
  user_id    TEXT    NOT NULL,
  rule_id    INTEGER NOT NULL,
  comment_id TEXT    NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (media_id, user_id, rule_id)
);

-- People who got a follow-gate message and haven't received the link yet.
CREATE TABLE IF NOT EXISTS pending (
  user_id    TEXT    NOT NULL,
  rule_id    INTEGER NOT NULL,
  media_id   TEXT    NOT NULL,
  username   TEXT,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, rule_id, media_id)
);

CREATE TABLE IF NOT EXISTS activity (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  ts       INTEGER NOT NULL,
  level    TEXT    NOT NULL,
  media_id TEXT,
  text     TEXT    NOT NULL
);
