package com.logsik.timec.dtos;

public class ConfigTableDTO {

	private Long id;
	private String configCode;
	private Long configValue;
	private Long updatedById;
	private String description;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getConfigCode() {
		return configCode;
	}
	public void setConfigCode(String configCode) {
		this.configCode = configCode;
	}
	public Long getConfigValue() {
		return configValue;
	}
	public void setConfigValue(Long configValue) {
		this.configValue = configValue;
	}
	public Long getUpdatedById() {
		return updatedById;
	}
	public void setUpdatedById(Long updatedById) {
		this.updatedById = updatedById;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
