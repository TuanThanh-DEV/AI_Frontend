package com.logsik.timec.dtos;

import java.io.Serializable;

public class InsuranceInvoiceItemDto implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long insuranceInvoiceId;
	private Long insuranceMappingId;
	private Long  originAmount;
	private int insurancePercent;
	private Long insuranceAmount;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getInsuranceInvoiceId() {
		return insuranceInvoiceId;
	}
	public void setInsuranceInvoiceId(Long insuranceInvoiceId) {
		this.insuranceInvoiceId = insuranceInvoiceId;
	}
	public Long getInsuranceMappingId() {
		return insuranceMappingId;
	}
	public void setInsuranceMappingId(Long insuranceMappingId) {
		this.insuranceMappingId = insuranceMappingId;
	}
	public Long getOriginAmount() {
		return originAmount;
	}
	public void setOriginAmount(Long originAmount) {
		this.originAmount = originAmount;
	}
	public int getInsurancePercent() {
		return insurancePercent;
	}
	public void setInsurancePercent(int insurancePercent) {
		this.insurancePercent = insurancePercent;
	}
	public Long getInsuranceAmount() {
		return insuranceAmount;
	}
	public void setInsuranceAmount(Long insuranceAmount) {
		this.insuranceAmount = insuranceAmount;
	}
	
}
