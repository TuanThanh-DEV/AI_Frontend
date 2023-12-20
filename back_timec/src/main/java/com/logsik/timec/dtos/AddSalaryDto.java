package com.logsik.timec.dtos;

public class AddSalaryDto {
	
	private Long id;
	private Long userSalaryId;
	private String name;
	private Long amount;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserSalaryId() {
		return userSalaryId;
	}
	public void setUserSalaryId(Long userSalaryId) {
		this.userSalaryId = userSalaryId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getAmount() {
		return amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}
	
}
