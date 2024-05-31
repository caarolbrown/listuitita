ALTER TABLE tvShows ADD COLUMN deleted boolean;
UPDATE tvShows SET deleted = false;
