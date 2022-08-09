create TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
   id SERIAL PRIMARY KEY,
   author_id INTEGER NOT NULL REFERENCES users(id),
   description TEXT,
   url TEXT NOT NULL ,
   created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  mentions INTEGER NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_use TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE hashtags_posts (
   id SERIAL PRIMARY KEY,
   hashtag_id INTEGER NOT NULL REFERENCES hashtags(id),
   post_id INTEGER NOT NULL REFERENCES posts(id)
);

CREATE TABLE likes (
   id SERIAL PRIMARY KEY,
   liker_id INTEGER NOT NULL REFERENCES users(id),
   post_id INTEGER NOT NULL REFERENCES posts(id)
);