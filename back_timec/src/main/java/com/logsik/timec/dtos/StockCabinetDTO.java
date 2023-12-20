package com.logsik.timec.dtos;

public class StockCabinetDTO {

	private Long id;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getDrugId() {
		return drugId;
	}
	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
	public Long getDrugCabinetId() {
		return drugCabinetId;
	}
	public void setDrugCabinetId(Long drugCabinetId) {
		this.drugCabinetId = drugCabinetId;
	}
	public Integer getAvailable() {
		return available;
	}
	public void setAvailable(Integer available) {
		this.available = available;
	}
	private Long drugId;
	private Long drugCabinetId;
	private Integer available;

	
}
