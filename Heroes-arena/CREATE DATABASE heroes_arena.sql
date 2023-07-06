CREATE DATABASE heroes_arena

 DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `user_pseudo` varchar(100) NOT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_currency` int NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `user_pseudo` (`user_pseudo`),
  UNIQUE KEY `user_email` (`user_email`)
) 

CREATE TABLE IF NOT EXISTS heroes (
  id_hero INT AUTO_INCREMENT,
  hero_numberInApi INT,
  hero_name VARCHAR(255) NOT NULL,
  hero_intelligence INT,
  hero_strength INT,
  hero_speed INT,
  hero_durability INT,
  hero_life INT,
  hero_power INT,
  hero_combat INT,
  hero_full_name VARCHAR(255),
  hero_publisher VARCHAR(255),
  hero_alignment VARCHAR(255),
  hero_xs VARCHAR(255),
  hero_sm VARCHAR(255),
  hero_md VARCHAR(255),
  hero_lg VARCHAR(255),
  id_user INTEGER DEFAULT (NULL),
  PRIMARY KEY(id_hero),
  FOREIGN KEY(id_user) REFERENCES users(id_user)
);