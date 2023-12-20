package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.InputFormStatus;

public class InputFormDto {
	
	private Long id;
	private Long drugStoreId;
	private Long moveStoreFormId;
	private Date inputDate;
	private Long createdUserId;
	private Long validateduserId;
	private InputFormStatus status;
	private String invoiceNumberSupplier;
	private Long invoiceAmountSupplier;
	private Long fromOutputFormId;
	private String supplierName;
	
	public Long getInvoiceAmountSupplier() {
		return invoiceAmountSupplier;
	}
	public void setInvoiceAmountSupplier(Long invoiceAmountSupplier) {
		this.invoiceAmountSupplier = invoiceAmountSupplier;
	}
	public Long getReducedAmountSupplier() {
		return reducedAmountSupplier;
	}
	public void setReducedAmountSupplier(Long reducedAmountSupplier) {
		this.reducedAmountSupplier = reducedAmountSupplier;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	private Long reducedAmountSupplier;
	private String note;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDrugStoreId() {
		return drugStoreId;
	}
	public void setDrugStoreId(Long drugStoreId) {
		this.drugStoreId = drugStoreId;
	}
	public Date getInputDate() {
		return inputDate;
	}
	public void setInputDate(Date inputDate) {
		this.inputDate = inputDate;
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
	public InputFormStatus getStatus() {
		return status;
	}
	public void setStatus(InputFormStatus status) {
		this.status = status;
	}
	public Long getMoveStoreFormId() {
		return moveStoreFormId;
	}
	public void setMoveStoreFormId(Long moveStoreFormId) {
		this.moveStoreFormId = moveStoreFormId;
	}
	public String getInvoiceNumberSupplier() {
		return invoiceNumberSupplier;
	}
	public void setInvoiceNumberSupplier(String invoiceNumberSupplier) {
		this.invoiceNumberSupplier = invoiceNumberSupplier;
	}
	public Long getFromOutputFormId() {
		return fromOutputFormId;
	}
	public void setFromOutputFormId(Long fromOutputFormId) {
		this.fromOutputFormId = fromOutputFormId;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

}
