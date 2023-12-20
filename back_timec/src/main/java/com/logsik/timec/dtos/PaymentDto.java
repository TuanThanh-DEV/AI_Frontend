package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.PaymentStatus;

public class PaymentDto {
	
	private Long id;
	private Long cashDeskId;
	private Long invoiceId;
	private Long amount;
	private String paymentMethod;
	private Long patientId;
	private Long insuranceCompanyId;
	private Date paymentDate;
	private Date createdDate;
	private PaymentStatus status;
	private Boolean hasAccounted = false;
	private String payper;
	private String note;
	private long reducedAmount;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCashDeskId() {
		return cashDeskId;
	}
	public void setCashDeskId(Long cashDeskId) {
		this.cashDeskId = cashDeskId;
	}
	public Long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}
	public Long getAmount() {
		return amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public Long getPatientId() {
		return patientId;
	}
	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}
	public Long getInsuranceCompanyId() {
		return insuranceCompanyId;
	}
	public void setInsuranceCompanyId(Long insuranceCompanyId) {
		this.insuranceCompanyId = insuranceCompanyId;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public PaymentStatus getStatus() {
		return status;
	}
	public void setStatus(PaymentStatus status) {
		this.status = status;
	}
	public Boolean getHasAccounted() {
		return hasAccounted;
	}
	public void setHasAccounted(Boolean hasAccounted) {
		this.hasAccounted = hasAccounted;
	}
	public String getPayper() {
		return payper;
	}
	public void setPayper(String payper) {
		this.payper = payper;
	}
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
	public long getReducedAmount() {
		return reducedAmount;
	}
	public void setReducedAmount(long reducedAmount) {
		this.reducedAmount = reducedAmount;
	}

}
