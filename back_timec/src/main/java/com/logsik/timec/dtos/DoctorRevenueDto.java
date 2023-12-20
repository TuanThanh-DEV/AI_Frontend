package com.logsik.timec.dtos;

import java.io.Serializable;

public class DoctorRevenueDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long serviceId;
	private String serviceName;
	private Long servicePrice = 0L;
	private Long quantity;
	private String unitName = "Ca";
	private Long unitCommission = 0L;
	private Long totalCommission = 0L;
	
	public DoctorRevenueDto(Long quantity, Long serviceId, String serviceName, Long servicePrice) {
		this.quantity = quantity;
		this.setServiceId(serviceId);
		this.serviceName = serviceName;
		this.setServicePrice(servicePrice);
		
	}
	
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public Long getQuantity() {
		return quantity;
	}
	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public Long getUnitCommission() {
		return unitCommission;
	}
	public void setUnitCommission(Long unitCommission) {
		this.unitCommission = unitCommission;
	}
	public Long getTotalCommission() {
		return totalCommission;
	}
	public void setTotalCommission(Long totalCommission) {
		this.totalCommission = totalCommission;
	}

	public Long getServiceId() {
		return serviceId;
	}

	public void setServiceId(Long serviceId) {
		this.serviceId = serviceId;
	}

	public Long getServicePrice() {
		return servicePrice;
	}

	public void setServicePrice(Long servicePrice) {
		this.servicePrice = servicePrice;
	}
}
