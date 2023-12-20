package com.logsik.timec.dtos;

import java.io.Serializable;

public class StockTotalDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long totalItems;
	private Long totalStockAmount;
	public Long getTotalItems() {
		return totalItems;
	}
	public void setTotalItems(Long totalItems) {
		this.totalItems = totalItems;
	}
	public Long getTotalStockAmount() {
		return totalStockAmount;
	}
	public void setTotalStockAmount(Long totalStockAmount) {
		this.totalStockAmount = totalStockAmount;
	}

}
