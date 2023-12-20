package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.timec.enums.DeviceCategory;

public class DeviceDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String code;
	private String name;
	private Long supplierId;
	private DeviceCategory deviceCategory;
	private String madeIn;
	private Date userDate;
	private Date expiredDate;
	private Integer maintenanceCycle;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getSupplierId() {
		return supplierId;
	}
	public void setSupplierId(Long supplierId) {
		this.supplierId = supplierId;
	}
	public DeviceCategory getDeviceCategory() {
		return deviceCategory;
	}
	public void setDeviceCategory(DeviceCategory deviceCategory) {
		this.deviceCategory = deviceCategory;
	}
	public String getMadeIn() {
		return madeIn;
	}
	public void setMadeIn(String madeIn) {
		this.madeIn = madeIn;
	}
	public Date getUserDate() {
		return userDate;
	}
	public void setUserDate(Date userDate) {
		this.userDate = userDate;
	}
	public Date getExpiredDate() {
		return expiredDate;
	}
	public void setExpiredDate(Date expiredDate) {
		this.expiredDate = expiredDate;
	}
	public Integer getMaintenanceCycle() {
		return maintenanceCycle;
	}
	public void setMaintenanceCycle(Integer maintenanceCycle) {
		this.maintenanceCycle = maintenanceCycle;
	}
	
	

}
