SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file_upload
-- ----------------------------
CREATE TABLE `file_upload` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `crm_table_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `crm_link_id` bigint(20) DEFAULT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` bigint(20) DEFAULT NULL,
  `file_location` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `upload_by` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=812 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- ----------------------------
-- Table structure for user_table
-- ----------------------------
CREATE TABLE `user_table` (
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
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_hospital` (`hospital_id`),
  CONSTRAINT `fk_user_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for role
-- ----------------------------
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permissions` longtext COLLATE utf8_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userRole_user` (`user_id`),
  KEY `fk_userRole_role_table` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `drug_category` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
PRIMARY KEY (`id`) 
)
ENGINE = InnoDB
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `hospital` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
`code` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
PRIMARY KEY (`id`) 
)
ENGINE = InnoDB
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `department` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) NULL,
`description` longtext NULL,
`hospital_id` bigint(20) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_department_hospital_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`)
);

CREATE TABLE `drug` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
`guideline` varchar(1024) CHARACTER SET utf8 COLLATE utf8_bin NULL,
`uom` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
`sale_price` bigint(20) NULL DEFAULT NULL,
`import_price` bigint(20) NULL DEFAULT NULL,
`category_id` bigint(20) NULL DEFAULT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_medicine_drug_category_1` FOREIGN KEY (`category_id`) REFERENCES `drug_category` (`id`)
)
ENGINE = InnoDB
AVG_ROW_LENGTH = 0
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
KEY_BLOCK_SIZE = 0
MAX_ROWS = 0
MIN_ROWS = 0
ROW_FORMAT = Dynamic;

CREATE TABLE `patient` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`full_name` varchar(1024) NOT NULL,
`code` varchar(32) NOT NULL,
`gender` varchar(32) NULL,
`birthday` date NULL,
`phone` varchar(32) NULL,
`email` varchar(128) NULL,
`address` varchar(2048) NULL,
`father_name` varchar(1024) NULL,
`father_phone` varchar(32) NULL,
`mother_name` varchar(1024) NULL,
`mother_phone` varchar(32) NULL,
`note` longtext NULL,
`created_date` date NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `appointment` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`appoint_date` datetime NOT NULL,
`doctor_id` bigint(20) NULL,
`patient_id` bigint(20) NOT NULL,
`status` varchar(32) NOT NULL,
`hospital_id` bigint(20) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_Appointment_patient_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
CONSTRAINT `fk_Appointment_user_table1_1` FOREIGN KEY (`doctor_id`) REFERENCES `user_table` (`id`)
);

CREATE TABLE `diagnosis_report` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`report_type` varchar(32) NULL,
`diagnosis_service_id` bigint(20) NOT NULL,
`file_name` varchar(2048) NULL,
`prescription_id` bigint(20) NULL,
`description` longtext NULL,
`diagnosis_date` date NULL,
`laboratorist_id` bigint(20) NULL,
`hospital_id` bigint(20) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_diagnosis_report_prescription_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
);

CREATE TABLE `prescription` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`doctor_id` bigint(20) NULL,
`patient_id` bigint(20) NULL,
`department_id` bigint(20) NULL,
`created_date` datetime NULL,
`cls` longtext NULL,
`analysis` longtext NULL,
`hospital_id` bigint(20) NULL,
`arrive_time` datetime NULL,
`examine_time` datetime NULL,
`finish_time` datetime NULL,
`icd_id` bigint(20) NULL,
`sub_icd_id` bigint(20) NULL,
`solution` varchar(255) NULL,
`number_day_off` int(11) NULL,
`from_day_off` date NULL,
`mach` int(11) NULL,
`nhip_tho` int(11) NULL,
`nhiet_do` int(11) NULL,
`huyet_ap` varchar(255) NULL,
`height` int(11) NULL,
`weight` int(11) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_prescription_patient_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`),
CONSTRAINT `fk_prescription_department_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
CONSTRAINT `fk_prescription_icd_1` FOREIGN KEY (`icd_id`) REFERENCES `icd` (`id`),
CONSTRAINT `fk_prescription_icd_2` FOREIGN KEY (`sub_icd_id`) REFERENCES `icd` (`id`)
);

CREATE TABLE `dashboard_notification` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`from_date` date NULL,
`title` varchar(1024) NULL,
`description` longtext NULL,
`to_date` date NULL,
`hospital_id` bigint(20) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `shortcode` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`user_id` bigint(20) NULL,
`shortcode` varchar(16) NULL,
`replace_text` longtext NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `stock` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`drug_id` bigint(20) NULL,
`drug_store_id` bigint(20) NULL,
`available` int(11) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_stock_drug_1` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`id`),
CONSTRAINT `fk_stock_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`)
);

CREATE TABLE `drug_store` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) NULL,
`description` longtext NULL,
`hospital_id` bigint(20) NULL,
PRIMARY KEY (`id`), 
CONSTRAINT `fk_drug_store_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`)
);

CREATE TABLE `user_attendance` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`user_id` bigint(20) NOT NULL,
`date_to_work` date NOT NULL,
`work_hours` float NULL,
`month` int(11) NULL,
`year` int(11) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_user_attendance_user_table1_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
);

CREATE TABLE `user_salary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `month` int(11) DEFAULT '0',
  `year` int(11) DEFAULT '0',
  `gross_salary` bigint(20) DEFAULT '0',
  `inssurance` bigint(20) DEFAULT '0',
  `additional` bigint(20) DEFAULT '0',
  `penalty_fee` bigint(20) DEFAULT '0',
  `other_minus_fee` bigint(20) DEFAULT '0',
  `net_salary` double(20,2) DEFAULT '0',
  `income_tax` bigint(20) DEFAULT '0',
  `birthday_fee` bigint(20) DEFAULT '0',
  `holiday_fee` bigint(20) DEFAULT '0',
  `lunch_fee` bigint(20) DEFAULT '0',
  `diligence_fee` bigint(20) DEFAULT '0',
  `other_support_fee` bigint(20) DEFAULT '0',
  `total_time_attendance` float(11,0) DEFAULT '0',
  `note` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_salary_user_table1_1` (`user_id`) USING BTREE,
  CONSTRAINT `fk_user_salary_user_table1_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
);

CREATE TABLE `uom` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(64) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `icd_category` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`category_name` varchar(1024) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `icd` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`code` varchar(32) NOT NULL,
`name` varchar(1024) NOT NULL,
code_bhyt varchar(255),
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `transfer_hospital` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
`contact_email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
`contact_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
`address` varchar(2048) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
`note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `transfer_form` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`prescription_id` bigint(20) NOT NULL,
`transfer_hospital_id` bigint(20) NULL,
`created_by` bigint(20) NULL DEFAULT NULL,
`created_date` date NULL DEFAULT NULL,
`cls` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
`diagnosis_reports` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
`analysis` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
`therapy_note` longtext NULL,
`patient_status` longtext NULL,
`transfer_reason` varchar(1024) NULL,
`treatment_guide` longtext NULL,
`transfer_date` date NULL,
`transport_method` varchar(255) NULL,
`transport_person` varchar(255) NULL,
`should_review` tinyint(1) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_transfer_form_transfer_hospital_1` FOREIGN KEY (`transfer_hospital_id`) REFERENCES `transfer_hospital` (`id`),
CONSTRAINT `fk_transfer_from_prescription` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
);

CREATE TABLE `diagnosis_group` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `diagnosis_service` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) NOT NULL,
`description` longtext NULL,
`group_id` bigint(20) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_diagnosis_service_diagnosis_category_1` FOREIGN KEY (`group_id`) REFERENCES `diagnosis_group` (`id`)
);

CREATE TABLE `user_config` (
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
  `other_support_fee_note` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_config_user` (`user_id`),
  CONSTRAINT `fk_user_config_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
);

CREATE TABLE `user_department` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `department_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_hd` (`user_id`)
);

CREATE TABLE `cash_desk` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`cashier_id` bigint(20) NULL,
`open_time` datetime NULL ,
`initial_amount` bigint(20) NULL,
`close_time` datetime NULL,
`close_amount` bigint(20) NULL,
`is_balanced` tinyint(1) NULL,
`note` longtext NULL,
`sale_amount` bigint(20) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_cash_desk_user_table_1` FOREIGN KEY (`cashier_id`) REFERENCES `user_table` (`id`)
);

CREATE TABLE `cash_widrawal` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`cash_desk_id` bigint(20) NOT NULL,
`widrawal_amount` bigint(20) NOT NULL,
`widrawal_time` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`validate_user_id` bigint(20) NOT NULL,
`note` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_cash_widrawal_cash_desk_1` FOREIGN KEY (`cash_desk_id`) REFERENCES `cash_desk` (`id`),
CONSTRAINT `fk_cash_widrawal_user_table_1` FOREIGN KEY (`validate_user_id`) REFERENCES  `user_table` (`id`)
);

CREATE TABLE `insurance_type` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`code` varchar(255) NOT NULL,
`name` varchar(255) NOT NULL,
`percent_paid` int(11) NOT NULL,
`note` longtext NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `insurance_card` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`insurance_code` varchar(255) NOT NULL,
`patient_id` bigint(20) NOT NULL,
`from_date` date NOT NULL,
`to_date` date NOT NULL,
`type_id` bigint(20) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_insurance_card_insurance_type_1` FOREIGN KEY (`type_id`) REFERENCES `insurance_type` (`id`),
CONSTRAINT `fk_insurance_card_patient_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
);

CREATE TABLE `procedure_service` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`department_id` bigint(20) NOT NULL,
`code` varchar(255) NOT NULL,
`name` varchar(1024) NOT NULL,
`price` bigint(20) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_procedure_department_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

CREATE TABLE `procedure_report` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`procedure_service_id` bigint(20) NOT NULL,
`patient_id` bigint(20) NOT NULL,
`arrive_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
`start_time` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`done_time` datetime NULL ON UPDATE CURRENT_TIMESTAMP,
`note` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_procedure_report_procedure_service_1` FOREIGN KEY (`procedure_service_id`) REFERENCES `procedure_service` (`id`)
);

CREATE TABLE `procedure_member` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`procedure_report_id` bigint(20) NOT NULL,
`user_id` bigint(20) NOT NULL,
`role` varchar(64) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_procedure_member_procedure_report_1` FOREIGN KEY (`procedure_report_id`) REFERENCES `procedure_report` (`id`)
);

CREATE TABLE `invoice` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`patient_id` bigint(20),
`responsible_user_id` bigint(20) NOT NULL,
`cash_desk_id` bigint(20) NOT NULL,
`prescription_id` bigint(20) NULL,
`created_date` datetime NOT NULL,
`payment_date` datetime NULL,
`total_amount_no_vat` bigint(20) NOT NULL,
`total_amount_with_vat` bigint(20) NOT NULL,
`insurrance_amount` bigint(20) NOT NULL,
`status` varchar(64) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_invoice_cash_desk_1` FOREIGN KEY (`cash_desk_id`) REFERENCES `cash_desk` (`id`),
CONSTRAINT `fk_invoice_user_table_1` FOREIGN KEY (`responsible_user_id`) REFERENCES `user_table` (`id`),
CONSTRAINT `fk_invoice_prescription_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
);

CREATE TABLE `queue_table` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`department_id` bigint(20) NOT NULL,
`caller_id` bigint(20) NOT NULL,
`name` varchar(1024) NOT NULL,
`current_number` int(11) NOT NULL,
`next_number` int(11) NOT NULL,
`max_number` int(11) NOT NULL,
`created_date` date NOT NULL,
`status` varchar(64) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_queue_table_department_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
CONSTRAINT `fk_queue_table_user_table_1` FOREIGN KEY (`caller_id`) REFERENCES  `user_table` (`id`)
);

CREATE TABLE `queue_number` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`queue_id` bigint(20) NOT NULL,
`the_number` int(11) NOT NULL,
`patient_id` bigint(20) NULL,
`call_time` datetime NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_queue_number_queue_table_1` FOREIGN KEY (`queue_id`) REFERENCES `queue_table` (`id`),
CONSTRAINT `fk_queue_number_patient_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
);

CREATE TABLE payment (
id bigint(20) NOT NULL AUTO_INCREMENT,
cash_desk_id bigint(20) NOT NULL,
invoice_id bigint(20) NULL,
insurance_invoice_id bigint(20) NULL,
amount bigint(20) NOT NULL,
payment_method varchar(64) NOT NULL,
patient_id bigint(20) NULL,
insurance_company_id bigint(20) NULL,
payment_date datetime NULL,
created_date datetime NOT NULL,
status varchar(64) NOT NULL,
PRIMARY KEY (id) ,
CONSTRAINT fk_payment_invoice_1 FOREIGN KEY (invoice_id) REFERENCES invoice (id),
CONSTRAINT fk_payment_patient_1 FOREIGN KEY (patient_id) REFERENCES patient (id)
);

CREATE TABLE `prescription_item` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`prescription_id` bigint(20) NOT NULL,
`drug_id` bigint(20) NOT NULL,
`morning_amount` int(11) NULL,
`noon_amount` int(11) NULL,
`afternoon_amount` int(11) NULL,
`evening_amount` int(11) NULL,
`number_of_days` int(11) NULL,
`total_amount` int(11) NOT NULL,
`instruction` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_prescription_item_prescription_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`)
);

CREATE TABLE `invoice_item` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`invoice_id` bigint(20) NOT NULL,
`drug_id` bigint(20) NULL,
`diagnosis_service_id` bigint(20) NULL,
`procedure_service_id` bigint(20) NULL,
`prescription_id` bigint(20) NULL,
`number_of_items` int(11) NOT NULL,
`amount_no_vat` bigint(20) NOT NULL,
`amount_with_vat` bigint(20) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_invoice_item_invoice_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
CONSTRAINT `fk_invoice_item_diagnosis_service_1` FOREIGN KEY (`diagnosis_service_id`) REFERENCES `diagnosis_service` (`id`),
CONSTRAINT `fk_invoice_item_drug_1` FOREIGN KEY (`drug_id`) REFERENCES `timec`.`drug` (`id`),
CONSTRAINT `fk_invoice_item_procedure_service_1` FOREIGN KEY (`procedure_service_id`) REFERENCES `procedure_service` (`id`)
);

CREATE TABLE `insurance_mapping` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`drug_id` bigint(20) NOT NULL,
`insurance_item_code` varchar(255) NOT NULL,
`start_date_valid` date NOT NULL,
`end_date_valid` date NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_insurance_mapping_drug_1` FOREIGN KEY (`drug_id`) REFERENCES `timec`.`drug` (`id`)
);

CREATE TABLE `insurance_invoice` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`invoice_id` bigint(20) NOT NULL,
`responsible_user_id` bigint(20) NOT NULL,
`created_date` datetime NOT NULL,
`insurance_refund_date` datetime NULL,
`total_amount_no_vat` bigint(20) NOT NULL,
`total_amount_with_vat` bigint(20) NOT NULL,
`insurrance_amount` bigint(20) NOT NULL,
`status` varchar(64) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_insurance_invoice_invoice_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
);

CREATE TABLE `insurance_invoice_item` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`insurance_invoice_id` bigint(20) NOT NULL,
`insurance_mapping_id` bigint(20) NOT NULL,
`origin_amount` bigint(20) NOT NULL,
`insurance_percent` int(11) NOT NULL,
`insurance_amount` bigint(20) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_insurance_invoice_item_insurance_invoice_1` FOREIGN KEY (`insurance_mapping_id`) REFERENCES `insurance_invoice` (`id`),
CONSTRAINT `fk_insurance_invoice_item_insurance_mapping_1` FOREIGN KEY (`insurance_mapping_id`) REFERENCES `insurance_mapping` (`id`)
);

CREATE TABLE `supplier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` int(15) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `device` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `device_category` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `made_in` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `supplier_id` bigint(20) DEFAULT NULL,
  `user_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `maintenance_cycle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_device_supplier` (`supplier_id`),
  CONSTRAINT `fk_device_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `input_stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) DEFAULT NULL,
  `input_date` date DEFAULT NULL,
  `expired_date` date DEFAULT NULL,
  `input_amount` int(11) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_input_stock_drug` (`drug_id`),
  KEY `fk_input_stock_drug_store_1` (`drug_store_id`),
  CONSTRAINT `fk_input_stock_drug` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`id`),
  CONSTRAINT `fk_input_stock_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `output_stock` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `output_date` date DEFAULT NULL,
  `out_amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_output_stock_drug` (`drug_id`),
  KEY `fk_output_stock_drug_store_1` (`drug_store_id`),
  CONSTRAINT `fk_output_stock_drug` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`id`),
  CONSTRAINT `fk_output_stock_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `insurance_company`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(1024) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `note` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE `device_maintenance` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`device_id` bigint(20) NOT NULL,
`maintenance_date` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
`cost` bigint(20) NULL,
`note` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_device_maintenance_device_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`)
);

CREATE TABLE `maintenance_plan` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`device_id`  bigint NOT NULL,
`created_date` date NOT NULL,
`plan_date` date NOT NULL,
`status` enum('OPEN', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
`note` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_maintenance_plan_device_1` FOREIGN KEY (`device_id`) REFERENCES `device` (`id`)
);

CREATE TABLE `company` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(1024) NOT NULL,
`tax_code` varchar(255) NULL,
`address` longtext NULL,
`bank_account` longtext NULL,
`note` longtext NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `booking_group` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`company_id` bigint(20) NOT NULL,
`created_date` date NOT NULL,
`appointment_date` date NOT NULL,
`number_of_attendees` int(11) NULL,
`status` enum('OPEN', 'BOOKED', 'DONE', 'CANCELLED') NOT NULL,
`note` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_BookingGroup_company_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`)
);

CREATE TABLE `patient_booking_group` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`patient_id` bigint(20) NOT NULL,
`booking_group_id` bigint(20) NOT NULL,
`status` enum('OPEN', 'BOOKED', 'DONE', 'CANCELLED') NOT NULL,
`note` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_PatientBookingGroup_BookingGroup_1` FOREIGN KEY (`booking_group_id`) REFERENCES `booking_group` (`id`),
CONSTRAINT `fk_PatientBookingGroup_patient_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
);

ALTER TABLE queue_number  ADD `type` varchar (255) DEFAULT NULL;
ALTER TABLE queue_number  ADD `status` varchar (255) DEFAULT NULL;
ALTER TABLE queue_number  ADD `note` longtext  DEFAULT NULL;
ALTER table `diagnosis_service` add column `price` bigint(20);
ALTER table `procedure_report` add column `prescription_id` bigint(20)  NOT NULL;
Alter table `invoice` Modify `cash_desk_id` bigint(20) default null;
ALTER table `invoice` add column `invoice_type` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL;
ALTER table `cash_desk` add column `withdrawal_amount` bigint(20);

ALTER table `appointment` add column `prescription_id` bigint(20);
CREATE TABLE `prescription_review` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`reviewer_id` bigint(20) NOT NULL,
`prescription_id` bigint(20) NOT NULL,
`doctor_id` bigint(20) NOT NULL,
`score` int(11) NOT NULL DEFAULT 0,
`created_date` datetime NOT NULL,
`due_date` datetime DEFAULT NULL,
`finish_date` datetime DEFAULT NULL,
`note` longtext NULL,
`status` enum('OPEN', 'IN_PROGRESS', 'DONE') NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_prescription_review_prescription_1` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`),
CONSTRAINT `fk_review_reviewer_id_1` FOREIGN KEY (`reviewer_id`) REFERENCES `user_table` (`id`),
CONSTRAINT `fk_review_doctor_id_1` FOREIGN KEY (`doctor_id`) REFERENCES `user_table` (`id`)
);

alter table diagnosis_report add column `status` enum('OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN';
alter table prescription add column `status` enum('OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN';
alter table prescription add column `solution` enum('CapToa','DieuTriNgoaiTru','CapToaHenTaiKham','ChuyenVien','Khac','KhongToa') NOT NULL DEFAULT 'CapToa';
alter table queue_number add column `prescription_id` BIGINT(20) Null;

alter table prescription add column `queue_number_id` BIGINT(20) NOT NULL;
ALTER TABLE prescription ADD CONSTRAINT FK_prescription_queue_number FOREIGN KEY (queue_number_id) REFERENCES queue_number(id);
alter table payment add column `status` enum('OPEN', 'PAID', 'IN_PROGRESS', 'CANCELLED') NOT NULL DEFAULT 'OPEN';

alter table prescription add column `insurance_type_id` BIGINT(20) NULL default null;
ALTER TABLE prescription ADD CONSTRAINT FK_prescription_insurance_type FOREIGN KEY (insurance_type_id) REFERENCES insurance_type(id);
alter table output_stock add column `invoice_id` BIGINT(20) NULL default null;
ALTER TABLE output_stock ADD CONSTRAINT FK_output_stock_queue_number FOREIGN KEY (invoice_id) REFERENCES invoice(id);
alter table drug add column `ingredient` varchar(255) COLLATE utf8_bin DEFAULT NULL;
alter table procedure_report add column `hospital_id` bigint(20) NOT NULL;

CREATE TABLE `day_revenue` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`hospital_id` bigint(20) NOT NULL,
`apply_date` date NOT NULL,
`revenue_amount` bigint(20) NOT NULL,
`paid_amount` bigint(20) NOT NULL,
`total_amount` bigint(20) NOT NULL,
`sale_drug_amount` bigint(20) NOT NULL,
`sale_diagnosis_amount` bigint(20) NOT NULL,
`sale_procedure_amount` bigint(20) NOT NULL,
`sale_insurance_amount` bigint(20) NOT NULL,
`sale_other_amount` bigint(20) NOT NULL,
`buy_amount` bigint(20) NOT NULL,
`validated_by` bigint(20) NOT NULL,
`status` enum('OPEN', 'VALIDATED') NOT NULL DEFAULT 'OPEN',
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_day_revenue_user_table_1` FOREIGN KEY (`validated_by`) REFERENCES `user_table` (`id`),
CONSTRAINT `fk_day_revenue_hospital_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`)
);

CREATE TABLE `month_revenue` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`hospital_id` bigint(20) NOT NULL,
`month` int(11) NOT NULL,
`year` int(11) NOT NULL,
`revenue` bigint(20) NOT NULL,
`profit` bigint(20) NOT NULL,
`status` enum('OPEN', 'VALIDATED') NOT NULL,
`validated_by` bigint(20) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_month_revenue_user_table_1` FOREIGN KEY (`validated_by`) REFERENCES `user_table` (`id`),
CONSTRAINT `fk_month_revenue_hospital_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`)
);

-- add column drug_type to table drug and drug_category
ALTER TABLE drug ADD `drug_type` VARCHAR(20);
ALTER TABLE drug_category ADD `drug_type` VARCHAR(20);
ALTER TABLE invoice MODIFY COLUMN patient_id bigint(20) DEFAULT NULL;
alter table prescription MODIFY column `queue_number_id` BIGINT(20) DEFAULT NULL;
alter table prescription MODIFY column `solution` enum('CapToa','DieuTriNgoaiTru','CapToaHenTaiKham','ChuyenVien','Khac','KhongToa','BanThuocLe') NOT NULL DEFAULT 'CapToa';

ALTER TABLE drug ADD `bar_code` VARCHAR(20);
ALTER TABLE drug ADD `group` tinyint(1) NOT NULL DEFAULT '0';
ALTER TABLE drug ADD `prescription` tinyint(1) NOT NULL DEFAULT '0';

ALTER TABLE prescription_item ADD `supper_id`  bigint(20) ;
ALTER TABLE prescription_item
ADD CONSTRAINT fk_supper_id_prescription_item
FOREIGN KEY (supper_id) REFERENCES prescription_item(id);

ALTER TABLE drug DROP `group` ;
ALTER TABLE drug DROP `prescription` ;
ALTER TABLE drug ADD `has_group` tinyint(1) NOT NULL DEFAULT '0';
ALTER TABLE drug ADD `has_prescription` tinyint(1) NOT NULL DEFAULT '0';

ALTER TABLE stock ADD `warning_grey` int(11) NOT NULL DEFAULT '0';
ALTER TABLE stock ADD `warning_yellow` int(11) NOT NULL DEFAULT '0';
ALTER TABLE stock ADD `warning_red` int(11) NOT NULL DEFAULT '0';
ALTER TABLE appointment MODIFY column `status` VARCHAR(255) NOT NULL;

ALTER TABLE hospital ADD `has_active` tinyint(1) NOT NULL DEFAULT '0';
ALTER TABLE department ADD `has_active` tinyint(1) NOT NULL DEFAULT '0';

-- add all FK  01/12/2019

ALTER TABLE appointment ADD CONSTRAINT FK_appointment_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
ALTER TABLE appointment ADD CONSTRAINT FK_appointment_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id);
ALTER TABLE appointment ADD CONSTRAINT FK_appointment_prescription FOREIGN KEY (prescription_id) REFERENCES prescription(id);

ALTER TABLE booking_group ADD CONSTRAINT FK_booking_group_company FOREIGN KEY (company_id) REFERENCES company(id);

ALTER TABLE cash_desk MODIFY column `cashier_id` BIGINT(20) NOT NULL;
ALTER TABLE cash_desk ADD CONSTRAINT FK_cash_desk_user FOREIGN KEY (cashier_id) REFERENCES user_table(id);

ALTER TABLE cash_widrawal ADD CONSTRAINT FK_cash_widrawal_user FOREIGN KEY (cash_desk_id) REFERENCES user_table(id);

ALTER TABLE cash_widrawal ADD CONSTRAINT FK_cash_widrawal_user FOREIGN KEY (cash_desk_id) REFERENCES user_table(id);

ALTER TABLE dashboard_notification MODIFY column `hospital_id` BIGINT(20) NOT NULL;
ALTER TABLE dashboard_notification ADD CONSTRAINT FK_dashboard_notification_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id);

ALTER TABLE department MODIFY column `hospital_id` BIGINT(20) NOT NULL;
ALTER TABLE department ADD CONSTRAINT FK_department_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id);

ALTER TABLE device MODIFY column `supplier_id` BIGINT(20) NOT NULL;

ALTER TABLE device_maintenance ADD CONSTRAINT FK_device_maintenance_device FOREIGN KEY (device_id) REFERENCES device(id);

ALTER TABLE device_maintenance ADD CONSTRAINT FK_device_maintenance_device FOREIGN KEY (device_id) REFERENCES device(id);

ALTER TABLE diagnosis_report ADD CONSTRAINT FK_diagnosis_report_prescription FOREIGN KEY (prescription_id) REFERENCES prescription(id);
ALTER TABLE diagnosis_report ADD CONSTRAINT FK_diagnosis_report_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id);
ALTER TABLE diagnosis_report ADD CONSTRAINT FK_diagnosis_report_user_table FOREIGN KEY (laboratorist_id) REFERENCES user_table(id);

ALTER TABLE diagnosis_service ADD CONSTRAINT FK_diagnosis_service_diagnosis_group FOREIGN KEY (group_id) REFERENCES diagnosis_group(id);

ALTER TABLE drug_store ADD CONSTRAINT FK_drug_store_hospital FOREIGN KEY (hospital_id) REFERENCES hospital(id);

ALTER TABLE icd ADD CONSTRAINT FK_icd_icd_category FOREIGN KEY (category_id) REFERENCES icd_category(id);

ALTER TABLE input_stock MODIFY column `drug_id` BIGINT(20) NOT NULL;
ALTER TABLE input_stock MODIFY column `drug_store_id` BIGINT(20) NOT NULL;

ALTER TABLE insurance_card ADD CONSTRAINT FK_insurance_card_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
ALTER TABLE insurance_card ADD CONSTRAINT FK_insurance_card_insurance_type FOREIGN KEY (type_id) REFERENCES insurance_type(id);

ALTER TABLE insurance_card ADD CONSTRAINT FK_insurance_card_patient FOREIGN KEY (patient_id) REFERENCES patient(id);

ALTER TABLE insurance_company MODIFY column `address` VARCHAR(1024) NOT NULL;

ALTER TABLE insurance_invoice ADD CONSTRAINT FK_insurance_invoice_invoice FOREIGN KEY (invoice_id) REFERENCES invoice(id);
ALTER TABLE insurance_invoice ADD CONSTRAINT FK_insurance_invoice_user_table FOREIGN KEY (responsible_user_id) REFERENCES user_table(id);

ALTER TABLE insurance_invoice_item ADD CONSTRAINT FK_insurance_invoice_item_insurance_invoice FOREIGN KEY (insurance_invoice_id) REFERENCES insurance_invoice(id);
ALTER TABLE insurance_invoice_item ADD CONSTRAINT FK_insurance_invoice_item_insurance_mapping FOREIGN KEY (insurance_mapping_id) REFERENCES insurance_mapping(id);

ALTER TABLE insurance_mapping ADD CONSTRAINT FK_insurance_mapping_drug FOREIGN KEY (drug_id) REFERENCES drug(id);

ALTER TABLE invoice ADD CONSTRAINT FK_invoice_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
ALTER TABLE invoice ADD CONSTRAINT FK_invoice_user_table FOREIGN KEY (responsible_user_id) REFERENCES user_table(id);
ALTER TABLE invoice ADD CONSTRAINT FK_invoice_prescription FOREIGN KEY (prescription_id) REFERENCES prescription(id);

ALTER TABLE invoice_item ADD CONSTRAINT FK_invoice_item_invoice FOREIGN KEY (invoice_id) REFERENCES invoice(id);
ALTER TABLE invoice_item ADD CONSTRAINT FK_invoice_item_drug FOREIGN KEY (drug_id) REFERENCES drug(id);
ALTER TABLE invoice_item ADD CONSTRAINT FK_invoice_item_prescription FOREIGN KEY (prescription_id) REFERENCES prescription(id);
ALTER TABLE invoice_item ADD CONSTRAINT FK_invoice_item_diagnosis_service FOREIGN KEY (diagnosis_service_id) REFERENCES diagnosis_service(id);
ALTER TABLE invoice_item ADD CONSTRAINT FK_invoice_item_procedure_service FOREIGN KEY (procedure_service_id) REFERENCES procedure_service(id);

ALTER TABLE maintenance_plan ADD CONSTRAINT FK_maintenance_plan_device FOREIGN KEY (device_id) REFERENCES device(id);

ALTER TABLE output_stock MODIFY column `drug_id` BIGINT(20) NOT NULL;
ALTER TABLE output_stock MODIFY column `drug_store_id` BIGINT(20) NOT NULL;
ALTER TABLE output_stock MODIFY column `output_date` date NOT NULL;
ALTER TABLE output_stock MODIFY column `out_amount` INT(11) NOT NULL;

ALTER TABLE patient MODIFY column `address` VARCHAR(2048) NOT NULL

ALTER TABLE patient_booking_group ADD CONSTRAINT FK_patient_booking_group_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
ALTER TABLE patient_booking_group ADD CONSTRAINT FK_patient_booking_group_booking_group FOREIGN KEY (booking_group_id) REFERENCES booking_group(id);

ALTER TABLE payment ADD CONSTRAINT FK_payment_user_table FOREIGN KEY (cash_desk_id) REFERENCES user_table(id);
ALTER TABLE payment ADD CONSTRAINT FK_payment_user_invoice FOREIGN KEY (invoice_id) REFERENCES invoice(id);
ALTER TABLE payment ADD CONSTRAINT FK_payment_user_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
ALTER TABLE payment ADD CONSTRAINT FK_payment_user_insurance_company FOREIGN KEY (insurance_company_id) REFERENCES insurance_company(id);
ALTER TABLE payment ADD CONSTRAINT FK_payment_user_insurance_invoice FOREIGN KEY (insurance_invoice_id) REFERENCES insurance_invoice(id);

ALTER TABLE prescription ADD CONSTRAINT FK_prescription_user_table FOREIGN KEY (doctor_id) REFERENCES user_table(id);
ALTER TABLE prescription ADD CONSTRAINT FK_prescription_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
ALTER TABLE prescription ADD CONSTRAINT FK_prescription_department FOREIGN KEY (department_id) REFERENCES department(id);
ALTER TABLE prescription ADD CONSTRAINT FK_prescription_icd FOREIGN KEY (icd_id) REFERENCES icd(id);
ALTER TABLE prescription ADD CONSTRAINT FK_prescription_sub_icd FOREIGN KEY (sub_icd_id) REFERENCES icd(id);

ALTER TABLE prescription_item ADD CONSTRAINT FK_prescription_item_prescription FOREIGN KEY (prescription_id) REFERENCES prescription(id);
ALTER TABLE prescription_item ADD CONSTRAINT FK_prescription_item_drug FOREIGN KEY (drug_id) REFERENCES drug(id);

ALTER TABLE procedure_member ADD CONSTRAINT FK_procedure_member_procedure_report FOREIGN KEY (procedure_report_id) REFERENCES procedure_report(id);
ALTER TABLE procedure_member ADD CONSTRAINT FK_procedure_member_user_table FOREIGN KEY (user_id) REFERENCES user_table(id);

ALTER TABLE procedure_report ADD CONSTRAINT FK_procedure_report_procedure_service FOREIGN KEY (procedure_service_id) REFERENCES procedure_service(id);
ALTER TABLE procedure_report ADD CONSTRAINT FK_procedure_report_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
ALTER TABLE procedure_report ADD CONSTRAINT FK_procedure_report_prescription FOREIGN KEY (prescription_id) REFERENCES prescription(id);

ALTER TABLE procedure_service ADD CONSTRAINT FK_procedure_service_department FOREIGN KEY (department_id) REFERENCES department(id);

ALTER TABLE queue_number ADD CONSTRAINT FK_queue_number_department FOREIGN KEY (queue_id) REFERENCES queue_table(id);
ALTER TABLE queue_number ADD CONSTRAINT FK_queue_number_patient FOREIGN KEY (patient_id) REFERENCES patient(id);

ALTER TABLE queue_table ADD CONSTRAINT FK_queue_table_department FOREIGN KEY (department_id) REFERENCES department(id);
ALTER TABLE queue_table ADD CONSTRAINT FK_queue_table_user_table FOREIGN KEY (caller_id) REFERENCES user_table(id);

ALTER TABLE shortcode ADD CONSTRAINT FK_shortcode_user_table FOREIGN KEY (user_id) REFERENCES user_table(id);

ALTER TABLE stock ADD CONSTRAINT FK_stock_drug FOREIGN KEY (drug_id) REFERENCES drug(id);
ALTER TABLE stock ADD CONSTRAINT FK_stock_drug_store FOREIGN KEY (drug_store_id) REFERENCES drug_store(id);

ALTER TABLE supplier MODIFY column `name` VARCHAR(255) NOT NULL;
ALTER TABLE supplier MODIFY column `email` VARCHAR(255) NOT NULL;
ALTER TABLE supplier MODIFY column `phone` INT(15) NOT NULL;
ALTER TABLE supplier MODIFY column `address` VARCHAR(255) NOT NULL;

ALTER TABLE transfer_form ADD CONSTRAINT FK_transfer_form_prescription FOREIGN KEY (prescription_id) REFERENCES prescription(id);
ALTER TABLE transfer_form ADD CONSTRAINT FK_transfer_form_transfer_hospital FOREIGN KEY (transfer_hospital_id) REFERENCES transfer_hospital(id);
ALTER TABLE transfer_form ADD CONSTRAINT FK_transfer_form_user_table FOREIGN KEY (created_by) REFERENCES user_table(id);

ALTER TABLE user_attendance ADD CONSTRAINT FK_user_attendance_user_table FOREIGN KEY (user_id) REFERENCES user_table(id);

ALTER TABLE user_config ADD CONSTRAINT FK_user_config_user_table FOREIGN KEY (user_id) REFERENCES user_table(id);

ALTER TABLE user_salary ADD CONSTRAINT FK_user_salary_user_table FOREIGN KEY (user_id) REFERENCES user_table(id);


CREATE TABLE `input_form` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`drug_store_id` bigint(20) NOT NULL,
`input_date` date NOT NULL,
`created_user` bigint(20) NOT NULL,
`validated_user` bigint(20) NULL,
`status` enum('OPEN', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_input_form_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`)
);

ALTER TABLE input_stock ADD `input_form_id` bigint(20);
ALTER TABLE input_stock ADD `sale_price` bigint(20) NOT NULL;
ALTER TABLE input_stock ADD `import_price` bigint(20) NOT NULL;

CREATE TABLE `output_form` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`drug_store_id` bigint(20) NOT NULL,
`output_date` date NOT NULL,
`created_user` bigint(20) NOT NULL,
`validated_user` bigint(20) NULL,
`status` enum('OPEN', 'DONE', 'CANCELLED') NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_output_form_drug_store_1` FOREIGN KEY (`drug_store_id`) REFERENCES `drug_store` (`id`)
);

ALTER TABLE output_stock ADD `output_form_id` bigint(20);
ALTER TABLE output_stock ADD `sale_price` bigint(20) NOT NULL;
ALTER TABLE output_stock ADD `import_price` bigint(20) NOT NULL;

--  01/12/2019

ALTER TABLE input_stock ADD `remain_amount` int(11);
ALTER TABLE input_stock ADD `produced_date` date DEFAULT NULL;
ALTER TABLE input_stock ADD `batch_barcode` varchar(255) DEFAULT NULL;

ALTER TABLE output_stock ADD `produced_date` date DEFAULT NULL;
ALTER TABLE output_stock ADD `expired_date` date DEFAULT NULL;
ALTER TABLE output_stock ADD `batch_barcode` varchar(255) DEFAULT NULL;

-- 02/12/2019
ALTER TABLE invoice ADD `bar_code` VARCHAR(20);
ALTER TABLE prescription ADD `prescription_type` VARCHAR(20) ;

-- 04/12/2019
ALTER TABLE prescription DROP COLUMN prescription_type;
ALTER TABLE prescription ADD `prescription_type` VARCHAR(20) DEFAULT 'PRESCRIPTIONITEM';
UPDATE `prescription`
SET prescription_type = 'PRESCRIPTION'
WHERE patient_id >=1

CREATE TABLE `user_context` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`user_id` bigint(20) NULL,
`drug_store_id` bigint(20) NULL,
PRIMARY KEY (`id`) 
);

ALTER TABLE output_stock MODIFY `sale_price` bigint(20) NULL;
ALTER TABLE output_stock MODIFY `import_price` bigint(20) NULL;
-- 20/12/2019
ALTER TABLE day_revenue DROP paid_amount;
-- 22/12/2019
ALTER TABLE user_department ADD CONSTRAINT FK_user_department_user_table FOREIGN KEY (user_id) REFERENCES user_table(id);
ALTER TABLE user_department ADD CONSTRAINT FK_user_department_department FOREIGN KEY (department_id) REFERENCES department(id);


-- 29/12/2019
ALTER table `invoice` add column `invoice_group` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci;
ALTER TABLE invoice ADD `origin_invoice_id` bigint(20);

-- 30/12/2019
CREATE TABLE `add_salary` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`user_salary_id` bigint(20) NOT NULL,
`name` VARCHAR(255) NOT NULL,
`amount` BIGINT(20) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_add_salary_user_salary` FOREIGN KEY (`user_salary_id`) REFERENCES `user_salary` (`id`)
);

CREATE TABLE `minus_salary` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`user_salary_id` bigint(20) NOT NULL,
`name` VARCHAR(255) NOT NULL,
`amount` BIGINT(20) NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_minus_salary_user_salary` FOREIGN KEY (`user_salary_id`) REFERENCES `user_salary` (`id`)
);

-- 07/01/2020

ALTER TABLE transfer_form
ADD bar_code varchar(32) null;

ALTER TABLE patient
MODIFY code varchar(32) null;

CREATE TABLE `help_ticket` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`reporter_id` bigint(20) NOT NULL,
`question` longtext NOT NULL,
`assignee_id` bigint(20) NULL,
`status` enum('OPEN', 'PLANNED', 'QA', 'DONE') NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `help_comment` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`help_ticket_id` bigint(20) NOT NULL,
`created_by` bigint(20) NOT NULL,
`content` longtext NOT NULL,
`attached_files` longtext NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_help_comment_help_ticket_1` FOREIGN KEY (`help_ticket_id`) REFERENCES `help_ticket` (`id`)
);

ALTER TABLE help_ticket ADD CONSTRAINT FK_reporter_help_ticket_user FOREIGN KEY (reporter_id) REFERENCES user_table(id);
ALTER TABLE help_ticket ADD CONSTRAINT FK_assignee__help_ticket_user FOREIGN KEY (assignee_id) REFERENCES user_table(id);
ALTER TABLE help_comment ADD CONSTRAINT FK_help_comment_user_table FOREIGN KEY (created_by) REFERENCES user_table(id);

ALTER TABLE drug
ADD place_code varchar(255) null;

ALTER TABLE prescription_item ADD input_stock_id bigint(20) null;
update prescription_item pi set pi.input_stock_id = 
                   (select max(input.id) from input_stock input where input.drug_id = pi.drug_id); 
ALTER TABLE prescription_item DROP drug_id;
                   
ALTER TABLE invoice_item ADD input_stock_id bigint(20) null;
update invoice_item pi set pi.input_stock_id = 
                   (select max(input.id) from input_stock input where input.drug_id = pi.drug_id); 
ALTER TABLE invoice_item DROP drug_id;

ALTER TABLE prescription_item ADD `drug_id` bigint(20) null;
update prescription_item pi set pi.drug_id = 
                   (select max(input.drug_id) from input_stock input where input.id = pi.input_stock_id); 
                  --  15 - 01 -2020
ALTER TABLE `day_revenue` ADD `note` LONGTEXT COLLATE utf8_unicode_ci;
ALTER TABLE supplier ADD `has_sell_drug` tinyint(1) null;

ALTER table `help_ticket` MODIFY column `question` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci;
ALTER table `help_comment` MODIFY column `content` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci;

ALTER TABLE drug ADD `supplier_drug_id` bigint(20);

10/2/2020
ALTER TABLE queue_number ADD `reason_for_receiving` varchar(255) NULL;
ALTER TABLE queue_number ADD `form_arrived` varchar(255) NULL;

12/02/2020
ALTER TABLE patient ADD nation varchar(20) DEFAULT NULL;

ALTER TABLE payment ADD `has_accounted` tinyint(1) DEFAULT NULL;

-- 15.03.2020
CREATE TABLE `config_table` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`config_code` varchar(255) NOT NULL,
`config_value` bigint(20) NOT NULL,
`updated_by` bigint(20),
`description` longtext NOT NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_config_table_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user_table` (`id`)
);
-- procedure_service_id bao gom dich vu Kham benh, dich vu boc thuoc theo lieu, cac dich vu phat sinh
-- invoice_item chua tat ca cac loai dich vu, thuoc, vat tu y te co the quy thanh chi phi benh nhan
-- DRUG_ITEM, DIAGNOSIS_SERVICE_ITEM, PROCEDURE_SERVICE_ITEM, KHAM_BENH_ITEM, DRUG_GROUP, IN_GROUP_ITEM
ALTER TABLE invoice_item ADD `invoice_item_type` varchar(255) DEFAULT NULL;
update invoice_item set invoice_item_type = 'DRUG_ITEM';

ALTER TABLE invoice_item ADD `drug_id` bigint(20) DEFAULT NULL;
update invoice_item item set item.drug_id = (select istock.drug_id from input_stock istock where istock.id = item.input_stock_id ) where item.invoice_item_type in ('DRUG_ITEM', 'IN_GROUP_ITEM');

ALTER TABLE prescription_item ADD `invoice_item_type` varchar(255) DEFAULT NULL;
update prescription_item set invoice_item_type = 'DRUG_ITEM';

CREATE TABLE `package` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NULL,
`price_package` varchar(255) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `package_item` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NULL,
`package_id` bigint(20) NULL,
`diagnosis_service_id` bigint(20) NULL,
`price` varchar(255) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `coupon` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`discount_percent` bigint(20) NULL,
`valid_from` date NULL,
`valid_to` date NULL,
PRIMARY KEY (`id`) 
);
ALTER TABLE coupon ADD `code` VARCHAR(20) null;
ALTER TABLE queue_number add package_id bigint(20) null;
ALTER TABLE queue_number add coupon_id bigint(20) null;
ALTER TABLE prescription add package_id bigint(20) null;

ALTER TABLE package add code varchar(255) null; 

ALTER TABLE input_form add invoice_amount_supplier bigint(20) default 0; 
ALTER TABLE input_form add reduced_amount_supplier bigint(20) default 0; 
ALTER TABLE input_form add `note` longtext COLLATE utf8_unicode_ci; 

---- Update 13.05

CREATE TABLE prescription_form (
id bigint(20) NOT NULL AUTO_INCREMENT,
prescription_id bigint(20) NOT NULL,
created_date datetime NOT NULL ,
created_user_id bigint(20) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE prescription_form_item (
id bigint(20) NOT NULL AUTO_INCREMENT,
prescription_form_id bigint(20) NOT NULL,
item_key varchar(255) NOT NULL,
item_value varchar(2048) NULL,
PRIMARY KEY (id) ,
CONSTRAINT fk_prescription_form_item_prescription_form_1 FOREIGN KEY (prescription_form_id) REFERENCES prescription_form (id)
);

CREATE TABLE pre_template (
id bigint(20) NOT NULL AUTO_INCREMENT,
name varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
department_id bigint(20) NULL,
PRIMARY KEY (id)
);

CREATE TABLE `pre_template_field` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`item_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
`field_type` enum('TEXT', 'CHECK_LIST', 'COMBO_BOX', 'MULTI_SELECTBOX') NOT NULL DEFAULT 'TEXT',
`suggested_list` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin NULL,
`ranking` int(11) NOT NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE pre_template_item (
id bigint(20) NOT NULL AUTO_INCREMENT,
pre_template_id bigint(20) NOT NULL,
pre_template_field_id bigint(20) NOT NULL,
PRIMARY KEY (id) ,
CONSTRAINT fk_pre_template_item_pre_template_1 FOREIGN KEY (pre_template_id) REFERENCES pre_template (id),
CONSTRAINT fk_pre_template_item_pre_template_field_1 FOREIGN KEY (pre_template_field_id) REFERENCES pre_template_field (id)
);

ALTER TABLE drug add `package_uom` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin; 
ALTER TABLE drug add number_of_package_items int(11) default 1; 
ALTER TABLE drug add package_sale_price bigint(20) default 0;

ALTER TABLE prescription_item add `sale_uom` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin;
update prescription_item item INNER JOIN drug d 
   ON item.drug_id = d.id
SET item.sale_uom = d.uom 
WHERE item.drug_id is not null;

ALTER TABLE invoice_item add amount_of_package int(11) default 0;
ALTER TABLE invoice_item add `sale_uom` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin;
UPDATE invoice_item item INNER JOIN drug d 
   ON item.drug_id = d.id
SET item.sale_uom = d.uom 
WHERE item.drug_id IS NOT NULL;

ALTER TABLE stock ADD CONSTRAINT FK_stock_drug_id FOREIGN KEY (drug_id) REFERENCES drug(id);

--- 23-06-2020
ALTER TABLE invoice ADD COLUMN total_import_price bigint(20) DEFAULT '0';
ALTER TABLE day_revenue MODIFY COLUMN `validated_by` bigint(20) DEFAULT NULL;
UPDATE input_stock SET remain_amount = input_amount;
ALTER TABLE invoice DROP COLUMN cash_desk_id;

-- 03-07
CREATE TABLE `oauth_access_token` (
  `authentication_id` varchar(255) NOT NULL,
  `token_id` varchar(255) DEFAULT NULL,
  `token` BLOB DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `authentication` BLOB  DEFAULT NULL,
  `refresh_token` varchar(255)  DEFAULT NULL,  
  PRIMARY KEY (`authentication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `oauth_refresh_token` (
  `token_id` varchar(255) NOT NULL,
  `token` BLOB DEFAULT NULL,
  `authentication` BLOB  DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--- 06-07-2020
ALTER TABLE prescription_item ADD COLUMN note VARCHAR(255);
ALTER TABLE department ADD COLUMN department_code VARCHAR(50);
ALTER TABLE prescription ADD COLUMN note VARCHAR(255);
ALTER TABLE prescription ADD COLUMN day_back datetime;
ALTER TABLE day_revenue ADD COLUMN sale_prescription_amount bigint(20);
UPDATE drug d SET d.import_price = 
(SELECT MAX(import_price) FROM input_stock input WHERE input.drug_id = d.id 
	AND input.input_form_id IN (SELECT id FROM input_form WHERE STATUS = 'DONE')
);
UPDATE drug SET sale_price = (import_price * 1.3) WHERE sale_price IS NULL;

CREATE TABLE `device_input_form` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`input_date` date NOT NULL,
`supplier_id` bigint(20) DEFAULT NULL,
`invoice_amount_supplier` bigint(20) default 0,
`note` longtext COLLATE utf8_unicode_ci,
`created_user` bigint(20) NOT NULL,
`validated_user` bigint(20) NULL,
`status` enum('OPEN', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
PRIMARY KEY (`id`),
KEY `fk_device_input_form_supplier` (`supplier_id`),
CONSTRAINT `fk_device_input_form_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
);

ALTER TABLE device ADD COLUMN device_input_form_id bigint(20);
-- ALTER TABLE device ADD CONSTRAINT FK_de_input_form_id FOREIGN KEY (device_input_form_id) REFERENCES device_input_form(id);

CREATE TABLE `drug_cabinet` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(2048) NULL,
`department_id` bigint(20) DEFAULT NULL,
`description` longtext COLLATE utf8_unicode_ci,
PRIMARY KEY (`id`),
KEY `fk_drug_cabinet_department` (`department_id`),
CONSTRAINT `fk_drug_cabinet_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

CREATE TABLE `stock_cabinet` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`drug_id` bigint(20) NULL,
`drug_cabinet_id` bigint(20) NULL,
`available` int(11) NULL,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_stock_cabinet_drug_1` FOREIGN KEY (`drug_id`) REFERENCES `drug` (`id`),
CONSTRAINT `fk_stock_drug_cabinet_1` FOREIGN KEY (`drug_cabinet_id`) REFERENCES `drug_cabinet` (`id`)
);


CREATE TABLE `input_cabinet_form` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`drug_cabinet_id` bigint(20) NOT NULL,
`input_date` date NOT NULL,
`created_user` bigint(20) NOT NULL,
`validated_user` bigint(20) NULL,
`status` enum('OPEN', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_input_form_drug_cabinet_1` FOREIGN KEY (`drug_cabinet_id`) REFERENCES `drug_cabinet` (`id`)
);


CREATE TABLE `input_cabinet` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `drug_id` BIGINT(20) DEFAULT NULL,
  `input_date` DATE DEFAULT NULL,
  `input_amount` INT(11) DEFAULT NULL,
  `drug_cabinet_id` BIGINT(20) DEFAULT NULL,
  `input_cabinet_form_id` BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `output_cabinet` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `drug_id` BIGINT(20) NOT NULL,
  `drug_cabinet_id` BIGINT(20) NOT NULL,
  `output_date` DATE DEFAULT NULL,
  `out_amount` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE drug_cabinet ADD COLUMN `user_id` bigint(20);
ALTER TABLE output_cabinet ADD COLUMN `prescription_id` bigint(20);
ALTER TABLE output_cabinet ADD COLUMN `status_payment` enum('OPEN', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN';
ALTER TABLE invoice_item ADD COLUMN `from_cabinet` TINYINT(1) DEFAULT 0;

CREATE TABLE `user_patient` (
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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE booking_group add COLUMN package_id BIGINT(20);
ALTER TABLE patient_booking_group add COLUMN package_id BIGINT(20);
-- 22/07/2020
CREATE TABLE `diagnosis_result_item`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `diagnoosis_report_id` bigint(20) NULL DEFAULT NULL,
  `ket_qua` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `don_vi` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `csbt` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `bat_thuong` tinyint(1) NULL DEFAULT 0,
  `thoi_gian_tra_ket_qua` date NULL DEFAULT NULL,
  `sid` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
); 
ALTER TABLE diagnosis_result_item MODIFY COLUMN thoi_gian_tra_ket_qua datetime ;

-- 27/07/2020
ALTER TABLE icd add COLUMN code_bhyt varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci;
ALTER TABLE icd drop COLUMN category_id;
DROP TABLE icd_category;

ALTER TABLE diagnosis_result_item ADD COLUMN ma_dich_vu_LIS VARCHAR(255) DEFAULT NULL;
ALTER TABLE diagnosis_result_item ADD COLUMN ten_dich_vu_LIS VARCHAR(255) DEFAULT NULL;

-- 28/07/2020
ALTER TABLE invoice_item ADD COLUMN coupon_id BIGINT(20) DEFAULT NULL;

-- 29/07/2020
ALTER TABLE patient ADD COLUMN insurance_type_id BIGINT(20) DEFAULT NULL;
ALTER TABLE patient ADD COLUMN customer_level  enum('BASIC', 'GOLD') NOT NULL DEFAULT 'BASIC';

ALTER TABLE invoice add COLUMN hospital_id BIGINT(20);
UPDATE invoice iv SET hospital_id = (SELECT hospital_id FROM prescription WHERE id = iv.prescription_id);

-- 08/08/2020
ALTER TABLE input_form ADD COLUMN has_cancellable TINYINT(1) DEFAULT 1;
update input_form iform set iform.has_cancellable = 0 
 where exists (select * from input_stock ist where ist.input_form_id = iform.id and ist.remain_amount < ist.input_amount );

CREATE TABLE `move_store_form` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`from_drug_store_id` bigint(20) NOT NULL,
`to_drug_store_id` bigint(20) NOT NULL,
`transfer_date` date NOT NULL,
`created_user` bigint(20) NOT NULL,
`validated_user` bigint(20) NULL,
`status` enum('OPEN', 'OUTPUT', 'LOST', 'DONE', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
`note` longtext COLLATE utf8_unicode_ci,
PRIMARY KEY (`id`) ,
CONSTRAINT `fk_move_store_form_drug_store_1` FOREIGN KEY (`from_drug_store_id`) REFERENCES `drug_store` (`id`),
CONSTRAINT `fk_move_store_form_drug_store_2` FOREIGN KEY (`to_drug_store_id`) REFERENCES `drug_store` (`id`)
);

ALTER TABLE input_form ADD COLUMN move_store_form_id bigint(20) DEFAULT NULL;
ALTER TABLE output_form ADD COLUMN move_store_form_id bigint(20) DEFAULT NULL;

ALTER table patient MODIFY COLUMN customer_level enum('BASIC', 'GOLD') DEFAULT 'BASIC';

alter table hospital add column `address` longtext COLLATE utf8_unicode_ci;

ALTER table diagnosis_report MODIFY COLUMN `diagnosis_date` date DEFAULT NULL;

-- 05-09-2020
ALTER TABLE invoice ADD reduced_amount BIGINT(20) DEFAULT 0;
ALTER TABLE invoice ADD origin_amount BIGINT(20) DEFAULT 0;
ALTER TABLE invoice ADD company_id BIGINT(20) DEFAULT NULL;
ALTER TABLE payment ADD payper VARCHAR(255) DEFAULT NULL;
ALTER TABLE payment ADD note VARCHAR(255) DEFAULT NULL;
ALTER TABLE payment ADD reduced_amount BIGINT(20) DEFAULT 0;

ALTER table prescription MODIFY COLUMN `day_back` date DEFAULT NULL;

ALTER TABLE prescription_item MODIFY COLUMN `morning_amount` VARCHAR(255) DEFAULT '0';
ALTER TABLE prescription_item MODIFY COLUMN `noon_amount` VARCHAR(255) DEFAULT '0';
ALTER TABLE prescription_item MODIFY COLUMN `afternoon_amount` VARCHAR(255) DEFAULT '0';
ALTER TABLE prescription_item MODIFY COLUMN `evening_amount` VARCHAR(255) DEFAULT '0';

-- 11/09/2020
ALTER TABLE diagnosis_report ADD diagnose longtext COLLATE utf8_unicode_ci;

CREATE TABLE `patient_code_sequence` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`created_date` date NOT NULL,
`next_number` int(11) NOT NULL,
PRIMARY KEY (`id`) 
);

-- 17-09-2020
ALTER TABLE prescription ADD COLUMN drug_store_id bigint(20) DEFAULT NULL;
update prescription set drug_store_id = 3 where prescription_type = 'PRESCRIPTIONITEM';
update prescription set drug_store_id = 3 where prescription_type = 'PRESCRIPTION';
update prescription set drug_store_id = 3 where prescription_type = 'PRESCRIPTIONCOMPANY';

ALTER TABLE prescription MODIFY COLUMN `mach` VARCHAR(255) DEFAULT NULL;
ALTER TABLE prescription MODIFY COLUMN `nhip_tho` VARCHAR(255) DEFAULT NULL;
ALTER TABLE prescription MODIFY COLUMN `nhiet_do` VARCHAR(255) DEFAULT NULL;
ALTER TABLE prescription MODIFY COLUMN `huyet_ap` VARCHAR(255) DEFAULT NULL;
ALTER TABLE prescription MODIFY COLUMN `height` VARCHAR(255) DEFAULT NULL;
ALTER TABLE prescription MODIFY COLUMN `weight` VARCHAR(255) DEFAULT NULL;

-- 21-09-2020
ALTER TABLE diagnosis_report ADD COLUMN quantity int(11) NOT NULL DEFAULT 1;

-- 30-09-2020
ALTER TABLE prescription ADD COLUMN `summary1` longtext COLLATE utf8_unicode_ci;
ALTER TABLE prescription ADD COLUMN `summary2` longtext COLLATE utf8_unicode_ci;
ALTER TABLE prescription ADD COLUMN `summary3` longtext COLLATE utf8_unicode_ci;
ALTER TABLE prescription ADD COLUMN `summary4` longtext COLLATE utf8_unicode_ci;

-- 05-10-2020
ALTER TABLE prescription ADD COLUMN `summary0` longtext COLLATE utf8_unicode_ci;

update input_stock set remain_amount = input_amount WHERE remain_amount IS NULL;
UPDATE input_form SET has_cancellable = 1 WHERE has_cancellable IS NULL;

-- 19-10-2020
CREATE TABLE `stock_movement` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_id` bigint(20) DEFAULT NULL,
  `movement_date` date DEFAULT NULL,
  `pre_quantity` int(11) DEFAULT NULL,
  `movement_stock_report` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `movement_item_price` bigint(20) DEFAULT NULL,
  `total_price` bigint(20) DEFAULT NULL,
  `invoice_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drug_store_id` bigint(20) DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `movement_type` enum('NHAP_KHO', 'XUAT_KHO', 'KIEM_KHO') NOT NULL DEFAULT 'KIEM_KHO',
  `stock_id` bigint(20) DEFAULT NULL,
  `created_user_id` bigint(20) DEFAULT NULL,
  `lasted_update_user_id` bigint(20) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `lasted_update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 20-10
UPDATE drug SET import_price = sale_price WHERE import_price IS NULL;

-- 22-10
ALTER TABLE day_revenue ADD COLUMN internal_drug_amount bigint(20) NOT NULL DEFAULT 0;

alter table prescription modify column `note` longtext NULL;

-- 26-10
alter table input_form add column `invoice_number_supplier` varchar(255) NULL;


-- 06-11
ALTER TABLE output_form ADD `to_drug_store_id` BIGINT(20) DEFAULT NULL;
ALTER TABLE input_form ADD `from_output_form_id` BIGINT(20) DEFAULT NULL;

-- 16-11
ALTER table transfer_form ADD COLUMN transfer_type enum('EMERGENCY', 'INTRODUCE') DEFAULT 'EMERGENCY';

alter table diagnosis_service add column `ma_dvkt` varchar(255) NULL;
alter table diagnosis_service add column `ma_gia` varchar(255) NULL;
alter table diagnosis_service add column `don_gia_bhyt` bigint(20) NULL;
alter table diagnosis_service add column `quyet_dinh` varchar(255) NULL;
alter table diagnosis_service add column `cong_bo` varchar(255) NULL;
alter table diagnosis_service add column `ma_co_so_kcb` varchar(255) NULL;
alter table diagnosis_service add column `loai_pttt` int(11) NULL;

UPDATE diagnosis_service ds INNER JOIN diagnosis_service_temp t2 ON ds.name = t2.name
SET ds.ma_dvkt = t2.ma_dvkt, ds.ma_gia = t2.ma_gia, ds.don_gia_bhyt = t2.don_gia_bhyt, 
ds.quyet_dinh= t2.quyet_dinh, ds.cong_bo=t2.cong_bo,
ds.ma_co_so_kcb=t2.ma_co_so_kcb;

-- 26/11
ALTER TABLE appointment ADD `department_id` BIGINT(20) DEFAULT NULL;

-- 05/12
alter table diagnosis_service add column `is_insurance` tinyint(1) DEFAULT 0;


-- 11-12-2020


CREATE TABLE `tong_hop_xml_1` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`ma_kham_benh` VARCHAR(255) NOT NULL,
`stt` INT(10) NULL,
`ma_benh_nhan` VARCHAR(255) NOT NULL,
`ho_ten_benh_nhan_cDATA` VARCHAR(255) NOT NULL,
`ngay_sinh_benh_nhan` VARCHAR(255) NULL,
`gioi_tinh_benh_nhan` INT(1) NULL,
`dia_chi_the_bHYT_cDATA` VARCHAR(500) NULL,
`ma_the_bHYT` VARCHAR(255) NULL,
`ma_noi_dang_ky_the_bHYT` VARCHAR(255) NULL,
`tu_ngay_the_bHYT` VARCHAR(255) NULL,
`den_ngay_the_bHYT` VARCHAR(255) NULL,
`chan_doan_kham_benh_cDATA` VARCHAR(255) NULL,
`ma_iCD_kham_benh` VARCHAR(255) NULL,
`ma_iCD_kham_benh_khac` VARCHAR(255) NULL,
`ma_ly_do_vao_vien` INT(1) NULL,
`ma_benh_vien_chuyen_den` VARCHAR(255) NULL,
`ma_tai_nan` INT(1) NULL,
`ngay_vao_kham_benh` VARCHAR(255) NULL,
`ngay_ra_kham_benh` VARCHAR(255) NULL,
`so_ngay_dieu_tri` INT(3) NULL,
`ket_qua_dieu_tri` INT(1) NULL,
`tinh_trang_ra_vien` INT(1) NULL,
`ngay_thanh_toan` VARCHAR(255) NULL,
`muc_pham_tram_huong` INT(3) NULL,
`tong_tien_thuoc` BIGINT(15) NULL,
`tong_tien_vTYT` BIGINT(15) NULL,
`tong_tien_chi_phi_dieu_tri` BIGINT(15) NULL,
`tong_tien_benh_nhan_tT` BIGINT(15) NULL,
`tong_tien_de_nghi_bHXHTT` BIGINT(15) NULL,
`tong_tien_ho_tro_khac` BIGINT(15) NULL,
`tong_tien_chi_phi_ngoai_dinh_suat` BIGINT(15) NULL,
`nam_de_nghi_bHXH_quyet_toan` INT(4) NULL,
`thang_de_nghi_bHXH_quyet_toan` INT(2) NULL,
`ma_hinh_thuc_kCB` INT(1) NULL,
`ma_khoa` VARCHAR(255) NULL,
`ma_cSKCB` VARCHAR(255) NULL,
`ma_khu_vuc_bHYT` VARCHAR(255) NULL,
`ma_phau_thuat_thu_thuat` VARCHAR(255) NULL,
`kg_tre_em` FLOAT(5) NULL,
PRIMARY KEY (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `chi_tiet_thuoc_xml_2` (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`ma_kham_benh` VARCHAR(255) NOT NULL,
`stt` INT(10) NULL,
`ma_thuoc` VARCHAR(255) NULL,
`ma_nhom` VARCHAR(255) NULL,
`ten_thuoc_cDATA` VARCHAR(255) NULL,
`don_vi_tinh` VARCHAR(255) NULL,
`ham_luong_cDATA` VARCHAR(255) NULL,
`duong_luong` VARCHAR(255) NULL,
`lieu_dung_cDATA` VARCHAR(255) NULL,
`so_dang_ky_thuoc` VARCHAR(255) NULL,
`so_luong` FLOAT(5) NULL,
`don_gia_thanh_toan_bHYT` FLOAT(15) NULL,
`ty_le_thanh_toan_bHYT` INT(3) NULL,
`thanh_tien` BIGINT(15) NULL,
`ma_khoa` VARCHAR(255) NULL,
`ma_chung_chi_hanh_nghe_bac_si` VARCHAR(255) NULL,
`ma_benh` VARCHAR(255) NULL,
`ngay_ra_y_lenh` VARCHAR(255) NULL,
`ma_phuong_thuc_thanh_oan` INT(1) NULL,
PRIMARY KEY (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `chi_tiet_dvkt_xml_3` (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`ma_kham_benh` VARCHAR(255) NOT NULL,
`stt` INT(10) NULL,
`ma_dich_vu` VARCHAR(255) NULL,
`ma_vat_tu` VARCHAR(255) NULL,
`ma_nhom` VARCHAR(255) NULL,
`ten_dich_vu_cDATA` VARCHAR(255) NULL,
`don_vi_tinh` VARCHAR(255) NULL,
`so_luong` FLOAT(5) NULL,
`don_gia_thanh_toan_bHYT` FLOAT(15) NULL,
`ty_le_thanh_toan_bHYT` INT(3) NULL,
`thanh_lien` BIGINT(15) NULL,
`ma_khoa` VARCHAR(255) NULL,
`ma_chung_chi_hanh_nghe_bac_si` VARCHAR(255) NULL,
`ma_benh` VARCHAR(255) NULL,
`ngay_ra_y_lenh` VARCHAR(255) NULL,
`ngay_co_ket_qua` VARCHAR(255) NULL,
`ma_phuong_thuc_thanh_toan` INT(1) NULL,
PRIMARY KEY (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `chi_tiet_cls_xml_4` (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`ma_kham_benh` VARCHAR(255) NOT NULL,
`stt` INT(10) NULL,
`ma_dich_vu_cLS` VARCHAR(255) NULL,
`ma_xet_nghiem` VARCHAR(255) NULL,
`ten_xet_nghiem_cDATA` VARCHAR(255) NULL,
`ket_qua_xet_nghiem_cDATA` VARCHAR(255) NULL,
`ma_may_xet_nghiem` VARCHAR(255) NULL,
`mo_ta_ket_qua_xet_xghiem` VARCHAR(255) NULL,
`ket_luan_xet_nghiem` VARCHAR(255) NULL,
`ngay_ra_ket_qua` VARCHAR(255) NULL,
PRIMARY KEY (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `chi_tiet_dien_bien_benh_xml_5` (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`ma_kham_benh` VARCHAR(255) NOT NULL,
`stt` INT(10) NULL,
`dien_bien_benh_cDATA` VARCHAR(255) NULL,
`ket_qua_hoi_chan_cDATA` VARCHAR(255) NULL,
`mo_ta_cach_thuc_phau_thuat` VARCHAR(255) NULL,
`ngay_ra_y_lenh` VARCHAR(255) NULL,
PRIMARY KEY (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 15-12-2020
ALTER TABLE insurance_card ADD `address` VARCHAR(255) DEFAULT NULL;
ALTER TABLE insurance_card ADD `ma_dKBD` VARCHAR(255) DEFAULT NULL;

ALTER TABLE invoice_item ADD `phu_thu` BIGINT(20) DEFAULT 0 ;
ALTER TABLE invoice_item ADD `bhyt` BIGINT(20) DEFAULT 0 ;
ALTER TABLE invoice_item ADD `dong_chi_tra` BIGINT(20) DEFAULT 0 ;

-- 16-12-2020
INSERT INTO diagnosis_group VALUES (88, 'PhÃ­ Dá»‹ch Vá»¥ BHYT' ); 
INSERT INTO diagnosis_service VALUES (888, 'Chi PhÃ­ Ä�á»“ng Chi Tráº£ Tá»« Phiáº¿u KhÃ¡m', null, 88, 0, '', null, null, null, null, null, null, 0 ); SET FOREIGN_KEY_CHECKS = 1;

--  21-12-2020
ALTER TABLE diagnosis_service ADD `service_type` enum('XET_NGHIEM', 'CHAN_DOAN_HINH_ANH','THAM_DO_CHUC_NANG','THU_THUAT') DEFAULT 'XET_NGHIEM';
update diagnosis_service set service_type = 'THAM_DO_CHUC_NANG' where name like 'SiÃªu Ã¢m%';
update diagnosis_service set service_type = 'THU_THUAT' where name like '%báº¥m huyá»‡t%';
update diagnosis_service set service_type = 'CHAN_DOAN_HINH_ANH' where name like '%X-quang%' or name like '%Xquang%' or name like '%X-Quang%';

-- 22-12-2020
ALTER TABLE insurance_card ADD `address_dKBD` VARCHAR(255) DEFAULT NULL;

-- 25-12-2020
ALTER TABLE prescription ADD `bhyt_prescription_id` BIGINT(20) DEFAULT NULL;
INSERT INTO drug_store VALUES (1, 'Kho Thuá»‘c BHYT', 'Kho Thuá»‘c BHYT', 1 ); 
ALTER TABLE invoice_item ADD `tong_tien_bhyt` BIGINT(20) DEFAULT 0 ;

-- 29-12-2020
ALTER TABLE diagnosis_report ADD `status_payment` TINYINT(1) DEFAULT 0 ;

-- 30-12-2020
ALTER TABLE diagnosis_service ADD `ma_vat_tu` VARCHAR(255) DEFAULT NULL;
ALTER TABLE diagnosis_service ADD `ma_nhom` VARCHAR(255) DEFAULT NULL;
ALTER TABLE diagnosis_service ADD `don_vi_tinh` VARCHAR(50) DEFAULT NULL;
ALTER TABLE invoice ADD `dong_chi_tra` BIGINT(20) DEFAULT 0;

--31-12-2020
ALTER TABLE user_table ADD `ma_chung_chi_hanh_nghe_bac_si` VARCHAR(255) DEFAULT NULL;

--2-1-2020
ALTER TABLE drug ADD `ma_nhom_bHYT` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `ham_luong_bHYT` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `duong_dung_bHYT` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `lieu_dung_bHYT` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `so_dang_ky_bHYT` VARCHAR(255) DEFAULT NULL;
ALTER TABLE diagnosis_service ADD `ma_may_xet_nghiem` VARCHAR(255) DEFAULT NULL;
--
ALTER TABLE department ADD `ma_bhyt` VARCHAR(255) DEFAULT NULL;
ALTER TABLE department ADD `ten_bhyt` VARCHAR(255) DEFAULT NULL;

-- 3-1-2021
ALTER TABLE prescription ADD `day_prescription` INT(3) DEFAULT 1;

-- 22-01-2021
ALTER TABLE drug ADD `thong_tin_thau` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `pham_vi` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `ma_hoat_chat` VARCHAR(255) DEFAULT NULL;


ALTER TABLE drug MODIFY `bar_code` VARCHAR(32) DEFAULT NULL;

-- 18-11-2021
ALTER TABLE drug ADD `producer_company` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `producer_country` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `contractor_bHYT` VARCHAR(255) DEFAULT NULL;
ALTER TABLE drug ADD `published_date` VARCHAR(255) DEFAULT NULL;

update drug set producer_company = place_code;
update drug set producer_country = guideline;
update drug set contractor_bHYT = ma_nhom_bHYT;
update drug set published_date = lieu_dung_bHYT;

-- Run later after delivery
update drug set ma_nhom_bHYT = '4';
update drug set place_code = '';
update drug set guideline = '';
update drug set lieu_dung_bHYT = '';
update drug set lieu_dung_bHYT = ham_luong_bHYT;

-- 07-01-2022
ALTER TABLE drug ADD `sellable` tinyint(1) DEFAULT 1;
ALTER TABLE drug ADD `ham_luong` VARCHAR(255) DEFAULT NULL;

ALTER TABLE drug ADD `deleted` tinyint(1) DEFAULT 0;
ALTER TABLE input_stock ADD `before_stock` bigint(20) DEFAULT 0;
ALTER TABLE input_stock ADD `produced_code` VARCHAR(255) DEFAULT NULL;

CREATE TABLE config_warning_drug (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`drug_one_id` BIGINT(20) NOT NULL,
`drug_two_id` BIGINT(20) NOT NULL,
`number_valid_date` INT(10) NULL,
`description` VARCHAR(255) DEFAULT NULL,
PRIMARY KEY (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE config_day_drug (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`number_day` INT(5) NOT NULL,
PRIMARY KEY (`id`) 
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE output_form ADD `output_form_type` enum('REFUND_COMPANY', 'DAMAGE_DRUG', 'TRANSFER_STOCK', 'LOST')  NULL DEFAULT null;
ALTER TABLE output_form ADD `supplier_id` BIGINT(20) DEFAULT NULL;
ALTER TABLE output_stock ADD `input_stock_id` BIGINT(20) DEFAULT NULL;

-- 19-01-2022
ALTER TABLE output_stock ADD `before_stock` BIGINT(20) DEFAULT 0;

--25-01-2022
ALTER TABLE prescription ADD `has_uploaded_XML` TINYINT(1) DEFAULT 0;

-- 07-02-2022
ALTER TABLE input_form ADD `supplier_name` VARCHAR(500) DEFAULT NULL;

-- 02-04-2022  //  update  covert all to stockMovement
ALTER TABLE stock_movement Modify `pre_quantity` BIGINT(20) DEFAULT 0;
ALTER TABLE stock_movement add `input_stock_id` BIGINT(20) DEFAULT NULL;
ALTER TABLE stock_movement add `output_stock_id` BIGINT(20) DEFAULT NULL;
ALTER TABLE stock_movement add `invoice_item_id` BIGINT(20) DEFAULT NULL;
ALTER IGNORE TABLE stock_movement
ADD UNIQUE INDEX unique_stock_movement_input (drug_id, input_stock_id);

ALTER IGNORE TABLE stock_movement
ADD UNIQUE INDEX unique_stock_movement_output (drug_id, output_stock_id);

ALTER IGNORE TABLE stock_movement
ADD UNIQUE INDEX unique_stock_movement_invoice_item (drug_id, invoice_item_id);

--- 29-04-2022
ALTER TABLE invoice ADD `dong_chi_tra_am` BIGINT(20) DEFAULT 0;
-- 05-05-2022
ALTER TABLE drug ADD UNIQUE INDEX unique_drug_barcode (bar_code);

-- 24-05-2022
ALTER TABLE invoice_item MODIFY dong_chi_tra DOUBLE NOT NULL;
ALTER TABLE invoice_item MODIFY bhyt DOUBLE NOT NULL;

-- 03-06-2022
ALTER TABLE invoice_item MODIFY dong_chi_tra DOUBLE NOT NULL DEFAULT 0;
ALTER TABLE invoice_item MODIFY bhyt DOUBLE NOT NULL DEFAULT 0;

-- 22-08-2022
update `invoice_item` set bhyt = 0 WHERE bhyt is null;
update `invoice_item` set dong_chi_tra = 0 WHERE dong_chi_tra is null;
DELIMITER $$
CREATE TRIGGER tg_invoice_item_insert BEFORE INSERT ON invoice_item
FOR EACH ROW
BEGIN
    SET NEW.dong_chi_tra = IFNULL(NEW.dong_chi_tra, 0);
	SET NEW.bhyt = IFNULL(NEW.bhyt, 0);
END $$
DELIMITER ; 



