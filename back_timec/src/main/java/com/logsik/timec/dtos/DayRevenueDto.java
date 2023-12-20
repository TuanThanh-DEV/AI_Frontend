package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.timec.enums.StatusDayRevenue;

public class DayRevenueDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long hospitalId;
	private Date applyDate;	
	private Long revenueAmount;
	private Long totalAmount;
	private Long saleDrugAmount;
	private Long saleDiagnosisAmount;
	private Long saleProcedureAmount;
	private Long saleInsuranceAmount;
	private Long saleOtherAmount;
	private Long buyAmount;
	private Long internalDrugAmount;
	private Long validatedBy;
	private StatusDayRevenue status;
	private String note;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	public Long getRevenueAmount() {
		return revenueAmount;
	}
	public void setRevenueAmount(Long revenueAmount) {
		this.revenueAmount = revenueAmount;
	}
	public Long getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Long totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Long getSaleDrugAmount() {
		return saleDrugAmount;
	}
	public void setSaleDrugAmount(Long saleDrugAmount) {
		this.saleDrugAmount = saleDrugAmount;
	}
	public Long getSaleDiagnosisAmount() {
		return saleDiagnosisAmount;
	}
	public void setSaleDiagnosisAmount(Long saleDiagnosisAmount) {
		this.saleDiagnosisAmount = saleDiagnosisAmount;
	}
	public Long getSaleProcedureAmount() {
		return saleProcedureAmount;
	}
	public void setSaleProcedureAmount(Long saleProcedureAmount) {
		this.saleProcedureAmount = saleProcedureAmount;
	}
	public Long getSaleInsuranceAmount() {
		return saleInsuranceAmount;
	}
	public void setSaleInsuranceAmount(Long saleInsuranceAmount) {
		this.saleInsuranceAmount = saleInsuranceAmount;
	}
	public Long getSaleOtherAmount() {
		return saleOtherAmount;
	}
	public void setSaleOtherAmount(Long saleOtherAmount) {
		this.saleOtherAmount = saleOtherAmount;
	}
	public Long getBuyAmount() {
		return buyAmount;
	}
	public void setBuyAmount(Long buyAmount) {
		this.buyAmount = buyAmount;
	}
	public Long getValidatedBy() {
		return validatedBy;
	}
	public void setValidatedBy(Long validatedBy) {
		this.validatedBy = validatedBy;
	}
	public StatusDayRevenue getStatus() {
		return status;
	}
	public void setStatus(StatusDayRevenue status) {
		this.status = status;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Long getInternalDrugAmount() {
		return internalDrugAmount;
	}
	public void setInternalDrugAmount(Long internalDrugAmount) {
		this.internalDrugAmount = internalDrugAmount;
	}
	
	
	
}
