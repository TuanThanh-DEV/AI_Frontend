package com.logsik.timec.dtos;

import java.io.Serializable;

import com.logsik.timec.enums.StatusHelpTicket;

public class HelpTicketDto implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long id;
	private Long assigneeId;
	private Long reporterId;
	private String question;
	private StatusHelpTicket status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getAssigneeId() {
		return assigneeId;
	}
	public void setAssigneeId(Long assigneeId) {
		this.assigneeId = assigneeId;
	}
	public Long getReporterId() {
		return reporterId;
	}
	public void setReporterId(Long reporterId) {
		this.reporterId = reporterId;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public StatusHelpTicket getStatus() {
		return status;
	}
	public void setStatus(StatusHelpTicket status) {
		this.status = status;
	}
	
	
	
	
}
