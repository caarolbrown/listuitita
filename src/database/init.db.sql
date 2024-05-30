CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE, 
    password VARCHAR(50) NOT NULL UNIQUE
);

CREATE TYPE movies_enum
AS
ENUM('action', 'comedy', 'drama', 'fantasy', 'horror', 'mystery', 'romance', 'thriller');

CREATE TABLE IF NOT EXISTS movies(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE, 
    genre movies_enum NOT NULL,
    score FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS tvShows(
    id SERIAL PRIMARY KEY, 
    tile VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS lists( 
    id SERIAL PRIMARY KEY,
    id_user INT, 
    title VARCHAR(255) NOT NULL,
	CONSTRAINT fk_user
		FOREIGN KEY(id_user)
			REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS lists_movies(
    id_list INT,
    id_movie INT,
	CONSTRAINT fk_list
		FOREIGN KEY(id_list)
			REFERENCES lists(id),
	CONSTRAINT fk_movie
		FOREIGN KEY(id_movie)
			REFERENCES movies(id),
    PRIMARY KEY(id_list, id_movie)
);

CREATE TABLE IF NOT EXISTS lists_tvShows(
    id_list INT,
    id_tvShow INT,
	CONSTRAINT fk_list
		FOREIGN KEY(id_list)
			REFERENCES lists(id),
	CONSTRAINT fk_tvShow
		FOREIGN KEY(id_tvShow)
			REFERENCES tvShows(id),
    PRIMARY KEY(id_list, id_tvShow)
);
