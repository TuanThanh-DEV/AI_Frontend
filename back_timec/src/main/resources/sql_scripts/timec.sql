-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 20, 2023 at 02:44 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timec`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_code`
--

DROP TABLE IF EXISTS `account_code`;
CREATE TABLE IF NOT EXISTS `account_code` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` int(11) NOT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_ACCOUNTCODE_CODE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `add_salary`
--

DROP TABLE IF EXISTS `add_salary`;
CREATE TABLE IF NOT EXISTS `add_salary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_salary_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `amount` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_add_salary_user_salary` (`user_salary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE IF NOT EXISTS `appointment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `appoint_date` datetime NOT NULL,
  `doctor_id` bigint(20) DEFAULT NULL,
  `patient_id` bigint(20) NOT NULL,
  `status` varchar(255) COLLATE utf8_bin NOT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Appointment_patient_1` (`patient_id`),
  KEY `fk_Appointment_user_table1_1` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
CREATE TABLE IF NOT EXISTS `billing` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `receiver` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `account_code_id` bigint(20) DEFAULT NULL,
  `has_accounted` tinyint(1) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `booking_group`
--

DROP TABLE IF EXISTS `booking_group`;
CREATE TABLE IF NOT EXISTS `booking_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company_id` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `appointment_date` date NOT NULL,
  `number_of_attendees` int(11) DEFAULT NULL,
  `status` enum('OPEN','BOOKED','DONE','CANCELLED') COLLATE utf8_bin NOT NULL,
  `note` longtext COLLATE utf8_bin,
  `package_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_BookingGroup_company_1` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `cash_desk`
--

DROP TABLE IF EXISTS `cash_desk`;
CREATE TABLE IF NOT EXISTS `cash_desk` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cashier_id` bigint(20) NOT NULL,
  `open_time` datetime DEFAULT NULL,
  `initial_amount` bigint(20) DEFAULT NULL,
  `close_time` datetime DEFAULT NULL,
  `close_amount` bigint(20) DEFAULT NULL,
  `is_balanced` tinyint(1) DEFAULT NULL,
  `note` longtext COLLATE utf8_bin,
  `sale_amount` bigint(20) DEFAULT NULL,
  `withdrawal_amount` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cash_desk_user_table_1` (`cashier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `cash_widrawal`
--

DROP TABLE IF EXISTS `cash_widrawal`;
CREATE TABLE IF NOT EXISTS `cash_widrawal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cash_desk_id` bigint(20) NOT NULL,
  `widrawal_amount` bigint(20) NOT NULL,
  `widrawal_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `validate_user_id` bigint(20) NOT NULL,
  `note` longtext COLLATE utf8_bin,
  PRIMARY KEY (`id`),
  KEY `fk_cash_widrawal_cash_desk_1` (`cash_desk_id`),
  KEY `fk_cash_widrawal_user_table_1` (`validate_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_cls_xml_4`
--

DROP TABLE IF EXISTS `chi_tiet_cls_xml_4`;
CREATE TABLE IF NOT EXISTS `chi_tiet_cls_xml_4` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ma_kham_benh` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stt` int(10) DEFAULT NULL,
  `ma_dich_vu_cLS` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_xet_nghiem` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ten_xet_nghiem_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ket_qua_xet_nghiem_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_may_xet_nghiem` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mo_ta_ket_qua_xet_xghiem` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ket_luan_xet_nghiem` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ngay_ra_ket_qua` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_dien_bien_benh_xml_5`
--

DROP TABLE IF EXISTS `chi_tiet_dien_bien_benh_xml_5`;
CREATE TABLE IF NOT EXISTS `chi_tiet_dien_bien_benh_xml_5` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ma_kham_benh` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stt` int(10) DEFAULT NULL,
  `dien_bien_benh_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ket_qua_hoi_chan_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mo_ta_cach_thuc_phau_thuat` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ngay_ra_y_lenh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_dvkt_xml_3`
--

DROP TABLE IF EXISTS `chi_tiet_dvkt_xml_3`;
CREATE TABLE IF NOT EXISTS `chi_tiet_dvkt_xml_3` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ma_kham_benh` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stt` int(10) DEFAULT NULL,
  `ma_dich_vu` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_vat_tu` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_nhom` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ten_dich_vu_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `don_vi_tinh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `so_luong` float DEFAULT NULL,
  `don_gia_thanh_toan_bHYT` float DEFAULT NULL,
  `ty_le_thanh_toan_bHYT` int(3) DEFAULT NULL,
  `thanh_lien` bigint(15) DEFAULT NULL,
  `ma_khoa` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_chung_chi_hanh_nghe_bac_si` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_benh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ngay_ra_y_lenh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ngay_co_ket_qua` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_phuong_thuc_thanh_toan` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chi_tiet_thuoc_xml_2`
--

DROP TABLE IF EXISTS `chi_tiet_thuoc_xml_2`;
CREATE TABLE IF NOT EXISTS `chi_tiet_thuoc_xml_2` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ma_kham_benh` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `stt` int(10) DEFAULT NULL,
  `ma_thuoc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_nhom` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ten_thuoc_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `don_vi_tinh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ham_luong_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duong_luong` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lieu_dung_cDATA` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `so_dang_ky_thuoc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `so_luong` float DEFAULT NULL,
  `don_gia_thanh_toan_bHYT` float DEFAULT NULL,
  `ty_le_thanh_toan_bHYT` int(3) DEFAULT NULL,
  `thanh_tien` bigint(15) DEFAULT NULL,
  `ma_khoa` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_chung_chi_hanh_nghe_bac_si` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_benh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ngay_ra_y_lenh` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_phuong_thuc_thanh_oan` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `tax_code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `address` longtext COLLATE utf8_bin,
  `bank_account` longtext COLLATE utf8_bin,
  `note` longtext COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `config_day_drug`
--

DROP TABLE IF EXISTS `config_day_drug`;
CREATE TABLE IF NOT EXISTS `config_day_drug` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `number_day` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `config_table`
--

DROP TABLE IF EXISTS `config_table`;
CREATE TABLE IF NOT EXISTS `config_table` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `config_code` varchar(255) NOT NULL,
  `config_value` bigint(20) NOT NULL,
  `updated_by` bigint(20) DEFAULT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_config_table_updated_by` (`updated_by`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `config_warning_drug`
--

DROP TABLE IF EXISTS `config_warning_drug`;
CREATE TABLE IF NOT EXISTS `config_warning_drug` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_one_id` bigint(20) NOT NULL,
  `drug_two_id` bigint(20) NOT NULL,
  `number_valid_date` int(10) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
CREATE TABLE IF NOT EXISTS `coupon` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `discount_percent` bigint(20) DEFAULT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_to` date DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_notification`
--

DROP TABLE IF EXISTS `dashboard_notification`;
CREATE TABLE IF NOT EXISTS `dashboard_notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `from_date` date DEFAULT NULL,
  `title` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `to_date` date DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `day_revenue`
--

DROP TABLE IF EXISTS `day_revenue`;
CREATE TABLE IF NOT EXISTS `day_revenue` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `validated_by` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','VALIDATED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `sale_prescription_amount` bigint(20) DEFAULT NULL,
  `internal_drug_amount` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_day_revenue_user_table_1` (`validated_by`),
  KEY `fk_day_revenue_hospital_1` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `hospital_id` bigint(20) DEFAULT NULL,
  `has_active` tinyint(1) NOT NULL DEFAULT '0',
  `department_code` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ma_bhyt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ten_bhyt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_department_hospital_1` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
CREATE TABLE IF NOT EXISTS `device` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `device_category` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `made_in` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_id` bigint(20) DEFAULT NULL,
  `user_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `maintenance_cycle` int(11) DEFAULT NULL,
  `device_input_form_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_supplier` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `device_input_form`
--

DROP TABLE IF EXISTS `device_input_form`;
CREATE TABLE IF NOT EXISTS `device_input_form` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `input_date` date NOT NULL,
  `supplier_id` bigint(20) DEFAULT NULL,
  `invoice_amount_supplier` bigint(20) DEFAULT '0',
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `created_user` bigint(20) NOT NULL,
  `validated_user` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','DONE','CANCELLED') NOT NULL DEFAULT 'OPEN',
  PRIMARY KEY (`id`),
  KEY `fk_device_input_form_supplier` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `device_maintenance`
--

DROP TABLE IF EXISTS `device_maintenance`;
CREATE TABLE IF NOT EXISTS `device_maintenance` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `device_id` bigint(20) NOT NULL,
  `maintenance_date` datetime NOT NULL,
  `cost` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_bin,
  PRIMARY KEY (`id`),
  KEY `fk_device_maintenance_device_1` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_group`
--

DROP TABLE IF EXISTS `diagnosis_group`;
CREATE TABLE IF NOT EXISTS `diagnosis_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_report`
--

DROP TABLE IF EXISTS `diagnosis_report`;
CREATE TABLE IF NOT EXISTS `diagnosis_report` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `report_type` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `diagnosis_service_id` bigint(20) NOT NULL,
  `file_name` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `diagnosis_date` date DEFAULT NULL,
  `laboratorist_id` bigint(20) DEFAULT NULL,
  `hospital_id` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','IN_PROGRESS','DONE','CANCELLED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `diagnose` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `status_payment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_diagnosis_report_prescription_1` (`prescription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_result_item`
--

DROP TABLE IF EXISTS `diagnosis_result_item`;
CREATE TABLE IF NOT EXISTS `diagnosis_result_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `diagnoosis_report_id` bigint(20) DEFAULT NULL,
  `ket_qua` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `don_vi` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `csbt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `bat_thuong` tinyint(1) DEFAULT '0',
  `thoi_gian_tra_ket_qua` date DEFAULT NULL,
  `sid` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `ma_dich_vu_LIS` varchar(255) DEFAULT NULL,
  `ten_dich_vu_LIS` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_service`
--

DROP TABLE IF EXISTS `diagnosis_service`;
CREATE TABLE IF NOT EXISTS `diagnosis_service` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `description` longtext COLLATE utf8_bin,
  `group_id` bigint(20) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `ma_dvkt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ma_gia` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `don_gia_bhyt` bigint(20) DEFAULT NULL,
  `quyet_dinh` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `cong_bo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ma_co_so_kcb` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `loai_pttt` int(11) DEFAULT NULL,
  `is_insurance` tinyint(1) DEFAULT '0',
  `service_type` enum('XET_NGHIEM','CHAN_DOAN_HINH_ANH','THAM_DO_CHUC_NANG','THU_THUAT') COLLATE utf8_bin DEFAULT 'XET_NGHIEM',
  `ma_vat_tu` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ma_nhom` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `don_vi_tinh` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ma_may_xet_nghiem` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_diagnosis_service_diagnosis_category_1` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `diagnosis_service_temp`
--

DROP TABLE IF EXISTS `diagnosis_service_temp`;
CREATE TABLE IF NOT EXISTS `diagnosis_service_temp` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `description` longtext COLLATE utf8_bin,
  `group_id` bigint(20) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `ma_dvkt` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ma_gia` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `don_gia_bhyt` bigint(20) DEFAULT NULL,
  `quyet_dinh` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `cong_bo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ma_co_so_kcb` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `loai_pttt` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_diagnosis_service_diagnosis_category_1` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `drug`
--

DROP TABLE IF EXISTS `drug`;
CREATE TABLE IF NOT EXISTS `drug` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `guideline` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `uom` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `sale_price` bigint(20) DEFAULT NULL,
  `import_price` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `ingredient` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `drug_type` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `bar_code` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `has_group` tinyint(1) NOT NULL DEFAULT '0',
  `has_prescription` tinyint(1) NOT NULL DEFAULT '0',
  `place_code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `supplier_drug_id` bigint(20) DEFAULT NULL,
  `package_uom` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `number_of_package_items` int(11) DEFAULT '1',
  `package_sale_price` bigint(20) DEFAULT '0',
  `ma_nhom_bHYT` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ham_luong_bHYT` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `duong_dung_bHYT` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `lieu_dung_bHYT` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `so_dang_ky_bHYT` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `thong_tin_thau` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `pham_vi` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ma_hoat_chat` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `producer_company` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `producer_country` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contractor_bHYT` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `published_date` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `sellable` tinyint(1) DEFAULT '1',
  `ham_luong` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_medicine_drug_category_1` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `drug_cabinet`
--

DROP TABLE IF EXISTS `drug_cabinet`;
CREATE TABLE IF NOT EXISTS `drug_cabinet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(2048) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_drug_cabinet_department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `drug_category`
--

DROP TABLE IF EXISTS `drug_category`;
CREATE TABLE IF NOT EXISTS `drug_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `drug_type` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `drug_store`
--

DROP TABLE IF EXISTS `drug_store`;
CREATE TABLE IF NOT EXISTS `drug_store` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin DEFAULT NULL,
  `description` longtext COLLATE utf8_bin,
  `hospital_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_drug_store_hospital` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `file_upload`
--

DROP TABLE IF EXISTS `file_upload`;
CREATE TABLE IF NOT EXISTS `file_upload` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `crm_table_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `crm_link_id` bigint(20) DEFAULT NULL,
  `name` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `file_location` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `upload_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `help_comment`
--

DROP TABLE IF EXISTS `help_comment`;
CREATE TABLE IF NOT EXISTS `help_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `help_ticket_id` bigint(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `attached_files` longtext COLLATE utf8_bin,
  PRIMARY KEY (`id`),
  KEY `fk_help_comment_help_ticket_1` (`help_ticket_id`),
  KEY `FK_help_comment_user_table` (`created_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `help_ticket`
--

DROP TABLE IF EXISTS `help_ticket`;
CREATE TABLE IF NOT EXISTS `help_ticket` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reporter_id` bigint(20) NOT NULL,
  `question` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `assignee_id` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','PLANNED','QA','DONE') COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reporter_help_ticket_user` (`reporter_id`),
  KEY `FK_assignee__help_ticket_user` (`assignee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
CREATE TABLE IF NOT EXISTS `hospital` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `code` varchar(32) COLLATE utf8_bin NOT NULL,
  `has_active` tinyint(1) NOT NULL DEFAULT '0',
  `address` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- --------------------------------------------------------

--
-- Table structure for table `icd`
--

DROP TABLE IF EXISTS `icd`;
CREATE TABLE IF NOT EXISTS `icd` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(32) COLLATE utf8_bin NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `code_bhyt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `input_cabinet`
--

DROP TABLE IF EXISTS `input_cabinet`;
CREATE TABLE IF NOT EXISTS `input_cabinet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) DEFAULT NULL,
  `input_date` date DEFAULT NULL,
  `input_amount` int(11) DEFAULT NULL,
  `drug_cabinet_id` bigint(20) DEFAULT NULL,
  `input_cabinet_form_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `input_cabinet_form`
--

DROP TABLE IF EXISTS `input_cabinet_form`;
CREATE TABLE IF NOT EXISTS `input_cabinet_form` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_cabinet_id` bigint(20) NOT NULL,
  `input_date` date NOT NULL,
  `created_user` bigint(20) NOT NULL,
  `validated_user` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','DONE','CANCELLED') NOT NULL DEFAULT 'OPEN',
  PRIMARY KEY (`id`),
  KEY `fk_input_form_drug_cabinet_1` (`drug_cabinet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `input_form`
--

DROP TABLE IF EXISTS `input_form`;
CREATE TABLE IF NOT EXISTS `input_form` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_store_id` bigint(20) NOT NULL,
  `input_date` date NOT NULL,
  `created_user` bigint(20) NOT NULL,
  `validated_user` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','DONE','CANCELLED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `invoice_amount_supplier` bigint(20) DEFAULT '0',
  `reduced_amount_supplier` bigint(20) DEFAULT '0',
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `has_cancellable` tinyint(1) DEFAULT '1',
  `move_store_form_id` bigint(20) DEFAULT NULL,
  `invoice_number_supplier` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `from_output_form_id` bigint(20) DEFAULT NULL,
  `supplier_name` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_input_form_drug_store_1` (`drug_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `input_stock`
--

DROP TABLE IF EXISTS `input_stock`;
CREATE TABLE IF NOT EXISTS `input_stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) DEFAULT NULL,
  `input_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `input_amount` int(11) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `input_form_id` bigint(20) DEFAULT NULL,
  `remain_amount` int(11) DEFAULT NULL,
  `produced_date` date DEFAULT NULL,
  `batch_barcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sale_price` bigint(20) NOT NULL,
  `import_price` bigint(20) NOT NULL,
  `before_stock` bigint(20) DEFAULT '0',
  `produced_code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_input_stock_drug` (`drug_id`),
  KEY `fk_input_stock_drug_store_1` (`drug_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_card`
--

DROP TABLE IF EXISTS `insurance_card`;
CREATE TABLE IF NOT EXISTS `insurance_card` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `insurance_code` varchar(255) COLLATE utf8_bin NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `type_id` bigint(20) NOT NULL,
  `address` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ma_dKBD` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `address_dKBD` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_insurance_card_insurance_type_1` (`type_id`),
  KEY `fk_insurance_card_patient_1` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_company`
--

DROP TABLE IF EXISTS `insurance_company`;
CREATE TABLE IF NOT EXISTS `insurance_company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_invoice`
--

DROP TABLE IF EXISTS `insurance_invoice`;
CREATE TABLE IF NOT EXISTS `insurance_invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint(20) NOT NULL,
  `responsible_user_id` bigint(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `insurance_refund_date` datetime DEFAULT NULL,
  `total_amount_no_vat` bigint(20) NOT NULL,
  `total_amount_with_vat` bigint(20) NOT NULL,
  `insurrance_amount` bigint(20) NOT NULL,
  `status` varchar(64) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_insurance_invoice_invoice_1` (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_invoice_item`
--

DROP TABLE IF EXISTS `insurance_invoice_item`;
CREATE TABLE IF NOT EXISTS `insurance_invoice_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `insurance_invoice_id` bigint(20) NOT NULL,
  `insurance_mapping_id` bigint(20) NOT NULL,
  `origin_amount` bigint(20) NOT NULL,
  `insurance_percent` int(11) NOT NULL,
  `insurance_amount` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_insurance_invoice_item_insurance_mapping_1` (`insurance_mapping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_mapping`
--

DROP TABLE IF EXISTS `insurance_mapping`;
CREATE TABLE IF NOT EXISTS `insurance_mapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) NOT NULL,
  `insurance_item_code` varchar(255) COLLATE utf8_bin NOT NULL,
  `start_date_valid` date NOT NULL,
  `end_date_valid` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_insurance_mapping_drug_1` (`drug_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `insurance_type`
--

DROP TABLE IF EXISTS `insurance_type`;
CREATE TABLE IF NOT EXISTS `insurance_type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `percent_paid` int(11) NOT NULL,
  `note` longtext COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE IF NOT EXISTS `invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `patient_id` bigint(20) DEFAULT NULL,
  `responsible_user_id` bigint(20) NOT NULL,
  `prescription_id` bigint(20) DEFAULT '1',
  `created_date` datetime NOT NULL,
  `payment_date` datetime DEFAULT NULL,
  `total_amount_no_vat` bigint(20) NOT NULL,
  `total_amount_with_vat` bigint(20) NOT NULL,
  `insurrance_amount` bigint(20) NOT NULL,
  `status` varchar(64) COLLATE utf8_bin NOT NULL,
  `invoice_type` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bar_code` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `invoice_group` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `origin_invoice_id` bigint(20) DEFAULT NULL,
  `total_import_price` bigint(20) DEFAULT '0',
  `hospital_id` bigint(20) DEFAULT NULL,
  `reduced_amount` bigint(20) DEFAULT '0',
  `origin_amount` bigint(20) DEFAULT '0',
  `company_id` bigint(20) DEFAULT NULL,
  `dong_chi_tra` bigint(20) DEFAULT '0',
  `dong_chi_tra_am` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_invoice_user_table_1` (`responsible_user_id`),
  KEY `fk_invoice_prescription_1` (`prescription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item`
--

DROP TABLE IF EXISTS `invoice_item`;
CREATE TABLE IF NOT EXISTS `invoice_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint(20) NOT NULL,
  `diagnosis_service_id` bigint(20) DEFAULT NULL,
  `procedure_service_id` bigint(20) DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL,
  `number_of_items` int(11) NOT NULL,
  `amount_no_vat` bigint(20) NOT NULL,
  `amount_with_vat` bigint(20) NOT NULL,
  `input_stock_id` bigint(20) DEFAULT NULL,
  `invoice_item_type` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `drug_id` bigint(20) DEFAULT NULL,
  `amount_of_package` int(11) DEFAULT '0',
  `sale_uom` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `from_cabinet` tinyint(1) DEFAULT '0',
  `coupon_id` bigint(20) DEFAULT NULL,
  `phu_thu` bigint(20) DEFAULT '0',
  `bhyt` double NOT NULL,
  `dong_chi_tra` double NOT NULL,
  `tong_tien_bhyt` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_invoice_item_invoice_1` (`invoice_id`),
  KEY `fk_invoice_item_diagnosis_service_1` (`diagnosis_service_id`),
  KEY `fk_invoice_item_procedure_service_1` (`procedure_service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Triggers `invoice_item`
--
DROP TRIGGER IF EXISTS `tg_invoice_item_insert`;
DELIMITER $$
CREATE TRIGGER `tg_invoice_item_insert` BEFORE INSERT ON `invoice_item` FOR EACH ROW BEGIN
    SET NEW.dong_chi_tra = IFNULL(NEW.dong_chi_tra, 0);
	SET NEW.bhyt = IFNULL(NEW.bhyt, 0);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
CREATE TABLE IF NOT EXISTS `journal` (
  `id` bigint(20) NOT NULL,
  `created_date` date DEFAULT NULL,
  `account_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_code_id` bigint(20) DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  `billing_id` bigint(20) DEFAULT NULL,
  `has_accounted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_journal_accountCode` (`account_code_id`),
  KEY `fk_journal_payment` (`payment_id`),
  KEY `fk_journal_billing` (`billing_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ledger`
--

DROP TABLE IF EXISTS `ledger`;
CREATE TABLE IF NOT EXISTS `ledger` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `account_code_id` bigint(20) DEFAULT NULL,
  `accounted_amount` bigint(20) DEFAULT NULL,
  `has_validated` tinyint(1) DEFAULT NULL,
  `validated_by` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ledger_accountCode` (`account_code_id`),
  KEY `fk_ledger_validateBy` (`validated_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_plan`
--

DROP TABLE IF EXISTS `maintenance_plan`;
CREATE TABLE IF NOT EXISTS `maintenance_plan` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `device_id` bigint(20) NOT NULL,
  `created_date` date NOT NULL,
  `plan_date` date NOT NULL,
  `status` enum('OPEN','DONE','CANCELLED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `note` longtext COLLATE utf8_bin,
  PRIMARY KEY (`id`),
  KEY `fk_maintenance_plan_device_1` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `minus_salary`
--

DROP TABLE IF EXISTS `minus_salary`;
CREATE TABLE IF NOT EXISTS `minus_salary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_salary_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `amount` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_minus_salary_user_salary` (`user_salary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `month_revenue`
--

DROP TABLE IF EXISTS `month_revenue`;
CREATE TABLE IF NOT EXISTS `month_revenue` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hospital_id` bigint(20) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `revenue` bigint(20) NOT NULL,
  `profit` bigint(20) NOT NULL,
  `status` enum('OPEN','VALIDATED') COLLATE utf8_bin NOT NULL,
  `validated_by` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_month_revenue_user_table_1` (`validated_by`),
  KEY `fk_month_revenue_hospital_1` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `move_store_form`
--

DROP TABLE IF EXISTS `move_store_form`;
CREATE TABLE IF NOT EXISTS `move_store_form` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `from_drug_store_id` bigint(20) NOT NULL,
  `to_drug_store_id` bigint(20) NOT NULL,
  `transfer_date` date NOT NULL,
  `created_user` bigint(20) NOT NULL,
  `validated_user` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','OUTPUT','LOST','DONE','CANCELLED') NOT NULL DEFAULT 'OPEN',
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_move_store_form_drug_store_1` (`from_drug_store_id`),
  KEY `fk_move_store_form_drug_store_2` (`to_drug_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_token`
--

DROP TABLE IF EXISTS `oauth_access_token`;
CREATE TABLE IF NOT EXISTS `oauth_access_token` (
  `authentication_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` blob,
  `user_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `authentication` blob,
  `refresh_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`authentication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_token`
--

DROP TABLE IF EXISTS `oauth_refresh_token`;
CREATE TABLE IF NOT EXISTS `oauth_refresh_token` (
  `token_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` blob,
  `authentication` blob,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `output_cabinet`
--

DROP TABLE IF EXISTS `output_cabinet`;
CREATE TABLE IF NOT EXISTS `output_cabinet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) NOT NULL,
  `drug_cabinet_id` bigint(20) NOT NULL,
  `output_date` date DEFAULT NULL,
  `out_amount` int(11) DEFAULT NULL,
  `prescription_id` bigint(20) DEFAULT NULL,
  `status_payment` enum('OPEN','DONE','CANCELLED') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'OPEN',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `output_form`
--

DROP TABLE IF EXISTS `output_form`;
CREATE TABLE IF NOT EXISTS `output_form` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_store_id` bigint(20) NOT NULL,
  `output_date` date NOT NULL,
  `created_user` bigint(20) NOT NULL,
  `validated_user` bigint(20) DEFAULT NULL,
  `status` enum('OPEN','DONE','CANCELLED') COLLATE utf8_bin NOT NULL,
  `move_store_form_id` bigint(20) DEFAULT NULL,
  `to_drug_store_id` bigint(20) DEFAULT NULL,
  `output_form_type` enum('REFUND_COMPANY','DAMAGE_DRUG','TRANSFER_STOCK','LOST') COLLATE utf8_bin DEFAULT NULL,
  `supplier_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_output_form_drug_store_1` (`drug_store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `output_stock`
--

DROP TABLE IF EXISTS `output_stock`;
CREATE TABLE IF NOT EXISTS `output_stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `output_date` date DEFAULT NULL,
  `out_amount` int(11) DEFAULT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `output_form_id` bigint(20) DEFAULT NULL,
  `produced_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `batch_barcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sale_price` bigint(20) DEFAULT NULL,
  `import_price` bigint(20) DEFAULT NULL,
  `input_stock_id` bigint(20) DEFAULT NULL,
  `before_stock` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_output_stock_drug` (`drug_id`),
  KEY `fk_output_stock_drug_store_1` (`drug_store_id`),
  KEY `FK_output_stock_queue_number` (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
CREATE TABLE IF NOT EXISTS `package` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `price_package` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `package_item`
--

DROP TABLE IF EXISTS `package_item`;
CREATE TABLE IF NOT EXISTS `package_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `package_id` bigint(20) DEFAULT NULL,
  `diagnosis_service_id` bigint(20) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
CREATE TABLE IF NOT EXISTS `patient` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `nation` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `insurance_type_id` bigint(20) DEFAULT NULL,
  `customer_level` enum('BASIC','GOLD') COLLATE utf8_bin DEFAULT 'BASIC',
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `patient_booking_group`
--

DROP TABLE IF EXISTS `patient_booking_group`;
CREATE TABLE IF NOT EXISTS `patient_booking_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `patient_id` bigint(20) NOT NULL,
  `booking_group_id` bigint(20) NOT NULL,
  `status` enum('OPEN','BOOKED','DONE','CANCELLED') COLLATE utf8_bin NOT NULL,
  `note` longtext COLLATE utf8_bin,
  `package_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_PatientBookingGroup_BookingGroup_1` (`booking_group_id`),
  KEY `fk_PatientBookingGroup_patient_1` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `patient_by_account`
--

DROP TABLE IF EXISTS `patient_by_account`;
CREATE TABLE IF NOT EXISTS `patient_by_account` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_account_patient` bigint(20) NOT NULL,
  `id_patient` bigint(20) NOT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `patient_code_sequence`
--

DROP TABLE IF EXISTS `patient_code_sequence`;
CREATE TABLE IF NOT EXISTS `patient_code_sequence` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` date NOT NULL,
  `next_number` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `has_accounted` tinyint(1) DEFAULT NULL,
  `payper` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `note` varchar(5120) COLLATE utf8_bin DEFAULT NULL,
  `reduced_amount` bigint(20) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_payment_invoice_1` (`invoice_id`),
  KEY `fk_payment_patient_1` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
CREATE TABLE IF NOT EXISTS `prescription` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint(20) DEFAULT NULL,
  `patient_id` bigint(20) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `cls` longtext COLLATE utf8_bin,
  `analysis` longtext COLLATE utf8_bin,
  `hospital_id` bigint(20) DEFAULT NULL,
  `arrive_time` datetime DEFAULT NULL,
  `examine_time` datetime DEFAULT NULL,
  `finish_time` datetime DEFAULT NULL,
  `icd_id` bigint(20) DEFAULT NULL,
  `sub_icd_id` bigint(20) DEFAULT NULL,
  `number_day_off` int(11) DEFAULT NULL,
  `from_day_off` date DEFAULT NULL,
  `mach` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `nhip_tho` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `nhiet_do` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `huyet_ap` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `height` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `weight` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `status` enum('OPEN','IN_PROGRESS','DONE','CANCELLED') COLLATE utf8_bin NOT NULL DEFAULT 'OPEN',
  `solution` enum('CapToa','DieuTriNgoaiTru','CapToaHenTaiKham','ChuyenVien','Khac','KhongToa','BanThuocLe') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'CapToa',
  `queue_number_id` bigint(20) DEFAULT NULL,
  `insurance_type_id` bigint(20) DEFAULT NULL,
  `prescription_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'PRESCRIPTIONITEM',
  `package_id` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_bin,
  `day_back` date DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `summary1` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `summary2` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `summary3` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `summary4` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `summary0` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `bhyt_prescription_id` bigint(20) DEFAULT NULL,
  `day_prescription` int(3) DEFAULT '1',
  `bhyt_done_time` datetime DEFAULT NULL,
  `has_uploaded_XML` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_prescription_patient_1` (`patient_id`),
  KEY `fk_prescription_department_1` (`department_id`),
  KEY `fk_prescription_icd_1` (`icd_id`),
  KEY `fk_prescription_icd_2` (`sub_icd_id`),
  KEY `queue_number_id` (`queue_number_id`),
  KEY `FK_prescription_insurance_type` (`insurance_type_id`),
  KEY `prescription_hospital` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `prescription_form`
--

DROP TABLE IF EXISTS `prescription_form`;
CREATE TABLE IF NOT EXISTS `prescription_form` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `prescription_id` bigint(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `created_user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `prescription_form_item`
--

DROP TABLE IF EXISTS `prescription_form_item`;
CREATE TABLE IF NOT EXISTS `prescription_form_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `prescription_form_id` bigint(20) NOT NULL,
  `item_key` varchar(255) NOT NULL,
  `item_value` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prescription_form_item_prescription_form_1` (`prescription_form_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `prescription_item`
--

DROP TABLE IF EXISTS `prescription_item`;
CREATE TABLE IF NOT EXISTS `prescription_item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `prescription_id` bigint(20) NOT NULL,
  `morning_amount` varchar(255) COLLATE utf8_bin DEFAULT '0',
  `noon_amount` varchar(255) COLLATE utf8_bin DEFAULT '0',
  `afternoon_amount` varchar(255) COLLATE utf8_bin DEFAULT '0',
  `evening_amount` varchar(255) COLLATE utf8_bin DEFAULT '0',
  `number_of_days` int(11) DEFAULT '0',
  `total_amount` int(11) NOT NULL DEFAULT '0',
  `instruction` longtext COLLATE utf8_bin,
  `supper_id` bigint(20) DEFAULT NULL,
  `input_stock_id` bigint(20) DEFAULT NULL,
  `drug_id` bigint(20) DEFAULT NULL,
  `invoice_item_type` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `sale_uom` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `note` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prescription_item_prescription_1` (`prescription_id`),
  KEY `fk_supper_id_prescription_item` (`supper_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permissions` longtext COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_config`
--

DROP TABLE IF EXISTS `user_config`;
CREATE TABLE IF NOT EXISTS `user_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `other_support_fee_note` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_config_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user_department`
--

DROP TABLE IF EXISTS `user_department`;
CREATE TABLE IF NOT EXISTS `user_department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_hd` (`user_id`),
  KEY `FK_user_department_department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userRole_user` (`user_id`),
  KEY `fk_userRole_role_table` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
CREATE TABLE IF NOT EXISTS `user_table` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `version` int(10) DEFAULT '0',
  `ma_chung_chi_hanh_nghe_bac_si` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_hospital` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
