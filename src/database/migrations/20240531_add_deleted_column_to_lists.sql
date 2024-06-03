ALTER TABLE lists ADD COLUMN deleted boolean;
UPDATE lists SET deleted = false;
