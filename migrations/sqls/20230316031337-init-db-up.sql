CREATE TABLE "users" (
  "username" varchar PRIMARY KEY,
  "hashed_password" varchar,
  "oauth_provider" varchar,
  "oauth_id" varchar,
  "full_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password_change_at" timestamptz NOT NULL DEFAULT '00001-01-01 00:00:00Z',
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

ALTER TABLE users ADD CONSTRAINT oauth_or_password_not_null CHECK (
  (oauth_provider IS NOT NULL AND oauth_id IS NOT NULL AND hashed_password IS NULL) OR
  (oauth_provider IS NULL AND oauth_id IS NULL AND hashed_password IS NOT NULL)
);

