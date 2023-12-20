package com.logsik.timec.dtos;

public class ShortCodeDto {

	private Long id;
	private Long userId;
	private String shortcode;
	private String replaceText;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getShortcode() {
		return shortcode;
	}
	public void setShortcode(String shortcode) {
		this.shortcode = shortcode;
	}
	public String getReplaceText() {
		return replaceText;
	}
	public void setReplaceText(String replaceText) {
		this.replaceText = replaceText;
	}
	
}
