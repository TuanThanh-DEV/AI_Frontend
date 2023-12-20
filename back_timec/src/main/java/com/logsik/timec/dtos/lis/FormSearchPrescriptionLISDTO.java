package com.logsik.timec.dtos.lis;

import java.util.Date;

public class FormSearchPrescriptionLISDTO {

	private Date tuNgay;
	private Date denNgay;
	private int trangThai;
	private String soPhieuChiDinh;
	
	public Date getTuNgay() {
		return tuNgay;
	}
	public void setTuNgay(Date tuNgay) {
		this.tuNgay = tuNgay;
	}
	public Date getDenNgay() {
		return denNgay;
	}
	public void setDenNgay(Date denNgay) {
		this.denNgay = denNgay;
	}
	public int getTrangThai() {
		return trangThai;
	}
	public void setTrangThai(int trangThai) {
		this.trangThai = trangThai;
	}
	public String getSoPhieuChiDinh() {
		return soPhieuChiDinh;
	}
	public void setSoPhieuChiDinh(String soPhieuChiDinh) {
		this.soPhieuChiDinh = soPhieuChiDinh;
	}

	
}
