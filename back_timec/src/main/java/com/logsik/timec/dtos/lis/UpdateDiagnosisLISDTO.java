package com.logsik.timec.dtos.lis;

public class UpdateDiagnosisLISDTO {
	
	private String soPhieuChiDinh;
	private String maDichVu;
	private String ngayTiepNhan;
	private int trangThai;
	
	public String getSoPhieuChiDinh() {
		return soPhieuChiDinh;
	}
	public void setSoPhieuChiDinh(String soPhieuChiDinh) {
		this.soPhieuChiDinh = soPhieuChiDinh;
	}
	public String getMaDichVu() {
		return maDichVu;
	}
	public void setMaDichVu(String maDichVu) {
		this.maDichVu = maDichVu;
	}
	public String getNgayTiepNhan() {
		return ngayTiepNhan;
	}
	public void setNgayTiepNhan(String ngayTiepNhan) {
		this.ngayTiepNhan = ngayTiepNhan;
	}
	public int getTrangThai() {
		return trangThai;
	}
	public void setTrangThai(int trangThai) {
		this.trangThai = trangThai;
	}
	
}
