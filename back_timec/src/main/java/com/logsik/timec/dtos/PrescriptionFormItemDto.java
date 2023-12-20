package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class PrescriptionFormItemDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String itemKey;
	private String itemValue;
	private Long prescriptionFormId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getItemKey() {
		return itemKey;
	}
	public void setItemKey(String itemKey) {
		this.itemKey = itemKey;
	}
	public String getItemValue() {
		return itemValue;
	}
	public void setItemValue(String itemValue) {
		this.itemValue = itemValue;
	}
	public Long getPrescriptionFormId() {
		return prescriptionFormId;
	}
	public void setPrescriptionFormId(Long prescriptionFormId) {
		this.prescriptionFormId = prescriptionFormId;
	}
	
	
	
}
