package com.logsik.timec.dtos.lis;

public class DepartmentLISDTO {
	
	private String maPhongBan;
	private String tenPhongBan;
	
	public String getMaPhongBan() {
		return maPhongBan;
	}
	public void setMaPhongBan(String maPhongBan) {
		this.maPhongBan = maPhongBan;
	}
	public String getTenPhongBan() {
		return tenPhongBan;
	}
	public void setTenPhongBan(String tenPhongBan) {
		this.tenPhongBan = tenPhongBan;
	}
	
	public DepartmentLISDTO(String maPhongBan, String tenPhongBan) {
		super();
		this.maPhongBan = maPhongBan;
		this.tenPhongBan = tenPhongBan;
	}
	
	public DepartmentLISDTO() {
		super();
	}
	
}
