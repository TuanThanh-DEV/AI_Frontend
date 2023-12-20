package com.logsik.timec.dtos;

import java.io.Serializable;

public class InvoiceItemDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long invoiceId;
	private Long inputStockId;
	private Long diagnosisServiceId;
	private Long procedureServiceId;
	private Long prescriptionId;
	private Integer numberOfItems;
	private Long amountNoVat;
	private Long amountWithVat;
	private boolean fromCabinet;
	private Long couponId;
	
	private long phuThu;
	private long bhyt;
	private Double dongChiTra;
	
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
	public Long getInputStockId() {
		return inputStockId;
	}
	public void setInputStockId(Long inputStockId) {
		this.inputStockId = inputStockId;
	}
	public Long getDiagnosisServiceId() {
		return diagnosisServiceId;
	}
	public void setDiagnosisServiceId(Long diagnosisServiceId) {
		this.diagnosisServiceId = diagnosisServiceId;
	}
	public Long getProcedureServiceId() {
		return procedureServiceId;
	}
	public void setProcedureServiceId(Long procedureServiceId) {
		this.procedureServiceId = procedureServiceId;
	}
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public Integer getNumberOfItems() {
		return numberOfItems;
	}
	public void setNumberOfItems(Integer numberOfItems) {
		this.numberOfItems = numberOfItems;
	}
	public Long getAmountNoVat() {
		return amountNoVat;
	}
	public void setAmountNoVat(Long amountNoVat) {
		this.amountNoVat = amountNoVat;
	}
	public Long getAmountWithVat() {
		return amountWithVat;
	}
	public void setAmountWithVat(Long amountWithVat) {
		this.amountWithVat = amountWithVat;
	}
	public boolean isFromCabinet() {
		return fromCabinet;
	}
	public void setFromCabinet(boolean fromCabinet) {
		this.fromCabinet = fromCabinet;
	}
	public Long getCouponId() {
		return couponId;
	}
	public void setCouponId(Long couponId) {
		this.couponId = couponId;
	}
	public long getPhuThu() {
		return phuThu;
	}
	public long getBhyt() {
		return bhyt;
	}
	public Double getDongChiTra() {
		return dongChiTra;
	}
	public void setPhuThu(long phuThu) {
		this.phuThu = phuThu;
	}
	public void setBhyt(long bhyt) {
		this.bhyt = bhyt;
	}
	public void setDongChiTra(Double dongChiTra) {
		this.dongChiTra = dongChiTra;
	}
	
}
