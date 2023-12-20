-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 20, 2020 at 06:26 AM
-- Server version: 10.1.18-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logsik_demotimec`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_code`
--

CREATE TABLE `account_code` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` int(11) NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `account_code`
--

INSERT INTO `account_code` (`id`, `title`, `code`, `description`) VALUES
(1, 'Chứng Khoán Kinh Doanh', 121, NULL),
(2, 'Hàng Tồn Kho', 141, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `add_salary`
--

CREATE TABLE `add_salary` (
  `id` bigint(20) NOT NULL,
  `user_salary_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `add_salary`
--

INSERT INTO `add_salary` (`id`, `user_salary_id`, `name`, `amount`) VALUES
(2, 19, 'Tháng 12', 200000),
(6, 19, 'Tháng 10', 100000),
(7, 19, 'tháng 8', 200000),
(8, 19, '3 tháng', 100000),
(9, 19, 'du 12', 50000),
(10, 19, 'anuong', 1200),
(12, 19, 'thanh dúy', 23423523),
(13, 19, 'Tháng 1', 100000),
(14, 19, 'thanh dúyy', 23423523);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` bigint(20) NOT NULL,
  `appoint_date` datetime NOT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `status` varchar(255) COLLATE utf8_bin NOT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `appoint_date`, `doctor_id`, `patient_id`, `status`, `hospital_id`, `prescription_id`) VALUES
(1, '2019-09-27 11:30:00', 1, 2, 'Kiểm tra lại', 1, 7),
(2, '2019-09-26 10:30:00', 1, 1, 'Tái khám sức khỏe sau điều trị', 1, NULL),
(3, '2019-10-05 00:00:00', 1, 1, 'Tái khám sau điều trị', 1, 9),
(4, '2019-11-08 09:00:00', 1, 1, 'hen kham lai', 1, 2),
(5, '2019-11-07 16:00:00', 1, 1, 'tai kham ne', 1, 3),
(6, '2019-10-09 09:00:01', 1, 1, 'tai kham', 1, 1),
(7, '2019-11-10 17:00:00', 1, 1, 'Hen tai kham', NULL, 28),
(8, '2019-11-29 09:30:00', 1, 1, 'hẹn khám trĩ', 2, 85),
(9, '2019-11-30 09:15:00', 1, 1, 'khám trĩ', 3, 85),
(10, '2019-11-07 08:45:00', 2, 1, 'ssss', 2, 86),
(11, '2019-11-28 13:00:00', 1, 1, '12345', 1, 107),
(12, '2019-11-28 14:30:00', 1, 6, '1234', 3, 107),
(13, '2019-11-30 15:00:00', 1, 1, 'hẹn tái khám', 1, 107),
(14, '2019-11-29 15:00:00', 1, 4, 'k', 1, 107),
(15, '2019-11-29 15:15:00', 6, 1, 'l', 1, 107),
(16, '2019-12-02 08:00:00', 6, 1, 'khám đau đầu', 1, NULL),
(17, '2019-12-02 00:00:00', 1, 1, 'khám dạ dày', 1, NULL),
(18, '2019-12-02 14:45:00', 1, 3, 'Khám dạ dày', 2, NULL),
(19, '2019-12-03 07:30:00', 1, 1, 'khám trĩ', 1, NULL),
(20, '2019-12-03 07:45:00', 6, 3, 'tái khám', 1, NULL),
(21, '2019-12-04 15:45:00', 6, 6, 'Tháo bột thuốc', 1, NULL),
(22, '2019-12-04 15:45:00', 6, 4, 'd', 2, 124),
(23, '2019-12-04 15:45:00', 1, 1, '123', 1, 124),
(24, '2019-12-09 10:00:00', 1, 6, '12345', 3, 134),
(25, '2019-12-17 14:30:00', 6, 3, 'hẹn tái khám', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

CREATE TABLE `billing` (
  `id` bigint(20) NOT NULL,
  `receiver` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `account_code_id` bigint(20) DEFAULT NULL,
  `has_accounted` tinyint(1) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `billing`
--

INSERT INTO `billing` (`id`, `receiver`, `created_date`, `account_code_id`, `has_accounted`, `amount`) VALUES
(1, 'Hello', '2020-02-20', 1, 1, 1000000),
(2, 'Hello', '2020-02-20', 1, 0, 20000000),
(3, 'Hello', '2020-02-20', 1, 1, 2000000);

-- --------------------------------------------------------

--
-- Table structure for table `booking_group`
--

CREATE TABLE `booking_group` (
  `id` bigint(20) NOT NULL,
  `company_id` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `appointment_date` date NOT NULL,
  `number_of_attendees` int(11) DEFAULT NULL,
  `status` enum('OPEN','BOOKED','DONE','CANCELLED') COLLATE utf8_bin NOT NULL,
  `note` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `booking_group`
--

INSERT INTO `booking_group` (`id`, `company_id`, `created_date`, `appointment_date`, `number_of_attendees`, `status`, `note`) VALUES
(2, 2, '2019-11-14', '2019-11-13', 12, 'BOOKED', '2'),
(4, 1, '2019-11-19', '2019-11-20', 12, 'OPEN', NULL),
(5, 3, '2019-12-16', '2019-12-16', 2, 'OPEN', NULL),
(6, 4, '2019-12-30', '2019-12-30', 3, 'OPEN', NULL),
(7, 2, '2019-12-30', '2019-12-23', 3, 'OPEN', NULL),
(8, 1, '2020-02-03', '2020-02-03', 66, 'OPEN', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cash_desk`
--

CREATE TABLE `cash_desk` (
  `id` bigint(20) NOT NULL,
  `cashier_id` bigint(20) DEFAULT NULL,
  `open_time` datetime DEFAULT NULL,
  `initial_amount` bigint(20) DEFAULT NULL,
  `close_time` datetime DEFAULT NULL,
  `close_amount` bigint(20) DEFAULT NULL,
  `is_balanced` tinyint(1) DEFAULT NULL,
  `note` longtext COLLATE utf8_bin,
  `sale_amount` bigint(20) DEFAULT NULL,
  `withdrawal_amount` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `cash_desk`
--

INSERT INTO `cash_desk` (`id`, `cashier_id`, `open_time`, `initial_amount`, `close_time`, `close_amount`, `is_balanced`, `note`, `sale_amount`, `withdrawal_amount`) VALUES
(2, 1, '2019-09-25 06:55:03', 1000000, '2019-09-25 06:56:45', 503000, 1, '1000000', 3000, 500000),
(4, 1, '2019-10-28 14:09:04', 10000000, '2019-11-04 14:02:13', 10200000, 0, NULL, 20000, 0),
(5, 1, '2019-11-04 13:49:28', 10000000, '2019-11-04 14:02:13', 0, NULL, NULL, 400000, 0),
(6, 1, '2019-11-13 17:51:08', 5000000, '2019-11-13 17:57:48', 490000, 0, '123', 0, 100000),
(7, 1, '2019-11-13 19:27:45', 5000000, '2019-11-13 21:36:13', 500000, 0, NULL, 22000, 0),
(8, 1, '2019-11-13 21:35:19', 1000000, '2019-12-02 17:07:18', 1000000, 0, '1000000', 2313000, 0),
(9, 6, '2019-11-14 16:31:49', 1000000, '2019-11-15 08:33:10', 12000000, 0, 'Mở quầy', 12006000, 510000),
(10, 6, '2019-11-14 15:45:00', 1000000, '2019-11-20 16:00:00', 12000000, 1, 'asasssa', 100, NULL),
(11, 6, '2019-11-15 08:25:03', 1000000, '2019-11-18 08:55:15', 12000000, 0, 'mở quầy thôi nào', 0, 0),
(12, 6, '2019-11-18 08:54:08', 1000000, '2019-11-19 09:02:26', 12000000, 0, NULL, 36000000, 0),
(13, 6, '2019-11-19 09:01:22', 1000000, '2019-11-25 11:45:51', 12000000, 0, 'mở quầy', 13090000, 10000),
(15, 6, '2019-11-25 11:37:00', 1000000, '2019-11-27 13:54:15', 12000000, 0, NULL, 0, 0),
(16, 8, '2019-11-26 06:00:00', 1000000, '2019-11-26 14:00:00', 5360000, 1, 'Nộp thu ngân 14 giờ ngày 26/11/2019', 4360000, NULL),
(17, 6, '2019-11-27 11:23:36', 1000000, '2019-11-29 11:40:24', 12, 0, NULL, 12000000, 0),
(18, 6, '2019-11-29 15:42:01', 1000000, '2019-12-02 09:47:46', 900000, 0, 'mở quầy', 1000000, 0),
(19, 6, '2019-12-02 11:19:31', 122222, '2019-12-03 08:51:47', 900000, 1, 'f', 0, NULL),
(20, 1, '2019-12-02 17:07:07', 0, '2019-12-04 22:54:29', 0, 1, 'k', 376000, NULL),
(21, 1, '2019-12-04 22:50:06', 5000000, '2019-12-23 00:00:00', 0, 1, 'ghi chú', 3563000, NULL),
(22, 10, '2019-12-05 06:15:41', 1000000, '2019-12-05 08:39:28', 1043200, 1, NULL, 43200, 0),
(23, 10, '2019-12-05 08:10:56', 1000000, '2019-12-05 09:56:06', 1312000, 1, 'Ca 14h ngaỳ 05/12/2019', 312000, 0),
(24, 6, '2019-12-05 10:00:09', 1000000, '2019-12-06 10:55:36', 1234567890, 0, NULL, 0, 0),
(25, 6, '2019-12-06 09:13:45', 1000000, '2019-12-09 17:15:03', 12, 0, NULL, 500000, 0),
(26, 6, '2019-12-11 09:27:39', 12000000, '2019-12-13 10:14:18', 1234567890, 0, NULL, 0, 0),
(27, 6, '2019-12-16 10:18:19', 1000000, '2019-12-19 16:13:03', 900000, 0, NULL, 500000, 0),
(28, 1, '2019-12-19 16:13:13', 1000000, '2019-12-23 16:15:00', 0, NULL, 'rewrwer', 0, NULL),
(29, 1, '2019-12-23 16:52:31', 1000000, '2019-12-23 16:52:40', 1000000, 1, NULL, 0, 0),
(30, 1, '2019-12-23 16:52:31', 1000000, '2019-12-24 11:03:47', 10200000, 0, NULL, 0, 500000),
(31, 6, '2019-12-23 17:08:02', 1000000, '2019-12-23 17:11:33', 900000, 0, NULL, 0, 0),
(32, 6, '2019-12-23 17:08:02', 1000000, '2019-12-26 09:25:40', 10000000, 0, NULL, 3141691, 0),
(33, 1, '2019-12-24 11:02:44', 10000000, '2019-12-25 14:31:26', 10200000, 0, '123', 10000, 0),
(34, 1, '2019-12-25 11:15:15', 10000000, '2019-12-26 10:00:00', 0, NULL, '1', 0, NULL),
(35, 6, '2019-12-26 10:59:47', 1000000, '2019-12-27 16:11:27', 120000, 0, NULL, 0, 0),
(36, 1, '2019-12-27 16:36:52', 1000000, '2019-12-30 07:07:34', 2000000, 0, NULL, 0, 0),
(37, 1, '2019-12-30 07:06:28', 1000000, '2020-01-07 15:34:56', 1000000, 0, 'Anh B', 5934500, 0),
(38, 6, '2019-12-30 09:13:30', 1000000, NULL, 0, NULL, NULL, 48000, 0),
(39, 1, '2020-01-07 15:15:37', 1000000, '2020-01-08 09:18:54', 10000000, 0, NULL, 0, 0),
(40, 1, '2020-01-08 09:15:13', 10000000, '2020-01-09 16:21:39', 1000000, 0, NULL, 0, 0),
(41, 10, '2020-01-09 16:19:47', 1000000, NULL, 0, NULL, NULL, 12000, 0),
(42, 1, '2020-01-09 16:08:59', 1000000, '2020-01-10 07:00:30', 1110000, 1, NULL, 110000, 0),
(43, 1, '2020-01-10 06:59:57', 1000000, '2020-01-10 10:56:22', 10000000, 0, NULL, 17820008, 0),
(44, 1, '2020-01-10 10:52:55', 10000000, '2020-01-10 11:28:09', 500000, 0, NULL, 6000, 0),
(45, 1, '2020-01-10 11:27:53', 10000, '2020-01-13 10:58:59', 10000000, 0, NULL, 200000, 0),
(46, 1, '2020-01-13 10:50:41', 10000000, '2020-01-15 17:03:21', 10000000, 0, NULL, -1500, 0),
(47, 1, '2020-01-15 16:54:36', 10000000, '2020-01-16 09:05:15', 10000000, 0, NULL, 382400, 0),
(48, 1, '2020-01-16 08:46:58', 10000000, '2020-01-17 10:35:15', 10000000, 0, NULL, 481000, 0),
(49, 1, '2020-01-17 10:31:37', 10000000, '2020-01-21 08:51:40', 500000, 0, NULL, 2000000, 0),
(50, 1, '2020-01-21 08:45:33', 1000000, '2020-02-03 11:38:09', 10000000, 0, NULL, 98000, 0),
(51, 1, '2020-02-03 11:37:41', 10000000, '2020-02-04 10:12:09', 500000, 0, NULL, 34000, 0),
(52, 1, '2020-02-04 10:11:54', 5000000, '2020-02-11 06:09:01', 5013000, 1, NULL, 13000, 0),
(53, 1, '2020-02-11 06:08:30', 1000000, '2020-02-12 09:55:26', 10000000, 0, NULL, 750000, 0),
(54, 1, '2020-02-12 09:54:15', 10000000, '2020-02-13 06:46:01', 10000000, 1, NULL, 0, 0),
(55, 1, '2020-02-13 06:28:43', 10000000, '2020-02-19 15:46:45', 10000000, 0, NULL, 1000600, 0),
(56, 1, '2020-02-19 15:37:32', 10000000, NULL, 0, NULL, NULL, 49000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cash_widrawal`
--

CREATE TABLE `cash_widrawal` (
  `id` bigint(20) NOT NULL,
  `cash_desk_id` bigint(20) NOT NULL,
  `widrawal_amount` bigint(20) NOT NULL,
  `widrawal_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `validate_user_id` bigint(20) NOT NULL,
  `note` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `cash_widrawal`
--

INSERT INTO `cash_widrawal` (`id`, `cash_desk_id`, `widrawal_amount`, `widrawal_time`, `validate_user_id`, `note`) VALUES
(1, 2, 500000, '2019-09-25 06:55:03', 1, 'Chi mua hàng gấp'),
(2, 6, 100000, NULL, 1, NULL),
(3, 9, 1000000, '2019-11-20 14:09:59', 5, 'rút tiền'),
(4, 9, 100000, '2019-11-20 13:41:21', 1, 'rút tiền nhé'),
(5, 13, 100000, '2019-11-20 13:41:47', 6, 'rút tiền nhé'),
(7, 19, 119764, '2019-12-02 11:47:15', 4, 's'),
(8, 20, 10000000, '2019-12-02 17:07:41', 1, '4646'),
(9, 21, 5000, '2019-12-05 08:56:56', 8, 'mua cafe'),
(10, 30, 500000, '2019-12-23 16:56:07', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `tax_code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `address` longtext COLLATE utf8_bin,
  `bank_account` longtext COLLATE utf8_bin,
  `note` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `tax_code`, `address`, `bank_account`, `note`) VALUES
(1, 'Hoài Nam', '1112', 'B58/10 Nguyen Than Hien, distict 4, Ho Chi Minh city', '112222', ''),
(2, 'Thanh Bình', '111', '64/7 Ngo Chi Quoc, Binh Chieu ward, Thu Duc distri', '112222', 'a'),
(3, 'Logsik', 'logsik123', '112 đinh tiên hoàng, đa kao, quận 1', '1123847476367444', 'ghi chú'),
(4, 'Andes', '112', 'TPHCM', '1111', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_notification`
--

CREATE TABLE `dashboard_notification` (
  `id` bigint(20) NOT NULL,
  `from_date` date DEFAULT NULL,
  `title` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `to_date` date DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `dashboard_notification`
--

INSERT INTO `dashboard_notification` (`id`, `from_date`, `title`, `description`, `to_date`, `hospital_id`) VALUES
(8, '2019-11-26', 'Họp về phần mêm TIMEC ', 'Họp tại TeccoCoffee\n8 giờ 26.11.2019', '2019-11-27', 1),
(9, '2019-11-26', 'Họp về phần mêm TIMEC 05.12.2019', 'Thời gian: 8 giờ ngày 05.12.2019\nĐịa điểm: TeccoCoffee', '2019-12-06', 1),
(10, '2019-10-28', 'Chương trình chăm sóc sức khỏe công nhân viên timec', 'tất cả nhân viên tham gia quá trình khám tổng quát sức khỏe, để đảm bảo sức khỏe', '2019-11-23', 1),
(11, '2019-12-02', 'thêm mới thông báo', 'test thêm mới một thông báo', '2019-12-02', 1),
(12, '2019-12-06', 'thêm mới thông báo 2', 'test thêm mới thông báo 2', '2019-12-06', 1),
(13, '2019-12-04', 'Họp về phần mềm TIMEC test', 'Quản lý nhà thuốc với thiết bị barcode, refund đơn hàng, quản lý lương nhân sự', '2019-12-04', 1),
(14, '2019-12-05', 'Họp về phần mềm TIMEC 30.12', 'Quản lý nhà thuốc với thiết bị barcode, refund đơn hàng, quản lý lương nhân sự', '2019-12-30', 1),
(15, '2019-12-04', '124124', '12412412', '2019-12-04', 1),
(16, '2019-12-03', 'Thông Báo Nghỉ Tết Dương Lịch 2019 2', '124124125', '2019-12-11', 1),
(17, '2019-12-03', '2154215125', '125125', '2019-12-11', 1),
(18, '2019-12-11', '215215125', '125215', '2019-12-11', 1),
(19, '2019-12-11', '23151532', '523523', '2019-12-11', NULL),
(20, '2019-12-03', '32532523', '5235325', '2019-12-11', 1),
(21, '2019-12-11', '23523523', '523523523', '2019-12-11', 1),
(22, '2019-12-11', '32532523', '523523', '2019-12-11', 1),
(23, '2019-12-11', '532532523', '5235325', '2019-12-11', 1),
(24, '2019-12-25', 'Thêm thông báo mới', 'test thông báo', '2019-12-27', 1),
(25, '2020-01-05', 'Họp triển khai nhà thuốc + BHYT 10.01', 'Họp triển khai nhà thuốc + BHYT', '2020-01-11', 1),
(26, '2020-01-14', 'Họp kiểm tra quy trình barcode + Khám bệnh 21.01', 'Họp kiểm tra quy trình barcode + Khám bệnh. Deliver production ngày 12.02 & 31.03', '2020-01-22', 3),
(27, '2020-02-10', 'Quy trình khám bệnh của bác sĩ 11-02', 'Quy trình khám bệnh của bác sĩ', '2020-02-12', 3),
(28, '2020-02-17', 'Quy trình thu ngân - kế toán 20-02', 'Quy trình thu ngân - kế toán 20-02', '2020-02-21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `day_revenue`
--

CREATE TABLE `day_revenue` (
  `id` bigint(20) NOT NULL,
  `hospital_id` bigint(20) NOT NULL,
  `apply_date` date NOT NULL,
  `revenue_amount` bigint(20) NOT NULL,
  `total_amount` bigint(20) NOT NULL,
  `sale_drug_amount` bigint(20) NOT NULL,
  `sale_diagnosis_amount` bigint(20) NOT NULL,
  `sale_procedure_amount` bigint(20) NOT NULL,
  `sale_insurance_amount` bigint(20) NOT NULL,
  `sale_other_amount` bigint(20) NOT NULL,
  `buy_amount` bigint(20) NOT NULL,
  `validated_by` bigint(20) NOT NULL,
  `status` enum('OPEN','VALIDATED') NOT NULL DEFAULT 'OPEN',
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `day_revenue`
--

INSERT INTO `day_revenue` (`id`, `hospital_id`, `apply_date`, `revenue_amount`, `total_amount`, `sale_drug_amount`, `sale_diagnosis_amount`, `sale_procedure_amount`, `sale_insurance_amount`, `sale_other_amount`, `buy_amount`, `validated_by`, `status`, `note`) VALUES
(1, 1, '2019-12-03', 5000000, 5000000, 3000000, 1000000, 1000000, 0, 0, 0, 1, 'VALIDATED', NULL),
(2, 1, '2019-12-04', 4500000, 4500000, 3000000, 1000000, 500000, 0, 0, 0, 1, 'VALIDATED', NULL),
(3, 1, '2019-12-05', 6000000, 6000000, 4000000, 1000000, 1000000, 0, 0, 0, 1, 'OPEN', NULL),
(4, 3, '2019-12-24', 0, 0, 0, 0, 0, 0, 0, 0, 6, 'OPEN', NULL),
(5, 3, '2019-12-25', 0, 0, 0, 0, 0, 0, 0, 0, 6, 'OPEN', NULL),
(6, 3, '2019-12-26', 0, 0, 0, 0, 0, 0, 0, 0, 6, 'OPEN', NULL),
(7, 3, '2019-12-27', 0, 0, 0, 0, 0, 0, 0, 0, 6, 'OPEN', NULL),
(8, 3, '2019-12-30', 0, 0, 0, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(9, 3, '2020-01-07', 18866908, 18866908, 18866908, 0, 0, 0, 0, 0, 1, 'OPEN', ''),
(10, 3, '2020-01-09', 22000, 22000, 22000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(11, 3, '2020-01-10', 178717080, 178717080, 178326080, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(12, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(13, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(14, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(15, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(16, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(17, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(18, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(19, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(20, 3, '2020-01-16', 481000, 481000, 481000, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(21, 3, '2020-01-17', 0, 0, 0, 0, 0, 0, 0, 0, 1, 'OPEN', NULL),
(22, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(23, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(24, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(25, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(26, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(27, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(28, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(29, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(30, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(31, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(32, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(33, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(34, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(35, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(36, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(37, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(38, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(39, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(40, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(41, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(42, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(43, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(44, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(45, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(46, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(47, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(48, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(49, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(50, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(51, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(52, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(53, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(54, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(55, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(56, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(57, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(58, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(59, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(60, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(61, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(62, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(63, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(64, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(65, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(66, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(67, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(68, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(69, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(70, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(71, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(72, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(73, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(74, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(75, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(76, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(77, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(78, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(79, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(80, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(81, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL),
(82, 3, '2020-01-17', 2000000, 2000000, 0, 0, 2000000, 0, 0, 0, 1, 'OPEN', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `hospital_id` bigint(20) DEFAULT NULL,
  `has_active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`, `description`, `hospital_id`, `has_active`) VALUES
(1, 'Hồi Sức', 'Hồi Sức chữa trị, Điều Trị Vật Lý', 1, 1),
(2, 'Triệu Liệu', 'Trị Liệu', 1, 1),
(3, 'Trị Liệu', 'Trị Liệu', 2, 1),
(4, 'Nhi', 'Nhi', 2, 1),
(5, 'Nội Tổng Quát', 'Nội Tổng Quát', 1, 1),
(6, 'Nhi', 'Nhi', 1, 1),
(7, 'chuyen khoa 2', 'all', 1, 1),
(10, 'Hồi Sức', 'Hồi Sức chữa trị, Điều Trị Vật Lý', 1, 1),
(20, 'Công việc 1', 'Chuyên Khoa', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

CREATE TABLE `device` (
  `id` bigint(20) NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `device_category` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `made_in` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_id` bigint(20) DEFAULT NULL,
  `user_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `maintenance_cycle` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `code`, `name`, `device_category`, `made_in`, `supplier_id`, `user_date`, `expired_date`, `maintenance_cycle`) VALUES
(5, 'TB001', 'X-Quang X1', 'XQuang', 'Đức', 1, '2020-01-10', '2025-01-10', 365),
(6, 'TB002', 'đo tim', 'XQuang', 'Pháp', 2, '2018-11-13', '2019-11-17', 12),
(7, 'XECUUTHUONG1', 'Xe cứu thương 1', 'Xe', 'Hàn Quốc', 5, '2019-12-02', '2039-12-02', 365),
(8, 'BC1005', 'Máy quét barcode', 'Bán Hàng', 'Việt Nam', 4, '2019-12-30', '2020-12-30', 90),
(9, 'TB003', 'Máy chụp CT', 'CT', 'Nhật Bản', 1, '2019-12-31', '2020-01-02', 10),
(10, 'T004', 'Bàn làm việc bác sĩ', 'Bàn', 'Việt Nam', 1, '2020-01-10', '2025-01-10', 0);

-- --------------------------------------------------------

--
-- Table structure for table `device_maintenance`
--

CREATE TABLE `device_maintenance` (
  `id` bigint(20) NOT NULL,
  `device_id` bigint(20) NOT NULL,
  `maintenance_date` datetime NOT NULL,
  `cost` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `device_maintenance`
--

INSERT INTO `device_maintenance` (`id`, `device_id`, `maintenance_date`, `cost`, `note`) VALUES
(1, 5, '2019-09-26 09:30:00', 200000, NULL),
(2, 6, '2019-11-13 00:00:00', 1000000, 'đến lúc bảo trì rồi'),
(3, 6, '2019-11-21 13:45:00', 122222, NULL),
(4, 6, '2019-11-29 15:30:00', 1, 'ư'),
(5, 5, '2019-12-04 14:00:00', 12000000, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_group`
--

CREATE TABLE `diagnosis_group` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `diagnosis_group`
--

INSERT INTO `diagnosis_group` (`id`, `name`) VALUES
(1, 'Nhóm Xét Nghiệm Máu'),
(2, 'Siêu âm'),
(3, 'đo tim');

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_report`
--

CREATE TABLE `diagnosis_report` (
  `id` bigint(20) NOT NULL,
  `report_type` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `diagnosis_service_id` bigint(20) NOT NULL,
  `file_name` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `diagnosis_date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `laboratorist_id` bigint(20) DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','IN_PROGRESS','DONE','CANCELLED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `diagnosis_report`
--

INSERT INTO `diagnosis_report` (`id`, `report_type`, `diagnosis_service_id`, `file_name`, `prescription_id`, `description`, `diagnosis_date`, `laboratorist_id`, `hospital_id`, `status`) VALUES
(1, NULL, 1, '/api/downloadDiagnosisReportFile/2019-10-29-14-27-19_71169492_1400057336837020_5222058445225590784_o.jpg', 1, 'Xét nghiệm cho kết quả X, không có dấu hiệu bất thường.', '2020-01-10 12:17:11', 2, 1, 'DONE'),
(2, NULL, 1, '/api/downloadDiagnosisReportFile/2019-10-29-13-59-40_da0de7705cc9b697efd8.jpg', 1, NULL, '2019-11-13 14:47:50', 2, 1, 'DONE'),
(3, NULL, 1, NULL, 9, NULL, '2019-10-01 10:32:55', 5, 1, 'DONE'),
(19, NULL, 2, NULL, 1, 'service 2 group 1', '2019-12-02 11:55:00', NULL, 1, 'DONE'),
(22, NULL, 1, NULL, 4, 'Xét Nghiệm Siêu Vi nước tiểu', '2019-12-17 15:20:35', 6, 1, 'DONE'),
(23, NULL, 2, NULL, 4, 'service 2 group 1', '2019-10-25 14:03:04', NULL, 1, 'OPEN'),
(24, NULL, 1, NULL, 1, '123123', '2019-11-13 15:27:12', 2, 1, 'DONE'),
(25, NULL, 1, NULL, NULL, 'Xét Nghiệm Siêu Vi Trong Máu', '2019-11-13 15:09:21', NULL, 1, 'DONE'),
(27, NULL, 1, NULL, 3, NULL, '2019-11-21 08:42:04', NULL, 1, 'DONE'),
(28, NULL, 2, NULL, 3, NULL, '2019-11-21 08:42:04', NULL, 1, 'DONE'),
(29, NULL, 1, NULL, 1, 'test', '2019-11-13 16:33:55', 2, 1, 'DONE'),
(30, NULL, 1, NULL, NULL, 'Test', '2019-11-13 17:11:22', 2, 1, 'DONE'),
(31, NULL, 1, NULL, 30, '323432432', '2019-11-13 17:20:57', NULL, 1, 'DONE'),
(32, NULL, 2, NULL, 30, NULL, '2019-11-13 17:18:31', NULL, 1, 'OPEN'),
(33, NULL, 1, NULL, 1, '', '2019-11-19 14:02:53', 1, 1, 'DONE'),
(34, NULL, 1, '/api/downloadDiagnosisReportFile/2019-12-04-10-54-32_banner-vamf-2019.jpg', 81, NULL, '2019-12-04 10:57:29', NULL, NULL, 'DONE'),
(35, NULL, 2, NULL, 82, NULL, '2019-11-20 15:12:19', 1, NULL, 'DONE'),
(36, NULL, 4, NULL, 82, NULL, '2019-11-20 15:16:50', NULL, NULL, 'OPEN'),
(37, NULL, 1, NULL, 103, NULL, '2019-11-28 08:42:55', NULL, 3, 'OPEN'),
(38, NULL, 2, NULL, 85, NULL, '2019-11-28 09:02:09', NULL, NULL, 'OPEN'),
(39, NULL, 4, NULL, 85, NULL, '2019-11-28 09:02:09', NULL, NULL, 'OPEN'),
(40, NULL, 1, NULL, 86, NULL, '2019-11-28 09:25:23', NULL, NULL, 'OPEN'),
(41, NULL, 1, NULL, 108, NULL, '2019-11-28 14:14:35', NULL, 3, 'OPEN'),
(42, NULL, 1, NULL, 107, 'không có triệu chứng bất thường', '2019-12-17 15:59:30', 6, 3, 'DONE'),
(43, NULL, 1, NULL, 109, NULL, '2019-12-02 09:40:08', NULL, 3, 'OPEN'),
(44, NULL, 2, NULL, 114, NULL, '2019-12-02 11:46:17', NULL, 3, 'OPEN'),
(45, NULL, 4, NULL, 114, NULL, '2019-12-02 11:46:17', NULL, 3, 'OPEN'),
(46, NULL, 2, NULL, 119, NULL, '2019-12-04 09:57:00', NULL, 3, 'OPEN'),
(47, NULL, 4, NULL, 119, NULL, '2019-12-04 10:03:17', NULL, 3, 'DONE'),
(48, NULL, 2, NULL, 120, NULL, '2019-12-04 10:20:57', NULL, 3, 'OPEN'),
(49, NULL, 4, NULL, 120, NULL, '2019-12-04 10:20:57', NULL, 3, 'OPEN'),
(50, NULL, 1, NULL, 121, '123456', '2019-12-04 10:37:11', NULL, 3, 'DONE'),
(51, NULL, 2, NULL, 121, NULL, '2019-12-04 10:30:51', NULL, 3, 'OPEN'),
(52, NULL, 4, NULL, 121, NULL, '2019-12-04 10:30:51', NULL, 3, 'OPEN'),
(53, NULL, 1, NULL, 157, NULL, '2019-12-06 10:10:36', NULL, 3, 'OPEN'),
(54, NULL, 1, NULL, 134, NULL, '2019-12-09 11:45:12', NULL, 3, 'OPEN'),
(55, NULL, 2, NULL, 134, NULL, '2019-12-12 14:11:42', NULL, 3, 'OPEN'),
(56, NULL, 4, NULL, 134, NULL, '2019-12-12 14:11:42', NULL, 3, 'OPEN'),
(57, NULL, 1, NULL, 166, NULL, '2019-12-13 10:19:04', NULL, 3, 'OPEN'),
(58, NULL, 1, NULL, 167, NULL, '2019-12-13 10:22:44', NULL, 3, 'OPEN'),
(59, NULL, 1, NULL, 136, NULL, '2019-12-16 14:23:05', NULL, 3, 'OPEN'),
(60, NULL, 2, NULL, 136, NULL, '2019-12-16 14:23:05', NULL, 3, 'OPEN'),
(61, NULL, 4, NULL, 136, NULL, '2019-12-16 14:23:05', NULL, 3, 'OPEN'),
(62, NULL, 2, NULL, 172, NULL, '2019-12-24 15:05:40', NULL, 3, 'OPEN'),
(63, NULL, 4, NULL, 172, NULL, '2019-12-24 15:05:40', NULL, 3, 'OPEN'),
(64, NULL, 1, NULL, 182, NULL, '2019-12-27 09:58:26', NULL, 3, 'OPEN'),
(65, NULL, 2, NULL, 182, NULL, '2019-12-27 09:58:26', NULL, 3, 'OPEN'),
(66, NULL, 4, NULL, 182, NULL, '2019-12-27 09:58:26', NULL, 3, 'OPEN'),
(67, NULL, 2, NULL, 194, 'không có hiện tượng lạ', '2019-12-30 14:00:26', 6, 3, 'DONE'),
(68, NULL, 4, NULL, 194, 'không có hiện tượng lạ', '2019-12-30 14:00:26', 6, 3, 'DONE'),
(70, NULL, 4, NULL, 209, NULL, '2020-01-08 17:09:23', NULL, NULL, 'OPEN'),
(71, NULL, 2, NULL, 241, NULL, '2020-01-10 12:00:26', NULL, 3, 'OPEN'),
(72, NULL, 4, NULL, 241, NULL, '2020-01-10 12:00:26', NULL, 3, 'OPEN'),
(73, NULL, 4, NULL, 242, NULL, '2020-01-10 12:11:14', NULL, 3, 'OPEN'),
(74, NULL, 2, NULL, 261, NULL, '2020-01-17 10:42:48', NULL, 3, 'OPEN'),
(75, NULL, 1, NULL, 268, NULL, '2020-01-21 10:04:20', NULL, 3, 'OPEN'),
(76, NULL, 1, NULL, 269, NULL, '2020-01-21 10:46:59', NULL, 3, 'OPEN'),
(77, NULL, 2, NULL, 269, NULL, '2020-01-21 10:47:16', NULL, 3, 'OPEN'),
(78, NULL, 4, NULL, 269, NULL, '2020-01-21 10:47:16', NULL, 3, 'OPEN'),
(81, NULL, 2, NULL, 272, NULL, '2020-02-03 11:47:27', NULL, 3, 'OPEN'),
(82, NULL, 2, NULL, 289, NULL, '2020-02-11 10:02:15', NULL, 3, 'OPEN'),
(83, NULL, 4, NULL, 289, NULL, '2020-02-11 10:02:15', NULL, 3, 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_service`
--

CREATE TABLE `diagnosis_service` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `description` longtext COLLATE utf8_bin,
  `group_id` bigint(20) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `diagnosis_service`
--

INSERT INTO `diagnosis_service` (`id`, `name`, `description`, `group_id`, `price`) VALUES
(1, 'Xét Nghiệm Siêu Vi Trong Máu', NULL, 1, NULL),
(2, 'Siêu âm khoang bụng', 'mô tả', 2, NULL),
(4, 'Siêu Âm Tim', '', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `drug`
--

CREATE TABLE `drug` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `guideline` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `uom` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `sale_price` bigint(20) DEFAULT NULL,
  `import_price` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `ingredient` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `drug_type` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `bar_code` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `has_group` tinyint(1) NOT NULL DEFAULT '0',
  `has_prescription` tinyint(1) NOT NULL DEFAULT '0',
  `place_code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `supplier_drug_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `drug`
--

INSERT INTO `drug` (`id`, `name`, `guideline`, `uom`, `sale_price`, `import_price`, `category_id`, `ingredient`, `drug_type`, `bar_code`, `has_group`, `has_prescription`, `place_code`, `supplier_drug_id`) VALUES
(1, 'Paracetamol', 'Trẻ em ngày 2 viên, người lớn 3-4 viên', 'Lọ', 500, 200, 1, '', 'DRUG', 't1', 0, 0, NULL, NULL),
(2, 'Pennicilin', 'Ngày 3 viên', 'Viên', 2000, 1000, 3, NULL, 'DRUG', 't2', 0, 0, NULL, NULL),
(4, 'Bông gòn', '', 'Bịch', 500, 1000, 4, NULL, 'MEDICAL', NULL, 0, 0, NULL, NULL),
(5, 'METHORPHAN', '1 lần 1 viên', 'Viên', 1000, 200, 3, '', 'DRUG', 't3', 0, 0, NULL, NULL),
(6, 'Băng keo cá nhân', '', 'Bịch', 500, 1000, 4, NULL, 'MEDICAL', NULL, 0, 0, NULL, NULL),
(7, 'Tiffy', 'Mỗi buổi 1-2 viên', 'Viên', 1000, 200, 3, NULL, 'DRUG', 't4', 0, 0, NULL, NULL),
(9, 'Panadol Viên Sủi', 'Để tan trong nước, ngày 3 viên', 'Viên', 120000, 19, 1, NULL, 'DRUG', 't5', 0, 0, NULL, NULL),
(10, 'Nhóm 1', NULL, NULL, NULL, NULL, NULL, NULL, 'GROUP', 'n1', 1, 0, NULL, NULL),
(11, 'Đau đầu nhẹ', NULL, NULL, NULL, NULL, NULL, NULL, 'GROUP', 'd1', 1, 0, NULL, NULL),
(12, 'Đau đầu nặng', NULL, NULL, NULL, NULL, NULL, NULL, 'GROUP', 'd2', 1, 0, NULL, NULL),
(13, 'Cảm sốt nhẹ', NULL, NULL, NULL, NULL, NULL, NULL, 'GROUP', 'c1', 1, 0, NULL, NULL),
(14, 'đau bụng, chóng mặt', NULL, NULL, NULL, NULL, NULL, NULL, 'GROUP', 'D4', 1, 0, NULL, NULL),
(15, 'Thuốc lẻ 1', NULL, NULL, NULL, NULL, NULL, NULL, 'GROUP', 'd5', 1, 0, NULL, NULL),
(16, 'DD M', NULL, NULL, NULL, NULL, NULL, NULL, 'GROUP', 'd6', 1, 0, NULL, NULL),
(17, 'nafaco', NULL, 'Lọ', 200000, 100000, 8, 'tpcn', 'DRUG', 't6', 0, 0, NULL, NULL),
(18, 'babaroty', 'ngày uống 2 viên', 'Lọ', 120000, 10000, 14, NULL, 'DRUG', 't9', 0, 0, NULL, NULL),
(19, 'kháng khuẩn', 'bôi trên da bị thương', 'Hộp', 999, 9, 1, NULL, 'DRUG', 't7', 0, 0, NULL, NULL),
(20, 'Paracetamol A1', 'Trẻ em ngày 2 viên, người lớn 3-4 viênhelloooo ', 'Viên', 1000, 200, 1, NULL, 'DRUG', 't8', 0, 0, NULL, NULL),
(21, 'Pennicilin TECCO Pharma', 'Ngày 3 viên, sau bữa ăn', 'Viên', 1200, 400, 1, 'Pennicilin 1', 'DRUG', 'pennicilin1', 0, 0, NULL, NULL),
(22, 'Paracetamol 500mg Nafaco', 'Mỗi buổi 1-2 viên', 'Viên', 1000, 1500, 13, 'Paracetamol 500mg', 'DRUG', 'ParacetamolNafaco', 0, 0, NULL, NULL),
(23, 'augmentin 625', 'sáng uống 1 viên, tối uống 1 viên', 'Viên', 20000, 10000, 1, 'amoxicilline 625 mg', 'DRUG', 'ag625', 0, 0, NULL, NULL),
(24, 'totteri', 'Ngày uống 3 viên', 'Viên', 300000, 120000, 1, 'thực phẩm chức năng', 'DRUG', NULL, 0, 0, NULL, NULL),
(25, 'Paracetamol 625', NULL, NULL, 1500, 1000, NULL, NULL, 'DRUG', NULL, 0, 1, NULL, NULL),
(26, 'Paracetamol 500', NULL, NULL, 1700, 1000, NULL, NULL, 'DRUG', NULL, 0, 0, NULL, NULL),
(27, 'Hapacol 150', NULL, NULL, 2000, 1000, NULL, NULL, 'DRUG', NULL, 0, 1, NULL, NULL),
(28, 'Prozalic', 'Thuốc ngoài da', 'Lọ', 15000, 25000, 10, 'Prozalic', 'DRUG', 'prozalic', 0, 0, NULL, NULL),
(29, 'MAGNESI-B6', 'Ngay 3 viên', 'Viên', 500, 250, 15, 'B6', 'DRUG', 'MAGNESB6', 0, 0, NULL, NULL),
(30, 'Loratadine 10mg', 'Ngày 2 viên', 'Viên', 1000, 500, 10, 'Loratadin 10mg', 'DRUG', 'Loratadine10mg', 0, 0, NULL, NULL),
(31, 'Ống tiêm 50cc TCPharma', NULL, 'Cái', 5000, 3000, 17, NULL, 'MEDICAL', NULL, 0, 0, NULL, NULL),
(41, 'cvb', 'uong', 'Vỉ', NULL, NULL, 1, 'Kháng sinh Ampi', 'DRUG', 'L15', 0, 0, '1@4', NULL),
(42, 'Decolgen', NULL, 'Viên', NULL, NULL, 13, 'Paracetamon', 'DRUG', 'Decolgen', 0, 0, 'A4-6', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `drug_category`
--

CREATE TABLE `drug_category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `drug_type` varchar(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `drug_category`
--

INSERT INTO `drug_category` (`id`, `name`, `drug_type`) VALUES
(1, 'Kháng sinh', 'DRUG'),
(2, 'Thần kinh', 'DRUG'),
(3, 'Hô hấp', 'DRUG'),
(4, 'Sơ cứu', 'MEDICAL'),
(5, 'Tiêu hóa', 'DRUG'),
(6, 'Cơ xương khớp', 'DRUG'),
(7, 'Tiết niệu', 'DRUG'),
(8, 'Nội tiết', 'DRUG'),
(9, 'Tim mạch', 'DRUG'),
(10, 'Dị ứng', 'DRUG'),
(12, 'thuốc đỏ', 'MEDICAL'),
(13, 'Giảm đau', 'DRUG'),
(14, 'Kháng viêm', 'DRUG'),
(15, 'Thực phẩm chức năng', 'DRUG'),
(16, 'Mắt', 'DRUG'),
(17, 'Ống Tiêm', 'MEDICAL');

-- --------------------------------------------------------

--
-- Table structure for table `drug_store`
--

CREATE TABLE `drug_store` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `hospital_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `drug_store`
--

INSERT INTO `drug_store` (`id`, `name`, `description`, `hospital_id`) VALUES
(1, 'Kho Bình Tân', 'Kho Bình Tân', 3),
(2, 'Thanh Bình', 'Trị Liệu', 1),
(3, 'Quận 1', 'Quận 1', 2);

-- --------------------------------------------------------

--
-- Table structure for table `file_upload`
--

CREATE TABLE `file_upload` (
  `id` bigint(20) NOT NULL,
  `crm_table_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `crm_link_id` bigint(20) DEFAULT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `file_location` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `upload_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `file_upload`
--

INSERT INTO `file_upload` (`id`, `crm_table_name`, `crm_link_id`, `name`, `size`, `file_location`, `upload_by`) VALUES
(1, 'UserImage', 5, '2019-10-28-16-34-24_da0de7705cc9b697efd8.jpg', 99265, '/api/downloadUserImage/2019-10-28-16-34-24_da0de7705cc9b697efd8.jpg', 'admin@logsik.com'),
(2, 'UserImage', 4, '2019-10-28-17-08-40_da0de7705cc9b697efd8.jpg', 99265, '/api/downloadUserImage/2019-10-28-17-08-40_da0de7705cc9b697efd8.jpg', 'admin@logsik.com'),
(3, 'UserImage', 1, '2019-10-28-17-09-48_da0de7705cc9b697efd8.jpg', 99265, '/api/downloadUserImage/2019-10-28-17-09-48_da0de7705cc9b697efd8.jpg', 'admin@logsik.com'),
(4, 'UserLabourContract', 1, '2019-10-28-17-10-12_da0de7705cc9b697efd8.jpg', 99265, '/api/downloadUserProfile/2019-10-28-17-10-12_da0de7705cc9b697efd8.jpg', 'admin@logsik.com'),
(5, 'UserLabourContract', 1, '2019-10-28-17-11-59_bản kê khai năng lực kinh nghiệm.docx', 15650, '/api/downloadUserProfile/2019-10-28-17-11-59_bản kê khai năng lực kinh nghiệm.docx', 'admin@logsik.com'),
(7, 'DiagnosisReport', 1, '2019-10-29-11-07-55_da0de7705cc9b697efd8.jpg', 99265, '/api/downloadDiagnosisReportFile/2019-10-29-11-07-55_da0de7705cc9b697efd8.jpg', NULL),
(8, 'DiagnosisReport', 1, '2019-10-29-11-08-30_bản kê khai năng lực kinh nghiệm.docx', 15650, '/api/downloadDiagnosisReportFile/2019-10-29-11-08-30_bản kê khai năng lực kinh nghiệm.docx', NULL),
(9, 'DiagnosisReport', 2, '2019-10-29-13-59-40_da0de7705cc9b697efd8.jpg', 99265, '/api/downloadDiagnosisReportFile/2019-10-29-13-59-40_da0de7705cc9b697efd8.jpg', NULL),
(10, 'DiagnosisReport', 1, '2019-10-29-14-27-19_71169492_1400057336837020_5222058445225590784_o.jpg', 137692, '/api/downloadDiagnosisReportFile/2019-10-29-14-27-19_71169492_1400057336837020_5222058445225590784_o.jpg', NULL),
(11, 'UserImage', 7, '2019-11-15-08-53-21_f163adbbefad02f35bbc.jpg', 198233, '/api/downloadUserImage/2019-11-15-08-53-21_f163adbbefad02f35bbc.jpg', 'tphoainam@gmail.com'),
(12, 'DiagnosisReport', 34, '2019-12-04-10-54-32_banner-vamf-2019.jpg', 233638, '/api/downloadDiagnosisReportFile/2019-12-04-10-54-32_banner-vamf-2019.jpg', NULL),
(13, 'UserImage', 10, '2019-12-05-05-46-04_doctor-icon.png', 81854, '/api/downloadUserImage/2019-12-05-05-46-04_doctor-icon.png', 'admin@logsik.com');

-- --------------------------------------------------------

--
-- Table structure for table `help_comment`
--

CREATE TABLE `help_comment` (
  `id` bigint(20) NOT NULL,
  `help_ticket_id` bigint(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `attached_files` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `help_comment`
--

INSERT INTO `help_comment` (`id`, `help_ticket_id`, `created_by`, `content`, `attached_files`) VALUES
(1, 2, 1, 'Phân tích yêu cầu của bệnh nhân, hỏi thăm bệnh nhân kĩ càng, đưa ra giải pháp thích hợp.', NULL),
(2, 1, 1, 'Giải thích rõ cho bệnh nhân, nguyên tắc thuốc dùng rùi, không thể hoàn tiền. Chỉ hoàn tiền cho các thuốc còn nguyên bao bì, nhãn mác.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `help_ticket`
--

CREATE TABLE `help_ticket` (
  `id` bigint(20) NOT NULL,
  `reporter_id` bigint(20) NOT NULL,
  `question` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `assignee_id` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','PLANNED','QA','DONE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `help_ticket`
--

INSERT INTO `help_ticket` (`id`, `reporter_id`, `question`, `assignee_id`, `status`) VALUES
(1, 1, 'Benh nhan yeu cau hoan tien, nhung da dung thuoc.', 2, 'OPEN'),
(2, 1, 'Bệnh nhân yêu cầu', 2, 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `code` varchar(32) COLLATE utf8_bin NOT NULL,
  `has_active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`id`, `name`, `code`, `has_active`) VALUES
(1, 'Tân Bình', 'TB-HCM', 1),
(2, 'Quận 1 Hồ Chí Minh', 'Q1-HCM', 1),
(3, 'Bình Tân', 'TB-HCM', 1);

-- --------------------------------------------------------

--
-- Table structure for table `icd`
--

CREATE TABLE `icd` (
  `id` bigint(20) NOT NULL,
  `code` varchar(32) COLLATE utf8_bin NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `category_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `icd`
--

INSERT INTO `icd` (`id`, `code`, `name`, `category_id`) VALUES
(1, 'ICD1.1', 'Cảm cúm thông thường', 1),
(2, 'ICD2.1', 'Phong thấp mãn tính', 2),
(3, 'ICD3', 'Tim', 2),
(5, 'ICD1.1', 'Cảm cúm thông thường', 1),
(6, '113', 'HÔ HẤP', 1),
(7, '11111', 'Công Việc Test', 2);

-- --------------------------------------------------------

--
-- Table structure for table `icd_category`
--

CREATE TABLE `icd_category` (
  `id` bigint(20) NOT NULL,
  `category_name` varchar(1024) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `icd_category`
--

INSERT INTO `icd_category` (`id`, `category_name`) VALUES
(1, 'Cảm cúm'),
(2, 'Thấp khớp'),
(3, 'Tim'),
(4, 'Cảm cúm'),
(5, 'Cảm cúm'),
(6, '12');

-- --------------------------------------------------------

--
-- Table structure for table `input_form`
--

CREATE TABLE `input_form` (
  `id` bigint(20) NOT NULL,
  `drug_store_id` bigint(20) NOT NULL,
  `input_date` date NOT NULL,
  `created_user` bigint(20) NOT NULL,
  `validated_user` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','DONE','CANCELLED') NOT NULL DEFAULT 'OPEN'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `input_form`
--

INSERT INTO `input_form` (`id`, `drug_store_id`, `input_date`, `created_user`, `validated_user`, `status`) VALUES
(1, 1, '2019-12-04', 1, NULL, 'CANCELLED'),
(2, 2, '2019-12-04', 1, NULL, 'DONE'),
(3, 2, '2019-12-04', 1, NULL, 'DONE'),
(4, 1, '2019-12-05', 1, NULL, 'DONE'),
(5, 1, '2019-12-05', 1, NULL, 'DONE'),
(6, 2, '2019-12-05', 1, NULL, 'DONE'),
(7, 1, '2019-12-05', 1, NULL, 'DONE'),
(8, 2, '2019-12-05', 1, NULL, 'DONE'),
(9, 1, '2019-12-05', 1, NULL, 'OPEN'),
(10, 1, '2019-12-05', 1, NULL, 'DONE'),
(11, 1, '2019-12-05', 1, NULL, 'DONE'),
(12, 1, '2019-12-05', 1, NULL, 'DONE'),
(13, 1, '2019-12-05', 1, NULL, 'DONE'),
(14, 1, '2019-12-05', 1, NULL, 'DONE'),
(15, 1, '2019-12-05', 1, NULL, 'OPEN'),
(16, 1, '2019-12-05', 1, NULL, 'OPEN'),
(17, 1, '2019-12-05', 1, NULL, 'DONE'),
(18, 1, '2019-12-09', 6, NULL, 'OPEN'),
(19, 1, '2019-12-09', 6, NULL, 'OPEN'),
(20, 1, '2019-12-09', 6, NULL, 'DONE'),
(21, 1, '2019-12-09', 6, NULL, 'CANCELLED'),
(22, 1, '2019-12-09', 6, NULL, 'OPEN'),
(23, 3, '2019-12-10', 6, NULL, 'OPEN'),
(24, 2, '2019-12-10', 6, NULL, 'OPEN'),
(25, 1, '2019-12-12', 6, NULL, 'OPEN'),
(27, 1, '2019-12-16', 6, NULL, 'OPEN'),
(28, 1, '2019-12-17', 6, NULL, 'OPEN'),
(29, 1, '2019-12-17', 6, NULL, 'OPEN'),
(30, 1, '2019-12-17', 6, NULL, 'OPEN'),
(31, 2, '2019-12-17', 6, 6, 'DONE'),
(32, 3, '2019-12-17', 6, 6, 'DONE'),
(33, 1, '2019-12-17', 6, 6, 'DONE'),
(34, 3, '2019-12-17', 6, 6, 'DONE'),
(35, 2, '2019-12-24', 6, 6, 'DONE'),
(36, 3, '2019-12-24', 6, NULL, 'OPEN'),
(37, 2, '2019-12-25', 6, NULL, 'OPEN'),
(38, 2, '2019-12-26', 6, 6, 'DONE'),
(39, 2, '2019-12-26', 6, 6, 'DONE'),
(40, 1, '2019-12-26', 1, NULL, 'OPEN'),
(41, 1, '2019-12-26', 1, NULL, 'CANCELLED'),
(42, 1, '2019-12-30', 1, 1, 'DONE'),
(43, 1, '2019-12-30', 1, 1, 'DONE'),
(44, 1, '2019-12-30', 1, 1, 'DONE'),
(45, 1, '2019-12-30', 1, 1, 'DONE'),
(46, 1, '2019-12-30', 1, 1, 'DONE'),
(47, 1, '2019-12-30', 1, NULL, 'OPEN'),
(48, 1, '2019-12-30', 1, 1, 'DONE'),
(49, 1, '2019-12-30', 1, 1, 'DONE'),
(50, 1, '2019-12-30', 1, NULL, 'OPEN'),
(51, 1, '2019-12-30', 1, 1, 'DONE'),
(52, 1, '2020-01-07', 1, 1, 'DONE'),
(53, 1, '2020-01-07', 1, NULL, 'OPEN'),
(54, 1, '2020-01-08', 1, 1, 'DONE'),
(55, 1, '2020-01-08', 1, 1, 'DONE'),
(56, 1, '2020-01-08', 1, NULL, 'OPEN'),
(57, 1, '2020-01-08', 1, 1, 'DONE'),
(58, 1, '2020-01-10', 1, 1, 'DONE'),
(59, 1, '2020-01-10', 1, 1, 'DONE'),
(60, 1, '2020-01-10', 1, NULL, 'OPEN'),
(61, 1, '2020-01-10', 1, NULL, 'OPEN'),
(62, 1, '2020-01-10', 1, 1, 'DONE'),
(63, 1, '2020-01-10', 1, 1, 'DONE'),
(64, 1, '2020-01-10', 1, 1, 'DONE'),
(65, 1, '2020-01-16', 1, NULL, 'OPEN'),
(66, 2, '2020-01-16', 1, NULL, 'OPEN'),
(67, 2, '2020-01-17', 1, 1, 'DONE'),
(68, 1, '2020-01-21', 1, NULL, 'CANCELLED'),
(69, 2, '2020-02-03', 1, 1, 'DONE'),
(70, 3, '2020-02-03', 1, NULL, 'OPEN'),
(71, 2, '2020-02-03', 1, 1, 'DONE'),
(72, 2, '2020-02-03', 1, NULL, 'OPEN'),
(73, 2, '2020-02-10', 1, NULL, 'OPEN'),
(74, 1, '2020-02-11', 1, NULL, 'OPEN'),
(75, 1, '2020-02-11', 1, NULL, 'OPEN'),
(76, 1, '2020-02-11', 1, NULL, 'OPEN'),
(77, 2, '2020-02-12', 1, 1, 'DONE'),
(78, 1, '2020-02-19', 1, NULL, 'OPEN'),
(79, 2, '2020-02-19', 1, 1, 'DONE'),
(80, 2, '2020-02-19', 1, 1, 'DONE'),
(81, 3, '2020-02-19', 1, NULL, 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `input_stock`
--

CREATE TABLE `input_stock` (
  `id` bigint(20) NOT NULL,
  `drug_id` bigint(20) DEFAULT NULL,
  `input_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `input_amount` int(11) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `input_form_id` bigint(20) DEFAULT NULL,
  `remain_amount` int(11) DEFAULT NULL,
  `produced_date` date DEFAULT NULL,
  `batch_barcode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sale_price` bigint(20) NOT NULL,
  `import_price` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `input_stock`
--

INSERT INTO `input_stock` (`id`, `drug_id`, `input_date`, `expired_date`, `input_amount`, `drug_store_id`, `input_form_id`, `remain_amount`, `produced_date`, `batch_barcode`, `sale_price`, `import_price`) VALUES
(7, 1, '2019-10-31', '2019-11-02', 10, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(8, 2, '2019-10-31', '2019-11-02', 10, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(9, 1, '2019-11-12', '2019-12-12', 100, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(10, 1, '2019-11-12', '2020-02-07', 99999, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(11, 5, '2019-11-13', '2020-03-04', 1000, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(12, 2, '2019-11-13', '2019-11-15', 10000, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(13, 5, '2019-11-13', '2019-11-16', 9999, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(14, 4, '2019-11-13', '2019-12-21', 100, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(15, 7, '2019-11-13', '2019-11-30', 1000, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(16, 4, '2019-11-14', '2021-11-14', 1000, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(17, 1, '2019-11-27', '2019-11-30', 100, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(18, 2, '2019-11-28', '2021-11-28', 1000, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(19, 6, '2019-11-29', '2019-11-30', 14, 1, 1, 10, '2019-12-04', NULL, 1000, 200),
(20, 6, '2019-11-29', '2019-11-30', 12, 3, 2, 100, '2019-12-04', NULL, 1000, 200),
(21, 6, '2019-12-02', '2019-12-20', 90, 3, 2, 100, '2019-12-04', NULL, 1000, 2000),
(22, 2, '2019-12-04', '2019-12-31', 10000, 2, 2, 10000, '2019-12-04', 't2', 1000, 200),
(24, 1, '2019-12-04', '2020-01-04', 10000, 2, 3, 9900, '2019-12-04', 'l1', 1000, 200),
(27, 1, '2019-12-04', '2020-01-04', 10000, 1, 3, 9900, '2019-12-04', 'l2', 1000, 200),
(28, 5, '2019-12-05', '2019-12-05', 10000, 1, 7, 10000, '2019-12-05', 'l1', 1000, 200),
(29, 5, '2019-12-05', '2019-12-31', 10000, 2, 8, 9915, '2019-12-05', 'l1', 1000, 200),
(30, 20, '2019-12-05', '2021-12-05', 1000, 1, 10, 1000, '2019-11-01', 'l1001', 1500, 500),
(31, 2, '2019-12-05', '2022-12-05', 1000, 1, 10, 1000, '2019-12-01', 'l1002', 1200, 400),
(32, 21, '2019-12-05', '2022-12-05', 5000, 1, 11, 5000, '2019-12-02', '88880512201901', 1200, 400),
(33, 21, '2019-12-05', '2022-12-02', 10000, 1, 12, 10000, '2019-12-02', '88880512201902', 2500, 1000),
(34, 22, '2019-12-05', '2022-12-02', 5000, 1, 13, 5000, '2019-12-02', '88882612190001', 2500, 1000),
(35, 23, '2019-11-05', '2020-02-01', 1000, 1, 14, 900, '2019-12-05', '88880512033', 20000, 10000),
(37, 25, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880001261219', 1500, 1000),
(38, 2, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880002261219', 2000, 1000),
(39, 4, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880003261219', 3000, 1000),
(40, 23, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880004261219', 1500, 1000),
(41, 6, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880005261219', 2500, 1000),
(42, 9, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880006261219', 2000, 1000),
(43, 26, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880007261219', 1700, 1000),
(44, 27, '2019-12-17', '2020-10-31', 200, 1, 29, 200, '2019-10-31', '88880008261219', 2000, 1000),
(45, 25, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880001261219', 1500, 1000),
(46, 2, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880002261219', 2000, 1000),
(47, 4, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880003261219', 3000, 1000),
(48, 23, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880004261219', 1500, 1000),
(49, 6, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880005261219', 2500, 1000),
(50, 9, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880006261219', 2000, 1000),
(51, 26, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880007261219', 1700, 1000),
(52, 27, '2019-12-17', '2020-10-31', 200, 1, 30, 200, '2019-10-31', '88880008261219', 2000, 1000),
(53, 25, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880001261219', 1500, 1000),
(54, 2, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880002261219', 2000, 1000),
(55, 4, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880003261219', 3000, 1000),
(56, 23, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880004261219', 1500, 1000),
(57, 6, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880005261219', 2500, 1000),
(58, 9, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880006261219', 2000, 1000),
(59, 26, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880007261219', 1700, 1000),
(60, 27, '2019-12-17', '2020-10-31', 200, 2, 31, 200, '2019-10-31', '88880008261219', 2000, 1000),
(61, 28, '2019-12-30', '2021-10-31', 200, 1, 42, 200, '2019-10-31', '8936065621091', 25000, 15000),
(62, 29, '2019-12-30', '2021-10-31', 2000, 1, 43, 2000, '2019-10-31', '8888301219001', 500, 250),
(63, 30, '2019-12-30', '2021-10-31', 3000, 1, 43, 3000, '2019-10-31', '8936035310048', 1000, 500),
(64, 29, '2019-12-30', '2021-10-31', 1000, 1, 44, 1000, '2019-10-31', '8888301219001', 500, 250),
(65, 30, '2019-12-30', '2022-10-31', 1000, 1, 44, 1000, '2019-10-31', '8936035310048', 1000, 500),
(66, 30, '2019-12-30', '2020-10-31', 1000, 1, 45, 1000, '2019-10-31', '8936035310048', 2000, 1000),
(67, 30, '2019-12-30', '2020-10-31', 1000, 1, 46, 1000, '2019-10-31', '8936035310048', 1000, 2000),
(69, 30, '2019-12-30', '2020-10-31', 1000, 1, 48, 1000, '2019-10-31', '8936121920069', 3000, 1500),
(70, 30, '2019-12-30', '2021-12-23', 1500, 1, 51, 1500, '2019-12-23', '8888301219002', 5000, 3000),
(71, 2, '2020-01-13', '2020-01-14', 6, 1, 55, 6, '2020-01-07', 'L12', 345, 123),
(72, 4, '2020-01-20', '2020-01-14', 3, 1, 55, 3, '2020-01-06', 'L11', 2, 1),
(73, 1, '2020-01-10', '2020-01-30', 10000, 1, 59, 10000, '2020-01-09', '888001090119', 1000, 100),
(74, 23, '2020-01-10', '2022-01-10', 1000, 1, 62, 1000, '2020-01-10', '88880512033', 2000, 1000),
(75, 4, '2020-01-10', '2022-01-10', 1000, 1, 63, 700, '2020-01-10', '8888051219005', 10000, 5000),
(76, 6, '2020-01-10', '2022-01-10', 1200, 1, 64, 1200, '2020-01-10', '8311219001', 8000, 5000);

-- --------------------------------------------------------

--
-- Table structure for table `insurance_card`
--

CREATE TABLE `insurance_card` (
  `id` bigint(20) NOT NULL,
  `insurance_code` varchar(255) COLLATE utf8_bin NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `type_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `insurance_card`
--

INSERT INTO `insurance_card` (`id`, `insurance_code`, `patient_id`, `from_date`, `to_date`, `type_id`) VALUES
(1, 'CN 3 12 34567890', 1, '2019-09-01', '2024-10-10', 2),
(2, 'BH1002', 3, '2019-09-01', '2024-09-30', 1),
(7, 'DN 1234 5678 789', 12, '2019-12-29', '2020-12-29', 4),
(8, 'DN 1234 5678 787', 15, '2019-02-03', '2020-02-03', 4),
(9, '1234658790187', 16, '2019-10-23', '2020-12-29', 1),
(10, 'DN 1234 5678 789', 17, '2020-01-28', '2020-02-19', 1),
(11, 'c', 18, '2020-02-19', '2020-02-16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `insurance_company`
--

CREATE TABLE `insurance_company` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_invoice`
--

CREATE TABLE `insurance_invoice` (
  `id` bigint(20) NOT NULL,
  `invoice_id` bigint(20) NOT NULL,
  `responsible_user_id` bigint(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `insurance_refund_date` datetime DEFAULT NULL,
  `total_amount_no_vat` bigint(20) NOT NULL,
  `total_amount_with_vat` bigint(20) NOT NULL,
  `insurrance_amount` bigint(20) NOT NULL,
  `status` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `insurance_invoice`
--

INSERT INTO `insurance_invoice` (`id`, `invoice_id`, `responsible_user_id`, `created_date`, `insurance_refund_date`, `total_amount_no_vat`, `total_amount_with_vat`, `insurrance_amount`, `status`) VALUES
(1, 3, 2, '2019-11-12 00:00:00', '2019-11-12 00:00:00', 10000, 11000, 123, 'OPEN'),
(2, 1, 3, '2019-11-12 00:00:00', '2019-11-12 00:00:00', 10000, 10000, 10000, 'OPEN'),
(3, 26, 1, '2019-11-13 00:00:00', '2019-11-20 00:00:00', 12000, 10000, 122222, 'ok'),
(4, 52, 6, '2019-12-10 00:00:00', '2019-12-18 00:00:00', 12000000, 15000000, 20000, 'Done');

-- --------------------------------------------------------

--
-- Table structure for table `insurance_invoice_item`
--

CREATE TABLE `insurance_invoice_item` (
  `id` bigint(20) NOT NULL,
  `insurance_invoice_id` bigint(20) NOT NULL,
  `insurance_mapping_id` bigint(20) NOT NULL,
  `origin_amount` bigint(20) NOT NULL,
  `insurance_percent` int(11) NOT NULL,
  `insurance_amount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `insurance_invoice_item`
--

INSERT INTO `insurance_invoice_item` (`id`, `insurance_invoice_id`, `insurance_mapping_id`, `origin_amount`, `insurance_percent`, `insurance_amount`) VALUES
(3, 1, 1, 10000, 603333, 6000),
(4, 2, 1, 1000, 60, 6001),
(5, 0, 0, 0, 0, 0),
(6, 1, 1, 12222, 12, 7890);

-- --------------------------------------------------------

--
-- Table structure for table `insurance_mapping`
--

CREATE TABLE `insurance_mapping` (
  `id` bigint(20) NOT NULL,
  `drug_id` bigint(20) NOT NULL,
  `insurance_item_code` varchar(255) COLLATE utf8_bin NOT NULL,
  `start_date_valid` date NOT NULL,
  `end_date_valid` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `insurance_mapping`
--

INSERT INTO `insurance_mapping` (`id`, `drug_id`, `insurance_item_code`, `start_date_valid`, `end_date_valid`) VALUES
(1, 1, 'DN012345', '2019-10-27', '2019-11-13'),
(2, 2, '112', '2019-11-15', '2019-11-15'),
(3, 7, '11112', '2019-11-22', '2019-11-30'),
(4, 1, '111', '2019-11-25', '2019-11-30');

-- --------------------------------------------------------

--
-- Table structure for table `insurance_type`
--

CREATE TABLE `insurance_type` (
  `id` bigint(20) NOT NULL,
  `code` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `percent_paid` int(11) NOT NULL,
  `note` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `insurance_type`
--

INSERT INTO `insurance_type` (`id`, `code`, `name`, `percent_paid`, `note`) VALUES
(1, '1', 'BHYT 1 (100%)', 100, 'CC, TE'),
(2, '2', 'BHYT 2 (100%)', 100, 'CK, CB, KC, HN, DT, DK, XD, BT, TS (Giới hạn một số thuốc)'),
(3, '3', 'BHYT 3 (95%)', 95, 'HT, TC, CN'),
(4, '4', 'BHYT 4 (80%)', 80, 'DN, HX, CH, NN, TK, HC, XK, TB, NO, CT, XB, TN, CS, XN, MS, HD, TQ, TA, TY, HG, LS, PV, HS, SV, GB, GD'),
(5, '5', 'BHYT 5 (100%)', 100, 'QN, CA, CY (BH Tất cả)'),
(6, 'Trái tuyến (60%) 2018', 'Trái tuyến (60%) 2018', 60, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `responsible_user_id` bigint(20) NOT NULL,
  `cash_desk_id` bigint(20) DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `payment_date` datetime DEFAULT NULL,
  `total_amount_no_vat` bigint(20) NOT NULL,
  `total_amount_with_vat` bigint(20) NOT NULL,
  `insurrance_amount` bigint(20) NOT NULL,
  `status` varchar(64) COLLATE utf8_bin NOT NULL,
  `invoice_type` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bar_code` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `invoice_group` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `origin_invoice_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `patient_id`, `responsible_user_id`, `cash_desk_id`, `prescription_id`, `created_date`, `payment_date`, `total_amount_no_vat`, `total_amount_with_vat`, `insurrance_amount`, `status`, `invoice_type`, `bar_code`, `invoice_group`, `origin_invoice_id`) VALUES
(1, 2, 1, NULL, 7, '2019-09-25 05:47:48', '2019-12-24 10:24:24', 3000, 3000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(2, 1, 1, NULL, 1, '2019-09-25 06:02:26', NULL, 48000, 48000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(3, 1, 1, NULL, 8, '2019-09-25 07:27:33', '2020-01-10 11:23:11', 6000, 6000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(4, 1, 1, NULL, 3, '2019-10-25 19:40:43', NULL, 10000, 10000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(5, 1, 1, NULL, 3, '2019-10-25 20:22:14', NULL, 0, 0, 0, 'OPEN', 'DIAGNOSIS_SERVICE', NULL, NULL, NULL),
(6, 1, 1, NULL, 3, '2019-10-25 20:22:19', NULL, 12200000, 12200000, 0, 'CLOSED', 'PROCEDURE_SERVICE', NULL, NULL, NULL),
(7, 4, 1, NULL, 30, '2019-10-28 14:13:28', NULL, 400000, 400000, 0, 'CLOSED', 'DIAGNOSIS_SERVICE', NULL, NULL, NULL),
(8, 4, 1, NULL, 30, '2019-10-28 14:15:12', NULL, 20000, 20000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(9, 4, 1, NULL, 30, '2019-10-28 14:36:53', NULL, 2200000, 2200000, 0, 'CLOSED', 'PROCEDURE_SERVICE', NULL, NULL, NULL),
(10, 1, 1, NULL, 35, '2019-11-13 14:11:18', NULL, 10000, 10000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(11, 1, 1, NULL, 4, '2019-11-13 19:28:38', NULL, 2000, 2000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(12, 1, 1, NULL, 9, '2019-11-13 19:38:57', NULL, 10000, 10000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(15, 1, 1, NULL, 10, '2019-11-13 20:32:51', NULL, 63000, 63000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(17, NULL, 1, NULL, 38, '2019-11-13 21:28:54', '2019-12-24 10:46:54', 9000, 9000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(18, NULL, 1, NULL, 39, '2019-11-13 21:30:56', NULL, 18000, 18000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(24, NULL, 1, NULL, 45, '2019-11-14 04:50:45', '2020-01-10 12:07:40', 4500, 4500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(25, NULL, 1, NULL, 46, '2019-11-14 04:52:25', NULL, 4500, 4500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(26, NULL, 1, NULL, 47, '2019-11-14 04:53:59', NULL, 4500, 4500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(27, NULL, 1, NULL, 48, '2019-11-14 05:00:29', NULL, 4500, 4500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(28, NULL, 1, NULL, 49, '2019-11-14 08:12:52', NULL, 22500, 22500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(29, NULL, 1, NULL, 50, '2019-11-14 08:24:52', '2019-12-24 09:41:38', 22500, 22500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(30, NULL, 6, NULL, 54, '2019-11-14 17:13:04', NULL, 0, 0, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(31, NULL, 6, NULL, 55, '2019-11-14 17:15:49', NULL, 0, 0, 0, 'OPEN', 'DRUG', NULL, NULL, NULL),
(32, NULL, 6, NULL, 60, '2019-11-14 17:24:47', NULL, 4500, 4500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(33, NULL, 6, NULL, 61, '2019-11-14 17:25:57', '2019-12-24 09:32:45', 1500, 1500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(34, NULL, 6, NULL, 64, '2019-11-14 17:29:01', NULL, 0, 0, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(35, NULL, 6, NULL, 65, '2019-11-14 17:29:37', NULL, 0, 0, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(36, NULL, 6, NULL, 89, '2019-11-25 08:34:09', NULL, 0, 0, 0, 'OPEN', 'DRUG', NULL, NULL, NULL),
(37, NULL, 6, NULL, 92, '2019-11-25 08:41:00', NULL, 0, 0, 0, 'OPEN', 'DRUG', NULL, NULL, NULL),
(38, NULL, 6, NULL, 93, '2019-11-25 09:03:19', NULL, 0, 0, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(39, NULL, 1, NULL, 99, '2019-11-26 07:00:50', NULL, 19500, 19500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(40, NULL, 1, NULL, 100, '2019-11-26 08:42:12', NULL, 16500, 16500, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(41, NULL, 1, NULL, 101, '2019-11-26 08:50:01', NULL, 14000, 14000, 0, 'CLOSED', 'DRUG', NULL, NULL, NULL),
(42, NULL, 1, NULL, 102, '2019-11-26 09:02:08', NULL, 12000, 12000, 0, 'OPEN', 'DRUG', NULL, NULL, NULL),
(43, NULL, 1, NULL, 106, '2019-11-28 09:20:39', NULL, 25000, 25000, 0, 'OPEN', 'DRUG', NULL, NULL, NULL),
(44, 1, 1, NULL, 1, '2019-11-28 22:58:43', NULL, 32200000, 32200000, 0, 'OPEN', 'PROCEDURE_SERVICE', NULL, NULL, NULL),
(45, 6, 1, NULL, 107, '2019-11-28 23:00:34', '2019-12-04 00:00:00', 10000, 10000, 0, 'CLOSED', 'DIAGNOSIS_SERVICE', 'Hoá đơn số', NULL, NULL),
(46, 1, 1, NULL, 29, '2019-11-29 09:07:26', NULL, 2000, 2000, 0, 'OPEN', 'DRUG', NULL, NULL, NULL),
(47, NULL, 1, NULL, 117, '2019-12-03 09:07:47', NULL, 20000, 20000, 0, 'CLOSED', 'DRUG', 'HDT47', NULL, NULL),
(48, NULL, 1, NULL, 118, '2019-12-03 12:03:48', NULL, 306000, 306000, 0, 'CLOSED', 'DRUG', 'HDT48', NULL, NULL),
(49, NULL, 1, NULL, 125, '2019-12-04 13:12:57', NULL, 20000, 20000, 0, 'CLOSED', 'DRUG', 'HDT49', NULL, NULL),
(50, NULL, 1, NULL, 127, '2019-12-04 22:49:20', NULL, 20000, 20000, 0, 'CLOSED', 'DRUG', 'HDT50', NULL, NULL),
(51, 4, 1, NULL, 124, '2019-12-04 22:51:33', '2019-12-04 00:00:00', 50000, 50000, 50000, 'CLOSED', 'DRUG', 'Hoá đơn số', NULL, NULL),
(52, NULL, 1, NULL, 128, '2019-12-04 22:55:02', NULL, 20000, 20000, 0, 'CLOSED', 'DRUG', 'HDT52', NULL, NULL),
(53, 6, 6, NULL, 119, '2019-12-04 22:56:11', '2019-12-04 00:00:00', 1000, 1000, 1000, 'CLOSED', 'DIAGNOSIS_SERVICE', 'Hoá đơn số', NULL, NULL),
(54, NULL, 1, NULL, 129, '2019-12-04 22:59:15', NULL, 40000, 40000, 0, 'CLOSED', 'DRUG', 'HDT54', NULL, NULL),
(55, 1, 1, NULL, 121, '2019-12-04 23:00:16', NULL, 22000, 22000, 0, 'CLOSED', 'DRUG', 'HDT55', NULL, NULL),
(56, 1, 1, NULL, 120, '2019-12-05 03:12:03', '2019-12-05 00:00:00', 100000, 100000, 100000, 'CLOSED', 'DRUG', 'Hoá đơn số', NULL, NULL),
(57, 6, 1, NULL, 119, '2019-12-05 03:15:53', NULL, 24500, 24500, 0, 'CLOSED', 'DRUG', 'HDT57', NULL, NULL),
(58, NULL, 1, NULL, 130, '2019-12-05 03:17:15', NULL, 1974000, 1974000, 0, 'CLOSED', 'DRUG', 'HDT58', NULL, NULL),
(59, NULL, 1, NULL, 131, '2019-12-05 03:38:59', NULL, 394500, 394500, 0, 'CLOSED', 'DRUG', 'HDT59', NULL, NULL),
(60, NULL, 1, NULL, 132, '2019-12-05 03:40:08', NULL, 817000, 817000, 0, 'CLOSED', 'DRUG', 'HDT60', NULL, NULL),
(61, NULL, 1, NULL, 133, '2019-12-05 03:53:06', NULL, 15000, 15000, 0, 'CLOSED', 'DRUG', 'HDT61', NULL, NULL),
(62, 6, 1, NULL, 134, '2019-12-05 03:55:15', '2019-12-05 05:00:00', 21000, 21000, 21000, 'CLOSED', 'DRUG', 'Hoá đơn số', NULL, NULL),
(63, 4, 1, NULL, 135, '2019-12-05 03:59:17', NULL, 42000, 42000, 0, 'CLOSED', 'DRUG', 'HDT63', NULL, NULL),
(64, 7, 1, NULL, 136, '2019-12-05 04:01:22', '2019-01-05 04:15:00', 21000, 21000, 21000, 'CLOSED', 'DRUG', 'Hoá đơn số', NULL, NULL),
(65, NULL, 1, NULL, 140, '2019-12-05 05:38:36', NULL, 9000, 9000, 0, 'CLOSED', 'DRUG', 'HDT65', NULL, NULL),
(66, NULL, 1, NULL, 141, '2019-12-05 05:40:30', NULL, 6000, 6000, 0, 'CLOSED', 'DRUG', 'HDT66', NULL, NULL),
(67, NULL, 1, NULL, 142, '2019-12-05 05:41:36', NULL, 6000, 6000, 0, 'CLOSED', 'DRUG', 'HDT67', NULL, NULL),
(68, NULL, 10, NULL, 144, '2019-12-05 06:03:08', NULL, 12000, 12000, 0, 'OPEN', 'DRUG', 'HDT68', NULL, NULL),
(69, NULL, 10, NULL, 145, '2019-12-05 06:11:28', NULL, 12000, 12000, 0, 'CLOSED', 'DRUG', 'HDT69', NULL, NULL),
(70, NULL, 10, NULL, 147, '2019-12-05 06:13:11', NULL, 18000, 18000, 0, 'CLOSED', 'DRUG', 'HDT70', NULL, NULL),
(71, NULL, 10, NULL, 148, '2019-12-05 06:32:46', NULL, 7200, 7200, 0, 'CLOSED', 'DRUG', 'HDT71', NULL, NULL),
(72, NULL, 10, NULL, 149, '2019-12-05 08:33:37', NULL, 6000, 6000, 0, 'CLOSED', 'DRUG', 'HDT72', NULL, NULL),
(73, NULL, 10, NULL, 150, '2019-12-05 08:45:20', NULL, 100000, 100000, 0, 'CLOSED', 'DRUG', 'HDT73', NULL, NULL),
(74, NULL, 10, NULL, 152, '2019-12-05 08:54:48', NULL, 210000, 210000, 0, 'CLOSED', 'DRUG', 'HDT74', NULL, NULL),
(75, 6, 6, NULL, 107, '2019-12-05 08:56:53', NULL, 2000, 2000, 0, 'CLOSED', 'DRUG', 'HDT75', NULL, NULL),
(76, 1, 1, NULL, 170, '2019-12-24 11:01:09', '2019-12-24 11:01:39', 10000, 10000, 0, 'CLOSED', 'DRUG', 'HDT76', NULL, NULL),
(77, 6, 1, NULL, 171, '2019-12-24 14:57:43', '2019-12-24 15:01:06', 48000, 48000, 0, 'CLOSED', 'DRUG', 'HDT77', NULL, NULL),
(78, 7, 1, NULL, 172, '2019-12-24 15:06:09', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT78', NULL, NULL),
(79, 6, 6, NULL, 173, '2019-12-25 09:46:55', '2019-12-25 09:47:00', 48000, 48000, 0, 'CLOSED', 'DRUG', 'HDT79', NULL, NULL),
(80, 6, 6, NULL, 180, '2019-12-27 09:53:32', NULL, 48000, 48000, 0, 'OPEN', 'DRUG', 'HDT80', NULL, NULL),
(81, 7, 6, NULL, 181, '2019-12-27 09:56:45', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT81', NULL, NULL),
(82, 1, 6, NULL, 182, '2019-12-27 09:59:25', NULL, 34000, 34000, 0, 'OPEN', 'DRUG', 'HDT82', NULL, NULL),
(83, 1, 6, NULL, 182, '2019-12-27 10:00:40', NULL, 12200000, 12200000, 0, 'OPEN', 'PROCEDURE_SERVICE', 'HPT83', NULL, NULL),
(84, 1, 6, NULL, 182, '2019-12-27 10:00:57', NULL, 0, 0, 0, 'OPEN', 'DIAGNOSIS_SERVICE', 'HXN84', NULL, NULL),
(85, NULL, 1, NULL, 184, '2019-12-30 07:03:26', '2019-12-30 07:03:37', 15000, 15000, 0, 'CLOSED', 'DRUG', 'HDT85', NULL, NULL),
(86, NULL, 1, NULL, 185, '2019-12-30 08:26:13', '2019-12-30 08:26:18', 13500, 13500, 0, 'CLOSED', 'DRUG', 'HDT86', NULL, NULL),
(87, NULL, 1, NULL, 186, '2019-12-30 08:31:21', '2019-12-30 08:31:27', 3991000, 3991000, 0, 'CLOSED', 'DRUG', 'HDT87', NULL, NULL),
(88, NULL, 1, NULL, 187, '2019-12-30 08:35:32', '2019-12-30 08:35:36', 1000000, 1000000, 0, 'CLOSED', 'DRUG', 'HDT88', NULL, NULL),
(89, NULL, 1, NULL, 189, '2019-12-30 08:38:43', '2019-12-30 08:38:45', 900000, 900000, 0, 'CLOSED', 'DRUG', 'HDT89', NULL, NULL),
(90, NULL, 1, NULL, 190, '2019-12-30 08:47:34', '2019-12-30 08:47:41', 15000, 15000, 0, 'CLOSED', 'DRUG', 'HDT90', NULL, NULL),
(91, 3, 6, NULL, 192, '2019-12-30 11:09:54', '2019-12-30 11:10:21', 48000, 48000, 0, 'CLOSED', 'DRUG', 'HDT91', NULL, NULL),
(92, 7, 6, NULL, 194, '2019-12-30 14:01:22', NULL, 0, 0, 0, 'OPEN', 'DIAGNOSIS_SERVICE', 'HXN92', NULL, NULL),
(93, NULL, 1, NULL, 184, '2019-12-30 14:55:02', NULL, -15000, -15000, 0, 'OPEN', 'DRUG', NULL, 'REFUND', 85),
(94, NULL, 1, NULL, 184, '2019-12-30 14:55:47', NULL, -15000, -15000, 0, 'OPEN', 'DRUG', NULL, 'REFUND', 85),
(95, NULL, 1, NULL, 185, '2019-12-30 14:58:19', NULL, -13500, -13500, 0, 'OPEN', 'DRUG', NULL, 'REFUND', 86),
(96, 7, 4, NULL, 210, '2020-01-08 17:20:23', NULL, 48000, 48000, 0, 'OPEN', 'DRUG', 'HDT00000096', NULL, NULL),
(97, NULL, 10, NULL, 211, '2020-01-09 16:15:38', '2020-01-09 16:15:40', 6000, 6000, 0, 'CLOSED', 'DRUG', 'HDT00000097', NULL, NULL),
(98, NULL, 1, NULL, 212, '2020-01-09 16:17:29', '2020-01-09 16:17:39', 6000, 6000, 0, 'CLOSED', 'DRUG', 'HDT00000098', NULL, NULL),
(99, NULL, 10, NULL, 213, '2020-01-09 16:18:51', '2020-01-09 16:18:53', 6000, 6000, 0, 'CLOSED', 'DRUG', 'HDT00000099', NULL, NULL),
(100, NULL, 1, NULL, 214, '2020-01-09 16:38:58', '2020-01-09 16:39:01', 4000, 4000, 0, 'CLOSED', 'DRUG', 'HDT00000100', NULL, NULL),
(101, NULL, 1, NULL, 219, '2020-01-09 16:49:58', '2020-01-09 16:50:00', 100000, 100000, 0, 'CLOSED', 'DRUG', 'HDT00000101', NULL, NULL),
(102, NULL, 1, NULL, 220, '2020-01-10 06:59:03', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT00000102', NULL, NULL),
(103, NULL, 1, NULL, 221, '2020-01-10 06:59:22', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT00000103', NULL, NULL),
(104, NULL, 1, NULL, 222, '2020-01-10 06:59:40', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT00000104', NULL, NULL),
(105, NULL, 1, NULL, 223, '2020-01-10 07:04:58', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT00000105', NULL, NULL),
(106, NULL, 1, NULL, 224, '2020-01-10 07:05:27', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT00000106', NULL, NULL),
(107, NULL, 1, NULL, 225, '2020-01-10 07:06:36', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT00000107', NULL, NULL),
(108, NULL, 1, NULL, 226, '2020-01-10 07:15:13', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HDT00000108', NULL, NULL),
(109, NULL, 1, NULL, 227, '2020-01-10 07:49:10', '2020-01-10 07:49:12', 120000, 120000, 0, 'CLOSED', 'DRUG', 'HDT00000109', NULL, NULL),
(110, NULL, 1, NULL, 228, '2020-01-10 08:45:52', '2020-01-10 08:45:57', 17700000, 17700000, 0, 'CLOSED', 'DRUG', 'HDT00000110', NULL, NULL),
(111, NULL, 1, NULL, 230, '2020-01-10 09:02:15', '2020-01-10 09:02:19', 8, 8, 0, 'CLOSED', 'DRUG', 'HDT00000111', NULL, NULL),
(112, 2, 1, NULL, 7, '2020-01-10 09:31:52', NULL, -1500, -1500, 0, 'OPEN', 'DRUG', NULL, 'REFUND', 1),
(114, 1, 1, NULL, 29, '2020-01-13 16:27:58', '2020-01-13 16:23:57', -1500, -1500, 0, 'CLOSED', 'DRUG', NULL, 'REFUND', 46),
(115, 1, 1, NULL, 10, '2020-01-13 16:29:23', NULL, -2000, -2000, 0, 'OPEN', 'DRUG', NULL, 'REFUND', 15),
(116, NULL, 1, NULL, 250, '2020-01-15 17:08:22', '2020-01-15 17:08:49', 120400, 120400, 0, 'CLOSED', 'DRUG', 'HD00000116', NULL, NULL),
(117, NULL, 1, NULL, 251, '2020-01-15 17:10:51', '2020-01-15 17:11:35', 123000, 123000, 0, 'CLOSED', 'DRUG', 'HD00000117', NULL, NULL),
(118, NULL, 1, NULL, 252, '2020-01-15 17:13:03', '2020-01-15 17:13:47', 83000, 83000, 0, 'CLOSED', 'DRUG', 'HD00000118', NULL, NULL),
(119, NULL, 1, NULL, 253, '2020-01-15 17:14:38', '2020-01-15 17:14:41', 56000, 56000, 0, 'CLOSED', 'DRUG', 'HD00000119', NULL, NULL),
(120, NULL, 1, NULL, 258, '2020-01-16 09:36:28', '2020-01-16 09:36:30', 0, 0, 0, 'CLOSED', 'DRUG', 'HD00000120', NULL, NULL),
(121, 3, 1, NULL, 241, '2020-01-16 09:36:48', NULL, 20000000, 20000000, 0, 'OPEN', 'PROCEDURE_SERVICE', 'HD00000121', NULL, NULL),
(122, 3, 1, NULL, 241, '2020-01-16 09:36:58', NULL, 0, 0, 0, 'OPEN', 'DIAGNOSIS_SERVICE', 'HD00000122', NULL, NULL),
(123, 3, 1, NULL, 241, '2020-01-16 09:37:16', NULL, 20000, 20000, 0, 'OPEN', 'DRUG', 'HD00000123', NULL, NULL),
(124, NULL, 1, NULL, 259, '2020-01-16 09:54:03', '2020-01-16 09:54:07', 200000, 200000, 0, 'CLOSED', 'DRUG', 'HD00000124', NULL, NULL),
(125, NULL, 1, NULL, 260, '2020-01-16 10:00:11', '2020-01-16 10:00:13', 281000, 281000, 0, 'CLOSED', 'DRUG', 'HD00000125', NULL, NULL),
(126, 3, 1, NULL, 261, '2020-01-17 10:46:17', NULL, 0, 0, 0, 'OPEN', 'DIAGNOSIS_SERVICE', 'HD00000126', NULL, NULL),
(127, 3, 1, NULL, 261, '2020-01-17 10:47:20', NULL, 0, 0, 0, 'OPEN', 'DRUG', 'HD00000127', NULL, NULL),
(128, 3, 1, NULL, 261, '2020-01-17 10:47:35', '2020-01-17 10:47:50', 2000000, 2000000, 0, 'CLOSED', 'PROCEDURE_SERVICE', 'HD00000128', NULL, NULL),
(129, 6, 1, NULL, 269, '2020-01-21 11:08:57', '2020-01-21 11:10:11', 98000, 98000, 0, 'CLOSED', 'DRUG', 'HD00000129', NULL, NULL),
(130, 6, 1, NULL, 269, '2020-02-03 14:31:20', NULL, -90000, -90000, 0, 'OPEN', 'DRUG', NULL, 'REFUND', 129),
(131, NULL, 1, NULL, 274, '2020-02-03 14:58:29', '2020-02-03 14:58:32', 18000, 18000, 0, 'CLOSED', 'DRUG', 'HD00000131', NULL, NULL),
(132, NULL, 1, NULL, 275, '2020-02-03 15:00:07', '2020-02-03 15:00:38', 16000, 16000, 0, 'CLOSED', 'DRUG', 'HD00000132', NULL, NULL),
(133, NULL, 1, NULL, 276, '2020-02-03 15:01:46', NULL, 20000, 20000, 0, 'OPEN', 'DRUG', 'HD00000133', NULL, NULL),
(134, NULL, 1, NULL, 278, '2020-02-04 10:08:06', '2020-02-04 10:08:09', 13000, 13000, 0, 'CLOSED', 'DRUG', 'HD00000134', NULL, NULL),
(135, NULL, 1, NULL, 293, '2020-02-11 10:28:04', '2020-02-11 10:28:18', 250000, 250000, 0, 'CLOSED', 'DRUG', 'HD00000135', NULL, NULL),
(136, NULL, 1, NULL, 295, '2020-02-11 10:29:03', '2020-02-11 10:29:24', 250000, 250000, 0, 'CLOSED', 'DRUG', 'HD00000136', NULL, NULL),
(137, NULL, 1, NULL, 296, '2020-02-11 10:29:54', NULL, 250000, 250000, 0, 'OPEN', 'DRUG', 'HD00000137', NULL, NULL),
(138, NULL, 1, NULL, 297, '2020-02-11 10:30:22', '2020-02-11 10:30:33', 250000, 250000, 0, 'CLOSED', 'DRUG', 'HD00000138', NULL, NULL),
(139, NULL, 1, NULL, 305, '2020-02-12 10:05:41', NULL, 16000, 16000, 0, 'OPEN', 'DRUG', 'HD00000139', NULL, NULL),
(140, 6, 1, NULL, 310, '2020-02-13 11:41:40', '2020-02-13 11:55:51', 200600, 200600, 0, 'CLOSED', 'DRUG', 'HD00000140', NULL, NULL),
(141, 7, 1, NULL, 311, '2020-02-13 11:57:59', '2020-02-13 11:59:21', 800000, 800000, 0, 'CLOSED', 'DRUG', 'HD00000141', NULL, NULL),
(142, 13, 1, NULL, 312, '2020-02-13 12:00:58', NULL, 40000, 40000, 0, 'OPEN', 'DRUG', 'HD00000142', NULL, NULL),
(143, 1, 6, NULL, 79, '2020-02-16 18:06:15', '2020-02-16 18:06:42', 0, 0, 0, 'CLOSED', 'DRUG', 'HD00000143', NULL, NULL),
(144, NULL, 1, NULL, 313, '2020-02-19 15:45:39', NULL, 11000, 11000, 0, 'OPEN', 'DRUG', 'HD00000144', NULL, NULL),
(145, NULL, 1, NULL, 315, '2020-02-19 16:07:32', '2020-02-19 16:07:48', 49000, 49000, 0, 'CLOSED', 'DRUG', 'HD00000145', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item`
--

CREATE TABLE `invoice_item` (
  `id` bigint(20) NOT NULL,
  `invoice_id` bigint(20) NOT NULL,
  `diagnosis_service_id` bigint(20) DEFAULT NULL,
  `procedure_service_id` bigint(20) DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL,
  `number_of_items` int(11) NOT NULL,
  `amount_no_vat` bigint(20) NOT NULL,
  `amount_with_vat` bigint(20) NOT NULL,
  `input_stock_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `invoice_item`
--

INSERT INTO `invoice_item` (`id`, `invoice_id`, `diagnosis_service_id`, `procedure_service_id`, `prescription_id`, `number_of_items`, `amount_no_vat`, `amount_with_vat`, `input_stock_id`) VALUES
(12, 3, NULL, NULL, 8, 12, 6000, 6000, 27),
(28, 4, NULL, NULL, 3, 4, 2000, 2000, 27),
(29, 4, NULL, NULL, 3, 4, 8000, 8000, 71),
(30, 5, 1, NULL, 3, 1, 0, 0, NULL),
(31, 5, 2, NULL, 3, 1, 0, 0, NULL),
(32, 6, NULL, 1, 3, 1, 200000, 200000, NULL),
(33, 6, NULL, 2, 3, 1, 2000000, 2000000, NULL),
(34, 6, NULL, 3, 3, 1, 10000000, 10000000, NULL),
(37, 8, NULL, NULL, 30, 8, 4000, 4000, 27),
(38, 8, NULL, NULL, 30, 8, 16000, 16000, 71),
(39, 9, NULL, 1, 30, 1, 200000, 200000, NULL),
(40, 9, NULL, 2, 30, 1, 2000000, 2000000, 27),
(41, 7, 3, NULL, 30, 1, 400000, 400000, NULL),
(42, 9, 1, 1, 1, 4, 123123, 11000, 27),
(51, 2, NULL, NULL, 1, 32, 16000, 16000, 27),
(52, 2, NULL, NULL, 1, 16, 32000, 32000, 71),
(53, 1, NULL, NULL, 7, 6, 3000, 3000, 27),
(54, 10, NULL, NULL, 35, 4, 2000, 2000, 27),
(55, 10, NULL, NULL, 35, 4, 8000, 8000, 71),
(56, 11, NULL, NULL, 4, 4, 2000, 2000, 72),
(57, 12, NULL, NULL, 9, 12, 6000, 6000, 27),
(58, 12, NULL, NULL, 9, 4, 2000, 2000, 27),
(59, 12, NULL, NULL, 9, 4, 2000, 2000, 72),
(60, 15, NULL, NULL, 10, 14, 7000, 7000, 27),
(61, 15, NULL, NULL, 10, 28, 56000, 56000, 71),
(64, 16, NULL, NULL, 37, 9, 9000, 9000, 29),
(65, 16, NULL, NULL, 37, 9, 4500, 4500, 27),
(66, 17, NULL, NULL, 38, 9, 9000, 9000, 29),
(67, 18, NULL, NULL, 39, 9, 9000, 9000, 29),
(68, 18, NULL, NULL, 39, 9, 9000, 9000, 29),
(71, 19, NULL, NULL, 40, 9, 4500, 4500, 27),
(72, 19, NULL, NULL, 40, 9, 9000, 9000, 29),
(77, 20, NULL, NULL, 41, 9, 4500, 4500, 27),
(78, 21, NULL, NULL, 42, 9, 4500, 4500, 27),
(79, 22, NULL, NULL, 43, 9, 4500, 4500, 27),
(80, 23, NULL, NULL, 44, 9, 4500, 4500, 27),
(81, 24, NULL, NULL, 45, 9, 4500, 4500, 27),
(82, 25, NULL, NULL, 46, 9, 4500, 4500, 27),
(83, 26, NULL, NULL, 47, 9, 4500, 4500, 27),
(84, 27, NULL, NULL, 48, 9, 4500, 4500, 27),
(89, 28, NULL, NULL, 49, 9, 4500, 4500, 27),
(90, 28, NULL, NULL, 49, 9, 18000, 18000, 71),
(91, 29, NULL, NULL, 50, 9, 4500, 4500, 27),
(92, 29, NULL, NULL, 50, 9, 18000, 18000, 71),
(93, 32, NULL, NULL, 60, 9, 4500, 4500, 27),
(95, 33, NULL, NULL, 61, 3, 1500, 1500, 27),
(96, 39, NULL, NULL, 99, 3, 1500, 1500, 27),
(97, 39, NULL, NULL, 99, 6, 12000, 12000, 71),
(98, 39, NULL, NULL, 99, 6, 6000, 6000, 29),
(99, 40, NULL, NULL, 100, 3, 1500, 1500, 27),
(100, 40, NULL, NULL, 100, 6, 12000, 12000, 71),
(101, 40, NULL, NULL, 100, 3, 3000, 3000, 15),
(102, 41, NULL, NULL, 101, 4, 2000, 2000, 27),
(103, 41, NULL, NULL, 101, 6, 12000, 12000, 71),
(104, 42, NULL, NULL, 102, 6, 12000, 12000, 71),
(105, 43, NULL, NULL, 106, 10, 5000, 5000, 27),
(106, 43, NULL, NULL, 106, 10, 20000, 20000, 71),
(107, 44, NULL, 1, 1, 1, 200000, 200000, NULL),
(108, 44, NULL, 3, 1, 1, 10000000, 10000000, NULL),
(109, 44, NULL, 2, 1, 1, 2000000, 2000000, NULL),
(110, 44, NULL, 4, 1, 1, 20000000, 20000000, NULL),
(112, 45, 1, NULL, 107, 1, 0, 0, NULL),
(113, 46, NULL, NULL, 29, 4, 2000, 2000, 27),
(114, 47, NULL, NULL, 117, 10, 20000, 20000, 71),
(115, 48, NULL, NULL, 118, 30, 60000, 60000, 71),
(116, 48, NULL, NULL, 118, 123, 246000, 246000, 71),
(118, 49, NULL, NULL, 125, 10, 20000, 20000, 71),
(119, 50, NULL, NULL, 127, 10, 20000, 20000, 71),
(124, 51, NULL, NULL, 124, 32, 16000, 16000, 27),
(125, 51, NULL, NULL, 124, 16, 32000, 32000, 71),
(126, 51, NULL, NULL, 124, 4, 2000, 2000, 27),
(127, 51, NULL, NULL, 124, 32, 16000, 16000, 27),
(128, 52, NULL, NULL, 128, 10, 20000, 20000, 71),
(129, 53, 2, NULL, 119, 1, 0, 0, NULL),
(130, 53, 4, NULL, 119, 1, 0, 0, NULL),
(131, 54, NULL, NULL, 129, 20, 40000, 40000, 71),
(132, 55, NULL, NULL, 121, 8, 4000, 4000, 27),
(133, 55, NULL, NULL, 121, 4, 2000, 2000, 72),
(134, 55, NULL, NULL, 121, 12, 6000, 6000, 27),
(135, 55, NULL, NULL, 121, 12, 6000, 6000, 27),
(136, 55, NULL, NULL, 121, 4, 2000, 2000, 72),
(137, 55, NULL, NULL, 121, 4, 2000, 2000, 27),
(142, 56, NULL, NULL, 120, 32, 16000, 16000, 27),
(143, 56, NULL, NULL, 120, 16, 32000, 32000, 71),
(144, 56, NULL, NULL, 120, 4, 2000, 2000, 27),
(145, 56, NULL, NULL, 120, 32, 16000, 16000, 27),
(146, 57, NULL, NULL, 119, 49, 24500, 24500, 27),
(147, 58, NULL, NULL, 130, 987, 1974000, 1974000, 71),
(148, 59, NULL, NULL, 131, 789, 394500, 394500, 27),
(149, 60, NULL, NULL, 132, 100, 200000, 200000, 71),
(150, 60, NULL, NULL, 132, 1234, 617000, 617000, 27),
(151, 61, NULL, NULL, 133, 15, 15000, 15000, 29),
(152, 63, NULL, NULL, 135, 21, 42000, 42000, 71),
(153, 65, NULL, NULL, 140, 3, 3000, 3000, 30),
(154, 65, NULL, NULL, 140, 3, 6000, 6000, 71),
(155, 66, NULL, NULL, 141, 6, 6000, 6000, 30),
(156, 67, NULL, NULL, 142, 6, 6000, 6000, 30),
(157, 68, NULL, NULL, 144, 6, 6000, 6000, 30),
(158, 68, NULL, NULL, 144, 3, 6000, 6000, 71),
(159, 69, NULL, NULL, 145, 6, 6000, 6000, 30),
(160, 69, NULL, NULL, 145, 3, 6000, 6000, 71),
(161, 70, NULL, NULL, 147, 6, 6000, 6000, 30),
(162, 70, NULL, NULL, 147, 6, 12000, 12000, 71),
(163, 71, NULL, NULL, 148, 6, 7200, 7200, 33),
(164, 72, NULL, NULL, 149, 6, 6000, 6000, 34),
(165, 73, NULL, NULL, 150, 5, 100000, 100000, 56),
(166, 74, NULL, NULL, 152, 10, 200000, 200000, 56),
(167, 74, NULL, NULL, 152, 10, 10000, 10000, 34),
(168, 75, NULL, NULL, 107, 4, 2000, 2000, 27),
(169, 76, NULL, NULL, 170, 4, 2000, 2000, 27),
(170, 76, NULL, NULL, 170, 4, 8000, 8000, 71),
(171, 77, NULL, NULL, 171, 32, 16000, 16000, 27),
(172, 77, NULL, NULL, 171, 16, 32000, 32000, 71),
(173, 79, NULL, NULL, 173, 32, 16000, 16000, 27),
(174, 79, NULL, NULL, 173, 16, 32000, 32000, 71),
(183, 80, NULL, NULL, 180, 32, 16000, 16000, 27),
(184, 80, NULL, NULL, 180, 16, 32000, 32000, 71),
(185, 82, NULL, NULL, 182, 4, 2000, 2000, 27),
(186, 82, NULL, NULL, 182, 16, 32000, 32000, 71),
(187, 83, NULL, 1, 182, 1, 200000, 200000, NULL),
(188, 83, NULL, 2, 182, 1, 2000000, 2000000, NULL),
(189, 83, NULL, 3, 182, 1, 10000000, 10000000, NULL),
(190, 84, 1, NULL, 182, 1, 0, 0, NULL),
(191, 84, 2, NULL, 182, 1, 0, 0, NULL),
(192, 84, 4, NULL, 182, 1, 0, 0, NULL),
(193, 85, NULL, NULL, 184, 1, 15000, 15000, 61),
(194, 86, NULL, NULL, 185, 9, 9000, 9000, 70),
(195, 86, NULL, NULL, 185, 9, 4500, 4500, 64),
(196, 87, NULL, NULL, 186, 3991, 3991000, 3991000, 70),
(197, 88, NULL, NULL, 187, 1000, 1000000, 1000000, 70),
(198, 89, NULL, NULL, 189, 900, 900000, 900000, 70),
(199, 90, NULL, NULL, 190, 5, 5000, 5000, 70),
(200, 90, NULL, NULL, 190, 5, 5000, 5000, 70),
(201, 90, NULL, NULL, 190, 5, 5000, 5000, 70),
(202, 91, NULL, NULL, 192, 32, 16000, 16000, 27),
(203, 91, NULL, NULL, 192, 16, 32000, 32000, 71),
(206, 92, 2, NULL, 194, 1, 0, 0, NULL),
(207, 92, 4, NULL, 194, 1, 0, 0, NULL),
(208, 93, NULL, NULL, 184, -1, -15000, -15000, 61),
(209, 94, NULL, NULL, 184, -1, -15000, -15000, 61),
(210, 95, NULL, NULL, 185, -2, -9000, -9000, 70),
(211, 96, NULL, NULL, 210, 32, 16000, 16000, 27),
(212, 96, NULL, NULL, 210, 16, 32000, 32000, 71),
(213, 97, NULL, NULL, 211, 3, 6000, 6000, 71),
(214, 98, NULL, NULL, 212, 3, 6000, 6000, 71),
(215, 99, NULL, NULL, 213, 3, 6000, 6000, 71),
(216, 100, NULL, NULL, 214, 4, 4000, 4000, 22),
(217, 101, NULL, NULL, 219, 100, 100000, 100000, 22),
(218, 109, NULL, NULL, 227, 6, 120000, 120000, 35),
(219, 110, NULL, NULL, 228, 885, 17700000, 17700000, 35),
(220, 111, NULL, NULL, 230, 4, 8, 8, 72),
(221, 112, NULL, NULL, 7, -3, -1500, -1500, NULL),
(222, 114, NULL, NULL, 29, -3, -1500, -1500, NULL),
(223, 115, NULL, NULL, 10, -4, -2000, -2000, NULL),
(224, 116, NULL, NULL, 250, 0, 0, 0, 31),
(225, 116, NULL, NULL, 250, 0, 0, 0, 27),
(226, 116, NULL, NULL, 250, 9, 9000, 9000, 27),
(227, 116, NULL, NULL, 250, 87, 104400, 104400, 31),
(228, 116, NULL, NULL, 250, 7, 7000, 7000, 27),
(229, 117, NULL, NULL, 251, 6, 6000, 6000, 27),
(230, 117, NULL, NULL, 251, 9, 9000, 9000, 27),
(231, 117, NULL, NULL, 251, 90, 108000, 108000, 31),
(236, 118, NULL, NULL, 252, 9, 9000, 9000, 27),
(237, 118, NULL, NULL, 252, 4, 4000, 4000, 27),
(238, 118, NULL, NULL, 252, 0, 0, 0, 31),
(239, 118, NULL, NULL, 252, 70, 70000, 70000, 27),
(240, 119, NULL, NULL, 253, 56, 56000, 56000, 27),
(241, 120, NULL, NULL, 258, 0, 0, 0, 27),
(242, 121, NULL, 4, 241, 1, 20000000, 20000000, NULL),
(243, 122, 2, NULL, 241, 1, 0, 0, NULL),
(244, 122, 4, NULL, 241, 1, 0, 0, NULL),
(245, 123, NULL, NULL, 241, 20, 20000, 20000, 27),
(246, 124, NULL, NULL, 259, 100, 100000, 100000, 27),
(247, 124, NULL, NULL, 259, 100, 100000, 100000, 27),
(248, 125, NULL, NULL, 260, 200, 200000, 200000, 27),
(249, 125, NULL, NULL, 260, 5, 5000, 5000, 27),
(250, 125, NULL, NULL, 260, 76, 76000, 76000, 27),
(256, 128, NULL, 2, 261, 1, 2000000, 2000000, NULL),
(260, 126, 2, NULL, 261, 1, 0, 0, NULL),
(261, 129, NULL, NULL, 269, 98, 98000, 98000, 27),
(262, 130, NULL, NULL, 269, -90, -90000, -90000, NULL),
(263, 131, NULL, NULL, 274, 6, 6000, 6000, 27),
(264, 131, NULL, NULL, 274, 5, 5000, 5000, 27),
(265, 131, NULL, NULL, 274, 7, 7000, 7000, 27),
(271, 132, NULL, NULL, 275, 4, 4000, 4000, 27),
(272, 132, NULL, NULL, 275, 6, 6000, 6000, 27),
(273, 132, NULL, NULL, 275, 6, 6000, 6000, 27),
(274, 133, NULL, NULL, 276, 9, 9000, 9000, 27),
(275, 133, NULL, NULL, 276, 7, 7000, 7000, 27),
(276, 133, NULL, NULL, 276, 4, 4000, 4000, 27),
(277, 134, NULL, NULL, 278, 13, 13000, 13000, 27),
(278, 135, NULL, NULL, 293, 10, 250000, 250000, 61),
(279, 136, NULL, NULL, 295, 10, 250000, 250000, 61),
(281, 137, NULL, NULL, 296, 10, 250000, 250000, 61),
(282, 138, NULL, NULL, 297, 10, 250000, 250000, 61),
(283, 127, NULL, NULL, 261, 16, 19200, 19200, 31),
(284, 127, NULL, NULL, 261, 4, 4000, 4000, 27),
(285, 139, NULL, NULL, 305, 3, 3000, 3000, 27),
(286, 139, NULL, NULL, 305, 6, 6000, 6000, 27),
(287, 139, NULL, NULL, 305, 7, 7000, 7000, 27),
(291, 140, NULL, NULL, 310, 20, 20000, 20000, 27),
(292, 140, NULL, NULL, 310, 15, 15000, 15000, 27),
(293, 140, NULL, NULL, 310, 138, 165600, 165600, 31),
(294, 141, NULL, NULL, 311, 20, 160000, 160000, 76),
(295, 141, NULL, NULL, 311, 20, 160000, 160000, 76),
(296, 141, NULL, NULL, 311, 20, 160000, 160000, 76),
(297, 141, NULL, NULL, 311, 20, 160000, 160000, 76),
(298, 141, NULL, NULL, 311, 20, 160000, 160000, 76),
(299, 142, NULL, NULL, 312, 20, 20000, 20000, 27),
(300, 142, NULL, NULL, 312, 20, 20000, 20000, 27),
(302, 144, NULL, NULL, 313, 5, 5000, 5000, 27),
(303, 144, NULL, NULL, 313, 6, 6000, 6000, 27),
(305, 145, NULL, NULL, 315, 4, 4000, 4000, 27),
(306, 145, NULL, NULL, 315, 45, 45000, 45000, 27);

-- --------------------------------------------------------

--
-- Table structure for table `journal`
--

CREATE TABLE `journal` (
  `id` bigint(20) NOT NULL,
  `created_date` date DEFAULT NULL,
  `account_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_code_id` bigint(20) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  `billing_id` bigint(20) DEFAULT NULL,
  `has_accounted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `journal`
--

INSERT INTO `journal` (`id`, `created_date`, `account_type`, `account_code_id`, `amount`, `payment_id`, `billing_id`, `has_accounted`) VALUES
(1, '2020-02-20', 'DEBIT', 1, 3000000, 147, NULL, 1),
(2, '2020-02-20', 'CREDIT', 2, 1000000, NULL, 3, 1),
(3, '2020-02-20', 'CREDIT', 2, 5000000, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ledger`
--

CREATE TABLE `ledger` (
  `id` bigint(20) NOT NULL,
  `account_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_code_id` bigint(20) DEFAULT NULL,
  `accounted_amount` bigint(20) DEFAULT NULL,
  `has_validated` tinyint(1) DEFAULT NULL,
  `validated_by` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ledger`
--

INSERT INTO `ledger` (`id`, `account_type`, `account_code_id`, `accounted_amount`, `has_validated`, `validated_by`, `created_date`) VALUES
(1, 'DEBIT', 2, 40000000, 1, 7, '2020-02-20'),
(2, 'CREDIT', 2, 30000000, 0, NULL, '2020-02-20');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_plan`
--

CREATE TABLE `maintenance_plan` (
  `id` bigint(20) NOT NULL,
  `device_id` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `plan_date` date NOT NULL,
  `status` enum('OPEN','DONE','CANCELLED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `note` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `maintenance_plan`
--

INSERT INTO `maintenance_plan` (`id`, `device_id`, `created_date`, `plan_date`, `status`, `note`) VALUES
(1, 5, '2019-09-26', '2019-09-26', 'DONE', 'kế hoạch bảo trì thiết bị'),
(2, 6, '2019-11-15', '2019-11-10', 'OPEN', 'lên kế hoạch thôi nào'),
(3, 6, '2019-11-28', '2019-11-26', 'DONE', '1'),
(4, 7, '2019-12-02', '2019-12-27', 'OPEN', 'www'),
(5, 7, '2019-12-03', '2019-12-04', 'CANCELLED', NULL),
(6, 7, '2020-01-21', '2020-01-27', 'OPEN', 'Cần kiểm tra bảo dưỡng Thắng xe, động cơ...');

-- --------------------------------------------------------

--
-- Table structure for table `minus_salary`
--

CREATE TABLE `minus_salary` (
  `id` bigint(20) NOT NULL,
  `user_salary_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `minus_salary`
--

INSERT INTO `minus_salary` (`id`, `user_salary_id`, `name`, `amount`) VALUES
(1, 19, 'Tháng 12', 100000),
(3, 19, 'du 10', 200000),
(7, 19, 'hoa@123', 100000),
(8, 19, 'kinh te', 50000),
(9, 19, 'kinhte', 200000),
(10, 19, '3 tháng', 700000),
(11, 19, '123', 200000),
(12, 19, 'qasff', 50000),
(13, 19, 'afasf', 200000),
(14, 19, 'qasff', 200000),
(15, 19, 'kinh te', 200000),
(16, 19, 'game', 21421412),
(17, 19, 'dúy', 5000),
(18, 19, 'tháng 12 ', 21421412),
(19, 19, 'Tháng 12', 21421412),
(20, 19, 'Thùy Trang', 21421412),
(21, 19, 'thanh dúy', 21421412);

-- --------------------------------------------------------

--
-- Table structure for table `month_revenue`
--

CREATE TABLE `month_revenue` (
  `id` bigint(20) NOT NULL,
  `hospital_id` bigint(20) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `revenue` bigint(20) NOT NULL,
  `profit` bigint(20) NOT NULL,
  `status` enum('OPEN','VALIDATED') NOT NULL,
  `validated_by` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `month_revenue`
--

INSERT INTO `month_revenue` (`id`, `hospital_id`, `month`, `year`, `revenue`, `profit`, `status`, `validated_by`) VALUES
(1, 1, 8, 2019, 800000000, 50000000, 'VALIDATED', 1),
(2, 1, 9, 2019, 850000000, 75000000, 'VALIDATED', 1),
(3, 1, 10, 2019, 900000000, 100000000, 'VALIDATED', 1),
(4, 1, 11, 2019, 950000000, 120000000, 'VALIDATED', 1),
(5, 1, 12, 2019, 120000000, 5000000, 'OPEN', 1);

-- --------------------------------------------------------

--
-- Table structure for table `output_form`
--

CREATE TABLE `output_form` (
  `id` bigint(20) NOT NULL,
  `drug_store_id` bigint(20) NOT NULL,
  `output_date` date NOT NULL,
  `created_user` bigint(20) NOT NULL,
  `validated_user` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','DONE','CANCELLED') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `output_form`
--

INSERT INTO `output_form` (`id`, `drug_store_id`, `output_date`, `created_user`, `validated_user`, `status`) VALUES
(1, 1, '2019-12-04', 1, NULL, 'OPEN'),
(10, 2, '2019-12-04', 1, NULL, 'OPEN'),
(12, 1, '2019-12-05', 1, NULL, 'DONE'),
(13, 2, '2019-12-05', 1, NULL, 'CANCELLED'),
(14, 1, '2019-12-05', 1, NULL, 'OPEN'),
(15, 1, '2019-12-05', 1, NULL, 'OPEN'),
(16, 2, '2019-12-05', 1, NULL, 'OPEN'),
(17, 1, '2019-12-05', 1, NULL, 'DONE'),
(18, 1, '2019-12-09', 6, NULL, 'OPEN'),
(19, 3, '2019-12-10', 6, NULL, 'OPEN'),
(20, 3, '2019-12-17', 6, NULL, 'OPEN'),
(21, 2, '2019-12-24', 6, NULL, 'OPEN'),
(22, 2, '2019-12-26', 6, NULL, 'OPEN'),
(23, 1, '2020-01-10', 1, NULL, 'CANCELLED'),
(24, 1, '2020-01-10', 1, 1, 'DONE'),
(25, 1, '2020-01-16', 1, 1, 'DONE'),
(26, 3, '2020-01-17', 1, NULL, 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `output_stock`
--

CREATE TABLE `output_stock` (
  `id` bigint(20) NOT NULL,
  `drug_id` bigint(20) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `output_date` date DEFAULT NULL,
  `out_amount` int(11) DEFAULT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `output_form_id` bigint(20) DEFAULT NULL,
  `produced_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `batch_barcode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sale_price` bigint(20) DEFAULT NULL,
  `import_price` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `output_stock`
--

INSERT INTO `output_stock` (`id`, `drug_id`, `drug_store_id`, `output_date`, `out_amount`, `invoice_id`, `output_form_id`, `produced_date`, `expired_date`, `batch_barcode`, `sale_price`, `import_price`) VALUES
(1, 1, 1, '2019-10-16', 100, 1, NULL, NULL, NULL, NULL, 0, 0),
(2, 1, 1, '2019-10-16', 100, 2, NULL, NULL, NULL, NULL, 0, 0),
(3, 1, 1, '2019-10-16', 800, 3, NULL, NULL, NULL, NULL, 0, 0),
(4, 1, 1, '2019-10-25', 4, 4, NULL, NULL, NULL, NULL, 0, 0),
(5, 2, 1, '2019-10-25', 4, 4, NULL, NULL, NULL, NULL, 0, 0),
(6, 1, 1, '2019-10-28', 8, 8, NULL, NULL, NULL, NULL, 0, 0),
(7, 2, 1, '2019-10-28', 8, 8, NULL, NULL, NULL, NULL, 0, 0),
(8, 2, 1, '2019-10-31', 100, 1, NULL, NULL, NULL, NULL, 0, 0),
(9, 1, 1, '2019-10-31', 988, 2, NULL, NULL, NULL, NULL, 0, 0),
(10, 2, 1, '2019-10-31', 900, 3, NULL, NULL, NULL, NULL, 0, 0),
(11, 4, 1, '2019-11-13', 4, 11, NULL, NULL, NULL, NULL, 0, 0),
(12, 1, 1, '2019-11-13', 12, 12, NULL, NULL, NULL, NULL, 0, 0),
(13, 1, 1, '2019-11-13', 4, 12, NULL, NULL, NULL, NULL, 0, 0),
(14, 4, 1, '2019-11-13', 4, 12, NULL, NULL, NULL, NULL, 0, 0),
(15, 1, 1, '2019-11-13', 4, 10, NULL, NULL, NULL, NULL, 0, 0),
(16, 2, 1, '2019-11-13', 4, 10, NULL, NULL, NULL, NULL, 0, 0),
(17, 1, 1, '2019-11-14', 9, 24, NULL, NULL, NULL, NULL, 0, 0),
(18, 1, 1, '2019-11-14', 9, 25, NULL, NULL, NULL, NULL, 0, 0),
(19, 1, 1, '2019-11-14', 9, 26, NULL, NULL, NULL, NULL, 0, 0),
(20, 1, 1, '2019-11-14', 9, 27, NULL, NULL, NULL, NULL, 0, 0),
(21, 1, 1, '2019-11-14', 9, 29, NULL, NULL, NULL, NULL, 0, 0),
(22, 2, 1, '2019-11-14', 9, 29, NULL, NULL, NULL, NULL, 0, 0),
(23, 1, 1, '2019-11-14', 9, 28, NULL, NULL, NULL, NULL, 0, 0),
(24, 2, 1, '2019-11-14', 9, 28, NULL, NULL, NULL, NULL, 0, 0),
(25, 1, 1, '2019-11-14', 9, 29, NULL, NULL, NULL, NULL, 0, 0),
(26, 2, 1, '2019-11-14', 9, 29, NULL, NULL, NULL, NULL, 0, 0),
(27, 1, 1, '2019-11-14', 9, 32, NULL, NULL, NULL, NULL, 0, 0),
(28, 1, 1, '2019-11-14', 3, 33, NULL, NULL, NULL, NULL, 0, 0),
(29, 1, 1, '2019-11-18', 3, 33, NULL, NULL, NULL, NULL, 0, 0),
(30, 1, 1, '2019-11-18', 32, 2, NULL, NULL, NULL, NULL, 0, 0),
(31, 2, 1, '2019-11-18', 16, 2, NULL, NULL, NULL, NULL, 0, 0),
(32, 1, 1, '2019-11-18', 6, 1, NULL, NULL, NULL, NULL, 0, 0),
(33, 1, 1, '2019-11-21', 14, 15, NULL, NULL, NULL, NULL, 0, 0),
(34, 2, 1, '2019-11-21', 28, 15, NULL, NULL, NULL, NULL, 0, 0),
(35, 5, 1, '2019-11-21', 9, 17, NULL, NULL, NULL, NULL, 0, 0),
(36, 5, 1, '2019-11-25', 9, 18, NULL, NULL, NULL, NULL, 0, 0),
(37, 5, 1, '2019-11-25', 9, 18, NULL, NULL, NULL, NULL, 0, 0),
(38, 1, 1, '2019-11-26', 3, 39, NULL, NULL, NULL, NULL, 0, 0),
(39, 2, 1, '2019-11-26', 6, 39, NULL, NULL, NULL, NULL, 0, 0),
(40, 1, 1, '2019-11-26', 3, 40, NULL, NULL, NULL, NULL, 0, 0),
(41, 2, 1, '2019-11-26', 6, 40, NULL, NULL, NULL, NULL, 0, 0),
(42, 1, 1, '2019-11-26', 4, 41, NULL, NULL, NULL, NULL, 0, 0),
(43, 2, 1, '2019-11-26', 6, 41, NULL, NULL, NULL, NULL, 0, 0),
(44, 4, 1, '2019-11-27', 12, NULL, NULL, NULL, NULL, NULL, 0, 0),
(45, 1, 1, '2019-11-27', 6, 1, NULL, NULL, NULL, NULL, 0, 0),
(46, 4, 1, '2019-11-29', 10, NULL, NULL, NULL, NULL, NULL, 0, 0),
(47, 1, 1, '2019-12-01', 1, 9, NULL, NULL, NULL, NULL, 0, 0),
(48, 1, 1, '2019-12-01', 4, 9, NULL, NULL, NULL, NULL, 0, 0),
(49, 6, 3, '2019-12-02', 10, NULL, NULL, NULL, NULL, NULL, 0, 0),
(50, 2, 1, '2019-12-03', 10, 47, NULL, NULL, NULL, NULL, 0, 0),
(51, 2, 1, '2019-12-03', 30, 48, NULL, NULL, NULL, NULL, 0, 0),
(52, 2, 1, '2019-12-03', 123, 48, NULL, NULL, NULL, NULL, 0, 0),
(53, 2, 1, '2019-12-04', 10, 49, NULL, NULL, NULL, NULL, NULL, NULL),
(54, 2, 1, '2019-12-04', 10, 50, NULL, NULL, NULL, NULL, NULL, NULL),
(55, 1, 1, '2019-12-04', 32, 51, NULL, NULL, NULL, NULL, NULL, NULL),
(56, 2, 1, '2019-12-04', 16, 51, NULL, NULL, NULL, NULL, NULL, NULL),
(57, 1, 1, '2019-12-04', 4, 51, NULL, NULL, NULL, NULL, NULL, NULL),
(58, 1, 1, '2019-12-04', 32, 51, NULL, NULL, NULL, NULL, NULL, NULL),
(59, 2, 1, '2019-12-04', 10, 52, NULL, NULL, NULL, NULL, NULL, NULL),
(60, 1, 1, '2019-12-04', 8, 55, NULL, NULL, NULL, NULL, NULL, NULL),
(61, 4, 1, '2019-12-04', 4, 55, NULL, NULL, NULL, NULL, NULL, NULL),
(62, 1, 1, '2019-12-04', 12, 55, NULL, NULL, NULL, NULL, NULL, NULL),
(63, 1, 1, '2019-12-04', 12, 55, NULL, NULL, NULL, NULL, NULL, NULL),
(64, 4, 1, '2019-12-04', 4, 55, NULL, NULL, NULL, NULL, NULL, NULL),
(65, 1, 1, '2019-12-04', 4, 55, NULL, NULL, NULL, NULL, NULL, NULL),
(66, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(67, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(68, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(69, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(70, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(71, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(73, 2, 2, '2019-12-04', 100, NULL, 1, '2020-01-04', '2019-12-29', 'l1', 1000, 200),
(75, 2, 2, '2019-12-04', 100, NULL, 1, '2020-01-04', '2019-12-29', 'l1', 1000, 200),
(76, 1, 2, '2019-12-04', 100, NULL, 10, '2019-12-04', '2020-01-04', 'l1', 1000, 200),
(77, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(78, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(79, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(80, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(81, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(82, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(83, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(84, 1, 1, '2019-12-05', 100, NULL, 12, '2019-12-04', '2020-01-04', 'l2', 1000, 200),
(85, 5, 1, '2019-12-05', 15, 61, NULL, NULL, NULL, NULL, NULL, NULL),
(86, 2, 1, '2019-12-05', 21, 63, NULL, NULL, NULL, NULL, NULL, NULL),
(87, 1, 2, '2019-12-05', 99, NULL, 13, '2019-12-04', '2020-01-04', 'l1', 1000, 200),
(88, 5, 2, '2019-12-05', 99, NULL, 13, '2019-12-05', '2019-12-31', 'l1', 1000, 200),
(89, 5, 2, '2019-12-05', 85, NULL, 14, '2019-12-05', '2019-12-31', 'l1', 1000, 200),
(100, 4, 2, '2019-12-04', 1000, NULL, 1, '2020-01-04', '2019-12-29', 'l1', 1000, 200),
(101, 20, 1, '2019-12-05', 3, 65, NULL, NULL, NULL, NULL, NULL, NULL),
(102, 2, 1, '2019-12-05', 3, 65, NULL, NULL, NULL, NULL, NULL, NULL),
(103, 20, 1, '2019-12-05', 6, 66, NULL, NULL, NULL, NULL, NULL, NULL),
(104, 20, 1, '2019-12-05', 6, 67, NULL, NULL, NULL, NULL, NULL, NULL),
(105, 20, 1, '2019-12-05', 6, 69, NULL, NULL, NULL, NULL, NULL, NULL),
(106, 2, 1, '2019-12-05', 3, 69, NULL, NULL, NULL, NULL, NULL, NULL),
(107, 20, 1, '2019-12-05', 6, 70, NULL, NULL, NULL, NULL, NULL, NULL),
(108, 2, 1, '2019-12-05', 6, 70, NULL, NULL, NULL, NULL, NULL, NULL),
(109, 21, 1, '2019-12-05', 6, 71, NULL, NULL, NULL, NULL, NULL, NULL),
(110, 22, 1, '2019-12-05', 6, 72, NULL, NULL, NULL, NULL, NULL, NULL),
(111, 23, 1, '2019-12-05', 5, 73, NULL, NULL, NULL, NULL, NULL, NULL),
(112, 23, 1, '2019-12-05', 10, 74, NULL, NULL, NULL, NULL, NULL, NULL),
(113, 22, 1, '2019-12-05', 10, 74, NULL, NULL, NULL, NULL, NULL, NULL),
(114, 1, 1, '2019-12-05', 4, 75, NULL, NULL, NULL, NULL, NULL, NULL),
(115, 23, 1, '2019-12-05', 100, NULL, 17, '2019-12-05', '2020-02-01', '88880512033', 20000, 10000),
(116, 1, 1, '2019-12-24', 3, 33, NULL, NULL, NULL, NULL, NULL, NULL),
(117, 1, 1, '2019-12-24', 9, 29, NULL, NULL, NULL, NULL, NULL, NULL),
(118, 1, 1, '2019-12-24', 6, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(119, 1, 1, '2019-12-24', 4, 76, NULL, NULL, NULL, NULL, NULL, NULL),
(120, 1, 1, '2019-12-24', 32, 77, NULL, NULL, NULL, NULL, NULL, NULL),
(121, 1, 1, '2019-12-25', 32, 79, NULL, NULL, NULL, NULL, NULL, NULL),
(122, 28, 1, '2019-12-30', 1, 85, NULL, NULL, NULL, NULL, NULL, NULL),
(123, 30, 1, '2019-12-30', 9, 86, NULL, NULL, NULL, NULL, NULL, NULL),
(124, 29, 1, '2019-12-30', 9, 86, NULL, NULL, NULL, NULL, NULL, NULL),
(125, 30, 1, '2019-12-30', 3991, 87, NULL, NULL, NULL, NULL, NULL, NULL),
(126, 30, 1, '2019-12-30', 1000, 88, NULL, NULL, NULL, NULL, NULL, NULL),
(127, 30, 1, '2019-12-30', 900, 89, NULL, NULL, NULL, NULL, NULL, NULL),
(128, 30, 1, '2019-12-30', 5, 90, NULL, NULL, NULL, NULL, NULL, NULL),
(129, 30, 1, '2019-12-30', 5, 90, NULL, NULL, NULL, NULL, NULL, NULL),
(130, 30, 1, '2019-12-30', 5, 90, NULL, NULL, NULL, NULL, NULL, NULL),
(131, 1, 1, '2019-12-30', 32, 91, NULL, NULL, NULL, NULL, NULL, NULL),
(132, 4, 1, '2020-01-10', 0, NULL, 23, '2020-01-10', '2022-01-10', '8888051219005', 10000, 5000),
(133, 4, 1, '2020-01-10', 300, NULL, 24, '2020-01-10', '2022-01-10', '8888051219005', 10000, 5000),
(134, 1, 1, '2020-01-10', 12, 3, NULL, NULL, NULL, NULL, NULL, NULL),
(135, 1, 1, '2020-01-10', 9, 24, NULL, NULL, NULL, NULL, NULL, NULL),
(136, 1, 1, '2020-01-15', 0, 116, NULL, NULL, NULL, NULL, NULL, NULL),
(137, 1, 1, '2020-01-15', 9, 116, NULL, NULL, NULL, NULL, NULL, NULL),
(138, 1, 1, '2020-01-15', 7, 116, NULL, NULL, NULL, NULL, NULL, NULL),
(139, 1, 1, '2020-01-15', 6, 117, NULL, NULL, NULL, NULL, NULL, NULL),
(140, 1, 1, '2020-01-15', 9, 117, NULL, NULL, NULL, NULL, NULL, NULL),
(141, 1, 1, '2020-01-15', 9, 118, NULL, NULL, NULL, NULL, NULL, NULL),
(142, 1, 1, '2020-01-15', 4, 118, NULL, NULL, NULL, NULL, NULL, NULL),
(143, 1, 1, '2020-01-15', 70, 118, NULL, NULL, NULL, NULL, NULL, NULL),
(144, 1, 1, '2020-01-15', 56, 119, NULL, NULL, NULL, NULL, NULL, NULL),
(146, 1, 1, '2020-01-16', 0, 120, NULL, NULL, NULL, NULL, NULL, NULL),
(147, 1, 1, '2020-01-16', 100, 124, NULL, NULL, NULL, NULL, NULL, NULL),
(148, 1, 1, '2020-01-16', 100, 124, NULL, NULL, NULL, NULL, NULL, NULL),
(149, 1, 1, '2020-01-16', 200, 125, NULL, NULL, NULL, NULL, NULL, NULL),
(150, 1, 1, '2020-01-16', 5, 125, NULL, NULL, NULL, NULL, NULL, NULL),
(151, 1, 1, '2020-01-16', 76, 125, NULL, NULL, NULL, NULL, NULL, NULL),
(152, 1, 1, '2020-01-21', 98, 129, NULL, NULL, NULL, NULL, NULL, NULL),
(153, 1, 1, '2020-02-03', 6, 131, NULL, NULL, NULL, NULL, NULL, NULL),
(154, 1, 1, '2020-02-03', 5, 131, NULL, NULL, NULL, NULL, NULL, NULL),
(155, 1, 1, '2020-02-03', 7, 131, NULL, NULL, NULL, NULL, NULL, NULL),
(156, 1, 1, '2020-02-03', 4, 132, NULL, NULL, NULL, NULL, NULL, NULL),
(157, 1, 1, '2020-02-03', 6, 132, NULL, NULL, NULL, NULL, NULL, NULL),
(158, 1, 1, '2020-02-03', 6, 132, NULL, NULL, NULL, NULL, NULL, NULL),
(159, 1, 1, '2020-02-04', 13, 134, NULL, NULL, NULL, NULL, NULL, NULL),
(160, 28, 1, '2020-02-11', 10, 135, NULL, NULL, NULL, NULL, NULL, NULL),
(161, 28, 1, '2020-02-11', 10, 136, NULL, NULL, NULL, NULL, NULL, NULL),
(162, 28, 1, '2020-02-11', 10, 138, NULL, NULL, NULL, NULL, NULL, NULL),
(163, 1, 1, '2020-02-13', 20, 140, NULL, NULL, NULL, NULL, NULL, NULL),
(164, 1, 1, '2020-02-13', 15, 140, NULL, NULL, NULL, NULL, NULL, NULL),
(165, 1, 1, '2020-02-19', 4, 145, NULL, NULL, NULL, NULL, NULL, NULL),
(166, 1, 1, '2020-02-19', 45, 145, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` bigint(20) NOT NULL,
  `full_name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `code` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `gender` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `father_name` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `father_phone` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `mother_name` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `mother_phone` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `note` longtext COLLATE utf8_bin,
  `created_date` date DEFAULT NULL,
  `nation` varchar(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `full_name`, `code`, `gender`, `birthday`, `phone`, `email`, `address`, `father_name`, `father_phone`, `mother_name`, `mother_phone`, `note`, `created_date`, `nation`) VALUES
(1, 'Nguyễn Văn A', 'BN000001', 'MALE', '2000-09-06', '90982578311', 'congbangmm83@gmail.com', 'Đồng Nai', NULL, '90982578311', NULL, '90982578311', 'Bị dị ứng đậu phộng', '2019-08-01', NULL),
(3, 'Nguyễn Thanh Tâm', 'BN000003', 'MALE', '2018-11-07', '13123123123', 'admin@logsik.com', '112 Võ Văn Tần', NULL, '13123123123', NULL, '13123123123', NULL, '2019-08-02', NULL),
(4, 'Nguyễn Văn Thành', 'BN000003', 'FEMALE', '2019-07-01', '0909111222', 'admin@logsik.com', 'Đồng Nai', NULL, '0909111222', NULL, '0909111222', NULL, '2019-08-02', NULL),
(6, 'Nguyễn Thị Mộng Mơ', 'mongmonguyen', 'MALE', '2019-11-11', '11111111111', 'mongmonguyen@gmail.com', 'B58/10 Nguyen Than Hien, distict 4, Ho Chi Minh city', 'tên cha', '1234567890', 'tên mẹ', '1234567890', NULL, '2019-11-18', NULL),
(7, 'Lê hoài nam', 'hoainam12011998', 'MALE', '1998-01-12', '1234567890', 'hoainamle@gmail.com', 'Chư Sê, Gia Lai', 'Tên Cha', '1234567890', 'Tên Mẹ', '1234567890', NULL, '2019-11-13', NULL),
(8, 'Trương Thị Hoa', '10988766', 'FEMALE', '2019-11-07', '12345678901', 'truonghoa@gmail.com', 'Chư sê gia lai', 'Trương Định', '1345678901', 'Phạm Hạnh', '12345678901', NULL, '2019-11-22', NULL),
(9, 'Phạm Thị Tuyết', 'nhung123', 'MALE', '2019-11-14', '12345678901', 'tuyet@gmail.com', 'Đắc Nông', 'Trần Công Hạnh', '12345678901', 'Phạm Thị Tuyết Nhung', '21345678901', NULL, '2019-11-29', NULL),
(10, 'trần trọng kim', 'trongkim12', 'MALE', '2019-12-01', '1345678912', 'trongkim@gmail.com', 'Hà Nội', 'cha', '1234562222', 'mẹ', '21233223323', NULL, '2019-12-06', NULL),
(11, 'Trần Trọng Nghĩa', '12333', 'MALE', '2019-12-03', '0909090909', NULL, 'Hà Nội', 'Trần Cha', '09090909090', 'Trần Mẹ', '09090909090', 'không', '2019-12-06', NULL),
(12, 'Pham Van B', 'BN00000012', 'MALE', '1987-09-30', '0909825783', 'congbangmm83@gmail.com', '64/7 Ngo Chi Quoc, Binh Chieu ward, Thu Duc distri', 'Nguyen Van C', '0909825783', 'Cong Bang', '0909825783', NULL, NULL, NULL),
(13, 'Trần Ngô Đông', 'BN00000013', 'MALE', '2019-12-31', '0128929822', NULL, NULL, NULL, '1324142412', NULL, '2421421221', NULL, '2020-01-21', NULL),
(14, 'Nguyền B', 'BN00000014', 'FEMALE', '2019-09-29', '0987654321', 'admin@logsik.com', '1', NULL, '1234567890', NULL, '8641234567', NULL, '2020-01-26', NULL),
(15, 'Pham Van E', 'BN00000015', 'MALE', '2000-02-03', '0909825783', 'phamvane@gmail.com', '15 Ngo Chi Quoc, Binh Chieu ward, Thu Duc distri', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 'Demo 12', 'BN00000016', 'MALE', '1992-09-30', '12345567787', 'admin@logsik.com', '123', NULL, NULL, NULL, NULL, NULL, '2020-02-11', NULL),
(17, 'Hien', 'BN00000017', 'FEMALE', '2020-01-28', '0868204845', 'hienf@gmail.com', '123', NULL, NULL, NULL, NULL, NULL, '2020-02-11', NULL),
(18, 'c', 'BN00000018', 'FEMALE', '2020-01-29', 'c', 'c@logsik.com', 'c', 'c', 'c', 'c', 'c', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `patient_booking_group`
--

CREATE TABLE `patient_booking_group` (
  `id` bigint(20) NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `booking_group_id` bigint(20) NOT NULL,
  `status` enum('OPEN','BOOKED','DONE','CANCELLED') COLLATE utf8_bin NOT NULL,
  `note` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `patient_booking_group`
--

INSERT INTO `patient_booking_group` (`id`, `patient_id`, `booking_group_id`, `status`, `note`) VALUES
(2, 4, 1, 'BOOKED', 'e'),
(4, 1, 2, 'BOOKED', 'mmmm'),
(5, 3, 2, 'BOOKED', 'a'),
(6, 3, 1, 'BOOKED', 'qqqqq'),
(7, 4, 1, 'BOOKED', NULL),
(8, 5, 1, 'OPEN', 'trạng thái mở'),
(9, 4, 2, 'BOOKED', '111'),
(10, 3, 2, 'OPEN', NULL),
(11, 1, 2, 'OPEN', NULL),
(12, 1, 2, 'OPEN', NULL),
(13, 4, 2, 'OPEN', NULL),
(14, 7, 2, 'OPEN', NULL),
(15, 7, 4, 'BOOKED', NULL),
(16, 7, 2, 'OPEN', NULL),
(17, 7, 2, 'BOOKED', NULL),
(19, 3, 4, 'BOOKED', NULL),
(20, 6, 4, 'OPEN', NULL),
(21, 3, 2, 'OPEN', NULL),
(22, 8, 4, 'OPEN', NULL),
(23, 9, 2, 'OPEN', NULL),
(24, 1, 4, 'OPEN', NULL),
(25, 11, 5, 'OPEN', NULL),
(26, 10, 6, 'OPEN', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` bigint(20) NOT NULL,
  `cash_desk_id` bigint(20) NOT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `insurance_invoice_id` bigint(20) DEFAULT NULL,
  `amount` bigint(20) NOT NULL,
  `payment_method` varchar(64) COLLATE utf8_bin NOT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `insurance_company_id` bigint(20) DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `status` varchar(64) COLLATE utf8_bin NOT NULL,
  `has_accounted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `cash_desk_id`, `invoice_id`, `insurance_invoice_id`, `amount`, `payment_method`, `patient_id`, `insurance_company_id`, `payment_date`, `created_date`, `status`, `has_accounted`) VALUES
(1, 13, 8, NULL, 20000, 'CREDIT NOTE', 1, NULL, '2019-11-20 14:08:51', '2019-10-28 14:22:06', 'PAID', NULL),
(2, 5, 7, NULL, 400000, 'CASH', 4, NULL, '2019-11-04 14:44:57', '2019-11-04 14:44:57', 'PAID', NULL),
(3, 7, 11, NULL, 2000, 'CASH', 1, NULL, '2019-11-19 17:14:16', '2019-11-13 19:27:45', 'PAID', NULL),
(5, 7, 12, NULL, 10000, 'CASH', 1, NULL, '2019-11-13 19:39:00', '2019-11-13 19:39:00', 'PAID', NULL),
(8, 7, 10, NULL, 10000, 'CASH', 1, NULL, '2019-11-13 20:22:40', '2019-11-13 20:22:40', 'PAID', NULL),
(9, 8, 24, NULL, 4500, 'CASH', NULL, NULL, '2019-11-14 04:55:32', '2019-11-14 04:55:32', 'PAID', NULL),
(10, 8, 25, NULL, 4500, 'CASH', NULL, NULL, '2019-11-14 04:57:11', '2019-11-14 04:57:11', 'PAID', NULL),
(11, 8, 26, NULL, 4500, 'CASH', NULL, NULL, '2019-11-14 04:58:45', '2019-11-14 04:58:45', 'PAID', NULL),
(12, 8, 27, NULL, 4500, 'CASH', NULL, NULL, '2019-11-14 05:05:13', '2019-11-14 05:05:13', 'PAID', NULL),
(13, 8, 29, NULL, 22500, 'CASH', NULL, NULL, '2019-11-14 08:24:58', '2019-11-14 08:24:58', 'PAID', NULL),
(14, 8, 28, NULL, 22500, 'CASH', NULL, NULL, '2019-11-14 15:17:53', '2019-11-14 15:17:53', 'PAID', NULL),
(15, 9, 29, NULL, 12000000, 'CASH', 1, NULL, '2019-11-14 16:43:46', '2019-11-14 16:41:52', 'PAID', NULL),
(16, 9, 32, NULL, 4500, 'CASH', NULL, NULL, '2019-11-14 17:29:19', '2019-11-14 17:29:19', 'PAID', NULL),
(17, 9, 33, NULL, 1500, 'CASH', NULL, NULL, '2019-11-14 17:30:42', '2019-11-14 17:30:42', 'PAID', NULL),
(18, 12, 33, NULL, 12000000, 'CASH', 1, NULL, '2019-11-18 09:29:06', '2019-11-18 09:29:06', 'PAID', NULL),
(19, 12, 2, NULL, 12000000, 'CASH', 1, NULL, '2019-11-18 15:31:14', '2019-11-18 15:31:14', 'PAID', NULL),
(20, 12, 1, NULL, 12000000, 'CASH', 3, NULL, '2019-11-18 15:31:14', '2019-11-18 15:31:14', 'PAID', NULL),
(21, 13, 30, NULL, 1000000, 'CASH', 1, NULL, '2019-11-19 09:15:32', '2019-11-19 09:15:32', 'PAID', NULL),
(22, 13, 34, NULL, 12000000, 'CASH', 1, NULL, '2019-11-19 15:51:48', '2019-11-19 15:51:48', 'PAID', NULL),
(23, 13, 15, NULL, 63000, 'CASH', 1, NULL, '2019-11-21 15:55:03', '2019-11-21 15:55:03', 'PAID', NULL),
(24, 13, 17, NULL, 9000, 'CASH', NULL, NULL, '2019-11-21 16:07:49', '2019-11-21 16:07:49', 'PAID', NULL),
(25, 13, 18, NULL, 18000, 'CASH', NULL, NULL, '2019-11-25 08:33:51', '2019-11-25 08:33:51', 'PAID', NULL),
(26, 8, 39, NULL, 19500, 'CASH', NULL, NULL, '2019-11-26 07:05:14', '2019-11-26 07:05:14', 'PAID', NULL),
(27, 8, 40, NULL, 16500, 'CASH', NULL, NULL, '2019-11-26 08:42:00', '2019-11-26 08:42:00', 'PAID', NULL),
(29, 17, 1, NULL, 12000000, 'CASH', 1, NULL, '2019-11-27 15:16:25', '2019-11-27 15:16:25', 'PAID', NULL),
(30, 18, 38, NULL, 500000, 'CASH', 7, NULL, '2019-11-29 15:42:02', '2019-11-29 15:42:02', 'PAID', NULL),
(31, 18, 35, NULL, 500000, 'CASH', 4, NULL, '2019-11-29 15:42:02', '2019-11-29 15:42:02', 'PAID', NULL),
(32, 8, 9, NULL, 2200000, 'CASH', 4, NULL, '2019-12-01 10:11:15', '2019-12-01 10:11:15', 'PAID', NULL),
(33, 20, 47, NULL, 20000, 'CASH', NULL, NULL, '2019-12-03 09:12:22', '2019-12-03 09:12:22', 'PAID', NULL),
(34, 20, 48, NULL, 306000, 'CASH', NULL, NULL, '2019-12-03 12:07:46', '2019-12-03 12:07:46', 'PAID', NULL),
(35, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:13:41', '2019-12-04 13:13:41', 'PAID', NULL),
(36, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:13:41', '2019-12-04 13:13:41', 'PAID', NULL),
(37, 20, 45, NULL, 10000, 'CASH', 6, NULL, '2019-12-04 13:15:43', '2019-12-04 13:15:43', 'PAID', NULL),
(38, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:15:43', '2019-12-04 13:15:43', 'PAID', NULL),
(39, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:15:43', '2019-12-04 13:15:43', 'PAID', NULL),
(40, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:15:43', '2019-12-04 13:15:43', 'PAID', NULL),
(41, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:15:43', '2019-12-04 13:15:43', 'PAID', NULL),
(42, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:15:43', '2019-12-04 13:15:43', 'PAID', NULL),
(43, 20, 3, NULL, 6000, 'CASH', 1, NULL, '2019-12-04 13:15:43', '2019-12-04 13:15:43', 'PAID', NULL),
(44, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:17:33', '2019-12-04 13:17:33', 'PAID', NULL),
(45, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:17:33', '2019-12-04 13:17:33', 'PAID', NULL),
(46, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(47, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(48, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(49, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(50, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(51, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(52, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(53, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(54, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(55, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(56, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(57, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(58, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:21:29', '2019-12-04 13:21:29', 'PAID', NULL),
(59, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:54:23', '2019-12-04 13:54:23', 'PAID', NULL),
(60, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:54:23', '2019-12-04 13:54:23', 'PAID', NULL),
(61, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:54:23', '2019-12-04 13:54:23', 'PAID', NULL),
(62, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:54:23', '2019-12-04 13:54:23', 'PAID', NULL),
(63, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:54:23', '2019-12-04 13:54:23', 'PAID', NULL),
(64, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:54:23', '2019-12-04 13:54:23', 'PAID', NULL),
(65, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 13:54:23', '2019-12-04 13:54:23', 'PAID', NULL),
(66, 20, 49, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 22:48:34', '2019-12-04 22:48:34', 'PAID', NULL),
(67, 20, 50, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 22:49:07', '2019-12-04 22:49:07', 'PAID', NULL),
(68, 21, 51, NULL, 50000, 'CASH', 4, NULL, '2019-12-04 22:50:07', '2019-12-04 22:50:07', 'PAID', NULL),
(69, 21, 52, NULL, 20000, 'CASH', NULL, NULL, '2019-12-04 22:54:53', '2019-12-04 22:54:53', 'PAID', NULL),
(70, 21, 53, NULL, 1000, 'CASH', 6, NULL, '2019-12-04 22:56:46', '2019-12-04 22:56:46', 'PAID', NULL),
(71, 21, 54, NULL, 40000, 'CASH', NULL, NULL, '2019-12-04 22:59:05', '2019-12-04 22:59:05', 'PAID', NULL),
(72, 21, 55, NULL, 22000, 'CASH', 1, NULL, '2019-12-04 22:59:05', '2019-12-04 22:59:05', 'PAID', NULL),
(73, 21, 56, NULL, 100000, 'CASH', 1, NULL, '2019-12-05 03:16:10', '2019-12-05 03:16:10', 'PAID', NULL),
(74, 21, 57, NULL, 24500, 'CASH', 6, NULL, '2019-12-05 03:16:10', '2019-12-05 03:16:10', 'PAID', NULL),
(75, 21, 58, NULL, 1974000, 'CASH', NULL, NULL, '2019-12-05 03:17:00', '2019-12-05 03:17:00', 'PAID', NULL),
(76, 21, 59, NULL, 394500, 'CASH', NULL, NULL, '2019-12-05 03:38:51', '2019-12-05 03:38:51', 'PAID', NULL),
(77, 21, 60, NULL, 817000, 'CASH', NULL, NULL, '2019-12-05 03:39:26', '2019-12-05 03:39:26', 'PAID', NULL),
(78, 21, 61, NULL, 15000, 'CASH', NULL, NULL, '2019-12-05 03:52:52', '2019-12-05 03:52:52', 'PAID', NULL),
(79, 21, 62, NULL, 21000, 'CASH', 6, NULL, '2019-12-05 03:55:51', '2019-12-05 03:55:51', 'PAID', NULL),
(80, 21, 63, NULL, 42000, 'CASH', 4, NULL, '2019-12-05 03:58:22', '2019-12-05 03:58:22', 'PAID', NULL),
(81, 21, 64, NULL, 21000, 'CASH', 7, NULL, '2019-12-05 04:02:41', '2019-12-05 04:02:41', 'PAID', NULL),
(82, 21, 65, NULL, 9000, 'CASH', NULL, NULL, '2019-12-05 05:38:14', '2019-12-05 05:38:14', 'PAID', NULL),
(83, 21, 66, NULL, 6000, 'CASH', NULL, NULL, '2019-12-05 05:40:16', '2019-12-05 05:40:16', 'PAID', NULL),
(84, 21, 67, NULL, 6000, 'CASH', NULL, NULL, '2019-12-05 05:41:23', '2019-12-05 05:41:23', 'PAID', NULL),
(85, 22, 69, NULL, 12000, 'CASH', NULL, NULL, '2019-12-05 06:15:59', '2019-12-05 06:15:59', 'PAID', NULL),
(86, 22, 70, NULL, 18000, 'CASH', NULL, NULL, '2019-12-05 06:17:42', '2019-12-05 06:17:42', 'PAID', NULL),
(87, 22, 71, NULL, 7200, 'CASH', NULL, NULL, '2019-12-05 06:37:17', '2019-12-05 06:37:17', 'PAID', NULL),
(88, 22, 72, NULL, 6000, 'CASH', NULL, NULL, '2019-12-05 08:35:19', '2019-12-05 08:35:19', 'PAID', NULL),
(89, 23, 73, NULL, 100000, 'CASH', NULL, NULL, '2019-12-05 08:41:57', '2019-12-05 08:41:57', 'PAID', NULL),
(90, 23, 74, NULL, 210000, 'CASH', NULL, NULL, '2019-12-05 08:56:36', '2019-12-05 08:56:36', 'PAID', NULL),
(91, 23, 75, NULL, 2000, 'CASH', 6, NULL, '2019-12-05 09:01:08', '2019-12-05 09:01:08', 'PAID', NULL),
(92, 25, 30, NULL, 500000, 'CASH', 3, NULL, '2019-12-09 08:49:11', '2019-12-09 08:49:11', 'PAID', NULL),
(93, 27, 38, NULL, 500000, 'CASH', 1, NULL, '2019-12-17 09:39:22', '2019-12-17 09:39:22', 'PAID', NULL),
(94, 32, 33, NULL, 500000, 'CASH', 1, NULL, '2019-12-24 08:55:31', '2019-12-24 08:55:31', 'PAID', NULL),
(95, 32, 29, NULL, 1200000, 'CASH', 3, NULL, '2019-12-24 08:55:31', '2019-12-24 08:55:31', 'PAID', NULL),
(96, 32, 1, NULL, 1345679, 'CASH', 7, NULL, '2019-12-24 09:53:40', '2019-12-24 09:53:40', 'PAID', NULL),
(97, 32, 17, NULL, 12, 'CASH', 6, NULL, '2019-12-24 09:53:40', '2019-12-24 09:53:40', 'PAID', NULL),
(98, 33, 76, NULL, 10000, 'CASH', 1, NULL, '2019-12-24 11:04:17', '2019-12-24 11:04:17', 'PAID', NULL),
(99, 32, 77, NULL, 48000, 'CASH', 6, NULL, '2019-12-24 15:01:37', '2019-12-24 15:01:37', 'PAID', NULL),
(100, 32, 79, NULL, 48000, 'CASH', 6, NULL, '2019-12-25 09:50:15', '2019-12-25 09:50:15', 'PAID', NULL),
(101, 37, 85, NULL, 15000, 'CASH', NULL, NULL, '2019-12-30 07:07:52', '2019-12-30 07:07:52', 'PAID', NULL),
(102, 37, 86, NULL, 13500, 'CASH', NULL, NULL, '2019-12-30 08:30:04', '2019-12-30 08:30:04', 'PAID', NULL),
(103, 37, 87, NULL, 3991000, 'CASH', NULL, NULL, '2019-12-30 08:34:36', '2019-12-30 08:34:36', 'PAID', NULL),
(104, 37, 88, NULL, 1000000, 'CASH', NULL, NULL, '2019-12-30 08:39:05', '2019-12-30 08:39:05', 'PAID', NULL),
(105, 37, 89, NULL, 900000, 'CASH', NULL, NULL, '2019-12-30 08:42:16', '2019-12-30 08:42:16', 'PAID', NULL),
(106, 37, 90, NULL, 15000, 'CASH', NULL, NULL, '2019-12-30 08:51:01', '2019-12-30 08:51:01', 'PAID', NULL),
(107, 38, 91, NULL, 48000, 'CASH', 3, NULL, '2019-12-30 11:14:06', '2019-12-30 11:14:06', 'PAID', NULL),
(108, 41, 97, NULL, 6000, 'CASH', NULL, NULL, '2020-01-09 16:20:02', '2020-01-09 16:20:02', 'PAID', NULL),
(109, 42, 98, NULL, 6000, 'CASH', NULL, NULL, '2020-01-09 16:21:50', '2020-01-09 16:21:50', 'PAID', NULL),
(110, 41, 99, NULL, 6000, 'CASH', NULL, NULL, '2020-01-09 16:23:20', '2020-01-09 16:23:20', 'PAID', NULL),
(111, 42, 100, NULL, 4000, 'CASH', NULL, NULL, '2020-01-09 16:43:26', '2020-01-09 16:43:26', 'PAID', NULL),
(112, 42, 101, NULL, 100000, 'CASH', NULL, NULL, '2020-01-09 16:54:21', '2020-01-09 16:54:21', 'PAID', NULL),
(113, 43, 109, NULL, 120000, 'CASH', NULL, NULL, '2020-01-10 07:53:39', '2020-01-10 07:53:39', 'PAID', NULL),
(114, 43, 110, NULL, 17700000, 'CASH', NULL, NULL, '2020-01-10 08:47:55', '2020-01-10 08:47:55', 'PAID', NULL),
(115, 43, 111, NULL, 8, 'CASH', NULL, NULL, '2020-01-10 09:06:33', '2020-01-10 09:06:33', 'PAID', NULL),
(116, 44, 3, NULL, 6000, 'CASH', 1, NULL, '2020-01-10 11:26:53', '2020-01-10 11:26:53', 'PAID', NULL),
(117, 45, 24, NULL, 200000, 'CASH', 3, NULL, '2020-01-10 12:07:17', '2020-01-10 12:07:17', 'PAID', NULL),
(118, 46, 114, NULL, -1500, 'CASH', 1, NULL, '2020-01-13 16:29:51', '2020-01-13 16:29:51', 'PAID', NULL),
(119, 47, 116, NULL, 120400, 'CASH', NULL, NULL, '2020-01-15 17:10:14', '2020-01-15 17:10:14', 'PAID', NULL),
(120, 47, 117, NULL, 123000, 'CASH', NULL, NULL, '2020-01-15 17:14:39', '2020-01-15 17:14:39', 'PAID', NULL),
(121, 47, 118, NULL, 83000, 'CASH', NULL, NULL, '2020-01-15 17:16:46', '2020-01-15 17:16:46', 'PAID', NULL),
(122, 47, 119, NULL, 56000, 'CASH', NULL, NULL, '2020-01-15 17:18:59', '2020-01-15 17:18:59', 'PAID', NULL),
(123, 48, 120, NULL, 0, 'CASH', NULL, NULL, '2020-01-16 09:40:45', '2020-01-16 09:40:45', 'PAID', NULL),
(124, 48, 124, NULL, 200000, 'CASH', NULL, NULL, '2020-01-16 09:57:44', '2020-01-16 09:57:44', 'PAID', NULL),
(125, 48, 125, NULL, 281000, 'CASH', NULL, NULL, '2020-01-16 10:01:19', '2020-01-16 10:01:19', 'PAID', NULL),
(126, 49, 128, NULL, 2000000, 'CASH', 3, NULL, '2020-01-17 10:51:19', '2020-01-17 10:51:19', 'PAID', NULL),
(127, 50, 129, NULL, 98000, 'CASH', 6, NULL, '2020-01-21 11:13:41', '2020-01-21 11:13:41', 'PAID', NULL),
(128, 51, 131, NULL, 18000, 'CASH', NULL, NULL, '2020-02-03 15:02:06', '2020-02-03 15:02:06', 'PAID', NULL),
(129, 51, 132, NULL, 16000, 'CASH', NULL, NULL, '2020-02-03 15:03:31', '2020-02-03 15:03:31', 'PAID', NULL),
(130, 52, 134, NULL, 13000, 'CASH', NULL, NULL, '2020-02-04 10:12:20', '2020-02-04 10:12:20', 'PAID', NULL),
(131, 53, 135, NULL, 250000, 'CASH', NULL, NULL, '2020-02-11 10:32:14', '2020-02-11 10:32:14', 'PAID', NULL),
(132, 53, 136, NULL, 250000, 'CASH', NULL, NULL, '2020-02-11 10:33:13', '2020-02-11 10:33:13', 'PAID', NULL),
(133, 53, 138, NULL, 250000, 'CASH', NULL, NULL, '2020-02-11 10:34:35', '2020-02-11 10:34:35', 'PAID', NULL),
(134, 55, 140, NULL, 200600, 'CASH', 6, NULL, '2020-02-13 11:59:47', '2020-02-13 11:59:47', 'PAID', NULL),
(135, 55, 141, NULL, 800000, 'CASH', 7, NULL, '2020-02-13 12:03:06', '2020-02-13 12:03:06', 'PAID', NULL),
(136, 55, 143, NULL, 0, 'CASH', 1, NULL, '2020-02-16 18:12:40', '2020-02-16 18:12:40', 'PAID', NULL),
(137, 56, 145, NULL, 49000, 'CASH', NULL, NULL, '2020-02-19 16:11:36', '2020-02-19 16:11:36', 'PAID', NULL),
(147, 8, 41, NULL, 123000, 'CASH', NULL, NULL, '2019-11-26 08:53:51', '2019-11-26 08:53:51', 'PAID', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` bigint(20) NOT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `cls` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `analysis` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `hospital_id` bigint(20) DEFAULT NULL,
  `arrive_time` datetime DEFAULT NULL,
  `examine_time` datetime DEFAULT NULL,
  `finish_time` datetime DEFAULT NULL,
  `icd_id` bigint(20) DEFAULT NULL,
  `sub_icd_id` bigint(20) DEFAULT NULL,
  `number_day_off` int(11) DEFAULT NULL,
  `from_day_off` date DEFAULT NULL,
  `mach` int(11) DEFAULT NULL,
  `nhip_tho` int(11) DEFAULT NULL,
  `nhiet_do` int(11) DEFAULT NULL,
  `huyet_ap` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `status` enum('OPEN','IN_PROGRESS','DONE','CANCELLED') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `solution` enum('CapToa','DieuTriNgoaiTru','CapToaHenTaiKham','ChuyenVien','Khac','KhongToa','BanThuocLe') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'CapToa',
  `queue_number_id` bigint(20) DEFAULT NULL,
  `insurance_type_id` bigint(20) DEFAULT NULL,
  `prescription_type` varchar(20) COLLATE utf8_unicode_ci DEFAULT 'PRESCRIPTIONITEM'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`id`, `doctor_id`, `patient_id`, `department_id`, `created_date`, `cls`, `analysis`, `hospital_id`, `arrive_time`, `examine_time`, `finish_time`, `icd_id`, `sub_icd_id`, `number_day_off`, `from_day_off`, `mach`, `nhip_tho`, `nhiet_do`, `huyet_ap`, `height`, `weight`, `status`, `solution`, `queue_number_id`, `insurance_type_id`, `prescription_type`) VALUES
(1, 1, 1, 1, NULL, 'cảm cúm thông thường, sổ mũi, nhức đầu nhẹ; Tê bì chân tay, mồ hôi tay, mệt mỏi sau ngủ dậy', 'Nhiễm lạnh thời gian dài, siêu vi xâm nhập cơ thể', 1, '2019-09-13 11:56:45', NULL, '2019-09-27 14:27:20', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 14, NULL, 'PRESCRIPTION'),
(3, 1, 1, 1, NULL, '', '123123', 1, '2019-09-13 15:37:39', NULL, '2019-10-04 09:56:59', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'CapToa', 16, NULL, 'PRESCRIPTION'),
(4, 1, 1, 1, NULL, '', NULL, 1, '2019-09-13 15:42:11', NULL, '2019-11-26 16:46:22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 17, 1, 'PRESCRIPTION'),
(5, 1, 1, 1, NULL, NULL, NULL, 1, '2019-09-16 10:40:07', NULL, '2019-10-04 09:56:59', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', 'CapToa', 17, 1, 'PRESCRIPTION'),
(6, 2, 2, 1, NULL, NULL, NULL, 1, '2019-09-16 10:46:52', NULL, '2019-10-04 09:56:59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', 'CapToa', 14, 1, 'PRESCRIPTION'),
(7, 1, 2, 1, NULL, 'cảm cúm thông thường, sổ mũi, nhức đầu nhẹ;', NULL, 1, '2019-09-16 10:53:26', NULL, '2019-10-04 09:56:59', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'OPEN', 'CapToa', 15, 1, 'PRESCRIPTION'),
(8, 1, 1, 5, NULL, 'cảm cúm thông thường, sổ mũi, nhức đầu nhẹ', NULL, 1, '2019-09-25 08:00:00', '2019-10-04 09:56:59', '2019-11-27 16:09:49', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 16, 1, 'PRESCRIPTION'),
(9, 1, 1, 5, NULL, '', NULL, 1, '2019-09-25 10:15:00', '2019-10-04 09:56:59', '2019-11-13 19:38:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 17, 1, 'PRESCRIPTION'),
(10, 1, 1, 1, NULL, '', NULL, 1, '2019-09-27 10:30:01', '2019-10-04 09:56:59', '2019-11-13 20:32:41', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 14, 1, 'PRESCRIPTION'),
(11, 1, 1, 1, NULL, NULL, NULL, 1, '2019-09-27 10:45:01', '2019-10-04 09:56:59', '2019-10-04 09:56:59', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 15, 1, 'PRESCRIPTION'),
(12, 1, 1, 1, NULL, NULL, NULL, 1, '2019-09-27 11:00:00', '2019-10-04 09:56:59', '2019-10-04 09:56:59', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 16, 1, 'PRESCRIPTION'),
(13, 1, 1, 1, NULL, NULL, NULL, 1, '2019-10-04 09:56:59', '2019-10-04 09:56:59', '2019-10-04 09:56:59', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 17, 1, 'PRESCRIPTION'),
(15, 1, 2, 1, NULL, NULL, NULL, 1, '2019-10-05 09:56:59', '2019-10-04 09:56:59', '2019-10-04 09:56:59', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 15, 1, 'PRESCRIPTION'),
(16, 1, 1, 1, NULL, 'new new', 'new new', 1, '2019-10-02 09:56:59', '2019-10-04 09:56:59', '2019-10-04 09:56:59', 2, 2, 1, '2019-10-02', 200, 200, 200, '200', 200, 200, 'DONE', 'DieuTriNgoaiTru', 19, 1, 'PRESCRIPTION'),
(17, 1, 3, 1, NULL, '', NULL, 1, '2019-10-03 09:56:59', '2019-10-04 09:56:59', '2019-10-04 09:56:59', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 21, 1, 'PRESCRIPTION'),
(19, 1, 1, 1, NULL, NULL, NULL, 1, '2019-10-04 18:00:00', '2019-10-04 18:25:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 24, 1, 'PRESCRIPTION'),
(20, 1, 1, 1, NULL, NULL, NULL, 1, '2019-10-04 18:00:00', '2019-10-04 18:25:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 24, 1, 'PRESCRIPTION'),
(21, 1, 1, 6, NULL, NULL, NULL, 1, '2019-10-04 18:00:00', '2019-10-04 18:25:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 24, 1, 'PRESCRIPTION'),
(22, 1, 1, 6, NULL, NULL, NULL, 1, '2019-10-04 18:00:00', '2019-10-04 18:25:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 24, 1, 'PRESCRIPTION'),
(23, 1, 1, 6, NULL, NULL, NULL, 1, '2019-10-04 18:00:00', '2019-10-04 18:25:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 24, 1, 'PRESCRIPTION'),
(24, 1, 1, 6, NULL, NULL, NULL, 1, '2019-10-04 18:00:00', '2019-10-04 18:25:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 24, 1, 'PRESCRIPTION'),
(25, 1, 2, 1, NULL, '', NULL, 1, '2019-10-09 12:00:01', '2019-10-09 14:43:38', NULL, NULL, NULL, NULL, NULL, 10, 120, 10, '', 10, 60, 'DONE', 'KhongToa', 30, 1, 'PRESCRIPTION'),
(26, 1, 1, 1, NULL, '', NULL, 1, '2019-10-09 11:45:01', '2019-10-09 16:25:15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 29, NULL, 'PRESCRIPTION'),
(27, 1, 3, 1, NULL, '', NULL, 1, '2019-10-09 12:00:01', '2019-10-09 16:28:59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 31, NULL, 'PRESCRIPTION'),
(28, 1, 1, 1, NULL, '', 'Binh thuong', 1, '2019-10-10 10:00:00', '2019-10-10 14:31:53', '2019-10-10 15:30:51', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 32, 2, 'PRESCRIPTION'),
(29, 1, 1, 1, NULL, NULL, NULL, 1, '2019-10-23 10:00:01', '2019-10-23 10:18:51', NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 33, NULL, 'PRESCRIPTION'),
(30, 1, 4, 1, NULL, '', NULL, 1, '2019-10-28 13:30:01', '2019-10-28 14:10:45', '2019-11-13 17:18:35', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 35, NULL, 'PRESCRIPTION'),
(31, 1, 1, 1, NULL, NULL, NULL, 1, '2019-10-31 15:45:00', '2019-10-31 16:10:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 36, NULL, 'PRESCRIPTION'),
(32, 1, 2, 1, NULL, NULL, NULL, 1, '2019-10-31 16:00:00', '2019-10-31 16:14:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 37, NULL, 'PRESCRIPTION'),
(33, 1, 3, 1, NULL, NULL, NULL, 1, '2019-10-31 16:15:01', '2019-10-31 16:32:11', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 38, NULL, 'PRESCRIPTION'),
(34, 1, 4, 1, NULL, '', NULL, 1, '2019-11-01 16:30:00', '2019-11-01 17:36:39', '2019-11-01 17:37:08', 1, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 39, NULL, 'PRESCRIPTION'),
(35, 1, 1, 2, NULL, '', NULL, 1, '2019-11-12 23:00:00', '2019-11-12 23:35:22', '2019-11-13 00:10:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 42, NULL, 'PRESCRIPTION'),
(36, 1, 4, 5, NULL, '', NULL, 1, '2019-11-13 13:45:01', '2019-11-13 13:39:28', '2019-11-13 13:40:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 43, NULL, 'PRESCRIPTION'),
(37, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(38, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(39, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(40, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(41, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(42, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(43, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(44, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(45, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(46, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(47, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(48, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(49, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(50, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(51, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(52, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(53, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(54, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(55, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(56, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(57, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(58, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(59, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(60, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(61, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(62, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(63, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(64, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(65, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(66, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(67, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(68, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(69, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(70, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(71, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(72, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(73, 5, 1, 7, NULL, NULL, NULL, 1, '2019-11-21 08:30:00', '2019-11-19 09:32:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 48, NULL, 'PRESCRIPTION'),
(74, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(75, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(76, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(77, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(78, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(79, 6, 1, 7, NULL, NULL, NULL, NULL, '2019-11-20 14:15:00', '2019-11-20 14:35:09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 52, NULL, 'PRESCRIPTION'),
(80, 6, 3, 7, NULL, NULL, NULL, NULL, '2019-11-21 14:15:00', '2019-11-20 14:36:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 53, NULL, 'PRESCRIPTION'),
(81, 6, 1, 7, NULL, NULL, NULL, NULL, '2019-11-21 14:15:00', '2019-11-20 14:48:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 54, NULL, 'PRESCRIPTION'),
(82, 6, 6, 7, NULL, NULL, NULL, NULL, '2019-11-22 14:15:00', '2019-11-20 15:07:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 55, NULL, 'PRESCRIPTION'),
(83, 6, 1, 7, NULL, NULL, NULL, NULL, '2019-11-22 09:00:00', '2019-11-21 09:48:29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 56, NULL, 'PRESCRIPTION'),
(84, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(85, 6, 3, 7, NULL, NULL, NULL, NULL, '2019-11-22 09:15:00', '2019-11-21 10:40:41', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 57, NULL, 'PRESCRIPTION'),
(86, 6, 4, 7, NULL, NULL, NULL, NULL, '2019-11-22 14:30:00', '2019-11-21 14:11:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 59, NULL, 'PRESCRIPTION'),
(87, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(88, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(89, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(90, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(91, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(92, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(93, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(94, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(95, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(96, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(97, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(98, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(99, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(100, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(101, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(102, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(104, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(105, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(106, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(107, 6, 6, 6, NULL, '', NULL, 3, '2019-11-28 10:00:00', '2019-11-28 10:00:57', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 61, NULL, 'PRESCRIPTION'),
(108, 6, 1, 6, NULL, '', NULL, 3, '2019-11-28 14:30:00', '2019-11-28 14:14:02', '2019-11-28 14:30:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 62, NULL, 'PRESCRIPTION'),
(109, 6, 7, 6, NULL, '', NULL, 3, '2019-11-29 08:15:00', '2019-11-29 08:25:06', '2019-12-02 09:45:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 64, NULL, 'PRESCRIPTION'),
(110, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(111, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(112, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(113, 6, 3, 1, NULL, 'Hô Hấp', ' Hô Hấp', 3, '2019-12-02 10:45:00', '2019-12-02 11:13:31', '2019-12-02 11:19:13', 1, 1, 1, '2019-12-02', NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 65, 1, 'PRESCRIPTION'),
(114, 6, 6, 1, NULL, '', NULL, 3, '2019-12-02 11:30:00', '2019-12-02 11:45:54', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 66, NULL, 'PRESCRIPTION'),
(115, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(116, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(117, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(118, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(119, 1, 6, 1, NULL, NULL, NULL, 3, '2019-12-04 09:15:00', '2019-12-04 09:55:49', '2019-12-05 03:15:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 67, NULL, 'PRESCRIPTION'),
(120, 1, 1, 1, NULL, '', NULL, 3, '2019-12-04 09:45:00', '2019-12-04 10:19:44', '2019-12-05 03:11:22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 68, NULL, 'PRESCRIPTION'),
(121, 1, 1, 6, NULL, '', NULL, 3, '2019-12-04 10:00:00', '2019-12-04 10:30:40', '2019-12-04 23:00:07', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 72, NULL, 'PRESCRIPTION'),
(122, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(123, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(124, 1, 4, 1, NULL, '', NULL, 3, '2019-12-04 10:30:00', '2019-12-04 10:51:21', '2019-12-04 22:51:24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 69, NULL, 'PRESCRIPTION'),
(125, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(126, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(127, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(128, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(129, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(130, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(131, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(132, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(133, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(134, 1, 6, 3, NULL, 'cảm cúm thông thường, sổ mũi, nhức đầu nhẹ', 'cảm cúm thông thường, sổ mũi, nhức đầu nhẹ', 3, '2019-12-05 04:00:01', '2019-12-05 03:54:21', '2019-12-05 03:55:07', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 73, NULL, 'PRESCRIPTION'),
(135, 1, 4, 3, NULL, '', NULL, 3, '2019-12-05 04:30:00', '2019-12-05 03:58:21', '2020-01-13 15:41:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 74, NULL, 'PRESCRIPTION'),
(136, 1, 7, 3, NULL, '', NULL, 3, '2019-12-05 04:15:00', '2019-12-05 04:00:30', '2019-12-05 04:01:02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 75, NULL, 'PRESCRIPTION'),
(137, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(138, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(139, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(140, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(141, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(142, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(143, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(144, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(145, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(146, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(147, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(148, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(149, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(150, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(151, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(152, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(153, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(154, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(155, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(156, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(157, 6, 1, 1, NULL, NULL, NULL, 3, '2019-12-06 07:15:00', '2019-12-06 09:08:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 76, NULL, NULL),
(158, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(159, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(160, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(161, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(162, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(163, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(164, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(165, 6, 3, 6, NULL, 'Hô Hấp', 'Hô Hấp', 3, '2019-12-09 14:45:00', '2019-12-09 15:25:20', NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'CapToa', 77, NULL, NULL),
(166, 6, 1, 1, NULL, NULL, NULL, 3, '2019-12-13 10:00:00', '2019-12-13 10:18:54', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 82, NULL, NULL),
(167, 6, 3, 1, NULL, NULL, NULL, 3, '2019-12-13 10:00:00', '2019-12-13 10:22:34', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 83, NULL, NULL),
(168, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(169, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(170, 1, 1, 3, NULL, '', NULL, 3, '2019-12-24 10:15:00', '2019-12-24 10:59:36', '2019-12-24 11:05:05', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 86, NULL, 'PRESCRIPTION'),
(171, 1, 6, 3, NULL, NULL, NULL, 3, '2019-12-24 15:00:00', '2019-12-24 14:56:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 87, NULL, NULL),
(172, 1, 7, 3, NULL, NULL, NULL, 3, '2019-12-24 15:15:00', '2019-12-24 15:05:32', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 88, NULL, NULL),
(173, 6, 6, 6, NULL, NULL, NULL, 3, '2019-12-25 08:15:00', '2019-12-25 09:45:32', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 89, NULL, NULL),
(174, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(175, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(176, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(177, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(178, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(179, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(180, 6, 6, 1, NULL, NULL, NULL, 3, '2019-12-27 08:15:00', '2019-12-27 09:53:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 90, NULL, NULL),
(181, 6, 7, 1, NULL, NULL, NULL, 3, '2019-12-27 10:15:00', '2019-12-27 09:55:52', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 91, NULL, NULL),
(182, 6, 1, 1, NULL, NULL, NULL, 3, '2019-12-27 10:00:00', '2019-12-27 09:57:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 92, NULL, NULL),
(183, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(184, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(185, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(186, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(187, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(188, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(189, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(190, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(191, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(192, 6, 3, 1, NULL, NULL, NULL, 3, '2019-12-30 11:00:00', '2019-12-30 11:09:27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 93, NULL, NULL),
(193, 6, 6, 1, NULL, NULL, NULL, 3, '2019-12-30 12:30:00', '2019-12-30 13:51:53', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 94, NULL, NULL),
(194, 6, 7, 1, NULL, NULL, NULL, 3, '2019-12-30 16:00:00', '2019-12-30 13:53:52', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 95, NULL, NULL),
(195, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(196, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(197, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(198, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(199, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(200, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(201, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(202, 1, 4, 3, NULL, NULL, NULL, 3, '2020-01-23 15:45:00', '2020-01-07 16:58:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 97, NULL, NULL),
(203, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(204, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(205, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(206, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(207, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(208, 3, 3, 3, NULL, NULL, NULL, NULL, '2020-01-22 00:00:00', '2020-01-08 17:08:09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 109, NULL, NULL),
(209, 3, 6, 3, NULL, NULL, NULL, NULL, '2020-01-28 00:00:00', '2020-01-08 17:08:35', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 110, NULL, NULL),
(210, 4, 7, 3, NULL, NULL, NULL, NULL, '2020-01-28 14:15:00', '2020-01-08 17:20:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 111, NULL, NULL),
(211, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(212, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(213, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(214, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(215, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(216, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(217, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(218, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(219, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(220, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(221, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(222, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(223, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(224, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(225, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(226, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(227, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(228, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(229, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(230, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(231, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(232, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(233, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(234, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(235, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(236, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(237, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(238, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(239, 1, 1, 3, NULL, NULL, NULL, 3, '2020-01-10 08:45:00', '2020-01-10 11:08:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 113, NULL, NULL),
(240, 1, 3, 3, NULL, NULL, NULL, 3, '2020-01-10 09:15:00', '2020-01-10 11:52:10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 114, NULL, NULL),
(241, 1, 3, 3, NULL, '', NULL, 3, '2020-01-06 15:15:00', '2020-01-10 12:00:09', '2020-01-13 14:29:05', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 115, NULL, 'PRESCRIPTION'),
(242, 1, 7, 3, NULL, '', NULL, 3, '2020-01-01 11:30:00', '2020-01-10 12:10:48', '2020-01-10 12:17:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 116, NULL, 'PRESCRIPTION'),
(243, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(244, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(245, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(246, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(247, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(248, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(249, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(250, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(251, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(252, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(253, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(254, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(255, 1, 3, 3, NULL, NULL, NULL, 3, '2020-01-01 00:00:00', '2020-01-16 09:14:29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 119, NULL, NULL),
(256, 1, 1, 3, NULL, NULL, NULL, 3, '2020-01-16 08:45:00', '2020-01-16 09:19:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 120, NULL, NULL),
(257, 1, 6, 3, NULL, NULL, NULL, 3, '2020-01-20 08:30:00', '2020-01-16 09:33:04', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 121, NULL, NULL),
(258, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(259, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(260, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(261, 1, 3, 3, NULL, '', NULL, 3, '2020-01-27 10:15:00', '2020-01-17 10:41:28', '2020-01-17 10:49:45', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 122, NULL, 'PRESCRIPTION'),
(262, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(263, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(264, 1, 3, 3, NULL, NULL, NULL, 3, '2020-01-21 08:15:00', '2020-01-21 07:28:39', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 125, NULL, NULL),
(265, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(266, 1, 12, 3, NULL, NULL, NULL, 3, '2020-01-21 09:00:00', '2020-01-21 09:07:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 126, NULL, NULL),
(267, 1, 12, 3, NULL, NULL, NULL, 3, '2020-01-21 09:30:00', '2020-01-21 09:32:22', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 127, NULL, NULL),
(268, 1, 3, 3, NULL, NULL, NULL, 3, '2020-01-21 09:45:00', '2020-01-21 09:36:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 128, NULL, NULL),
(269, 1, 6, 3, NULL, '', NULL, 3, '2020-01-21 09:30:00', '2020-01-21 10:40:49', '2020-01-21 11:13:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 129, NULL, 'PRESCRIPTION'),
(270, 1, 3, 3, NULL, NULL, NULL, 3, '2020-01-21 00:00:00', '2020-01-21 10:55:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 130, NULL, NULL),
(271, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(272, 1, 4, 3, NULL, NULL, NULL, 3, '2020-01-26 10:30:00', '2020-02-03 11:40:06', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 131, NULL, NULL),
(273, 1, 4, 3, NULL, NULL, NULL, 3, '2020-01-26 00:00:00', '2020-02-03 14:48:31', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 132, NULL, NULL),
(274, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM');
INSERT INTO `prescription` (`id`, `doctor_id`, `patient_id`, `department_id`, `created_date`, `cls`, `analysis`, `hospital_id`, `arrive_time`, `examine_time`, `finish_time`, `icd_id`, `sub_icd_id`, `number_day_off`, `from_day_off`, `mach`, `nhip_tho`, `nhiet_do`, `huyet_ap`, `height`, `weight`, `status`, `solution`, `queue_number_id`, `insurance_type_id`, `prescription_type`) VALUES
(275, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(276, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(277, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(278, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(279, 1, 12, 3, NULL, NULL, NULL, 3, '2020-02-11 06:08:30', '2020-02-11 06:12:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 134, NULL, NULL),
(280, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 137, NULL, 'PRESCRIPTION'),
(281, 2, 3, 20, NULL, NULL, NULL, 3, '2020-02-11 07:28:35', '2020-02-11 08:17:43', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 136, NULL, NULL),
(282, 1, 15, 3, NULL, NULL, NULL, 3, '2020-02-11 06:17:56', '2020-02-11 08:18:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 135, NULL, NULL),
(283, 1, 6, 3, NULL, NULL, NULL, 3, '2020-02-11 08:22:06', '2020-02-11 08:19:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 138, NULL, NULL),
(284, 1, 3, 3, NULL, NULL, NULL, 3, '2020-02-11 08:23:03', '2020-02-11 08:28:23', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 139, NULL, NULL),
(285, 1, 15, 3, NULL, NULL, NULL, 3, '2020-02-11 08:32:46', '2020-02-11 08:34:50', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 142, NULL, NULL),
(286, 1, 11, 3, NULL, NULL, NULL, 3, '2020-02-11 08:32:46', '2020-02-11 08:35:02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 143, NULL, NULL),
(287, 2, 4, 20, NULL, NULL, NULL, 3, '2020-02-11 08:23:03', '2020-02-11 08:35:49', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 140, NULL, NULL),
(288, 2, 6, 20, NULL, NULL, NULL, 3, '2020-02-11 08:23:03', '2020-02-11 08:38:36', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 141, NULL, NULL),
(289, 2, 17, 20, NULL, 'ho sot ', 'TANG HUYET AP (i10)', 3, '2020-02-11 09:11:18', '2020-02-11 09:09:00', NULL, 1, 1, 1, '2020-02-11', NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'CapToa', 145, NULL, NULL),
(290, 2, 16, 20, NULL, NULL, NULL, 3, '2020-02-11 08:54:50', '2020-02-11 09:10:51', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 144, NULL, NULL),
(291, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(292, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(293, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(294, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(295, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(296, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(297, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(298, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(299, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(300, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(301, 2, 7, 20, NULL, NULL, NULL, 3, '2020-02-11 10:41:24', '2020-02-11 10:47:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 147, NULL, NULL),
(302, 1, 3, 3, NULL, NULL, NULL, 3, '2020-02-12 09:54:15', '2020-02-12 09:51:50', '2020-02-12 09:57:30', 2, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'CapToa', 148, NULL, 'PRESCRIPTION'),
(303, 1, 6, 3, NULL, '5', '5', 3, '2020-02-12 09:56:05', '2020-02-12 09:54:01', NULL, 2, 2, 5, '2020-02-10', 23, 6, 4, '7', 5, 7, 'IN_PROGRESS', 'CapToa', 149, NULL, NULL),
(304, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(305, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(306, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(307, 1, 1, 3, NULL, NULL, NULL, 3, '2020-02-13 09:11:20', '2020-02-13 10:49:43', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 150, NULL, NULL),
(308, 1, 3, 3, NULL, NULL, NULL, 3, '2020-02-13 09:11:20', '2020-02-13 11:05:29', NULL, 2, 2, 7, '2020-01-27', NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'CapToaHenTaiKham', 151, NULL, NULL),
(309, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 152, NULL, NULL),
(310, 1, 6, 3, NULL, NULL, NULL, 3, '2020-02-13 09:11:20', '2020-02-13 11:26:19', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 153, NULL, NULL),
(311, 1, 7, 3, NULL, NULL, NULL, 3, '2020-02-13 09:11:20', '2020-02-13 11:56:36', '2020-02-13 12:01:46', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 154, NULL, 'PRESCRIPTION'),
(312, 1, 13, 3, NULL, NULL, NULL, 3, '2020-02-13 12:03:06', '2020-02-13 12:00:03', '2020-02-13 12:04:59', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'KhongToa', 155, NULL, 'PRESCRIPTION'),
(313, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM'),
(314, 1, 3, 3, NULL, NULL, NULL, 3, '2020-02-19 15:47:00', '2020-02-19 15:50:25', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'IN_PROGRESS', 'KhongToa', 156, NULL, NULL),
(315, 1, NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'DONE', 'BanThuocLe', NULL, NULL, 'PRESCRIPTIONITEM');

-- --------------------------------------------------------

--
-- Table structure for table `prescription_item`
--

CREATE TABLE `prescription_item` (
  `id` bigint(20) NOT NULL,
  `prescription_id` bigint(20) NOT NULL,
  `morning_amount` int(11) DEFAULT '0',
  `noon_amount` int(11) DEFAULT '0',
  `afternoon_amount` int(11) DEFAULT '0',
  `evening_amount` int(11) DEFAULT '0',
  `number_of_days` int(11) DEFAULT '0',
  `total_amount` int(11) NOT NULL DEFAULT '0',
  `instruction` longtext COLLATE utf8_bin,
  `supper_id` bigint(20) DEFAULT NULL,
  `input_stock_id` bigint(20) DEFAULT NULL,
  `drug_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `prescription_item`
--

INSERT INTO `prescription_item` (`id`, `prescription_id`, `morning_amount`, `noon_amount`, `afternoon_amount`, `evening_amount`, `number_of_days`, `total_amount`, `instruction`, `supper_id`, `input_stock_id`, `drug_id`) VALUES
(1, 17, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(3, 6, 2, 2, 0, 2, 2, 12, 'Sáng 2 , Trưa 2 , Chiều 0 , Tối 2', NULL, 27, 1),
(4, 7, 1, 1, 0, 1, 2, 6, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, 27, 1),
(5, 5, 1, 1, 1, 1, 2, 8, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(7, 9, 1, 1, 1, 1, 3, 12, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(8, 1, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(9, 17, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(10, 17, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(41, 19, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(42, 19, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(43, 19, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(44, 19, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(45, 19, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(46, 19, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(47, 1, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(48, 28, 1, 1, 1, 1, 2, 8, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(49, 3, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(51, 30, 2, 2, 2, 2, 1, 8, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 27, 1),
(52, 30, 1, 1, 1, 1, 2, 8, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(54, 33, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(60, 35, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(61, 35, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(62, 36, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(64, 36, 1, 1, 1, 11, 1, 14, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 11', NULL, 27, 1),
(65, 36, 1, 1, 1, 11, 1, 14, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 11', NULL, 27, 1),
(66, 27, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(67, 27, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(71, 29, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(73, 4, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 72, 4),
(74, 9, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 72, 4),
(75, 9, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(76, 10, 1, 0, 1, 0, 7, 14, 'Sáng 1 , Trưa 0 , Chiều 1 , Tối 0', NULL, 27, 1),
(77, 10, 1, 1, 1, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(78, 37, 1, 1, 0, 1, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, 29, 5),
(79, 37, 1, 1, 0, 1, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, 27, 1),
(80, 38, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 29, 5),
(81, 39, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 29, 5),
(82, 39, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 29, 5),
(83, 40, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(84, 40, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 29, 5),
(85, 41, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(86, 42, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(87, 43, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(88, 44, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(89, 45, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(90, 46, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(91, 47, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(92, 48, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(134, 49, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(135, 49, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 71, 2),
(136, 50, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(140, 8, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(141, 8, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(144, 50, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 71, 2),
(145, 50, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, NULL, NULL),
(146, 51, 1, 1, 1, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(147, 51, 1, 1, 1, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 29, 5),
(148, 52, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(149, 51, 1, 1, 1, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, NULL),
(150, 52, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 71, 2),
(151, 52, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 72, 4),
(152, 51, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, NULL),
(153, 60, 1, 1, 1, 0, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 27, 1),
(154, 61, 1, 0, 0, 0, 3, 3, 'Sáng 1 , Trưa 0 , Chiều 0 , Tối 0', NULL, 27, 1),
(155, 3, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(157, 82, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(158, 82, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(160, 3, 0, 1, 11, 1, 1, 13, 'Sáng 0 , Trưa 1 , Chiều 11 , Tối 1', NULL, NULL, NULL),
(161, 94, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(162, 95, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(164, 95, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(165, 96, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(166, 96, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(167, 97, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(170, 85, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(171, 99, 0, 0, 0, 0, 0, 9, NULL, NULL, NULL, NULL),
(172, 99, 0, 0, 0, 0, 0, 3, NULL, 171, 27, 1),
(173, 99, 0, 0, 0, 0, 0, 6, NULL, 171, 71, 2),
(174, 99, 0, 0, 0, 0, 0, 6, NULL, NULL, 29, 5),
(175, 100, 0, 0, 0, 0, 0, 9, NULL, NULL, NULL, NULL),
(176, 100, 0, 0, 0, 0, 0, 3, NULL, 175, 27, 1),
(177, 100, 0, 0, 0, 0, 0, 6, NULL, 175, 71, 2),
(178, 100, 0, 0, 0, 0, 0, 3, NULL, NULL, 15, 7),
(179, 101, 0, 0, 0, 0, 0, 10, NULL, NULL, NULL, NULL),
(180, 101, 0, 0, 0, 0, 0, 4, NULL, 179, 27, 1),
(181, 101, 0, 0, 0, 0, 0, 6, NULL, 179, 71, 2),
(182, 102, 0, 0, 0, 0, 0, 24, NULL, NULL, NULL, NULL),
(184, 102, 0, 0, 0, 0, 0, 12, NULL, 182, 71, 2),
(185, 102, 0, 0, 0, 0, 0, 12, NULL, 182, 71, 2),
(186, 103, 1, 1, 111, 1, 1, 114, 'Sáng 1 , Trưa 1 , Chiều 111 , Tối 1', NULL, 27, 1),
(187, 103, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(188, 103, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(190, 106, 0, 0, 0, 0, 0, 10, NULL, NULL, NULL, NULL),
(191, 106, 0, 0, 0, 0, 0, 10, NULL, 190, 27, 1),
(192, 106, 0, 0, 0, 0, 0, 10, NULL, NULL, 71, 2),
(193, 109, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(194, 109, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(195, 117, 0, 0, 0, 0, 0, 10, NULL, NULL, NULL, NULL),
(196, 117, 0, 0, 0, 0, 0, 10, NULL, 195, 71, 2),
(197, 118, 0, 0, 0, 0, 0, 153, NULL, NULL, NULL, NULL),
(198, 118, 0, 0, 0, 0, 0, 30, NULL, 197, 71, 2),
(199, 118, 0, 0, 0, 0, 0, 123, NULL, 197, 71, 2),
(205, 122, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(206, 125, 0, 0, 0, 0, 0, 10, NULL, NULL, NULL, NULL),
(207, 125, 0, 0, 0, 0, 0, 10, NULL, 206, 71, 2),
(208, 127, 0, 0, 0, 0, 0, 10, NULL, NULL, 71, 2),
(209, 124, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(210, 124, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(211, 124, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(212, 124, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(213, 124, 0, 1, 11, 1, 1, 13, 'Sáng 0 , Trưa 1 , Chiều 11 , Tối 1', NULL, NULL, NULL),
(214, 128, 0, 0, 0, 0, 0, 10, NULL, NULL, 71, 2),
(215, 129, 0, 0, 0, 0, 0, 20, NULL, NULL, 71, 2),
(216, 121, 1, 1, 1, 1, 2, 8, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(217, 121, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 72, 4),
(218, 121, 2, 2, 0, 2, 2, 12, 'Sáng 2 , Trưa 2 , Chiều 0 , Tối 2', NULL, 27, 1),
(219, 121, 1, 1, 1, 1, 3, 12, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(220, 121, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 72, 4),
(221, 121, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(222, 120, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(223, 120, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(224, 120, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(225, 120, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(226, 120, 0, 1, 11, 1, 1, 13, 'Sáng 0 , Trưa 1 , Chiều 11 , Tối 1', NULL, NULL, NULL),
(227, 120, 1, 1, 0, 1, 2, 6, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, 27, 1),
(228, 119, 1, 2, 2, 2, 7, 49, 'Sáng 1 , Trưa 2 , Chiều 2 , Tối 2', NULL, 27, 1),
(229, 130, 0, 0, 0, 0, 0, 987, NULL, NULL, NULL, NULL),
(230, 130, 0, 0, 0, 0, 0, 987, NULL, 229, 71, 2),
(231, 131, 0, 0, 0, 0, 0, 789, NULL, NULL, 27, 1),
(232, 132, 0, 0, 0, 0, 0, 100, NULL, NULL, 71, 2),
(233, 132, 0, 0, 0, 0, 0, 1234, NULL, NULL, 27, 1),
(234, 133, 0, 0, 0, 0, 0, 15, NULL, NULL, 29, 5),
(237, 135, 1, 1, 1, 0, 7, 21, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 0', NULL, 71, 2),
(238, 136, 1, 1, 1, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, NULL),
(239, 138, 0, 0, 0, 0, 0, 3, NULL, NULL, 27, 1),
(240, 140, 0, 0, 0, 0, 0, 3, NULL, NULL, 30, 20),
(241, 140, 0, 0, 0, 0, 0, 3, NULL, NULL, 71, 2),
(242, 141, 0, 0, 0, 0, 0, 6, NULL, NULL, 30, 20),
(243, 142, 0, 0, 0, 0, 0, 6, NULL, NULL, 30, 20),
(244, 143, 0, 0, 0, 0, 0, 0, NULL, NULL, 30, 20),
(245, 144, 0, 0, 0, 0, 0, 6, NULL, NULL, 30, 20),
(246, 144, 0, 0, 0, 0, 0, 3, NULL, NULL, 71, 2),
(247, 145, 0, 0, 0, 0, 0, 6, NULL, NULL, 30, 20),
(248, 145, 0, 0, 0, 0, 0, 3, NULL, NULL, 71, 2),
(249, 147, 0, 0, 0, 0, 0, 6, NULL, NULL, 30, 20),
(250, 147, 0, 0, 0, 0, 0, 6, NULL, NULL, 71, 2),
(251, 148, 0, 0, 0, 0, 0, 6, NULL, NULL, 33, 21),
(252, 149, 0, 0, 0, 0, 0, 6, NULL, NULL, 34, 22),
(253, 150, 0, 0, 0, 0, 0, 5, NULL, NULL, 56, 23),
(254, 152, 0, 0, 0, 0, 0, 10, NULL, NULL, 56, 23),
(255, 152, 0, 0, 0, 0, 0, 10, NULL, NULL, 34, 22),
(256, 107, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(257, 134, 1, 0, 1, 0, 7, 14, 'Sáng 1 , Trưa 0 , Chiều 1 , Tối 0', NULL, 27, 1),
(258, 134, 1, 0, 1, 0, 7, 14, 'Sáng 1 , Trưa 0 , Chiều 1 , Tối 0', NULL, 71, 2),
(260, 155, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(261, 156, 0, 0, 0, 0, 0, 10, NULL, NULL, 27, 1),
(262, 160, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(265, 163, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(266, 164, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL),
(267, 164, 0, 0, 0, 0, 0, 0, NULL, 266, 27, 1),
(268, 164, 0, 0, 0, 0, 0, 0, NULL, 266, 27, 1),
(269, 164, 0, 0, 0, 0, 0, 2, NULL, NULL, 27, 1),
(270, 165, 1, 1, 1, 1, 2, 8, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(272, 169, 0, 0, 0, 0, 0, 1, NULL, NULL, 27, 1),
(273, 169, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL),
(274, 169, 0, 0, 0, 0, 0, 1, NULL, 273, 27, 1),
(275, 170, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(276, 170, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 71, 2),
(277, 170, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, NULL),
(278, 171, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(279, 171, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(280, 173, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(281, 173, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(282, 177, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(283, 176, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(284, 176, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(285, 176, 0, 0, 0, 0, 0, 0, NULL, NULL, 71, 2),
(286, 176, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(287, 180, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(288, 180, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(289, 182, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(290, 182, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(291, 184, 0, 0, 0, 0, 0, 1, NULL, NULL, 61, 28),
(292, 185, 0, 0, 0, 0, 0, 9, NULL, NULL, 70, 30),
(293, 185, 0, 0, 0, 0, 0, 9, NULL, NULL, 64, 29),
(294, 186, 0, 0, 0, 0, 0, 3991, NULL, NULL, 70, 30),
(295, 187, 0, 0, 0, 0, 0, 1000, NULL, NULL, 70, 30),
(296, 189, 0, 0, 0, 0, 0, 900, NULL, NULL, 70, 30),
(297, 190, 0, 0, 0, 0, 0, 5, NULL, NULL, 70, 30),
(298, 190, 0, 0, 0, 0, 0, 5, NULL, NULL, 70, 30),
(299, 190, 0, 0, 0, 0, 0, 5, NULL, NULL, 70, 30),
(301, 192, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(302, 192, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(303, 196, 0, 0, 0, 0, 0, 1, NULL, NULL, 27, 1),
(304, 196, 0, 0, 0, 0, 0, 5, NULL, NULL, 71, 2),
(305, 199, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(306, 199, 0, 0, 0, 0, 0, 0, NULL, NULL, 71, 2),
(307, 199, 0, 0, 0, 0, 0, 5, NULL, NULL, 27, 1),
(308, 199, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(309, 200, 0, 0, 0, 0, 0, 0, NULL, NULL, 27, 1),
(310, 200, 0, 0, 0, 0, 0, 0, NULL, NULL, 71, 2),
(311, 203, 0, 0, 0, 0, 0, 0, NULL, NULL, 71, 2),
(312, 203, 0, 0, 0, 0, 0, 0, NULL, NULL, 71, 2),
(313, 204, 0, 0, 0, 0, 0, 10, NULL, NULL, 71, 2),
(314, 210, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, 1),
(315, 210, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(316, 211, 0, 0, 0, 0, 0, 3, NULL, NULL, 71, 2),
(317, 212, 0, 0, 0, 0, 0, 3, NULL, NULL, 71, 2),
(318, 213, 0, 0, 0, 0, 0, 3, NULL, NULL, 71, 2),
(319, 214, 0, 0, 0, 0, 0, 4, NULL, NULL, 22, 2),
(320, 219, 0, 0, 0, 0, 0, 100, NULL, NULL, 22, 2),
(321, 220, 0, 0, 0, 0, 0, 10, NULL, NULL, 24, NULL),
(322, 220, 0, 0, 0, 0, 0, 10, NULL, NULL, 24, NULL),
(323, 221, 0, 0, 0, 0, 0, 10, NULL, NULL, 24, NULL),
(324, 222, 0, 0, 0, 0, 0, 10, NULL, NULL, 24, NULL),
(325, 223, 0, 0, 0, 0, 0, 3, NULL, NULL, 35, NULL),
(326, 224, 0, 0, 0, 0, 0, 100, NULL, NULL, 73, NULL),
(327, 225, 0, 0, 0, 0, 0, 4, NULL, NULL, 35, NULL),
(328, 226, 0, 0, 0, 0, 0, 100, NULL, NULL, 30, NULL),
(329, 227, 0, 0, 0, 0, 0, 6, NULL, NULL, 35, 23),
(330, 228, 0, 0, 0, 0, 0, 885, NULL, NULL, 35, 23),
(331, 229, 0, 0, 0, 0, 0, 4, NULL, NULL, 35, NULL),
(332, 230, 0, 0, 0, 0, 0, 4, NULL, NULL, 75, 4),
(333, 232, 0, 0, 0, 0, 0, 0, NULL, NULL, 35, NULL),
(334, 232, 0, 0, 0, 0, 0, 0, NULL, NULL, 35, NULL),
(335, 233, 0, 0, 0, 0, 0, 5, NULL, NULL, 35, NULL),
(336, 233, 0, 0, 0, 0, 0, 6, NULL, NULL, 35, NULL),
(337, 234, 0, 0, 0, 0, 0, 0, NULL, NULL, 75, NULL),
(338, 235, 0, 0, 0, 0, 0, 0, NULL, NULL, 76, NULL),
(340, 240, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, NULL),
(342, 240, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, NULL),
(345, 241, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 1),
(346, 250, 0, 0, 0, 0, 0, 0, NULL, NULL, 22, 2),
(347, 250, 0, 0, 0, 0, 0, 0, NULL, NULL, 24, 1),
(348, 250, 0, 0, 0, 0, 0, 9, NULL, NULL, 27, 1),
(349, 250, 0, 0, 0, 0, 0, 87, NULL, NULL, 22, 2),
(350, 250, 0, 0, 0, 0, 0, 7, NULL, NULL, 24, 1),
(351, 251, 0, 0, 0, 0, 0, 6, NULL, NULL, 24, 1),
(352, 251, 0, 0, 0, 0, 0, 9, NULL, NULL, 27, 1),
(353, 251, 0, 0, 0, 0, 0, 90, NULL, NULL, 22, 2),
(354, 252, 0, 0, 0, 0, 0, 9, NULL, NULL, 24, 1),
(355, 252, 0, 0, 0, 0, 0, 4, NULL, NULL, 27, 1),
(356, 252, 0, 0, 0, 0, 0, 0, NULL, NULL, 22, 2),
(357, 252, 0, 0, 0, 0, 0, 70, NULL, NULL, 24, 1),
(358, 253, 0, 0, 0, 0, 0, 56, NULL, NULL, 24, 1),
(371, 258, 0, 0, 0, 0, 0, 0, NULL, NULL, 24, 1),
(372, 259, 0, 0, 0, 0, 0, 100, NULL, NULL, 24, 1),
(373, 259, 0, 0, 0, 0, 0, 100, NULL, NULL, 24, 1),
(374, 260, 0, 0, 0, 0, 0, 200, NULL, NULL, 24, 1),
(375, 260, 0, 0, 0, 0, 0, 5, NULL, NULL, 27, 1),
(376, 260, 0, 0, 0, 0, 0, 76, NULL, NULL, 24, 1),
(380, 261, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, 2),
(381, 261, 1, 1, 1, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, 1),
(383, 261, 0, 1, 11, 1, 1, 13, 'Sáng 0 , Trưa 1 , Chiều 11 , Tối 1', NULL, NULL, NULL),
(385, 264, 1, 1, 0, 1, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, NULL, 1),
(386, 264, 1, 1, 0, 1, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, NULL, 2),
(387, 265, 0, 0, 0, 0, 0, 0, NULL, NULL, 76, 6),
(394, 269, 11, 1, 0, 1, 7, 98, 'Sáng 11 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 1),
(399, 272, 4, 4, 4, 4, 2, 32, 'Sáng 4 , Trưa 4 , Chiều 4 , Tối 4', NULL, 27, NULL),
(400, 272, 2, 2, 2, 2, 2, 16, 'Sáng 2 , Trưa 2 , Chiều 2 , Tối 2', NULL, 71, NULL),
(401, 272, 1, 1, 1, 1, 2, 8, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, 27, NULL),
(402, 274, 0, 0, 0, 0, 0, 6, NULL, NULL, 24, 1),
(403, 274, 0, 0, 0, 0, 0, 5, NULL, NULL, 27, 1),
(404, 274, 0, 0, 0, 0, 0, 7, NULL, NULL, 24, 1),
(405, 275, 0, 0, 0, 0, 0, 4, NULL, NULL, 24, 1),
(406, 275, 0, 0, 0, 0, 0, 6, NULL, NULL, 27, 1),
(407, 275, 0, 0, 0, 0, 0, 6, NULL, NULL, 24, 1),
(408, 276, 0, 0, 0, 0, 0, 9, NULL, NULL, 24, 1),
(409, 276, 0, 0, 0, 0, 0, 7, NULL, NULL, 27, 1),
(410, 276, 0, 0, 0, 0, 0, 4, NULL, NULL, 24, 1),
(411, 278, 0, 0, 0, 0, 0, 13, NULL, NULL, 24, 1),
(412, 279, 1, 1, 0, 1, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, NULL, 1),
(413, 280, 1, 1, 0, 1, 3, 9, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, NULL, 1),
(414, 289, 1, 1, 0, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 1),
(415, 289, 1, 1, 0, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 6),
(416, 289, 1, 1, 0, 1, 7, 28, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 2),
(417, 293, 0, 0, 0, 0, 0, 10, NULL, NULL, 61, 28),
(418, 295, 0, 0, 0, 0, 0, 10, NULL, NULL, 61, 28),
(419, 296, 0, 0, 0, 0, 0, 10, NULL, NULL, 61, 28),
(420, 296, 0, 0, 0, 0, 0, 10, NULL, NULL, 61, 28),
(421, 297, 0, 0, 0, 0, 0, 10, NULL, NULL, 61, 28),
(422, 305, 0, 0, 0, 0, 0, 3, NULL, NULL, 24, 1),
(423, 305, 0, 0, 0, 0, 0, 6, NULL, NULL, 27, 1),
(424, 305, 0, 0, 0, 0, 0, 7, NULL, NULL, 24, 1),
(425, 305, 0, 0, 0, 0, 0, 8, NULL, NULL, 27, 1),
(426, 306, 0, 0, 0, 0, 0, 0, NULL, NULL, 24, 1),
(427, 306, 0, 0, 0, 0, 0, 4, NULL, NULL, 27, 1),
(431, 302, 1, 1, 0, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 2),
(432, 302, 1, 1, 0, 1, 1, 4, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 2),
(434, 310, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 1),
(435, 310, 1, 1, 0, 1, 5, 15, 'Sáng 1 , Trưa 1 , Chiều 0 , Tối 1', NULL, NULL, 1),
(436, 310, 1, 5, 0, 9, 6, 138, 'Sáng 1 , Trưa 5 , Chiều 8 , Tối 9', NULL, NULL, 2),
(437, 311, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 6),
(438, 311, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 6),
(439, 311, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 6),
(440, 311, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 6),
(441, 311, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 6),
(442, 312, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 1),
(443, 312, 1, 1, 0, 1, 5, 20, 'Sáng 1 , Trưa 1 , Chiều 1 , Tối 1', NULL, NULL, 1),
(444, 313, 0, 0, 0, 0, 0, 5, NULL, NULL, 24, 1),
(445, 313, 0, 0, 0, 0, 0, 6, NULL, NULL, 27, 1),
(446, 314, 2, 4, 0, 8, 9, 180, 'Sáng 2 , Trưa 4 , Chiều 6 , Tối 8', NULL, NULL, 1),
(447, 314, 3, 3, 0, 3, 3, 36, 'Sáng 3 , Trưa 3 , Chiều 3 , Tối 3', NULL, NULL, 2),
(448, 314, 4, 5, 0, 8, 0, 0, 'Sáng 4 , Trưa 5 , Chiều 7 , Tối 8', NULL, NULL, 1),
(449, 315, 0, 0, 0, 0, 0, 4, NULL, NULL, 24, 1),
(450, 315, 0, 0, 0, 0, 0, 45, NULL, NULL, 27, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prescription_review`
--

CREATE TABLE `prescription_review` (
  `id` bigint(20) NOT NULL,
  `reviewer_id` bigint(20) NOT NULL,
  `prescription_id` bigint(20) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `note` longtext COLLATE utf8_bin,
  `status` enum('OPEN','IN_PROGRESS','DONE') COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `prescription_review`
--

INSERT INTO `prescription_review` (`id`, `reviewer_id`, `prescription_id`, `doctor_id`, `score`, `created_date`, `due_date`, `finish_date`, `note`, `status`) VALUES
(1, 6, 10, 1, 4356678, '2019-12-02 07:30:00', '2019-12-04 07:15:00', '2019-12-02 09:03:28', 'sf', 'DONE'),
(2, 1, 6, 2, 2131431, '2019-12-02 08:30:00', '2019-12-03 08:30:00', NULL, '2', 'IN_PROGRESS'),
(3, 1, 6, 2, 100, '2019-12-16 15:00:00', '2019-12-17 15:00:00', NULL, NULL, 'OPEN'),
(4, 1, 6, 2, 0, '2019-12-16 15:00:00', '2019-12-17 15:00:00', NULL, NULL, 'IN_PROGRESS'),
(5, 6, 1, 1, 100, '2019-12-16 15:00:00', '2019-12-16 15:15:00', '2019-12-17 15:09:11', NULL, 'DONE');

-- --------------------------------------------------------

--
-- Table structure for table `procedure_member`
--

CREATE TABLE `procedure_member` (
  `id` bigint(20) NOT NULL,
  `procedure_report_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `procedure_member`
--

INSERT INTO `procedure_member` (`id`, `procedure_report_id`, `user_id`, `role`) VALUES
(1, 19, 2, 'LEADER'),
(2, 19, 4, 'LEADER'),
(3, 19, 5, 'MEMBER'),
(4, 4, 2, 'LEADER'),
(5, 4, 4, 'MEMBER'),
(6, 6, 3, 'MEMBER');

-- --------------------------------------------------------

--
-- Table structure for table `procedure_report`
--

CREATE TABLE `procedure_report` (
  `id` bigint(20) NOT NULL,
  `procedure_service_id` bigint(20) NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `arrive_time` datetime NOT NULL,
  `start_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `done_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `note` longtext COLLATE utf8_bin,
  `prescription_id` bigint(20) NOT NULL,
  `status` enum('OPEN','IN_PROGRESS','DONE','CANCELLED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `hospital_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `procedure_report`
--

INSERT INTO `procedure_report` (`id`, `procedure_service_id`, `patient_id`, `arrive_time`, `start_time`, `done_time`, `note`, `prescription_id`, `status`, `hospital_id`) VALUES
(4, 1, 1, '2019-09-13 11:56:45', NULL, NULL, NULL, 1, 'OPEN', 1),
(6, 3, 1, '2019-11-13 17:51:09', '2019-10-24 14:04:42', '2019-10-24 14:04:42', NULL, 1, 'IN_PROGRESS', 1),
(7, 2, 1, '2019-12-02 11:07:05', '2019-12-02 10:30:00', '2019-12-02 11:15:00', NULL, 1, 'DONE', 1),
(8, 4, 1, '2019-09-13 11:56:45', NULL, NULL, NULL, 1, 'OPEN', 1),
(9, 1, 1, '2019-09-13 15:37:39', NULL, NULL, NULL, 3, 'OPEN', 1),
(10, 2, 1, '2019-09-13 15:37:39', NULL, NULL, NULL, 3, 'OPEN', 1),
(11, 3, 1, '2019-09-13 15:37:39', NULL, NULL, NULL, 3, 'OPEN', 1),
(12, 1, 4, '2019-10-28 13:30:01', NULL, NULL, NULL, 30, 'OPEN', 1),
(13, 2, 4, '2019-10-28 13:30:01', NULL, NULL, NULL, 30, 'OPEN', 1),
(14, 1, 1, '2019-09-25 08:00:00', NULL, NULL, NULL, 8, 'OPEN', 1),
(15, 2, 1, '2019-09-25 08:00:00', NULL, NULL, NULL, 8, 'OPEN', 1),
(16, 3, 1, '2019-09-25 08:00:00', NULL, NULL, NULL, 8, 'OPEN', 1),
(19, 2, 6, '2019-11-28 10:00:00', NULL, NULL, NULL, 107, 'OPEN', 3),
(20, 2, 7, '2019-11-29 08:15:00', NULL, NULL, NULL, 109, 'OPEN', 3),
(21, 5, 6, '2019-12-02 11:30:00', NULL, NULL, NULL, 114, 'OPEN', 3),
(22, 1, 6, '2019-12-04 09:15:00', NULL, NULL, NULL, 119, 'OPEN', 3),
(23, 3, 1, '2019-12-13 10:00:00', NULL, NULL, NULL, 166, 'OPEN', 3),
(24, 1, 6, '2019-12-05 04:00:01', NULL, NULL, NULL, 134, 'OPEN', 3),
(25, 2, 6, '2019-12-05 04:00:01', NULL, NULL, NULL, 134, 'OPEN', 3),
(26, 3, 6, '2019-12-05 04:00:01', NULL, NULL, NULL, 134, 'OPEN', 3),
(27, 4, 6, '2019-12-05 04:00:01', NULL, NULL, NULL, 134, 'OPEN', 3),
(28, 1, 7, '2019-12-05 04:15:00', NULL, NULL, NULL, 136, 'OPEN', 3),
(29, 2, 7, '2019-12-05 04:15:00', NULL, NULL, NULL, 136, 'OPEN', 3),
(30, 2, 7, '2019-12-24 15:15:00', NULL, NULL, NULL, 172, 'OPEN', 3),
(31, 2, 7, '2019-12-27 10:15:00', NULL, NULL, NULL, 181, 'OPEN', 3),
(32, 1, 1, '2019-12-27 10:00:00', NULL, NULL, NULL, 182, 'OPEN', 3),
(33, 2, 1, '2019-12-27 10:00:00', NULL, NULL, NULL, 182, 'OPEN', 3),
(34, 3, 1, '2019-12-27 10:00:00', NULL, NULL, NULL, 182, 'OPEN', 3),
(35, 2, 6, '2019-12-30 12:30:00', NULL, NULL, NULL, 193, 'OPEN', 3),
(36, 3, 3, '2020-01-10 09:15:00', NULL, NULL, NULL, 240, 'OPEN', 3),
(37, 4, 3, '2020-01-06 15:15:00', NULL, NULL, NULL, 241, 'OPEN', 3),
(38, 6, 7, '2020-01-01 11:30:00', NULL, NULL, NULL, 242, 'OPEN', 3),
(39, 2, 3, '2020-01-27 10:15:00', NULL, NULL, NULL, 261, 'OPEN', 3),
(40, 1, 6, '2020-01-21 09:30:00', NULL, NULL, NULL, 269, 'OPEN', 3),
(41, 2, 6, '2020-01-21 09:30:00', NULL, NULL, NULL, 269, 'OPEN', 3),
(43, 10, 4, '2020-01-26 10:30:00', NULL, NULL, NULL, 272, 'OPEN', 3);

-- --------------------------------------------------------

--
-- Table structure for table `procedure_service`
--

CREATE TABLE `procedure_service` (
  `id` bigint(20) NOT NULL,
  `department_id` bigint(20) NOT NULL,
  `code` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `price` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `procedure_service`
--

INSERT INTO `procedure_service` (`id`, `department_id`, `code`, `name`, `price`) VALUES
(1, 2, 'TAY_TRANG_RANG', 'Tẩy trắng răng', 200000),
(2, 2, 'CAT_BO_RUOC_THUA', 'Cắt bỏ ruộc thừa', 2000000),
(3, 2, 'NOI_XUONG', 'Nối Xương', 10000000),
(4, 2, 'GHEP_TANG', 'Ghép Tạng', 20000000),
(5, 2, 'GHEP_TANG', 'Ghép Tạng', 20000000),
(6, 2, 'GHEP_TANG', 'Ghép Tạng', 20000000),
(7, 2, 'GHEP_TANG', 'Ghép Tạng', 20000000),
(8, 2, 'GHEP_TANG', 'Ghép Tạng', 20000000),
(9, 1, 'nam12', 'Thanh Bình', 120),
(10, 4, '12', 'Khám răng', 1200000);

-- --------------------------------------------------------

--
-- Table structure for table `queue_number`
--

CREATE TABLE `queue_number` (
  `id` bigint(20) NOT NULL,
  `queue_id` bigint(20) NOT NULL,
  `the_number` int(11) NOT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `call_time` datetime DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `note` longtext COLLATE utf8_bin,
  `reason_for_receiving` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `form_arrived` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `queue_number`
--

INSERT INTO `queue_number` (`id`, `queue_id`, `the_number`, `patient_id`, `call_time`, `type`, `status`, `note`, `reason_for_receiving`, `form_arrived`) VALUES
(14, 4, 1, 1, '2019-10-01 10:30:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(15, 4, 2, 2, '2019-10-01 10:45:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(16, 4, 3, 1, '2019-10-01 11:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(17, 4, 4, 1, '2019-10-01 14:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(18, 4, 5, 1, '2019-10-01 14:30:01', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(19, 5, 1, 1, '2019-10-02 08:30:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(20, 5, 2, 2, '2019-10-02 08:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(21, 5, 3, 3, '2019-10-02 09:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(22, 5, 4, 4, '2019-10-02 09:15:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(23, 4, 1, 1, '2019-10-04 18:15:01', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(24, 6, 5, 1, '2019-10-04 18:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(25, 8, 1, 1, '2019-10-07 18:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(27, 8, 2, 2, '2019-10-07 14:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(28, 8, 3, 1, '2019-10-08 11:46:17', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(29, 9, 1, 1, '2019-10-09 11:45:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(30, 9, 2, 2, '2019-10-09 12:00:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(31, 9, 3, 3, '2019-10-09 12:00:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(32, 10, 1, 1, '2019-10-10 10:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(33, 11, 1, 1, '2019-10-23 10:00:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(34, 11, 2, 2, '2019-10-23 15:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(35, 12, 1, 4, '2019-10-28 13:30:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(36, 13, 1, 1, '2019-10-31 15:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(37, 13, 2, 2, '2019-10-31 16:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(38, 13, 3, 3, '2019-10-31 16:15:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(39, 14, 1, 4, '2019-11-01 16:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(40, 15, 1, 1, '2019-11-04 09:00:01', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(42, 16, 1, 1, '2019-11-12 23:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(43, 17, 1, 4, '2019-11-13 13:45:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(44, 18, 1, 1, '2019-11-14 09:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(45, 18, 2, 2, '2019-11-14 16:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(46, 18, 3, 3, '2019-11-15 17:00:00', 'KHONG_UU_TIEN', 'TODO', 'z', NULL, NULL),
(47, 19, 1, 1, '2019-11-27 17:00:00', 'KHONG_UU_TIEN', 'TODO', 'k', NULL, NULL),
(48, 20, 1, 1, '2019-11-21 08:30:00', 'UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(49, 20, 2, 1, '2019-11-20 09:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(50, 20, 3, 3, '2019-10-30 09:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(51, 21, 1, 1, '2019-11-14 11:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(52, 22, 1, 1, '2019-11-20 14:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(53, 22, 2, 3, '2019-11-21 14:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(54, 22, 3, 1, '2019-11-21 14:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(55, 22, 4, 6, '2019-11-22 14:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(56, 23, 1, 1, '2019-11-22 09:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(57, 23, 2, 3, '2019-11-22 09:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(58, 23, 3, 6, '2019-11-20 09:15:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(59, 23, 3, 4, '2019-11-22 14:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(60, 24, 1, 1, '2019-11-28 08:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(61, 24, 2, 6, '2019-11-28 10:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(62, 24, 3, 1, '2019-11-28 14:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(63, 24, 4, 3, '2019-11-28 23:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(64, 25, 1, 7, '2019-11-29 08:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(65, 26, 1, 3, '2019-12-02 10:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(66, 26, 2, 6, '2019-12-02 11:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(67, 27, 1, 6, '2019-12-04 09:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(68, 27, 2, 1, '2019-12-04 09:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(69, 27, 3, 4, '2019-12-04 10:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(70, 27, 4, 7, '2019-12-04 09:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(71, 27, 5, 8, '2019-12-04 10:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(72, 28, 1, 1, '2019-12-04 10:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(73, 29, 1, 6, '2019-12-05 04:00:01', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(74, 29, 2, 4, '2019-12-05 04:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(75, 29, 3, 7, '2019-12-05 04:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(76, 31, 1, 1, '2019-12-06 07:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(77, 32, 1, 3, '2019-12-09 14:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(78, 32, 2, 6, '2019-12-09 15:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(79, 32, 3, 7, '2019-12-09 16:15:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(80, 33, 1, 1, '2019-12-12 14:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(81, 33, 2, 1, '2019-12-12 14:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(82, 34, 1, 1, '2019-12-13 10:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(83, 34, 2, 3, '2019-12-13 10:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(84, 34, 3, 4, '2019-12-13 10:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(85, 34, 4, 6, '2019-12-13 10:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(86, 35, 1, 1, '2019-12-24 10:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(87, 35, 2, 6, '2019-12-24 15:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(88, 35, 3, 7, '2019-12-24 15:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(89, 36, 1, 6, '2019-12-25 08:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(90, 37, 1, 6, '2019-12-27 08:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(91, 37, 2, 7, '2019-12-27 10:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(92, 37, 3, 1, '2019-12-27 10:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(93, 38, 1, 3, '2019-12-30 11:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(94, 38, 2, 6, '2019-12-30 12:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(95, 38, 3, 7, '2019-12-30 16:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(96, 39, 1, 9, '2020-01-07 10:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(97, 39, 2, 4, '2020-01-23 15:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(98, 39, 1, 6, '2020-01-23 15:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(99, 40, 0, 6, '2020-01-23 15:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(102, 40, 5, 8, '2020-01-22 15:15:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(103, 40, 6, 3, '2020-01-13 16:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(104, 40, 7, 11, '2019-12-30 09:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(105, 40, 7, 7, '2020-01-15 03:45:00', 'UU_TIEN', 'TODO', NULL, NULL, NULL),
(106, 40, 3, 1, '2020-01-23 15:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(107, 39, 6, 7, '2020-01-14 17:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(108, 39, 17, 6, '2020-01-08 16:45:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(109, 42, 1, 3, '2020-01-22 00:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(110, 42, 2, 6, '2020-01-28 00:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(111, 43, 1, 7, '2020-01-28 14:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(112, 43, 2, 4, '2020-01-22 13:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(113, 44, 1, 1, '2020-01-10 08:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(114, 44, 2, 3, '2020-01-10 09:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(115, 44, 3, 3, '2020-01-06 15:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(116, 44, 3, 7, '2020-01-01 11:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(117, 44, 3, 8, '2020-01-06 13:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(118, 44, 3, 9, '2019-12-30 13:15:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(119, 45, 1, 3, '2020-01-01 00:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(120, 45, 1, 1, '2020-01-16 08:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(121, 45, 2, 6, '2020-01-20 08:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(122, 46, 1, 3, '2020-01-27 10:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(123, 46, 2, 4, '2020-01-14 10:15:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(124, 46, 2, 4, '2020-01-01 10:00:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(125, 47, 1, 3, '2020-01-21 08:15:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(126, 47, 2, 12, '2020-01-21 09:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(127, 47, 3, 12, '2020-01-21 09:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(128, 47, 4, 3, '2020-01-21 09:45:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(129, 47, 5, 6, '2020-01-21 09:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(130, 47, 6, 3, '2020-01-21 00:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(131, 48, 1, 4, '2020-01-26 10:30:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(132, 48, 1, 4, '2020-01-26 00:00:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, NULL, NULL),
(133, 48, 1, 1, '2020-02-03 16:30:00', 'KHONG_UU_TIEN', 'TODO', NULL, NULL, NULL),
(134, 49, 1, 12, '2020-02-11 06:08:30', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(135, 49, 2, 15, '2020-02-11 06:17:56', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(136, 50, 1, 3, '2020-02-11 07:28:35', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(137, 50, 2, 4, '2020-02-11 07:29:36', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'KHAM_BENH', 'CHUYEN_VIEN'),
(138, 49, 3, 6, '2020-02-11 08:22:06', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(139, 49, 4, 3, '2020-02-11 08:23:03', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(140, 50, 3, 4, '2020-02-11 08:23:03', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(141, 50, 4, 6, '2020-02-11 08:23:03', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(142, 49, 5, 15, '2020-02-11 08:32:46', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(143, 49, 6, 11, '2020-02-11 08:32:46', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(144, 50, 5, 16, '2020-02-11 08:54:50', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(145, 50, 6, 17, '2020-02-11 09:11:18', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(146, 49, 7, 4, '2020-02-11 10:41:24', 'KHONG_UU_TIEN', 'TODO', NULL, 'CAP_CUU', 'TU_DEN'),
(147, 50, 7, 7, '2020-02-11 10:41:24', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(148, 51, 1, 3, '2020-02-12 09:54:15', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(149, 51, 2, 6, '2020-02-12 09:56:05', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'CHUYEN_VIEN'),
(150, 53, 1, 1, '2020-02-13 09:11:20', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(151, 53, 2, 3, '2020-02-13 09:11:20', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(152, 53, 3, 4, '2020-02-13 09:11:20', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(153, 53, 4, 6, '2020-02-13 09:11:20', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(154, 53, 5, 7, '2020-02-13 09:11:20', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(155, 53, 6, 13, '2020-02-13 12:03:06', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(156, 54, 1, 3, '2020-02-19 15:47:00', 'KHONG_UU_TIEN', 'IN_PROGRESS', NULL, 'CAP_CUU', 'TU_DEN'),
(157, 54, 2, 4, '2020-02-19 15:47:00', 'KHONG_UU_TIEN', 'TODO', NULL, 'CAP_CUU', 'TU_DEN'),
(158, 54, 3, 6, '2020-02-19 15:47:00', 'KHONG_UU_TIEN', 'TODO', NULL, 'CAP_CUU', 'TU_DEN');

-- --------------------------------------------------------

--
-- Table structure for table `queue_table`
--

CREATE TABLE `queue_table` (
  `id` bigint(20) NOT NULL,
  `department_id` bigint(20) NOT NULL,
  `caller_id` bigint(20) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `current_number` int(11) NOT NULL,
  `next_number` int(11) NOT NULL,
  `max_number` int(11) NOT NULL,
  `created_date` date NOT NULL,
  `status` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `queue_table`
--

INSERT INTO `queue_table` (`id`, `department_id`, `caller_id`, `name`, `current_number`, `next_number`, `max_number`, `created_date`, `status`) VALUES
(9, 1, 1, 'Admin Hoi suc', 1, 2, 100, '2019-10-09', 'OPEN'),
(10, 1, 1, 'Hồi Sức 1', 1, 0, 100, '2019-10-10', 'OPEN'),
(11, 1, 1, 'Mua Vật Liêu', 2, 0, 5, '2019-10-23', 'OPEN'),
(12, 1, 1, 'Hồi Sức', 1, 0, 5, '2019-10-28', 'OPEN'),
(13, 1, 1, 'Mua Vật Liêu', 3, 0, 5, '2019-10-31', 'OPEN'),
(14, 1, 1, 'Mua Vật Liêu', 1, 0, 5, '2019-11-01', 'OPEN'),
(15, 1, 1, 'Doctor', 1, 2, 5, '2019-11-04', 'OPEN'),
(16, 2, 1, 'NỘI THẤT', 1, 0, 5, '2019-11-12', 'OPEN'),
(17, 5, 1, 'Nội ', 1, 0, 5, '2019-11-13', 'OPEN'),
(18, 7, 1, 'Bac si A', 1, 2, 100, '2019-11-14', 'OPEN'),
(19, 7, 6, 'Thanh Bình', 1, 0, 5, '2019-11-14', 'OPEN'),
(21, 7, 6, 'Thanh Bình', 1, 0, 4, '2019-11-19', 'OPEN'),
(22, 7, 6, 'Thanh Bình', 3, 4, 12, '2019-11-20', 'OPEN'),
(23, 7, 6, 'Thanh Bình', 3, 3, 5, '2019-11-21', 'OPEN'),
(24, 6, 6, 'Hoài Nam', 4, 0, 5, '2019-11-28', 'OPEN'),
(25, 6, 6, 'Công việc 1', 1, 0, 3, '2019-11-29', 'OPEN'),
(26, 1, 6, 'chờ khám tổng quát', 1, 2, 3, '2019-12-02', 'OPEN'),
(27, 1, 6, 'Chờ khám bệnh', 2, 3, 5, '2019-12-04', 'OPEN'),
(28, 6, 1, 'Hàng chờ 1', 1, 0, 3, '2019-12-04', 'OPEN'),
(30, 1, 6, 'Bác sĩ Nam - Hồi sức', 0, 0, 5, '2019-12-05', 'OPEN'),
(31, 1, 6, 'Hàng chờ 1', 1, 0, 5, '2019-12-06', 'OPEN'),
(32, 6, 6, 'Công việc 1', 1, 2, 3, '2019-12-09', 'OPEN'),
(33, 1, 6, 'Công việc 1', 1, 2, 2, '2019-12-12', 'OPEN'),
(34, 1, 6, 'Công việc 1', 1, 2, 3, '2019-12-13', 'OPEN'),
(35, 3, 1, 'Hồi Sức 3', 3, 0, 5, '2019-12-24', 'OPEN'),
(36, 6, 6, 'Hàng chờ 1', 1, 0, 5, '2019-12-25', 'OPEN'),
(37, 1, 6, 'hàng chờ 1', 3, 0, 3, '2019-12-27', 'OPEN'),
(38, 1, 6, 'Công Ty Hòa Bình', 3, 0, 3, '2019-12-30', 'OPEN'),
(39, 3, 1, 'Admin 1', 1, 1, 100, '2020-01-07', 'OPEN'),
(40, 3, 5, 'hs1.7', 0, 3, 2, '2020-01-07', 'OPEN'),
(41, 3, 4, 'kb2', 0, 0, 4, '2020-01-07', 'OPEN'),
(42, 3, 3, 'hc81', 1, 2, 1, '2020-01-08', 'OPEN'),
(43, 3, 4, 'kb81', 1, 2, 3, '2020-01-08', 'OPEN'),
(44, 3, 1, 'Admin 1', 3, 3, 100, '2020-01-10', 'OPEN'),
(45, 3, 1, 'pduong', 2, 0, 6, '2020-01-16', 'OPEN'),
(46, 3, 1, 'mtam', 1, 2, 6, '2020-01-17', 'OPEN'),
(47, 3, 1, 'Admin 21/01', 6, 0, 100, '2020-01-21', 'OPEN'),
(48, 3, 1, '123', 1, 0, 43, '2020-02-03', 'OPEN'),
(49, 3, 1, 'Bac si Tri Lieu', 7, 0, 100, '2020-02-11', 'OPEN'),
(50, 20, 2, 'Bac si Y 11-02', 7, 0, 100, '2020-02-11', 'OPEN'),
(52, 3, 1, 'mtam', 0, 0, 6, '2020-02-12', 'OPEN'),
(53, 3, 1, '1', 6, 0, 23, '2020-02-13', 'OPEN'),
(54, 3, 1, 'mtam', 1, 2, 3, '2020-02-19', 'OPEN');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `permissions` longtext COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `permissions`, `created_at`, `updated_at`, `name`) VALUES
(1, '{\"admin.users.read\":true,\"admin.users.create\":true,\"admin.users.update\":true,\"admin.users.delete\":true,\"admin.roles.read\":true,\"admin.roles.create\":true,\"admin.roles.update\":true,\"admin.roles.delete\":true,\"admin.doctors.refreshPrescription\":true,\"admin.doctors.findPrescription\":true,\"admin.doctors.createPrescription\":true,\"admin.doctors.read\":true,\"admin.laboratorist.readreadListDiagnosisReport\":true,\"admin.laboratorist.readListDiagnosisService\":false,\"admin.laboratorist.readListDiagnosisGroup\":false,\"admin.doctor.refreshPrescription\":true,\"admin.doctor.findPrescription\":true,\"admin.doctor.createPrescription\":true,\"admin.doctor.read\":true,\"admin.laboratorist.readListDiagnosisReport\":false,\"admin.laboratorist.create\":false,\"admin.laboratorist.delete\":false,\"admin.laboratorist.update\":false,\"admin.laboratorist.enterResult\":false,\"admin.doctor.createQueue\":true,\"admin.doctor.delete\":true,\"admin.doctor.update\":true,\"admin.doctor.add\":true,\"admin.doctor.temporarilySaved\":true,\"admin.doctor.finish\":true,\"admin.doctor.stop\":true,\"admin.doctor.view\":true,\"admin.doctor.invitePatient\":true,\"admin.accountant.read\":true,\"admin.receptionist.read\":false,\"admin.receptionist.create\":false,\"admin.receptionist.detele\":false,\"admin.receptionist.update\":false,\"admin.manager.read\":true,\"admin.dayRevenue.read\":true,\"admin.monthRevenue.read\":true,\"admin.dayRevenue.delete\":true,\"admin.dayRevenue.update\":true,\"admin.dayRevenue.create\":true,\"admin.monthRevenue.delete\":true,\"admin.monthRevenue.update\":true,\"admin.monthRevenue.create\":true,\"admin.userConfig.delete\":true,\"admin.userConfig.update\":true,\"admin.userConfig.create\":true,\"admin.userConfig.read\":true,\"admin.hospital.delete\":true,\"admin.hospital.update\":true,\"admin.hospital.create\":true,\"admin.hospital.read\":true,\"admin.department.delete\":true,\"admin.department.update\":true,\"admin.department.create\":true,\"admin.department.read\":true,\"admin.userContext.delete\":true,\"admin.userContext.update\":true,\"admin.userContext.create\":true,\"admin.userContext.read\":true,\"admin.supplier.delete\":true,\"admin.supplier.update\":true,\"admin.supplier.create\":true,\"admin.supplier.read\":true,\"admin.device.delete\":true,\"admin.device.update\":true,\"admin.device.create\":true,\"admin.device.read\":true,\"admin.deviceMaintenance.delete\":true,\"admin.deviceMaintenance.update\":true,\"admin.deviceMaintenance.create\":true,\"admin.deviceMaintenance.read\":true,\"admin.maintenancePlan.delete\":true,\"admin.maintenancePlan.update\":true,\"admin.maintenancePlan.create\":true,\"admin.maintenancePlan.read\":true,\"admin.icd.delete\":true,\"admin.icd.update\":true,\"admin.icd.create\":true,\"admin.icd.read\":true,\"admin.icdCategory.delete\":true,\"admin.icdCategory.update\":true,\"admin.icdCategory.create\":true,\"admin.icdCategory.read\":true,\"admin.uom.delete\":true,\"admin.uom.update\":true,\"admin.uom.create\":true,\"admin.uom.read\":true,\"admin.drugCategory.delete\":true,\"admin.drugCategory.update\":true,\"admin.drugCategory.create\":true,\"admin.drugCategory.read\":true,\"admin.group.delete\":true,\"admin.group.update\":true,\"admin.group.create\":true,\"admin.group.read\":true,\"admin.medicalSuppliesCategory.delete\":true,\"admin.medicalSuppliesCategory.update\":true,\"admin.medicalSuppliesCategory.create\":true,\"admin.medicalSuppliesCategory.read\":true,\"admin.medicalSupplies.delete\":true,\"admin.medicalSupplies.update\":true,\"admin.medicalSupplies.create\":true,\"admin.medicalSupplies.read\":true,\"admin.drugStore.read\":true,\"admin.drugStore.create\":true,\"admin.drugStore.update\":true,\"admin.drugStore.delete\":true,\"admin.stock.read\":true,\"admin.stock.create\":true,\"admin.stock.update\":true,\"admin.stock.delete\":true,\"admin.alertStock.delete\":true,\"admin.alertStock.update\":true,\"admin.alertStock.create\":true,\"admin.alertStock.read\":true,\"admin.allInputForm.delete\":true,\"admin.allInputForm.update\":true,\"admin.allInputForm.create\":true,\"admin.allInputForm.read\":true,\"admin.allOutputForm.delete\":true,\"admin.allOutputForm.update\":true,\"admin.allOutputForm.create\":true,\"admin.allOutputForm.read\":true,\"admin.patient.delete\":true,\"admin.patient.update\":true,\"admin.patient.create\":true,\"admin.patient.read\":true,\"admin.company.read\":true,\"admin.company.create\":true,\"admin.company.update\":true,\"admin.company.delete\":true,\"admin.bookingGroup.delete\":true,\"admin.bookingGroup.update\":true,\"admin.bookingGroup.create\":true,\"admin.bookingGroup.read\":true,\"admin.diagnosisGroup.read\":true,\"admin.diagnosisGroup.create\":true,\"admin.diagnosisGroup.update\":true,\"admin.diagnosisGroup.delete\":true,\"admin.diagnosisService.delete\":true,\"admin.diagnosisService.update\":true,\"admin.diagnosisService.create\":true,\"admin.diagnosisService.read\":true,\"admin.transferHospital.read\":true,\"admin.transferHospital.update\":true,\"admin.transferHospital.create\":true,\"admin.transferHospital.delete\":true,\"admin.userAttendance.read\":true,\"admin.userAttendance.create\":true,\"admin.userAttendance.update\":true,\"admin.userAttendance.delete\":true,\"admin.userSalary.read\":true,\"admin.userSalary.create\":true,\"admin.userSalary.update\":true,\"admin.userSalary.delete\":true,\"admin.prescriptionReview.delete\":true,\"admin.prescriptionReview.update\":true,\"admin.prescriptionReview.create\":true,\"admin.prescriptionReview.read\":true,\"admin.insuranceType.delete\":true,\"admin.insuranceType.update\":true,\"admin.insuranceType.create\":true,\"admin.insuranceType.read\":true,\"admin.insuranceCard.delete\":true,\"admin.insuranceCard.update\":true,\"admin.insuranceCard.create\":true,\"admin.insuranceCard.read\":true,\"admin.insuranceMapping.read\":true,\"admin.insuranceMapping.create\":true,\"admin.insuranceMapping.delete\":true,\"admin.insuranceMapping.update\":true,\"admin.invoice.read\":true,\"admin.invoice.create\":true,\"admin.invoice.update\":true,\"admin.invoice.delete\":true,\"admin.insuranceInvoice.delete\":true,\"admin.insuranceInvoice.update\":true,\"admin.insuranceInvoice.create\":true,\"admin.insuranceInvoice.read\":true,\"admin.dashboardNotification.sideBar\":true,\"admin.users.sideBar\":true,\"admin.notification.sideBar\":true,\"admin.report.sideBar\":true,\"admin.system.sideBar\":true,\"admin.equipmentManagement.sideBar\":true,\"admin.icdManagement.sideBar\":true,\"admin.drugStoreManagement.sideBar\":true,\"admin.patientManagement.sideBar\":true,\"admin.schedule.sideBar\":true,\"admin.test.sideBar\":true,\"admin.medicalExamination.sideBar\":true,\"admin.attendance.read\":true,\"admin.insurance.sideBar\":true,\"admin.invoiceManagement.sideBar\":true,\"admin.dashboardNotification.read\":true,\"admin.dashboardNotification.create\":true,\"admin.dashboardNotification.update\":true,\"admin.dashboardNotification.delete\":true,\"admin.appointment.read\":true,\"admin.appointment.create\":true,\"admin.appointment.update\":true,\"admin.appointment.delete\":true,\"admin.paymentManagement.sideBar\":true,\"admin.myCashDesk.read\":true,\"admin.myCashDesk.create\":true,\"admin.myCashDesk.update\":true,\"admin.myCashDesk.delete\":true,\"admin.cashDesk.read\":true,\"admin.cashDesk.create\":true,\"admin.cashDesk.update\":true,\"admin.cashDesk.delete\":true,\"admin.myPrescriptionReview.read\":true,\"admin.myPrescriptionReview.create\":true,\"admin.myPrescriptionReview.update\":true,\"admin.myPrescriptionReview.delete\":true,\"admin.cashWidrawal.read\":true,\"admin.cashWidrawal.create\":true,\"admin.cashWidrawal.update\":true,\"admin.cashWidrawal.delete\":true,\"admin.payment.read\":true,\"admin.payment.create\":true,\"admin.payment.update\":true,\"admin.payment.delete\":true,\"admin.appointment.sideBar\":true,\"admin.shortCode.read\":true,\"admin.shortCode.update\":true,\"admin.shortCode.create\":true,\"admin.shortCode.delete\":true,\"admin.drug.read\":true,\"admin.drug.create\":true,\"admin.drug.update\":true,\"admin.drug.delete\":true,\"admin.supplierDrug.read\":true,\"admin.supplierDrug.create\":true,\"admin.supplierDrug.update\":true,\"admin.supplierDrug.delete\":true,\"admin.queue.read\":true,\"admin.queue.create\":true,\"admin.queue.delete\":true,\"admin.queue.update\":true,\"admin.diagnosisReport.read\":true,\"admin.diagnosisReport.create\":true,\"admin.diagnosisReport.update\":true,\"admin.diagnosisReport.delete\":true,\"admin.transferForm.read\":true,\"admin.transferForm.create\":true,\"admin.transferForm.update\":true,\"admin.transferForm.delete\":true,\"admin.prescription.read\":true,\"admin.prescription.create\":true,\"admin.prescription.update\":true,\"admin.prescription.delete\":true,\"admin.procedureService.read\":true,\"admin.procedureService.create\":true,\"admin.procedureService.update\":true,\"admin.procedureService.delete\":true,\"admin.procedureMember.read\":true,\"admin.procedureMember.create\":true,\"admin.procedureMember.update\":true,\"admin.procedureMember.delete\":true,\"admin.attendance.sideBar\":true,\"admin.accountCode.sideBar\":true,\"admin.accountCode.read\":true,\"admin.accountCode.create\":true,\"admin.accountCode.update\":true,\"admin.accountCode.delete\":true,\"admin.journal.sideBar\":true,\"admin.journal.read\":true,\"admin.journal.create\":true,\"admin.journal.delete\":true,\"admin.journal.update\":true,\"admin.ledger.sideBar\":true,\"admin.ledger.read\":true,\"admin.ledger.create\":true,\"admin.ledger.update\":true,\"admin.ledger.delete\":true,\"admin.yearBalance.sideBar\":true,\"admin.yearBalance.read\":true,\"admin.yearBalance.create\":true,\"admin.yearBalance.update\":true,\"admin.yearBalance.goToDetail\":true,\"admin.yearBalance.delete\":true,\"admin.trialBalance.sideBar\":true,\"admin.trialBalance.read\":true,\"admin.trialBalance.create\":true,\"admin.trialBalance.update\":true,\"admin.trialBalance.delete\":true}', NULL, NULL, 'Admin'),
(2, '{\"admin.users.read\":true,\"admin.doctors.refreshPrescription\":true,\"admin.doctors.findPrescription\":true,\"admin.doctors.createPrescription\":true,\"admin.doctors.read\":true,\"admin.doctor.createQueue\":true,\"admin.doctor.refreshPrescription\":true,\"admin.doctor.findPrescription\":true,\"admin.doctor.createPrescription\":true,\"admin.doctor.read\":true,\"admin.doctor.delete\":true,\"admin.doctor.update\":true,\"admin.doctor.add\":true,\"admin.doctor.temporarilySaved\":true,\"admin.doctor.finish\":true,\"admin.doctor.stop\":true,\"admin.doctor.view\":true,\"admin.doctor.invitePatient\":true,\"admin.prescription.read\":true,\"admin.prescription.create\":true,\"admin.prescription.update\":true,\"admin.prescription.delete\":true,\"admin.procedureService.delete\":true,\"admin.procedureService.update\":true,\"admin.procedureService.create\":true,\"admin.procedureService.read\":true,\"admin.procedureMember.delete\":true,\"admin.procedureMember.update\":true,\"admin.procedureMember.create\":true,\"admin.procedureMember.read\":true,\"admin.medicalExamination.sideBar\":true}', NULL, NULL, 'Nurse'),
(3, '{\"admin.users.read\":false,\"admin.users.create\":false,\"admin.users.update\":false,\"admin.users.delete\":false,\"admin.roles.read\":false,\"admin.roles.create\":false,\"admin.roles.update\":false,\"admin.roles.delete\":false,\"admin.doctors.refreshPrescription\":true,\"admin.doctors.findPrescription\":true,\"admin.doctors.createPrescription\":true,\"admin.doctors.read\":true,\"admin.doctor.read\":true,\"admin.doctor.createPrescription\":true,\"admin.doctor.findPrescription\":true,\"admin.doctor.refreshPrescription\":true,\"admin.doctor.createQueue\":true,\"admin.doctor.delete\":true,\"admin.doctor.update\":true,\"admin.doctor.add\":true,\"admin.doctor.temporarilySaved\":true,\"admin.doctor.finish\":true,\"admin.doctor.stop\":true,\"admin.doctor.view\":true,\"admin.doctor.invitePatient\":true,\"admin.manager.read\":true,\"admin.receptionist.read\":true,\"admin.myPrescriptionReview.delete\":true,\"admin.myPrescriptionReview.update\":true,\"admin.myPrescriptionReview.read\":true,\"admin.myPrescriptionReview.create\":true,\"admin.shortCode.delete\":true,\"admin.shortCode.update\":true,\"admin.shortCode.create\":true,\"admin.shortCode.read\":true,\"admin.patient.delete\":true,\"admin.patient.update\":true,\"admin.patient.create\":true,\"admin.patient.read\":true,\"admin.queue.delete\":true,\"admin.queue.update\":true,\"admin.queue.create\":true,\"admin.queue.read\":true,\"admin.transferHospital.delete\":true,\"admin.transferHospital.update\":true,\"admin.transferHospital.create\":true,\"admin.transferHospital.read\":true,\"admin.transferForm.read\":true,\"admin.transferForm.create\":true,\"admin.transferForm.update\":true,\"admin.transferForm.delete\":true,\"admin.prescription.delete\":true,\"admin.prescription.update\":true,\"admin.prescription.create\":true,\"admin.prescription.read\":true,\"admin.procedureService.delete\":true,\"admin.procedureService.update\":true,\"admin.procedureService.create\":true,\"admin.procedureService.read\":true,\"admin.procedureMember.delete\":true,\"admin.procedureMember.update\":true,\"admin.procedureMember.create\":true,\"admin.procedureMember.read\":true,\"admin.prescriptionReview.delete\":true,\"admin.prescriptionReview.update\":true,\"admin.prescriptionReview.create\":true,\"admin.prescriptionReview.read\":true,\"admin.insuranceCard.delete\":true,\"admin.insuranceCard.update\":true,\"admin.insuranceCard.create\":true,\"admin.insuranceCard.read\":true,\"admin.paymentManagement.read\":true,\"admin.system.sideBar\":true,\"admin.schedule.sideBar\":true,\"admin.medicalExamination.sideBar\":true,\"admin.attendance.read\":true,\"admin.insurance.sideBar\":true,\"admin.paymentManagement.sideBar\":true}', NULL, NULL, 'Doctor'),
(4, '{\"admin.users.read\":false,\"admin.users.create\":false,\"admin.users.update\":false,\"admin.users.delete\":false,\"admin.roles.read\":false,\"admin.roles.create\":false,\"admin.roles.update\":false,\"admin.roles.delete\":false,\"admin.laboratorist.readreadListDiagnosisReport\":true,\"admin.laboratorist.readListDiagnosisService\":true,\"admin.laboratorist.readListDiagnosisGroup\":true,\"admin.laboratorist.readListDiagnosisReport\":true,\"admin.laboratorist.create\":true,\"admin.laboratorist.delete\":true,\"admin.laboratorist.update\":true,\"admin.laboratorist.enterResult\":true,\"admin.diagnosisReport.delete\":true,\"admin.diagnosisReport.update\":true,\"admin.diagnosisReport.create\":true,\"admin.diagnosisReport.read\":true,\"admin.test.sideBar\":true}', NULL, NULL, 'Laboratorist'),
(5, '{\"admin.users.read\":false,\"admin.users.create\":false,\"admin.users.update\":false,\"admin.users.delete\":false,\"admin.roles.read\":false,\"admin.roles.create\":false,\"admin.roles.update\":false,\"admin.roles.delete\":false,\"admin.receptionist.read\":true,\"admin.receptionist.create\":true,\"admin.receptionist.detele\":true,\"admin.receptionist.update\":true,\"admin.notification.read\":true,\"admin.appointment.read\":true,\"admin.dashboardNotification.read\":true,\"admin.dashboardNotification.delete\":true,\"admin.dashboardNotification.update\":true,\"admin.dashboardNotification.create\":true,\"admin.appointment.delete\":true,\"admin.appointment.update\":true,\"admin.appointment.create\":true,\"admin.queue.delete\":true,\"admin.queue.update\":true,\"admin.queue.create\":true,\"admin.queue.read\":true,\"admin.company.delete\":true,\"admin.company.update\":true,\"admin.company.create\":true,\"admin.company.read\":true,\"admin.bookingGroup.delete\":true,\"admin.bookingGroup.update\":true,\"admin.bookingGroup.create\":true,\"admin.bookingGroup.read\":true,\"admin.insuranceCard.delete\":true,\"admin.insuranceCard.update\":true,\"admin.insuranceCard.create\":true,\"admin.insuranceCard.read\":true,\"admin.notification.sideBar\":true,\"admin.schedule.sideBar\":true,\"admin.insurance.sideBar\":true}', NULL, NULL, 'Receptionist'),
(6, '{\"admin.users.read\":true,\"admin.users.create\":true,\"admin.users.update\":true,\"admin.users.delete\":true,\"admin.roles.read\":false,\"admin.roles.create\":false,\"admin.roles.update\":false,\"admin.roles.delete\":false,\"admin.accountant.read\":true,\"admin.accountant.update\":true,\"admin.accountant.detele\":true,\"admin.accountant.create\":true,\"admin.manager.read\":true,\"admin.cashDesk.delete\":true,\"admin.cashDesk.update\":true,\"admin.cashDesk.create\":true,\"admin.cashDesk.read\":true,\"admin.payment.delete\":true,\"admin.payment.update\":true,\"admin.payment.create\":true,\"admin.payment.read\":true,\"admin.dayRevenue.delete\":true,\"admin.dayRevenue.update\":true,\"admin.dayRevenue.create\":true,\"admin.dayRevenue.read\":true,\"admin.monthRevenue.delete\":true,\"admin.monthRevenue.update\":true,\"admin.monthRevenue.create\":true,\"admin.monthRevenue.read\":true,\"admin.userConfig.delete\":true,\"admin.userConfig.update\":true,\"admin.userConfig.create\":true,\"admin.userConfig.read\":true,\"admin.supplier.delete\":true,\"admin.supplier.update\":true,\"admin.supplier.create\":true,\"admin.supplier.read\":true,\"admin.device.delete\":true,\"admin.device.update\":true,\"admin.device.create\":true,\"admin.device.read\":true,\"admin.deviceMaintenance.delete\":true,\"admin.deviceMaintenance.update\":true,\"admin.deviceMaintenance.create\":true,\"admin.deviceMaintenance.read\":true,\"admin.maintenancePlan.delete\":true,\"admin.maintenancePlan.update\":true,\"admin.maintenancePlan.create\":true,\"admin.maintenancePlan.read\":true,\"admin.drugStore.delete\":true,\"admin.drugStore.update\":true,\"admin.drugStore.create\":true,\"admin.drugStore.read\":true,\"admin.stock.delete\":true,\"admin.stock.update\":true,\"admin.stock.create\":true,\"admin.stock.read\":true,\"admin.alertStock.delete\":true,\"admin.alertStock.update\":true,\"admin.alertStock.create\":true,\"admin.alertStock.read\":true,\"admin.allInputForm.delete\":true,\"admin.allInputForm.update\":true,\"admin.allInputForm.create\":true,\"admin.allInputForm.read\":true,\"admin.allOutputForm.delete\":true,\"admin.allOutputForm.update\":true,\"admin.allOutputForm.create\":true,\"admin.allOutputForm.read\":true,\"admin.patient.delete\":true,\"admin.patient.update\":true,\"admin.patient.create\":true,\"admin.patient.read\":true,\"admin.userAttendance.delete\":true,\"admin.userAttendance.update\":true,\"admin.userAttendance.create\":true,\"admin.userAttendance.read\":true,\"admin.userSalary.delete\":true,\"admin.userSalary.update\":true,\"admin.userSalary.create\":true,\"admin.userSalary.read\":true,\"admin.invoice.delete\":true,\"admin.invoice.update\":true,\"admin.invoice.create\":true,\"admin.invoice.read\":true,\"admin.insuranceInvoice.delete\":true,\"admin.insuranceInvoice.update\":true,\"admin.insuranceInvoice.create\":true,\"admin.insuranceInvoice.read\":true,\"admin.users.sideBar\":true,\"admin.paymentManagement.sideBar\":true,\"admin.report.sideBar\":true,\"admin.equipmentManagement.sideBar\":true,\"admin.drugStoreManagement.sideBar\":true,\"admin.patientManagement.sideBar\":true,\"admin.attendance.read\":true,\"admin.invoiceManagement.sideBar\":true,\"admin.notification.sideBar\":true,\"admin.dashboardNotification.sideBar\":true,\"admin.dashboardNotification.read\":true,\"admin.dashboardNotification.create\":true,\"admin.dashboardNotification.update\":true,\"admin.dashboardNotification.delete\":true,\"admin.myCashDesk.read\":true,\"admin.myCashDesk.create\":true,\"admin.myCashDesk.update\":true,\"admin.myCashDesk.delete\":true,\"admin.cashWidrawal.read\":true,\"admin.cashWidrawal.create\":true,\"admin.cashWidrawal.update\":true,\"admin.cashWidrawal.delete\":true,\"admin.attendance.sideBar\":true,\"admin.accountCode.sideBar\":true,\"admin.accountCode.read\":true,\"admin.accountCode.create\":true,\"admin.accountCode.update\":true,\"admin.accountCode.delete\":true,\"admin.journal.sideBar\":true,\"admin.journal.read\":true,\"admin.journal.create\":true,\"admin.journal.update\":true,\"admin.journal.delete\":true,\"admin.ledger.sideBar\":true,\"admin.ledger.read\":true,\"admin.ledger.create\":true,\"admin.ledger.update\":true,\"admin.ledger.delete\":true,\"admin.yearBalance.sideBar\":true,\"admin.yearBalance.read\":true,\"admin.yearBalance.create\":true,\"admin.yearBalance.update\":true,\"admin.yearBalance.goToDetail\":true,\"admin.yearBalance.delete\":true,\"admin.trialBalance.sideBar\":true,\"admin.trialBalance.read\":true,\"admin.trialBalance.create\":true,\"admin.trialBalance.update\":true,\"admin.trialBalance.delete\":true}', NULL, NULL, 'Accountant'),
(7, '{\"admin.cashier.read\":true,\"admin.cashier.create\":true,\"admin.cashier.detele\":true,\"admin.cashier.update\":true,\"admin.accountant.read\":true,\"admin.myCashDesk.read\":true,\"admin.myCashDesk.create\":true,\"admin.myCashDesk.update\":true,\"admin.myCashDesk.delete\":true,\"admin.cashWidrawal.delete\":true,\"admin.cashWidrawal.update\":true,\"admin.cashWidrawal.create\":true,\"admin.cashWidrawal.read\":true,\"admin.payment.delete\":true,\"admin.payment.update\":true,\"admin.payment.create\":true,\"admin.payment.read\":true,\"admin.insuranceInvoice.delete\":true,\"admin.insuranceInvoice.update\":true,\"admin.insuranceInvoice.create\":true,\"admin.insuranceInvoice.read\":true,\"admin.invoice.delete\":true,\"admin.invoice.update\":true,\"admin.invoice.create\":true,\"admin.invoice.read\":true,\"admin.paymentManagement.sideBar\":true,\"admin.invoiceManagement.sideBar\":true}', NULL, NULL, 'Cashier'),
(8, '{\"admin.phamarcist.read\":true,\"admin.phamarcist.create\":true,\"admin.phamarcist.detele\":true,\"admin.phamarcist.update\":true,\"admin.cashier.read\":true,\"admin.pharmacist.read\":true,\"admin.pharmacist.create\":true,\"admin.pharmacist.detele\":true,\"admin.pharmacist.update\":true,\"admin.myCashDesk.delete\":true,\"admin.myCashDesk.update\":true,\"admin.myCashDesk.create\":true,\"admin.myCashDesk.read\":true,\"admin.cashWidrawal.delete\":true,\"admin.cashWidrawal.update\":true,\"admin.cashWidrawal.create\":true,\"admin.cashWidrawal.read\":true,\"admin.paymentManagement.sideBar\":true}', NULL, NULL, 'Pharmacist'),
(9, '{\"admin.manager.update\":true,\"admin.manager.detele\":true,\"admin.manager.create\":true,\"admin.manager.read\":true,\"admin.drugCategory.delete\":false,\"admin.drug.delete\":true,\"admin.drug.update\":true,\"admin.drug.create\":true,\"admin.drug.read\":true,\"admin.supplierDrug.delete\":true,\"admin.supplierDrug.update\":true,\"admin.supplierDrug.create\":true,\"admin.supplierDrug.read\":true,\"admin.stock.delete\":true,\"admin.stock.update\":true,\"admin.stock.create\":true,\"admin.stock.read\":true,\"admin.alertStock.delete\":true,\"admin.alertStock.update\":true,\"admin.alertStock.create\":true,\"admin.alertStock.read\":true,\"admin.allInputForm.delete\":true,\"admin.allInputForm.update\":true,\"admin.allInputForm.create\":true,\"admin.allInputForm.read\":true,\"admin.allOutputForm.delete\":true,\"admin.allOutputForm.update\":true,\"admin.allOutputForm.create\":true,\"admin.allOutputForm.read\":true,\"admin.drugStoreManagement.sideBar\":true}', NULL, NULL, 'Manager');

-- --------------------------------------------------------

--
-- Table structure for table `shortcode`
--

CREATE TABLE `shortcode` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `shortcode` varchar(16) COLLATE utf8_bin DEFAULT NULL,
  `replace_text` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `shortcode`
--

INSERT INTO `shortcode` (`id`, `user_id`, `shortcode`, `replace_text`) VALUES
(1, 1, 'ctt', 'cảm cúm thông thường, sổ mũi, nhức đầu nhẹ'),
(2, 1, 'tbc', 'Tê bì chân tay, mồ hôi tay, mệt mỏi sau ngủ dậy'),
(3, 1, 'tbct', 'Tê bì chân tay, mồ hôi tay, mệt mỏi sau ngủ dậy'),
(4, 1, 'ttt', 'Test shorcode replaceText...'),
(5, 1, 'nl', 'Nhiễm lạnh thời gian dài, siêu vi xâm nhập cơ thể'),
(8, 2, 'HH', 'Hô Hấp'),
(10, 6, 'hh', 'Hô Hấp'),
(11, 6, 'ut', 'ung thư'),
(12, 6, 'sg', 'Suy gan');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` bigint(20) NOT NULL,
  `drug_id` bigint(20) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `available` int(11) DEFAULT NULL,
  `warning_grey` int(11) NOT NULL DEFAULT '0',
  `warning_yellow` int(11) NOT NULL DEFAULT '0',
  `warning_red` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `drug_id`, `drug_store_id`, `available`, `warning_grey`, `warning_yellow`, `warning_red`) VALUES
(1, 1, 1, 131811, 1500000, 500000, 20000),
(2, 2, 1, 30681, 0, 0, 0),
(4, 4, 1, 1765, 10000, 1000, 2),
(6, 6, 1, 1214, 0, 0, 0),
(7, 6, 3, 92, 0, 0, 0),
(10, 5, 1, 9985, 0, 0, 0),
(11, 5, 2, 9915, 0, 0, 0),
(12, 20, 1, 973, 0, 0, 0),
(13, 21, 1, 14994, 0, 0, 0),
(14, 22, 1, 4984, 0, 0, 0),
(15, 23, 1, 1885, 0, 0, 0),
(16, 25, 2, 200, 0, 0, 0),
(17, 2, 2, 200, 0, 0, 0),
(18, 4, 2, 200, 0, 0, 0),
(19, 23, 2, 200, 0, 0, 0),
(20, 6, 2, 200, 0, 0, 0),
(21, 9, 2, 200, 0, 0, 0),
(22, 26, 2, 200, 0, 0, 0),
(23, 27, 2, 200, 0, 0, 0),
(24, 28, 1, 169, 0, 0, 0),
(25, 29, 1, 2991, 11110, 1, 10),
(26, 30, 1, 2585, 500, 0, 50000);

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` int(15) DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `has_sell_drug` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `email`, `phone`, `address`, `has_sell_drug`) VALUES
(1, 'TEC Pharma', 'contact@techpharma.com', 99999, 'Hà Nội', NULL),
(2, 'Thanh Bình', 'thanhbinh@gmail.com', 90909, 'B58/10 Nguyen Than Hien, distict 4, Ho Chi Minh city', NULL),
(3, 'Hoài Nam', 'tphoainam@gmail.com', 1234567890, 'B58/10 Nguyen Than Hien, distict 4, Ho Chi Minh city', NULL),
(4, 'Tecco', 'tecco@gmail.com', 898483957, '112 dinh tiên hoàng', NULL),
(5, 'Công Ty Hòa Bình', '121212', 12221, '1121', NULL),
(6, 'LOAI ABC', '12321@', 12321, NULL, NULL),
(7, 'Công việc 1', '12314', 132, NULL, NULL),
(8, 'Công việc 1', 'admin@logsik.com', 1111111, 'Hà Nội', NULL),
(9, 'mtam', 'admin@logsik.com', 987654321, '123ffv', 1);

-- --------------------------------------------------------

--
-- Table structure for table `transfer_form`
--

CREATE TABLE `transfer_form` (
  `id` bigint(20) NOT NULL,
  `prescription_id` bigint(20) NOT NULL,
  `transfer_hospital_id` bigint(20) DEFAULT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `cls` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `diagnosis_reports` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `analysis` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `therapy_note` longtext COLLATE utf8_bin,
  `patient_status` longtext COLLATE utf8_bin,
  `transfer_reason` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `treatment_guide` longtext COLLATE utf8_bin,
  `transfer_date` date DEFAULT NULL,
  `transport_method` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `transport_person` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `should_review` tinyint(1) DEFAULT NULL,
  `bar_code` varchar(32) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `transfer_form`
--

INSERT INTO `transfer_form` (`id`, `prescription_id`, `transfer_hospital_id`, `created_by`, `created_date`, `cls`, `diagnosis_reports`, `analysis`, `therapy_note`, `patient_status`, `transfer_reason`, `treatment_guide`, `transfer_date`, `transport_method`, `transport_person`, `should_review`, `bar_code`) VALUES
(2, 3, 1, 1, '2019-10-08', '123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, 1, 1, '2019-10-29', 'cảm cúm thông thường, sổ mũi, nhức đầu nhẹ; Tê bì chân tay, mồ hôi tay, mệt mỏi sau ngủ dậy', NULL, 'Nhiễm lạnh thời gian dài, siêu vi xâm nhập cơ thể', NULL, NULL, NULL, NULL, NULL, NULL, 'nam', NULL, NULL),
(6, 4, 1, 1, '2019-11-26', 'Ho ra máu ', NULL, NULL, NULL, NULL, NULL, NULL, '2019-11-26', NULL, NULL, NULL, NULL),
(7, 85, 1, 6, '2019-11-28', 'không có', 'không có', 'không có', 'không', 'không', 'không', 'không', '2019-11-28', 'không', 'không', NULL, NULL),
(8, 109, 1, 6, '2019-11-29', 'không', 'không', 'không', 'không', 'không', 'không', 'không', '2019-11-29', 'không', 'không', NULL, NULL),
(9, 242, 1, 1, '2020-01-10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-10', NULL, NULL, NULL, 'PCV00000009'),
(10, 241, 1, 1, '2020-01-16', 'cvv', NULL, NULL, NULL, NULL, NULL, NULL, '2020-01-16', NULL, NULL, NULL, 'PCV00000010'),
(11, 273, 1, 1, '2020-02-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-02-03', NULL, NULL, NULL, 'PCV0000011'),
(12, 309, 1, 1, '2020-02-13', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-02-13', NULL, NULL, NULL, 'PCV0000012');

-- --------------------------------------------------------

--
-- Table structure for table `transfer_hospital`
--

CREATE TABLE `transfer_hospital` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `contact_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `contact_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `transfer_hospital`
--

INSERT INTO `transfer_hospital` (`id`, `name`, `contact_email`, `contact_phone`, `address`, `note`) VALUES
(1, 'Cho Ray', 'choray@gmail.com', '0123123123', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `trial_balance`
--

CREATE TABLE `trial_balance` (
  `id` bigint(20) NOT NULL,
  `account_code_id` bigint(20) DEFAULT NULL,
  `begin_year_amount` bigint(20) DEFAULT NULL,
  `end_year_amount` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `year_balance_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `trial_balance`
--

INSERT INTO `trial_balance` (`id`, `account_code_id`, `begin_year_amount`, `end_year_amount`, `note`, `year_balance_id`) VALUES
(1, 1, 10000000, 20000000, NULL, 1),
(2, 2, 30000000, 40000000, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `uom`
--

CREATE TABLE `uom` (
  `id` bigint(20) NOT NULL,
  `name` varchar(64) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `uom`
--

INSERT INTO `uom` (`id`, `name`) VALUES
(1, 'Viên'),
(2, 'Lọ'),
(3, 'Gói'),
(4, 'Vỉ'),
(5, 'Chai'),
(6, 'Type'),
(9, 'Thùng'),
(10, 'Hộp'),
(11, 'Lốc'),
(12, 'ml'),
(14, 'Ống'),
(15, 'Cái'),
(16, 'Bịch'),
(17, 'gam'),
(18, 'Bộ'),
(19, 'Que');

-- --------------------------------------------------------

--
-- Table structure for table `user_attendance`
--

CREATE TABLE `user_attendance` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `date_to_work` date NOT NULL,
  `work_hours` float DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_attendance`
--

INSERT INTO `user_attendance` (`id`, `user_id`, `date_to_work`, `work_hours`, `month`, `year`) VALUES
(1, 2, '2019-09-01', 8, 9, 2019),
(2, 2, '2019-09-25', 8, 9, 2019),
(3, 3, '2019-09-25', 4, 9, 2019),
(4, 2, '2019-09-25', 8, 9, 2019),
(12, 3, '2019-11-01', 8, 11, 2019),
(13, 4, '2019-11-02', 8, 11, 2019),
(14, 4, '2019-11-03', 8, 11, 2019),
(15, 2, '2019-11-02', 8, 11, 2019),
(16, 2, '2019-11-03', 8, 11, 2019),
(17, 2, '2019-11-04', 8, 11, 2019),
(18, 3, '2019-11-02', 8, 11, 2019),
(19, 2, '2019-11-01', 8, 11, 2019),
(20, 3, '2019-11-03', 8, 11, 2019),
(21, 4, '2019-11-04', 8, 11, 2019),
(22, 2, '2019-11-12', 0, 11, 2019),
(23, 6, '2019-11-01', 26, 0, 0),
(24, 2, '2019-12-01', 12, 0, 0),
(25, 2, '2019-12-02', 21, 12, 2019),
(26, 2, '2019-12-31', 12, 12, 2019),
(27, 6, '2019-12-01', 12, 12, 2019),
(28, 2, '2019-12-03', 12, 12, 2019),
(29, 4, '2019-12-01', 12, 12, 2019),
(30, 7, '2019-12-02', 12, 0, 0),
(31, 7, '2019-12-05', 8, 12, 2019),
(32, 7, '2019-12-05', 8, 12, 2019),
(33, 7, '2019-12-01', 12, 12, 2019),
(34, 6, '2019-12-02', 12, 12, 2019),
(35, 6, '2019-12-05', 8, 12, 2019),
(36, 2, '2019-12-05', 13, 12, 2019),
(37, 2, '2020-01-10', 8, 1, 2020),
(38, 4, '2020-01-07', 4, 1, 2020),
(39, 4, '2020-01-13', 6, 1, 2020),
(40, 4, '2020-01-15', 7, 1, 2020),
(41, 4, '2020-01-11', 8, 1, 2020),
(42, 2, '2020-01-03', 5, 1, 2020),
(43, 2, '2020-01-03', 7, 1, 2020),
(44, 2, '2020-01-13', 6, 1, 2020),
(45, 2, '2020-02-03', 8, 2, 2020),
(46, 2, '2020-02-04', 8, 2, 2020),
(47, 4, '2020-02-03', 4, 2, 2020),
(48, 4, '2020-02-04', 4, 2, 2020),
(49, 6, '2020-02-03', 8, 2, 2020),
(50, 6, '2020-02-04', 8, 2, 2020),
(51, 7, '2020-02-03', 8, 2, 2020),
(52, 7, '2020-02-04', 8, 2, 2020);

-- --------------------------------------------------------

--
-- Table structure for table `user_config`
--

CREATE TABLE `user_config` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `has_salary` tinyint(1) NOT NULL,
  `birthday_fee` bigint(20) DEFAULT '0',
  `holiday_fee` bigint(20) DEFAULT '0',
  `lunch_fee` bigint(20) DEFAULT '0',
  `diligence_fee` bigint(20) DEFAULT '0',
  `other_support_fee` bigint(20) DEFAULT '0',
  `gross_salary` bigint(20) DEFAULT '0',
  `inssurance` bigint(20) DEFAULT '0',
  `income_tax` bigint(20) DEFAULT '0',
  `other_support_fee_note` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_config`
--

INSERT INTO `user_config` (`id`, `user_id`, `has_salary`, `birthday_fee`, `holiday_fee`, `lunch_fee`, `diligence_fee`, `other_support_fee`, `gross_salary`, `inssurance`, `income_tax`, `other_support_fee_note`) VALUES
(1, 2, 1, 0, 0, 550000, 0, 0, 100000, 0, 1500000, NULL),
(2, 4, 1, 0, 0, 550000, 0, 0, 50000, 0, 0, NULL),
(4, 6, 1, 0, 0, 0, 0, 12000000, 120000, 0, 2200000, NULL),
(6, 2, 0, 0, 0, 550000, 0, 0, 100000, 0, 1500000, NULL),
(7, 7, 1, 0, 0, 0, 0, 12000, 120000, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_context`
--

CREATE TABLE `user_context` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_context`
--

INSERT INTO `user_context` (`id`, `user_id`, `drug_store_id`) VALUES
(1, 4, 2),
(2, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_department`
--

CREATE TABLE `user_department` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_department`
--

INSERT INTO `user_department` (`id`, `user_id`, `department_id`) VALUES
(39, 8, 1),
(43, 9, 3),
(45, 1, 3),
(70, 3, 20),
(71, 4, 20),
(74, 5, 20),
(75, 2, 20),
(77, 11, 20),
(79, 13, 5),
(80, 14, 20),
(85, 12, 20),
(86, 6, 6),
(87, 6, 1),
(89, 7, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(42, 8, 1, NULL, NULL),
(46, 9, 3, NULL, NULL),
(48, 1, 1, NULL, NULL),
(64, 3, 2, NULL, NULL),
(65, 4, 2, NULL, NULL),
(67, 5, 4, NULL, NULL),
(68, 10, 7, NULL, NULL),
(69, 2, 3, NULL, NULL),
(71, 11, 5, NULL, NULL),
(73, 13, 8, NULL, NULL),
(74, 14, 9, NULL, NULL),
(78, 12, 6, NULL, NULL),
(79, 6, 3, NULL, NULL),
(81, 7, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_salary`
--

CREATE TABLE `user_salary` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `month` int(11) DEFAULT '0',
  `year` int(11) DEFAULT '0',
  `gross_salary` bigint(20) DEFAULT '0',
  `inssurance` bigint(20) DEFAULT '0',
  `additional` bigint(20) DEFAULT '0',
  `penalty_fee` bigint(20) DEFAULT '0',
  `other_minus_fee` bigint(20) DEFAULT '0',
  `net_salary` double(20,2) DEFAULT '0.00',
  `income_tax` bigint(20) DEFAULT '0',
  `birthday_fee` bigint(20) DEFAULT '0',
  `holiday_fee` bigint(20) DEFAULT '0',
  `lunch_fee` bigint(20) DEFAULT '0',
  `diligence_fee` bigint(20) DEFAULT '0',
  `other_support_fee` bigint(20) DEFAULT '0',
  `total_time_attendance` float(11,0) DEFAULT '0',
  `note` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_salary`
--

INSERT INTO `user_salary` (`id`, `user_id`, `month`, `year`, `gross_salary`, `inssurance`, `additional`, `penalty_fee`, `other_minus_fee`, `net_salary`, `income_tax`, `birthday_fee`, `holiday_fee`, `lunch_fee`, `diligence_fee`, `other_support_fee`, `total_time_attendance`, `note`) VALUES
(1, 2, 9, 2019, 100000, 0, 0, 0, 0, 1450000.00, 1500000, 0, 0, 550000, 0, 0, 24, NULL),
(2, 3, 9, 2019, 50000, 0, 0, 0, 0, 750000.00, 0, 0, 0, 550000, 0, 0, 4, NULL),
(10, 2, 11, 2019, 100000, 50000, 500000, 0, 0, 3200000.00, 1500000, 500000, 0, 550000, 0, 0, 32, NULL),
(11, 3, 11, 2019, 50000, 0, 0, 0, 0, 1750000.00, 0, 0, 0, 550000, 0, 0, 24, NULL),
(12, 4, 11, 2019, 50000, 0, 0, 0, 0, 1750000.00, 0, 0, 0, 550000, 0, 0, 24, NULL),
(13, 6, 11, 2019, 12000000, 0, 0, 0, 0, 204000000.00, 12000000, 12000000, 12000000, 12000000, 12000000, 12000000, 12, NULL),
(14, 6, 0, 0, 12000000, 0, 0, 0, 0, 372000000.00, 12000000, 12000000, 12000000, 12000000, 12000000, 12000000, 26, NULL),
(15, 6, 12, 2019, 12000000, 0, 0, 0, 0, 432000000.00, 12000000, 12000000, 12000000, 12000000, 12000000, 12000000, 32, NULL),
(16, 4, 12, 2019, 50000, 0, 0, 0, 0, 1150000.00, 0, 0, 0, 550000, 0, 0, 12, NULL),
(17, 7, 12, 2019, 12000, 0, 0, 0, 0, 384000.00, 12000, 12000, 12000, 12000, 12000, 12000, 28, NULL),
(18, 7, 0, 0, 12000, 0, 0, 0, 0, 204000.00, 12000, 12000, 12000, 12000, 12000, 12000, 12, NULL),
(19, 4, 1, 2020, 50000, 0, 0, 0, 109312060, -60463816.00, 0, 0, 0, 550000, 0, 47598246, 25, NULL),
(20, 4, 2, 2020, 50000, 0, 0, 0, 0, 950000.00, 0, 0, 0, 550000, 0, 0, 8, NULL),
(21, 6, 2, 2020, 120000, 0, 0, 0, 0, 1920000.00, 12000000, 12000000, 12000000, 12000000, 12000000, 0, 16, NULL),
(22, 7, 2, 2020, 120000, 0, 0, 0, 0, 1920000.00, 12000, 12000, 12000, 12000, 12000, 0, 16, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` bigint(20) NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `labour_contract` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `leave_day_year` int(11) DEFAULT '0',
  `is_lock` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `note` longtext COLLATE utf8_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profile` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `identity_card_number` bigint(20) DEFAULT '0',
  `issued_date` date DEFAULT NULL,
  `issued_at` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `permanent_address` longtext COLLATE utf8_unicode_ci,
  `current_address` longtext COLLATE utf8_unicode_ci,
  `start_work_date` date DEFAULT NULL,
  `position` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `number_of_year` int(5) DEFAULT '0',
  `job_description` longtext COLLATE utf8_unicode_ci,
  `degree` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `training_place` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profession` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `graduation_year` int(5) DEFAULT '0',
  `foreign_language_skill` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `family_information` longtext COLLATE utf8_unicode_ci,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `user_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_user_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lasted_update_user_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  `version` int(10) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `image`, `email`, `password`, `role`, `full_name`, `birthday`, `phone`, `address`, `labour_contract`, `leave_day_year`, `is_lock`, `is_active`, `note`, `remember_token`, `profile`, `identity_card_number`, `issued_date`, `issued_at`, `gender`, `permanent_address`, `current_address`, `start_work_date`, `position`, `number_of_year`, `job_description`, `degree`, `training_place`, `profession`, `graduation_year`, `foreign_language_skill`, `level`, `family_information`, `code`, `hospital_id`, `user_type`, `created_user_email`, `lasted_update_user_email`, `created_date`, `lasted_update_date`, `version`) VALUES
(1, '/api/downloadUserImage/2019-10-28-17-09-48_da0de7705cc9b697efd8.jpg', 'admin@logsik.com', '$2a$10$KicBUoWW8UjXyEzV6lpHfOIrEE9kpNBZLmXlOQocA18ZuSpRpEBTa', 'ADMIN', 'Administrator', '1987-04-27', '0352431408', NULL, '/api/downloadUserProfile/2019-10-28-17-11-59_bản kê khai năng lực kinh nghiệm.docx', 0, 0, 1, NULL, NULL, NULL, 0, '2016-11-18', 'Hồ Chí Minh', 'MALE', NULL, '', NULL, 'Quản lý chung', 0, NULL, NULL, NULL, NULL, 0, NULL, '1', NULL, 'ADMIN', 3, 'ADMIN', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(2, '/api/downloadUserImage/2019-08-16-17-47-46_download (1).jpeg', 'xpt@logsik.com', '$2a$10$.4V8tvLMHNaitPsoynKFye8ycKDXppQ0cL1NHPrqcjM3pGUWZVb7y', 'ADMIN', 'Doctor Phan Thị Y', '1997-04-27', NULL, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, 'FEMALE', NULL, NULL, NULL, 'Bác sĩ', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'YPT', 3, 'DOCTOR', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(3, '/api/downloadUserImage/2019-08-22-16-14-09_avarta_personnel.png', 'xtt@logsik.com', '$2a$10$guupSg79XqdwaPFncHh5BO9xFilO7laTYOBSo.o/mvCLi46J/6pWK', 'ADMIN', 'Nurse Nguyễn Thị X', '1990-08-04', NULL, NULL, '', 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, 'MALE', NULL, NULL, NULL, 'Y Tá', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'XTT', 3, 'NURSE', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(4, '/api/downloadUserImage/2019-10-28-17-08-40_da0de7705cc9b697efd8.jpg', 'binhpt@gmail.com', '$2a$10$Fm7PjdIW2xAi1QcUza1E8OT5SRWBEXapO4D93c/JIgCLpKHwpNKAK', 'ADMIN', 'Nurse Phan Thanh Binh', '1990-08-01', '0352431408', NULL, '', 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, 'MALE', NULL, NULL, '2018-07-31', 'Y Tá', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'BinhPT', 3, 'NURSE', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(5, '/api/downloadUserImage/2019-10-28-16-34-24_da0de7705cc9b697efd8.jpg', 'vanmv@timec.vn', '$2a$10$1vDdq5GuFYPUQFD9xTdFeeK4XjpfGCqm.Q0Wgh8EyNBdFqHTvbIIu', 'ADMIN', 'Mã Văn Vân', '1989-09-25', '0909876787', NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, 'MALE', NULL, NULL, NULL, 'Laboratorist', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'VanMV', 3, 'LABORATORIST', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(6, NULL, 'tphoainam@gmail.com', '$2a$10$GR8eR0f2D50BMcoHSS.dGeu9tuYFS4EH7FNYw/R8ZIxAAMHBgkQz.', 'ADMIN', 'Truong Van Nam', '1999-11-04', '0898457234', NULL, NULL, 12, 0, 1, NULL, NULL, NULL, 12222112, '2019-11-13', 'gia lai', 'MALE', '112 Đinh Tiên Hoàng', '112 Đinh tiên hoàng', '2019-11-14', 'Bác sĩ', 1, 'Bác sĩ', 'cao đẳng', 'sss', 'sss', 0, NULL, NULL, NULL, 'NV01', 3, 'DOCTOR', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(7, '/api/downloadUserImage/2019-11-15-08-53-21_f163adbbefad02f35bbc.jpg', 'phongnv@gmail.com', '123457', 'ADMIN', 'Nguyễn Văn Phong', '1992-01-12', '1234567890', NULL, 'loại 1', 12, 0, 1, NULL, NULL, NULL, 12398989, '2019-11-04', 'gia lai', 'MALE', '112 đinh tiên hoàng', '112 đinh tiên hoàng', '2019-11-20', 'Bác sĩ', 1, 'Bác sĩ', 'Đại Học', 'Y HCM', 'Bác sĩ đa khoa', 0, '', '', '', 'phongnv', 1, 'DOCTOR', 'tphoainam@gmail.com', 'tphoainam@gmail.com', NULL, NULL, 1),
(8, NULL, 'bangpc@logsik.com', '$2a$10$nEwdA5ocEJV.onpiKv0m5ecx3t/5vMxiGE6SRuvX2Y/WyBb3ixFjK', 'ADMIN', 'Pham Cong Bang', '1987-11-18', NULL, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 12, NULL, NULL, 'MALE', NULL, NULL, NULL, 'Nhân Viên', 0, NULL, NULL, NULL, NULL, 1999, '1', '1', NULL, 'bangpc', NULL, 'ADMIN', 'tphoainam@gmail.com', 'tphoainam@gmail.com', NULL, NULL, 1),
(9, NULL, 'tranthihoa@gmail.com', '12345678', 'ADMIN', 'Trần thị hoa', '1999-11-12', '1234567890', NULL, 'ưe', 12, 0, 1, NULL, NULL, NULL, 122211221, '2019-11-13', 'gia lai', 'MALE', 'sss', 'ssss', '2019-11-18', 'tester', 3, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, '123', NULL, 'NURSE', 'tphoainam@gmail.com', 'tphoainam@gmail.com', NULL, NULL, 1),
(10, '/api/downloadUserImage/2019-12-05-05-46-04_doctor-icon.png', 'cashier1@timec.vn', '$2a$10$RLmu4yU3cLtFfP4XxjUhNOKhqLLXfJZL8dtOROFU6wWs7KK9AN1ci', 'ADMIN', 'Cashier Test 1', NULL, '0909112233', NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, 'FEMALE', NULL, NULL, NULL, 'Nhân Viên', 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'CASHIER1', 3, 'PHARMACIST', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(11, NULL, 'tieptan@logsik.com', '$2a$10$VLiOqvbNj2vEyyFyF8BWGOBRqK3TYYvLe8xT0DzS30aAPNLhZlSyG', 'ADMIN', 'Nguyển Mai', NULL, NULL, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'nv0001', 3, 'RECEPTIONIST', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(12, NULL, 'ketoan@timec.vn', '$2a$10$XYfp/StL./poatWI1Dd0dOn.2t2ki41GFyabVKK5sD6WrrJlZTCjm', 'ADMIN', 'Nguyển Ánh', NULL, NULL, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'nv0002', 3, 'ACCOUNTANT', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 1),
(13, NULL, 'thuoc@logsik.com', '$2a$10$H40br5W0F98hLaCK.LEyEem0FLtnSAYsRcb31/Mg2jReIuy9ehsWi', 'ADMIN', 'Nguyễn Xuân', NULL, NULL, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'nv0003', 1, 'PHARMACIST', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 0),
(14, NULL, 'quanly@logsik.com', '$2a$10$BTqSXx.zfE/ZnSeYaGBx6O5H1hdm0BPghXHgnzcYYCAuV8IeukD3m', 'ADMIN', 'Nguyễn Hoàng', NULL, NULL, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 'nv0004', 3, 'LABORATORIST', 'admin@logsik.com', 'admin@logsik.com', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `year_balance`
--

CREATE TABLE `year_balance` (
  `id` bigint(20) NOT NULL,
  `date` date DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `has_validated` tinyint(1) DEFAULT NULL,
  `validated_by` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `year_balance`
--

INSERT INTO `year_balance` (`id`, `date`, `code`, `company_name`, `address`, `note`, `has_validated`, `validated_by`) VALUES
(1, '2020-02-20', 'BC-01', 'Công Ty ABC', '112 Đinh Tiên Hoàng Quận 1 , TP.HCM', NULL, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_code`
--
ALTER TABLE `account_code`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UC_ACCOUNTCODE_CODE` (`code`);

--
-- Indexes for table `add_salary`
--
ALTER TABLE `add_salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_add_salary_user_salary` (`user_salary_id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Appointment_patient_1` (`patient_id`),
  ADD KEY `fk_Appointment_user_table1_1` (`doctor_id`);

--
-- Indexes for table `billing`
--
ALTER TABLE `billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_group`
--
ALTER TABLE `booking_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_BookingGroup_company_1` (`company_id`);

--
-- Indexes for table `cash_desk`
--
ALTER TABLE `cash_desk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cash_desk_user_table_1` (`cashier_id`);

--
-- Indexes for table `cash_widrawal`
--
ALTER TABLE `cash_widrawal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cash_widrawal_cash_desk_1` (`cash_desk_id`),
  ADD KEY `fk_cash_widrawal_user_table_1` (`validate_user_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dashboard_notification`
--
ALTER TABLE `dashboard_notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `day_revenue`
--
ALTER TABLE `day_revenue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_day_revenue_user_table_1` (`validated_by`),
  ADD KEY `fk_day_revenue_hospital_1` (`hospital_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_department_hospital_1` (`hospital_id`);

--
-- Indexes for table `device`
--
ALTER TABLE `device`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_device_supplier` (`supplier_id`);

--
-- Indexes for table `device_maintenance`
--
ALTER TABLE `device_maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_device_maintenance_device_1` (`device_id`);

--
-- Indexes for table `diagnosis_group`
--
ALTER TABLE `diagnosis_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diagnosis_report`
--
ALTER TABLE `diagnosis_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_diagnosis_report_prescription_1` (`prescription_id`);

--
-- Indexes for table `diagnosis_service`
--
ALTER TABLE `diagnosis_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_diagnosis_service_diagnosis_category_1` (`group_id`);

--
-- Indexes for table `drug`
--
ALTER TABLE `drug`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_medicine_drug_category_1` (`category_id`);

--
-- Indexes for table `drug_category`
--
ALTER TABLE `drug_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `drug_store`
--
ALTER TABLE `drug_store`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_drug_store_hospital` (`hospital_id`);

--
-- Indexes for table `file_upload`
--
ALTER TABLE `file_upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `help_comment`
--
ALTER TABLE `help_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_help_comment_help_ticket_1` (`help_ticket_id`),
  ADD KEY `FK_help_comment_user_table` (`created_by`);

--
-- Indexes for table `help_ticket`
--
ALTER TABLE `help_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_reporter_help_ticket_user` (`reporter_id`),
  ADD KEY `FK_assignee__help_ticket_user` (`assignee_id`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icd`
--
ALTER TABLE `icd`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_icd_icd_category_1` (`category_id`);

--
-- Indexes for table `icd_category`
--
ALTER TABLE `icd_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `input_form`
--
ALTER TABLE `input_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_input_form_drug_store_1` (`drug_store_id`);

--
-- Indexes for table `input_stock`
--
ALTER TABLE `input_stock`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_input_stock_drug` (`drug_id`),
  ADD KEY `fk_input_stock_drug_store_1` (`drug_store_id`);

--
-- Indexes for table `insurance_card`
--
ALTER TABLE `insurance_card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_insurance_card_insurance_type_1` (`type_id`),
  ADD KEY `fk_insurance_card_patient_1` (`patient_id`);

--
-- Indexes for table `insurance_company`
--
ALTER TABLE `insurance_company`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `insurance_invoice`
--
ALTER TABLE `insurance_invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_insurance_invoice_invoice_1` (`invoice_id`);

--
-- Indexes for table `insurance_invoice_item`
--
ALTER TABLE `insurance_invoice_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_insurance_invoice_item_insurance_mapping_1` (`insurance_mapping_id`);

--
-- Indexes for table `insurance_mapping`
--
ALTER TABLE `insurance_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_insurance_mapping_drug_1` (`drug_id`);

--
-- Indexes for table `insurance_type`
--
ALTER TABLE `insurance_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_invoice_cash_desk_1` (`cash_desk_id`),
  ADD KEY `fk_invoice_user_table_1` (`responsible_user_id`),
  ADD KEY `fk_invoice_prescription_1` (`prescription_id`);

--
-- Indexes for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_invoice_item_invoice_1` (`invoice_id`),
  ADD KEY `fk_invoice_item_diagnosis_service_1` (`diagnosis_service_id`),
  ADD KEY `fk_invoice_item_procedure_service_1` (`procedure_service_id`);

--
-- Indexes for table `journal`
--
ALTER TABLE `journal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_journal_accountCode` (`account_code_id`),
  ADD KEY `fk_journal_payment` (`payment_id`),
  ADD KEY `fk_journal_billing` (`billing_id`);

--
-- Indexes for table `ledger`
--
ALTER TABLE `ledger`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ledger_accountCode` (`account_code_id`),
  ADD KEY `fk_ledger_validateBy` (`validated_by`);

--
-- Indexes for table `maintenance_plan`
--
ALTER TABLE `maintenance_plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_maintenance_plan_device_1` (`device_id`);

--
-- Indexes for table `minus_salary`
--
ALTER TABLE `minus_salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_minus_salary_user_salary` (`user_salary_id`);

--
-- Indexes for table `month_revenue`
--
ALTER TABLE `month_revenue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_month_revenue_user_table_1` (`validated_by`),
  ADD KEY `fk_month_revenue_hospital_1` (`hospital_id`);

--
-- Indexes for table `output_form`
--
ALTER TABLE `output_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_output_form_drug_store_1` (`drug_store_id`);

--
-- Indexes for table `output_stock`
--
ALTER TABLE `output_stock`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_output_stock_drug` (`drug_id`),
  ADD KEY `fk_output_stock_drug_store_1` (`drug_store_id`),
  ADD KEY `FK_output_stock_queue_number` (`invoice_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patient_booking_group`
--
ALTER TABLE `patient_booking_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_PatientBookingGroup_BookingGroup_1` (`booking_group_id`),
  ADD KEY `fk_PatientBookingGroup_patient_1` (`patient_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_payment_invoice_1` (`invoice_id`),
  ADD KEY `fk_payment_patient_1` (`patient_id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_prescription_patient_1` (`patient_id`),
  ADD KEY `fk_prescription_department_1` (`department_id`),
  ADD KEY `fk_prescription_icd_1` (`icd_id`),
  ADD KEY `fk_prescription_icd_2` (`sub_icd_id`),
  ADD KEY `queue_number_id` (`queue_number_id`),
  ADD KEY `FK_prescription_insurance_type` (`insurance_type_id`),
  ADD KEY `prescription_hospital` (`hospital_id`);

--
-- Indexes for table `prescription_item`
--
ALTER TABLE `prescription_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_prescription_item_prescription_1` (`prescription_id`),
  ADD KEY `fk_supper_id_prescription_item` (`supper_id`);

--
-- Indexes for table `prescription_review`
--
ALTER TABLE `prescription_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_prescription_review_prescription_1` (`prescription_id`),
  ADD KEY `fk_review_reviewer_id_1` (`reviewer_id`),
  ADD KEY `fk_review_doctor_id_1` (`doctor_id`);

--
-- Indexes for table `procedure_member`
--
ALTER TABLE `procedure_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_procedure_member_procedure_report_1` (`procedure_report_id`);

--
-- Indexes for table `procedure_report`
--
ALTER TABLE `procedure_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_procedure_report_procedure_service_1` (`procedure_service_id`),
  ADD KEY `prescription_id` (`prescription_id`),
  ADD KEY `fk_procedure_report_hospital` (`hospital_id`);

--
-- Indexes for table `procedure_service`
--
ALTER TABLE `procedure_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_procedure_department_1` (`department_id`);

--
-- Indexes for table `queue_number`
--
ALTER TABLE `queue_number`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_queue_number_queue_table_1` (`queue_id`),
  ADD KEY `fk_queue_number_patient_1` (`patient_id`);

--
-- Indexes for table `queue_table`
--
ALTER TABLE `queue_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_queue_table_department_1` (`department_id`),
  ADD KEY `fk_queue_table_user_table_1` (`caller_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shortcode`
--
ALTER TABLE `shortcode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_stock_drug_1` (`drug_id`),
  ADD KEY `fk_stock_drug_store_1` (`drug_store_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transfer_form`
--
ALTER TABLE `transfer_form`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_transfer_form_transfer_hospital_1` (`transfer_hospital_id`),
  ADD KEY `fk_transfer_from_prescription` (`prescription_id`);

--
-- Indexes for table `transfer_hospital`
--
ALTER TABLE `transfer_hospital`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trial_balance`
--
ALTER TABLE `trial_balance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_trialBalance_accountCode` (`account_code_id`),
  ADD KEY `fk_trialBalance_yearBalance` (`year_balance_id`);

--
-- Indexes for table `uom`
--
ALTER TABLE `uom`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_attendance`
--
ALTER TABLE `user_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_attendance_user_table1_1` (`user_id`);

--
-- Indexes for table `user_config`
--
ALTER TABLE `user_config`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_user_config_user` (`user_id`);

--
-- Indexes for table `user_context`
--
ALTER TABLE `user_context`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_department`
--
ALTER TABLE `user_department`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_user_hd` (`user_id`),
  ADD KEY `FK_user_department_department` (`department_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userRole_user` (`user_id`),
  ADD KEY `fk_userRole_role_table` (`role_id`);

--
-- Indexes for table `user_salary`
--
ALTER TABLE `user_salary`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_user_salary_user_table1_1` (`user_id`) USING BTREE;

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_user_hospital` (`hospital_id`);

--
-- Indexes for table `year_balance`
--
ALTER TABLE `year_balance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_yearBlance_validateBy` (`validated_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_code`
--
ALTER TABLE `account_code`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `add_salary`
--
ALTER TABLE `add_salary`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `billing`
--
ALTER TABLE `billing`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking_group`
--
ALTER TABLE `booking_group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cash_desk`
--
ALTER TABLE `cash_desk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `cash_widrawal`
--
ALTER TABLE `cash_widrawal`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dashboard_notification`
--
ALTER TABLE `dashboard_notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `day_revenue`
--
ALTER TABLE `day_revenue`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `device`
--
ALTER TABLE `device`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `device_maintenance`
--
ALTER TABLE `device_maintenance`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `diagnosis_group`
--
ALTER TABLE `diagnosis_group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `diagnosis_report`
--
ALTER TABLE `diagnosis_report`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `diagnosis_service`
--
ALTER TABLE `diagnosis_service`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `drug`
--
ALTER TABLE `drug`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `drug_category`
--
ALTER TABLE `drug_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `drug_store`
--
ALTER TABLE `drug_store`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `file_upload`
--
ALTER TABLE `file_upload`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `help_comment`
--
ALTER TABLE `help_comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `help_ticket`
--
ALTER TABLE `help_ticket`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hospital`
--
ALTER TABLE `hospital`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `icd`
--
ALTER TABLE `icd`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `icd_category`
--
ALTER TABLE `icd_category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `input_form`
--
ALTER TABLE `input_form`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `input_stock`
--
ALTER TABLE `input_stock`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `insurance_card`
--
ALTER TABLE `insurance_card`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `insurance_company`
--
ALTER TABLE `insurance_company`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `insurance_invoice`
--
ALTER TABLE `insurance_invoice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `insurance_invoice_item`
--
ALTER TABLE `insurance_invoice_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `insurance_mapping`
--
ALTER TABLE `insurance_mapping`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `insurance_type`
--
ALTER TABLE `insurance_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `invoice_item`
--
ALTER TABLE `invoice_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=307;

--
-- AUTO_INCREMENT for table `ledger`
--
ALTER TABLE `ledger`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `maintenance_plan`
--
ALTER TABLE `maintenance_plan`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `minus_salary`
--
ALTER TABLE `minus_salary`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `month_revenue`
--
ALTER TABLE `month_revenue`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `output_form`
--
ALTER TABLE `output_form`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `output_stock`
--
ALTER TABLE `output_stock`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `patient_booking_group`
--
ALTER TABLE `patient_booking_group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=316;

--
-- AUTO_INCREMENT for table `prescription_item`
--
ALTER TABLE `prescription_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=451;

--
-- AUTO_INCREMENT for table `prescription_review`
--
ALTER TABLE `prescription_review`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `procedure_member`
--
ALTER TABLE `procedure_member`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `procedure_report`
--
ALTER TABLE `procedure_report`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `procedure_service`
--
ALTER TABLE `procedure_service`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `queue_number`
--
ALTER TABLE `queue_number`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `queue_table`
--
ALTER TABLE `queue_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `shortcode`
--
ALTER TABLE `shortcode`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transfer_form`
--
ALTER TABLE `transfer_form`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transfer_hospital`
--
ALTER TABLE `transfer_hospital`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `trial_balance`
--
ALTER TABLE `trial_balance`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `uom`
--
ALTER TABLE `uom`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_attendance`
--
ALTER TABLE `user_attendance`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `user_config`
--
ALTER TABLE `user_config`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_context`
--
ALTER TABLE `user_context`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_department`
--
ALTER TABLE `user_department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `user_salary`
--
ALTER TABLE `user_salary`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `year_balance`
--
ALTER TABLE `year_balance`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `add_salary`
--
ALTER TABLE `add_salary`
  ADD CONSTRAINT `fk_add_salary_user_salary` FOREIGN KEY (`user_salary_id`) REFERENCES `user_salary` (`id`);

--
-- Constraints for table `day_revenue`
--
ALTER TABLE `day_revenue`
  ADD CONSTRAINT `fk_day_revenue_hospital_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`),
  ADD CONSTRAINT `fk_day_revenue_user_table_1` FOREIGN KEY (`validated_by`) REFERENCES `user_table` (`id`);

--
-- Constraints for table `device`
--
ALTER TABLE `device`
  ADD CONSTRAINT `fk_device_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

--
-- Constraints for table `drug`
--
ALTER TABLE `drug`
  ADD CONSTRAINT `fk_medicine_drug_category_1` FOREIGN KEY (`category_id`) REFERENCES `drug_category` (`id`);

--
-- Constraints for table `help_comment`
--
ALTER TABLE `help_comment`
  ADD CONSTRAINT `FK_help_comment_user_table` FOREIGN KEY (`created_by`) REFERENCES `user_table` (`id`),
  ADD CONSTRAINT `fk_help_comment_help_ticket_1` FOREIGN KEY (`help_ticket_id`) REFERENCES `help_ticket` (`id`);

--
-- Constraints for table `help_ticket`
--
ALTER TABLE `help_ticket`
  ADD CONSTRAINT `FK_assignee__help_ticket_user` FOREIGN KEY (`assignee_id`) REFERENCES `user_table` (`id`),
  ADD CONSTRAINT `FK_reporter_help_ticket_user` FOREIGN KEY (`reporter_id`) REFERENCES `user_table` (`id`);

--
-- Constraints for table `input_form`
--
ALTER TABLE `input_form`
  ADD CONSTRAINT `fk_input_form_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`);

--
-- Constraints for table `input_stock`
--
ALTER TABLE `input_stock`
  ADD CONSTRAINT `fk_input_stock_drug` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`id`),
  ADD CONSTRAINT `fk_input_stock_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`);

--
-- Constraints for table `journal`
--
ALTER TABLE `journal`
  ADD CONSTRAINT `fk_journal_accountCode` FOREIGN KEY (`account_code_id`) REFERENCES `account_code` (`id`),
  ADD CONSTRAINT `fk_journal_billing` FOREIGN KEY (`billing_id`) REFERENCES `billing` (`id`),
  ADD CONSTRAINT `fk_journal_payment` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`);

--
-- Constraints for table `ledger`
--
ALTER TABLE `ledger`
  ADD CONSTRAINT `fk_ledger_accountCode` FOREIGN KEY (`account_code_id`) REFERENCES `account_code` (`id`),
  ADD CONSTRAINT `fk_ledger_validateBy` FOREIGN KEY (`validated_by`) REFERENCES `user_table` (`id`);

--
-- Constraints for table `minus_salary`
--
ALTER TABLE `minus_salary`
  ADD CONSTRAINT `fk_minus_salary_user_salary` FOREIGN KEY (`user_salary_id`) REFERENCES `user_salary` (`id`);

--
-- Constraints for table `month_revenue`
--
ALTER TABLE `month_revenue`
  ADD CONSTRAINT `fk_month_revenue_hospital_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`),
  ADD CONSTRAINT `fk_month_revenue_user_table_1` FOREIGN KEY (`validated_by`) REFERENCES `user_table` (`id`);

--
-- Constraints for table `output_form`
--
ALTER TABLE `output_form`
  ADD CONSTRAINT `fk_output_form_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`);

--
-- Constraints for table `output_stock`
--
ALTER TABLE `output_stock`
  ADD CONSTRAINT `FK_output_stock_queue_number` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
  ADD CONSTRAINT `fk_output_stock_drug` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`id`),
  ADD CONSTRAINT `fk_output_stock_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`);

--
-- Constraints for table `prescription`
--
ALTER TABLE `prescription`
  ADD CONSTRAINT `prescription_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`),
  ADD CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`queue_number_id`) REFERENCES `queue_number` (`id`);

--
-- Constraints for table `prescription_item`
--
ALTER TABLE `prescription_item`
  ADD CONSTRAINT `fk_supper_id_prescription_item` FOREIGN KEY (`supper_id`) REFERENCES `prescription_item` (`id`);

--
-- Constraints for table `prescription_review`
--
ALTER TABLE `prescription_review`
  ADD CONSTRAINT `fk_prescription_review_prescription_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`),
  ADD CONSTRAINT `fk_review_doctor_id_1` FOREIGN KEY (`doctor_id`) REFERENCES `user_table` (`id`),
  ADD CONSTRAINT `fk_review_reviewer_id_1` FOREIGN KEY (`reviewer_id`) REFERENCES `user_table` (`id`);

--
-- Constraints for table `procedure_report`
--
ALTER TABLE `procedure_report`
  ADD CONSTRAINT `fk_procedure_report_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`);

--
-- Constraints for table `trial_balance`
--
ALTER TABLE `trial_balance`
  ADD CONSTRAINT `fk_trialBalance_accountCode` FOREIGN KEY (`account_code_id`) REFERENCES `account_code` (`id`),
  ADD CONSTRAINT `fk_trialBalance_yearBalance` FOREIGN KEY (`year_balance_id`) REFERENCES `year_balance` (`id`);

--
-- Constraints for table `user_department`
--
ALTER TABLE `user_department`
  ADD CONSTRAINT `FK_user_department_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `FK_user_department_user_table` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`);

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`);

--
-- Constraints for table `user_table`
--
ALTER TABLE `user_table`
  ADD CONSTRAINT `fk_user_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`);

--
-- Constraints for table `year_balance`
--
ALTER TABLE `year_balance`
  ADD CONSTRAINT `fk_yearBlance_validateBy` FOREIGN KEY (`validated_by`) REFERENCES `user_table` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
