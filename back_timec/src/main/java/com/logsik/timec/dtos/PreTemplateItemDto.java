package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class PreTemplateItemDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long preTemplateTd;
	private Long preTemplateFieldId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPreTemplateTd() {
		return preTemplateTd;
	}
	public void setPreTemplateTd(Long preTemplateTd) {
		this.preTemplateTd = preTemplateTd;
	}
	public Long getPreTemplateFieldId() {
		return preTemplateFieldId;
	}
	public void setPreTemplateFieldId(Long preTemplateFieldId) {
		this.preTemplateFieldId = preTemplateFieldId;
	}
	
	
}
