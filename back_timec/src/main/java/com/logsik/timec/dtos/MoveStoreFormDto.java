package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.MoveStoreFormStatus;

public class MoveStoreFormDto {
	private Long id;
	private Long fromDrugStoreId;
	private Long toDrugStoreId;
	private Date transferDate;
	private Long createdUserId;
	private String note;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getFromDrugStoreId() {
		return fromDrugStoreId;
	}

	public void setFromDrugStoreId(Long fromDrugStoreId) {
		this.fromDrugStoreId = fromDrugStoreId;
	}

	public Long getToDrugStoreId() {
		return toDrugStoreId;
	}

	public void setToDrugStoreId(Long toDrugStoreId) {
		this.toDrugStoreId = toDrugStoreId;
	}

	public Date getTransferDate() {
		return transferDate;
	}

	public void setTransferDate(Date transferDate) {
		this.transferDate = transferDate;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public Long getValidateduserId() {
		return validateduserId;
	}

	public void setValidateduserId(Long validateduserId) {
		this.validateduserId = validateduserId;
	}

	public MoveStoreFormStatus getStatus() {
		return status;
	}

	public void setStatus(MoveStoreFormStatus status) {
		this.status = status;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	private Long validateduserId;
	private MoveStoreFormStatus status;

}
