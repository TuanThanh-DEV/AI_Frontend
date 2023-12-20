package com.logsik.timec.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

import com.logsik.timec.enums.StatusHelpTicket;

@Entity(name = "help_ticket")
public class HelpTicket implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "reporter_id", updatable = false,insertable= false)
	private User reporter;
	
	@Column(name = "reporter_id")
	private Long reporterId;
	
	
	
	@Lob
	@Column(columnDefinition ="longtext")
	private String question;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "assignee_id", updatable = false,insertable= false)
	private User assignee;
	
	@Column(name = "assignee_id")
	private Long assigneeId;

	@Column(columnDefinition = "enum('OPEN', 'PLANNED', 'QA', 'DONE')")
	@Enumerated(EnumType.STRING)
	private StatusHelpTicket status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getReporter() {
		return reporter;
	}

//	public void setReporter(User reporter) {
//		this.reporter = reporter;
//	}

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

	public User getAssignee() {
		return assignee;
	}

	public void setAssignee(User assignee) {
		this.assignee = assignee;
	}

	public Long getAssigneeId() {
		return assigneeId;
	}

	public void setAssigneeId(Long assigneeId) {
		this.assigneeId = assigneeId;
	}

	public StatusHelpTicket getStatus() {
		return status;
	}

	public void setStatus(StatusHelpTicket status) {
		this.status = status;
	}

	

}
