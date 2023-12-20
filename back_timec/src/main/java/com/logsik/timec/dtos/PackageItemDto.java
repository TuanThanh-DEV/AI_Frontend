package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class PackageItemDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String code;
	private String packageId;
	private String diagnosisServiceId;
	private String price;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getPackageId() {
		return packageId;
	}
	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}
	public String getDiagnosisServiceId() {
		return diagnosisServiceId;
	}
	public void setDiagnosisServiceId(String diagnosisServiceId) {
		this.diagnosisServiceId = diagnosisServiceId;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	
	
}
