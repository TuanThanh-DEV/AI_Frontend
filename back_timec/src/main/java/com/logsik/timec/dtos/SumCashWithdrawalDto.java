package com.logsik.timec.dtos;

public class SumCashWithdrawalDto {

	private Long totalWithDrawal;

	public SumCashWithdrawalDto(Long totalWithDrawal) {
		super();
		this.totalWithDrawal = totalWithDrawal;
	}

	public Long getTotalWithDrawal() {
		return totalWithDrawal;
	}

	public void setTotalWithDrawal(Long totalWithDrawal) {
		this.totalWithDrawal = totalWithDrawal;
	}
	
	
}
