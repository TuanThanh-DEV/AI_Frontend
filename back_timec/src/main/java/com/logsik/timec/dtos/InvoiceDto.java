package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.timec.enums.InvoiceGroup;
import com.logsik.timec.enums.InvoiceStatus;
import com.logsik.timec.enums.InvoiceType;

public class InvoiceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long patientId;
	private Long userId;
	private Long prescriptionId;
	private Long hospitalId;
	private Date createdDate;
	private Date paymentDate;
	private Long totalAmountNoVat;
	private Long totalAmountWithVat;
	private Long insurranceAmount;
	private InvoiceStatus status;
	private InvoiceType invoiceType;
	private String barCode;
	private InvoiceGroup invoiceGroup;
	private Long originInvoiceId;
	private long reducedAmount;
	private long originAmount;
	private Long companyId;
	private String note;
	private long dongChiTra;
	private long dongChiTraAm;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPatientId() {
		return patientId;
	}
	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
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
	public InvoiceStatus getStatus() {
		return status;
	}
	public void setStatus(InvoiceStatus status) {
		this.status = status;
	}
	public InvoiceType getInvoiceType() {
		return invoiceType;
	}
	public void setInvoiceType(InvoiceType invoiceType) {
		this.invoiceType = invoiceType;
	}
	public String getBarCode() {
		return barCode;
	}
	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}
	public InvoiceGroup getInvoiceGroup() {
		return invoiceGroup;
	}
	public void setInvoiceGroup(InvoiceGroup invoiceGroup) {
		this.invoiceGroup = invoiceGroup;
	}
	public Long getOriginInvoiceId() {
		return originInvoiceId;
	}
	public void setOriginInvoiceId(Long originInvoiceId) {
		this.originInvoiceId = originInvoiceId;
	}
	public Long getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}
	public long getReducedAmount() {
		return reducedAmount;
	}
	public long getOriginAmount() {
		return originAmount;
	}
	public Long getCompanyId() {
		return companyId;
	}
	public void setReducedAmount(long reducedAmount) {
		this.reducedAmount = reducedAmount;
	}
	public void setOriginAmount(long originAmount) {
		this.originAmount = originAmount;
	}
	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public long getDongChiTra() {
		return dongChiTra;
	}
	public void setDongChiTra(long dongChiTra) {
		this.dongChiTra = dongChiTra;
	}
	public long getDongChiTraAm() {
		return dongChiTraAm;
	}
	public void setDongChiTraAm(long dongChiTraAm) {
		this.dongChiTraAm = dongChiTraAm;
	}
	
}
