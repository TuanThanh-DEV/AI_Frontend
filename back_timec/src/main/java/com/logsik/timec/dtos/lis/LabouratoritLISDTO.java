package com.logsik.timec.dtos.lis;

public class LabouratoritLISDTO {

	private String maNguoiDung;
	private String tenNguoiDung;
	
	public String getMaNguoiDung() {
		return maNguoiDung;
	}
	public void setMaNguoiDung(String maNguoiDung) {
		this.maNguoiDung = maNguoiDung;
	}
	public String getTenNguoiDung() {
		return tenNguoiDung;
	}
	public void setTenNguoiDung(String tenNguoiDung) {
		this.tenNguoiDung = tenNguoiDung;
	}
	public LabouratoritLISDTO(String maNguoiDung, String tenNguoiDung) {
		super();
		this.maNguoiDung = maNguoiDung;
		this.tenNguoiDung = tenNguoiDung;
	}
	
	
}
