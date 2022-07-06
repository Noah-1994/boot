-- Active: 1656927373833@@127.0.0.1@3306@boot
create table `users` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`nickname` varchar(20) NOT NULL UNIQUE,
`password` varchar(50) NOT NULL,
`gender` enum('男','女') DEFAULT '男',
`phone` varchar(20),
`birthday` date,
`avatar` varchar(200),
`create_time` timestamp DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `columns` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`column_name` varchar(20) NOT NULL UNIQUE,
`create_time` timestamp DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `categories` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`category_name` varchar(20) NOT NULL UNIQUE,
`create_time` timestamp DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`),
`column_id` bigint(20),
CONSTRAINT `fk_categories_column` FOREIGN KEY(`column_id`) REFERENCES columns(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `articles` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`title` varchar(20) NOT NULL UNIQUE,
`content` text NOT NULL,
`create_time` timestamp DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`),
`user_id` bigint(20) NOT NULL,
CONSTRAINT `fk_articles_user` FOREIGN KEY(`user_id`) REFERENCES users(`id`),
`category_id` bigint(20),
CONSTRAINT `fk_articles_category` FOREIGN KEY(`category_id`) REFERENCES categories(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `comments` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`content` text NOT NULL,
`create_time` timestamp DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`),
`user_id` bigint(20),
CONSTRAINT `fk_comments_user` FOREIGN KEY(`user_id`) REFERENCES users(`id`),
`article_id` bigint(20),
CONSTRAINT `fk_comments_article` FOREIGN KEY(`article_id`) REFERENCES articles(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `tags` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`tag_name` varchar(20) NOT NULL UNIQUE,
`create_time` timestamp DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table `article_tag_relations` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`create_time` timestamp DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY(`id`),
`article_id` bigint(20),
CONSTRAINT `fk_article_tag_relations_article` FOREIGN KEY(`article_id`) REFERENCES articles(`id`),
`tag_id` bigint(20),
CONSTRAINT `fk_article_tag_relations_tag` FOREIGN KEY(`tag_id`) REFERENCES tags(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;