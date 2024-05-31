ALTER TABLE movies ADD COLUMN deleted boolean;
UPDATE movies SET deleted = false;
