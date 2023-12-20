package com.logsik.timec.dtos;

public class PrescriptionItemDto {
	
	private Long id;
	private Long prescriptionId;
	private Long inputStockId;
	private Long drugId;
	private String morningAmount;
	private String noonAmount;
	private String afternoonAmount;
	private String eveningAmount;
	private int numberOfDays;
	private int totalAmount;
	private String instruction;
	private Long supperId;
	private String note;
	private long patientId;
	private long stockId;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public Long getInputStockId() {
		return inputStockId;
	}
	public void setInputStockId(Long inputStockId) {
		this.inputStockId = inputStockId;
	}
	public String getMorningAmount() {
		return morningAmount;
	}
	public void setMorningAmount(String morningAmount) {
		this.morningAmount = morningAmount;
	}
	public String getNoonAmount() {
		return noonAmount;
	}
	public void setNoonAmount(String noonAmount) {
		this.noonAmount = noonAmount;
	}
	public String getEveningAmount() {
		return eveningAmount;
	}
	public void setEveningAmount(String eveningAmount) {
		this.eveningAmount = eveningAmount;
	}
	public int getNumberOfDays() {
		return numberOfDays;
	}
	public void setNumberOfDays(int numberOfDays) {
		this.numberOfDays = numberOfDays;
	}
	public int getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getInstruction() {
		return instruction;
	}
	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}
	public Long getSupperId() {
		return supperId;
	}
	public void setSupperId(Long supperId) {
		this.supperId = supperId;
	}
	public Long getDrugId() {
		return drugId;
	}
	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getAfternoonAmount() {
		return afternoonAmount;
	}
	public void setAfternoonAmount(String afternoonAmount) {
		this.afternoonAmount = afternoonAmount;
	}
	public long getPatientId() {
		return patientId;
	}
	public void setPatientId(long patientId) {
		this.patientId = patientId;
	}
	public long getStockId() {
		return stockId;
	}
	public void setStockId(long stockId) {
		this.stockId = stockId;
	}
	
}
