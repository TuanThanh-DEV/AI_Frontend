package com.logsik.timec.enums;

/**
 * Moi lan KHAM_BENH la 79.000 VND
 * Moi DRUG_GROUP (lieu thuoc), co muc phi la 5.000 VND. 
 * Cac thuoc trong lieu thuoc la IN_GROUP_ITEM, khong duoc liet ke tren hoa don ban hang.
 * 
 *
 */
public enum InvoiceItemType {
	DRUG_ITEM, DIAGNOSIS_SERVICE_ITEM, PROCEDURE_SERVICE_ITEM, KHAM_BENH_ITEM, DRUG_GROUP, IN_GROUP_ITEM, CHUYEN_KHOA_KHAM_BENH, DONG_CHI_TRA
}
