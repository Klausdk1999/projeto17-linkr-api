create TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  picture_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
   id SERIAL PRIMARY KEY,
   author_id INTEGER NOT NULL REFERENCES users(id),
   url TEXT NOT NULL,
   description TEXT,
   created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  mentions INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_use TIMESTAMP NOT NULL DEFAULT NOW()
);

-- CREATE TABLE hashtags_posts (
--    id SERIAL PRIMARY KEY,
--    hashtag_id INTEGER NOT NULL REFERENCES hashtags(id),
--    post_id INTEGER NOT NULL REFERENCES posts(id)
-- );

CREATE TABLE hashtags_posts (
   id SERIAL PRIMARY KEY,
   hashtag_name VARCHAR(255) NOT NULL REFERENCES hashtags(name),
   post_id INTEGER NOT NULL REFERENCES posts(id)
);

CREATE TABLE previews_posts (
   id SERIAL PRIMARY KEY,
   preview_id VARCHAR(255) NOT NULL REFERENCES hashtags(name),
   post_id INTEGER NOT NULL REFERENCES posts(id)
);

CREATE TABLE previews(
   id SERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   url VARCHAR(255) NOT NULL,
   description TEXT NOT NULL,
   favicon TEXT NOT NULL
);

CREATE TABLE likes (
   id SERIAL PRIMARY KEY,
   liker_id INTEGER NOT NULL REFERENCES users(id),
   post_id INTEGER NOT NULL REFERENCES posts(id)
);

INSERT INTO users (username,email,password,picture_url) VALUES ('klausdk','klaus@email.com','123','https://i.pinimg.com/originals/17/a2/90/17a29000550b2d5fbe40efb58b2c8459.png'); 
INSERT INTO posts (author_id,description,url) VALUES ('1','Um link para nosso trello','https://trello.com/b/pQ4glQ7x/projet%C3%A3o-linkr');
INSERT INTO hashtags (name) VALUES ('Projeto');
--INSERT INTO hashtags_posts (hashtag_id,post_id) VALUES ('1','1');
INSERT INTO hashtags_posts (hashtag_name,post_id) VALUES ('React','1');
INSERT INTO hashtags_posts (hashtag_name,post_id) VALUES ('Projeto','1');
INSERT INTO hashtags_posts (hashtag_name,post_id) VALUES ('Postgres','1');
INSERT INTO likes (liker_id,post_id) VALUES ('1','1');

SELECT p.description,p.url,p.created_at,u.username,u.picture_url,ha.name FROM ((posts p JOIN users u ON p.author_id=u.id) JOIN hashtags_posts h ON h.post_id=p.id) JOIN hashtags ha ON h.hashtag_id=ha.id  ORDER BY p.created_at DESC LIMIT 20;
SELECT p.description,p.url,p.created_at,u.username,u.picture_url FROM posts p JOIN users u ON p.author_id=u.id ORDER BY p.created_at DESC LIMIT 20;

SELECT u.username,u.picture_url,p.description,p.url,p.created_at,list.hashtags
FROM (posts p 
JOIN (SELECT hp.post_id, string_agg(h.name,',') as hashtags FROM hashtags_posts hp JOIN hashtags h ON h.id = hp.hashtag_id GROUP BY hp.post_id) as list
ON list.post_id=p.id) 
JOIN users u ON p.author_id=u.id 
ORDER BY p.created_at DESC LIMIT 20;

SELECT u.username,u.picture_url,p.description,p.url,p.created_at,list.hashtags, likes.likes
FROM ((posts p 
LEFT JOIN (SELECT hp.post_id, string_agg(h.name,', ') as hashtags FROM hashtags_posts hp LEFT JOIN hashtags h ON h.id = hp.hashtag_id GROUP BY hp.post_id) as list
ON list.post_id=p.id) 
LEFT JOIN (SELECT p.id as post_id,p.description, string_agg(u.username,', ')as likes FROM (posts p JOIN likes l ON p.id = l.post_id) JOIN users u ON u.id=l.liker_id GROUP BY p.id) 
as likes ON likes.post_id = p.id )
JOIN users u ON p.author_id=u.id 
ORDER BY p.created_at DESC LIMIT 20;