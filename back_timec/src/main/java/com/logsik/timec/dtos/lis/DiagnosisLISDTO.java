package com.logsik.timec.dtos.lis;

public class DiagnosisLISDTO {
	
	private String madichVu;
	private String dichVuCapTren;
	private String tenDichVu;
	private String donViTinh;
	
	public String getMadichVu() {
		return madichVu;
	}
	public void setMadichVu(String madichVu) {
		this.madichVu = madichVu;
	}
	public String getDichVuCapTren() {
		return dichVuCapTren;
	}
	public void setDichVuCapTren(String dichVuCapTren) {
		this.dichVuCapTren = dichVuCapTren;
	}
	public String getTenDichVu() {
		return tenDichVu;
	}
	public void setTenDichVu(String tenDichVu) {
		this.tenDichVu = tenDichVu;
	}
	public String getDonViTinh() {
		return donViTinh;
	}
	public void setDonViTinh(String donViTinh) {
		this.donViTinh = donViTinh;
	}
	
	public DiagnosisLISDTO(String madichVu, String dichVuCapTren, String tenDichVu, String donViTinh) {
		super();
		this.madichVu = madichVu;
		this.dichVuCapTren = dichVuCapTren;
		this.tenDichVu = tenDichVu;
		this.donViTinh = donViTinh;
	}
	public DiagnosisLISDTO() {
		super();
	}
	
}
