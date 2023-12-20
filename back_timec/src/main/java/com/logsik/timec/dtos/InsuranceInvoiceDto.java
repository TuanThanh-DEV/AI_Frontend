package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class InsuranceInvoiceDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long invoiceId;
	private Long userId;
	private Date createdDate;
	private Date insuranceRefundDate;
	private Long totalAmountNoVat;
	private Long totalAmountWithVat;
	private Long insurranceAmount;
	private String status;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getInsuranceRefundDate() {
		return insuranceRefundDate;
	}
	public void setInsuranceRefundDate(Date insuranceRefundDate) {
		this.insuranceRefundDate = insuranceRefundDate;
	}
	public Long getTotalAmountNoVat() {
		return totalAmountNoVat;
	}
	public void setTotalAmountNoVat(Long totalAmountNoVat) {
		this.totalAmountNoVat = totalAmountNoVat;
	}
	public Long getTotalAmountWithVat() {
		return totalAmountWithVat;
	}
	public void setTotalAmountWithVat(Long totalAmountWithVat) {
		this.totalAmountWithVat = totalAmountWithVat;
	}
	public Long getInsurranceAmount() {
		return insurranceAmount;
	}
	public void setInsurranceAmount(Long insurranceAmount) {
		this.insurranceAmount = insurranceAmount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
