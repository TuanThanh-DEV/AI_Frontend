package com.logsik.timec.dtos.lis;

public class DoctorLISDTO {
	
	private String maBacSi;
	private String tenBacSi;
	
	public String getMaBacSi() {
		return maBacSi;
	}
	public void setMaBacSi(String maBacSi) {
		this.maBacSi = maBacSi;
	}
	public String getTenBacSi() {
		return tenBacSi;
	}
	public void setTenBacSi(String tenBacSi) {
		this.tenBacSi = tenBacSi;
	}
	public DoctorLISDTO(String maBacSi, String tenBacSi) {
		super();
		this.maBacSi = maBacSi;
		this.tenBacSi = tenBacSi;
	}
	public DoctorLISDTO() {
		super();
	}

}
