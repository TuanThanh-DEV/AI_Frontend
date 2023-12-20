package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

import com.logsik.timec.enums.FieldType;

public class PreTemplateFieldDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String itemKey;
	private String suggestedList;
	private FieldType fieldType;
	private int ranking;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getItemKey() {
		return itemKey;
	}
	public void setItemKey(String itemKey) {
		this.itemKey = itemKey;
	}
	public String getSuggestedList() {
		return suggestedList;
	}
	public void setSuggestedList(String suggestedList) {
		this.suggestedList = suggestedList;
	}
	public int getRanking() {
		return ranking;
	}
	public void setRanking(int ranking) {
		this.ranking = ranking;
	}
	public FieldType getFieldType() {
		return fieldType;
	}
	public void setFieldType(FieldType fieldType) {
		this.fieldType = fieldType;
	}
	
	
}
