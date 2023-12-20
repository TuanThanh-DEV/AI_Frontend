package com.logsik.timec.dtos.lis;

public class InsuranceTypeLISDTO {
	
	private String maDoiTuong ;
	private String tenDoiTuong ;
	
	public String getMaDoiTuong() {
		return maDoiTuong;
	}
	public void setMaDoiTuong(String maDoiTuong) {
		this.maDoiTuong = maDoiTuong;
	}
	public String getTenDoiTuong() {
		return tenDoiTuong;
	}
	public void setTenDoiTuong(String tenDoiTuong) {
		this.tenDoiTuong = tenDoiTuong;
	}
	public InsuranceTypeLISDTO(String maDoiTuong, String tenDoiTuong) {
		super();
		this.maDoiTuong = maDoiTuong;
		this.tenDoiTuong = tenDoiTuong;
	}
	public InsuranceTypeLISDTO() {
		super();
	}
	
	
}
