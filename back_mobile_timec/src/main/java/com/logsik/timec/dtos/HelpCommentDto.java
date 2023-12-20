package com.logsik.timec.dtos;

import java.io.Serializable;

public class HelpCommentDto implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long createdBy;
	private Long helpTicketId;
	private String content;
	private String attachediles;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}
	public Long getHelpTicketId() {
		return helpTicketId;
	}
	public void setHelpTicketId(Long helpTicketId) {
		this.helpTicketId = helpTicketId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAttachediles() {
		return attachediles;
	}
	public void setAttachediles(String attachediles) {
		this.attachediles = attachediles;
	}
	
	
}
