package com.logsik.timec.dtos;

import java.util.Date;

public class OutputStockDto {
	
	private Long id;
	private Long drugId;
	private Long drugStoreId;
	private Date outputDate;
	private Long invoiceId;
	private int outAmount;
	private Date producedDate;
	private Date expiredDate;
	private String batchBarcode;
	private Long outputFormId;
	private Long salePrice;
	private Long importPrice;
	private Long beforeStock;
	
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
	public Long getDrugStoreId() {
		return drugStoreId;
	}
	public void setDrugStoreId(Long drugStoreId) {
		this.drugStoreId = drugStoreId;
	}
	public Date getOutputDate() {
		return outputDate;
	}
	public void setOutputDate(Date outputDate) {
		this.outputDate = outputDate;
	}
	public Long getInvoiceId() {
		return invoiceId;
	}
	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}
	public int getOutAmount() {
		return outAmount;
	}
	public void setOutAmount(int outAmount) {
		this.outAmount = outAmount;
	}
	public Date getProducedDate() {
		return producedDate;
	}
	public void setProducedDate(Date producedDate) {
		this.producedDate = producedDate;
	}
	public Date getExpiredDate() {
		return expiredDate;
	}
	public void setExpiredDate(Date expiredDate) {
		this.expiredDate = expiredDate;
	}
	public String getBatchBarcode() {
		return batchBarcode;
	}
	public void setBatchBarcode(String batchBarcode) {
		this.batchBarcode = batchBarcode;
	}
	public Long getOutputFormId() {
		return outputFormId;
	}
	public void setOutputFormId(Long outputFormId) {
		this.outputFormId = outputFormId;
	}
	public Long getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(Long salePrice) {
		this.salePrice = salePrice;
	}
	public Long getImportPrice() {
		return importPrice;
	}
	public void setImportPrice(Long importPrice) {
		this.importPrice = importPrice;
	}
	public Long getBeforeStock() {
		return beforeStock;
	}
	public void setBeforeStock(Long beforeStock) {
		this.beforeStock = beforeStock;
	}
	
}
