package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class CashDeskDto implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long cashierId;
	private Date openTime;
	private Long initialAmount;
	private Date closeTime;
	private Boolean isBalanced;
	private Long closeAmount;
	private String note;
	private Long saleAmount;
	private Long withdrawalAmount;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCashierId() {
		return cashierId;
	}
	public void setCashierId(Long cashierId) {
		this.cashierId = cashierId;
	}
	public Date getOpenTime() {
		return openTime;
	}
	public void setOpenTime(Date openTime) {
		this.openTime = openTime;
	}
	public Long getInitialAmount() {
		return initialAmount;
	}
	public void setInitialAmount(Long initialAmount) {
		this.initialAmount = initialAmount;
	}
	public Date getCloseTime() {
		return closeTime;
	}
	public void setCloseTime(Date closeTime) {
		this.closeTime = closeTime;
	}
	public Boolean getIsBalanced() {
		return isBalanced;
	}
	public void setIsBalanced(Boolean isBalanced) {
		this.isBalanced = isBalanced;
	}
	public Long getCloseAmount() {
		return closeAmount;
	}
	public void setCloseAmount(Long closeAmount) {
		this.closeAmount = closeAmount;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Long getSaleAmount() {
		return saleAmount;
	}
	public void setSaleAmount(Long saleAmount) {
		this.saleAmount = saleAmount;
	}
	public Long getWithdrawalAmount() {
		return withdrawalAmount;
	}
	public void setWithdrawalAmount(Long withdrawalAmount) {
		this.withdrawalAmount = withdrawalAmount;
	}
	
}
