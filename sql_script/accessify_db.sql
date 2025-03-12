DROP DATABASE IF EXISTS `accessify_db`;
CREATE DATABASE `accessify_db`;
USE `accessify_db`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `role_name` VARCHAR(100) NOT NULL UNIQUE,
  `role_description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `permission_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `permission_name` VARCHAR(100) NOT NULL UNIQUE,
  `permission_description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions` (
  `role_id` INT UNSIGNED NOT NULL,
  `permission_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE CASCADE,
  FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`permission_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles` (
  `user_id` INT UNSIGNED NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO accessify_db.users(email, password) VALUES
('admin@accessify.cat', '$2a$12$jmVh70142IyDKusHmIxZq.nEYb91EJvWpCPOa/MJ1afKXia7nyTq2'),
('user@accessify.cat', '$2a$12$UeWYghlvxRrUhjwCDod7COBim3epNIo7m3Eq0yy9WjmubZh/fJM.i');

INSERT INTO accessify_db.roles(role_name, role_description) VALUES
('admin', 'Role for admin users'),
('user', 'Role for common users');

INSERT INTO accessify_db.permissions(permission_name, permission_description) VALUES
('route:home:view', 'Access and view the home page of the application'),
('route:profile:view', 'Access and view the user profile page to view and edit personal information'),
('route:settings:view', 'Access and view the settings page to configure application preferences'),
('route:users:view', 'Access and view the users management page to manage user accounts'),
('route:roles:view', 'Access and view the roles management page to manage user roles'),
('route:permissions:view', 'Access and view the permissions management page to manage permissions'),
('route:logs:view', 'Access and view the logs page to review system activity and logs'),
('route:files:view', 'Access and view the file management page to upload and download files');

INSERT INTO accessify_db.role_permissions(role_id, permission_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(2, 1),
(2, 2),
(2, 3),
(2, 8);

INSERT INTO accessify_db.user_roles(user_id, role_id) VALUES
(1, 1),
(2, 2);