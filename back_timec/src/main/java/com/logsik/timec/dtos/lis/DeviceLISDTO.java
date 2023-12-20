package com.logsik.timec.dtos.lis;

public class DeviceLISDTO {

	private String maThietBi;
	private String tenThietBi;
	
	public String getMaThietBi() {
		return maThietBi;
	}
	public void setMaThietBi(String maThietBi) {
		this.maThietBi = maThietBi;
	}
	public String getTenThietBi() {
		return tenThietBi;
	}
	public void setTenThietBi(String tenThietBi) {
		this.tenThietBi = tenThietBi;
	}
	
	public DeviceLISDTO(String maThietBi, String tenThietBi) {
		super();
		this.maThietBi = maThietBi;
		this.tenThietBi = tenThietBi;
	}
	public DeviceLISDTO() {
		super();
	}
	
}
