ALTER TABLE users ADD COLUMN deleted boolean;
UPDATE users SET deleted = false;
