/*
 Navicat MySQL Data Transfer

 Source Server         : Logsik
 Source Server Type    : MySQL
 Source Server Version : 50726/*
 Navicat MySQL Data Transfer

 Source Server         : Logsik
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : timec

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 15/08/2019 18:01:22
*/


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

BEGIN;
INSERT INTO `role` VALUES (1, '{\"admin.users.read\":true,\"admin.users.create\":true,\"admin.users.update\":true,\"admin.users.delete\":true,\"admin.roles.read\":true,\"admin.roles.create\":true,\"admin.roles.update\":true,\"admin.roles.delete\":true}', NULL, NULL, 'Admin');
INSERT INTO `role` VALUES (2, '{\"admin.users.read\":true}', NULL, NULL, 'Nurse');
COMMIT;

BEGIN;
INSERT INTO `hospital` VALUES (1, 'Tân Bình', 'TB');
INSERT INTO `hospital` VALUES (2, 'Quan 1', 'Q1');
COMMIT;

BEGIN;
INSERT INTO `department` VALUES (1, 'Hồi Sức', 'Hồi Sức chữa trị, Điều Trị Vật Lý', 1);
INSERT INTO `department` VALUES (2, 'Tri Lieu', 'Tri lieu', 1);
INSERT INTO `department` VALUES (3, 'tri lieu', 'Tri lieu', 2);
COMMIT;


BEGIN;
INSERT INTO `user_table` VALUES (1, '/api/downloadUserImage/2019-08-16-17-05-48_avarta_personnel.png', 'admin@logsik.com', '$2a$10$Wu9LoD7SpFmzfpMp81zYmOlJPoW8fKkH63.Wzr9CuD86vQA3l9/0i', 'ADMIN', 'Administrator', '1997-04-27', '0352431408', NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, 'MALE', NULL, NULL, NULL, 'Demo', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'AD', 1, NULL, 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1);
INSERT INTO `user_table` VALUES (2, '/api/downloadUserImage/2019-08-16-17-47-46_download (1).jpeg', 'user@logsik.com', '$2a$10$Wu9LoD7SpFmzfpMp81zYmOlJPoW8fKkH63.Wzr9CuD86vQA3l9/0i', 'ADMIN', 'User', NULL, NULL, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, 'FEMALE', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'NTT', NULL, NULL, 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1);
INSERT INTO `user_table` VALUES (3, '/api/downloadUserImage/2019-08-22-16-14-09_avarta_personnel.png', 'admin2@logsik.com', '$2a$10$Wu9LoD7SpFmzfpMp81zYmOlJPoW8fKkH63.Wzr9CuD86vQA3l9/0i', 'ADMIN', 'admin2', '1990-08-04', NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, 0, NULL, NULL, 'MALE', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'NTT', NULL, NULL, 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1);
INSERT INTO `user_table` VALUES (4, NULL, 'test@gmail.com', '$2a$10$mEGQxjwerg0kp9Nc53TQJut8IWhwOeS5zljOUCWhN6N3OKa4lH2mm', 'ADMIN', 'Thanh Binh', '1990-08-01', '0352431408', NULL, NULL, 0, 0, 0, NULL, NULL, NULL, 0, NULL, NULL, 'MALE', NULL, NULL, '2018-07-31', 'Nhân Viên', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'TD', NULL, NULL, 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1);
COMMIT;


BEGIN;
INSERT INTO `user_role` VALUES (1, 1, 1, NULL, NULL);
INSERT INTO `user_role` VALUES (2, 2, 1, NULL, NULL);
INSERT INTO `user_role` VALUES (3, 3, 2, NULL, NULL);
INSERT INTO `user_role` VALUES (4, 4, 2, NULL, NULL);
COMMIT;

BEGIN;
INSERT INTO `user_department` VALUES (1, 1, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
