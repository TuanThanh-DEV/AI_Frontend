-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 13, 2023 lúc 01:40 AM
-- Phiên bản máy phục vụ: 5.7.40
-- Phiên bản PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `timec`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `patient_by_account`
--

DROP TABLE IF EXISTS `patient_by_account`;
CREATE TABLE IF NOT EXISTS `patient_by_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_account_patient` bigint(20) NOT NULL,
  `id_patient` bigint(20) NOT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


ALTER TABLE user_patient ADD id_patient bigint(20);

INSERT INTO `user_patient` (`id`, `id_patient`, `image`, `email`, `password`, `role`, `full_name`, `birthday`, `phone`, `address`, `labour_contract`, `leave_day_year`, `is_lock`, `is_active`, `note`, `remember_token`, `profile`, `identity_card_number`, `issued_date`, `issued_at`, `gender`, `permanent_address`, `current_address`, `start_work_date`, `position`, `number_of_year`, `job_description`, `degree`, `training_place`, `profession`, `graduation_year`, `foreign_language_skill`, `level`, `family_information`, `code`, `hospital_id`, `user_type`, `created_user_email`, `lasted_update_user_email`, `created_date`, `lasted_update_date`, `version`) VALUES
(1, 145, NULL, 'khoipham160701@gmail.com', '$2a$10$6PGc.DNMRUMa9HPpxOHeAuhoDQb41YStvGD12Kl.PlxgTAEZGmDhm', NULL, 'Phạm Trần Khôi', '2001-07-16', '0794667091', 'Phường Tân Hưng Thuận, Quận 12', NULL, 1, 0, 1, NULL, NULL, NULL, 79256567846, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, 2022, NULL, NULL, NULL, NULL, NULL, 'normal', NULL, NULL, NULL, NULL, 1),
(2, NULL, NULL, 'thanhtuyen290302@gmail.com', '$2a$10$6PGc.DNMRUMa9HPpxOHeAuhoDQb41YStvGD12Kl.PlxgTAEZGmDhm', NULL, 'Thanh Tuyền', NULL, '0794667056', NULL, NULL, 1, 0, 1, NULL, NULL, NULL, 794667950157, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, 2022, NULL, NULL, NULL, NULL, NULL, 'google', NULL, NULL, NULL, NULL, 1);
COMMIT;
