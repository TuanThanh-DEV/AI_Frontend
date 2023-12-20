package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.timec.enums.AccountType;

public class LedgerDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;

	private Date createdDate;

	private AccountType accountType;

	private Long accountCodeId;

	private Long accountedAmount;

	private Long validatedById;

	private boolean hasValidated = false;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public Long getAccountCodeId() {
		return accountCodeId;
	}

	public void setAccountCodeId(Long accountCodeId) {
		this.accountCodeId = accountCodeId;
	}

	public Long getAccountedAmount() {
		return accountedAmount;
	}

	public void setAccountedAmount(Long accountedAmount) {
		this.accountedAmount = accountedAmount;
	}

	public Long getValidatedById() {
		return validatedById;
	}

	public void setValidatedById(Long validatedById) {
		this.validatedById = validatedById;
	}

	public boolean isHasValidated() {
		return hasValidated;
	}

	public void setHasValidated(boolean hasValidated) {
		this.hasValidated = hasValidated;
	}

	

	
	
	

}
