package com.logsik.timec.dtos;

import java.util.Date;

public class InputStockDto{
	
	private Long id;
	private Date inputDate;
	private Date expiredDate;
	private int inputAmount;
	private Long drugId;
	private Long drugStoreId;
	private Integer remainAmount;
	private Date producedDate;
	private String batchBarcode;
	private long inputFormId;
	private long salePrice;
	private long importPrice;
	private Long stockId;
	
	private Long beforeStock;
	private String producedCode;
	
	public Long getId() {
		return id;
	}
	public Date getInputDate() {
		return inputDate;
	}
	public Date getExpiredDate() {
		return expiredDate;
	}
	public int getInputAmount() {
		return inputAmount;
	}
	public Long getDrugId() {
		return drugId;
	}
	public Long getDrugStoreId() {
		return drugStoreId;
	}
	public Integer getRemainAmount() {
		return remainAmount;
	}
	public Date getProducedDate() {
		return producedDate;
	}
	public String getBatchBarcode() {
		return batchBarcode;
	}
	public long getInputFormId() {
		return inputFormId;
	}
	public long getSalePrice() {
		return salePrice;
	}
	public long getImportPrice() {
		return importPrice;
	}
	public Long getStockId() {
		return stockId;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setInputDate(Date inputDate) {
		this.inputDate = inputDate;
	}
	public void setExpiredDate(Date expiredDate) {
		this.expiredDate = expiredDate;
	}
	public void setInputAmount(int inputAmount) {
		this.inputAmount = inputAmount;
	}
	public void setDrugId(Long drugId) {
		this.drugId = drugId;
	}
	public void setDrugStoreId(Long drugStoreId) {
		this.drugStoreId = drugStoreId;
	}
	public void setRemainAmount(Integer remainAmount) {
		this.remainAmount = remainAmount;
	}
	public void setProducedDate(Date producedDate) {
		this.producedDate = producedDate;
	}
	public void setBatchBarcode(String batchBarcode) {
		this.batchBarcode = batchBarcode;
	}
	public void setInputFormId(long inputFormId) {
		this.inputFormId = inputFormId;
	}
	public void setSalePrice(long salePrice) {
		this.salePrice = salePrice;
	}
	public void setImportPrice(long importPrice) {
		this.importPrice = importPrice;
	}
	public void setStockId(Long stockId) {
		this.stockId = stockId;
	}
	public Long getBeforeStock() {
		return beforeStock;
	}
	public void setBeforeStock(Long beforeStock) {
		this.beforeStock = beforeStock;
	}
	public String getProducedCode() {
		return producedCode;
	}
	public void setProducedCode(String producedCode) {
		this.producedCode = producedCode;
	}

	
}
