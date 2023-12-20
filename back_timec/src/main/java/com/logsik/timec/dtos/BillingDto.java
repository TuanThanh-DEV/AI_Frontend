package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class BillingDto implements Serializable {
	
	

	
	private static final long serialVersionUID = 1L;

	private Long id;

	private String receiver;

		private Long amount;

	private Date createdDate;	

	private Long accountCodeId;

	private boolean hasAccounted = false;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Long getAccountCodeId() {
		return accountCodeId;
	}

	public void setAccountCodeId(Long accountCodeId) {
		this.accountCodeId = accountCodeId;
	}

	public boolean getHasAccounted() {
		return hasAccounted;
	}

	public void setHasAccounted(boolean hasAccounted) {
		this.hasAccounted = hasAccounted;
	}

	

}
