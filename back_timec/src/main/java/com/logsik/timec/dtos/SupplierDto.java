package com.logsik.timec.dtos;

public class SupplierDto {
	
	private Long id;
	private String name;
	private String email;
	private Boolean hasSellDrug;
	private Integer phone;
	private String address;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getPhone() {
		return phone;
	}
	public void setPhone(Integer phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Boolean getHasSellDrug() {
		return hasSellDrug;
	}
	public void setHasSellDrug(Boolean hasSellDrug) {
		this.hasSellDrug = hasSellDrug;
	}

	
}
