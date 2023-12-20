package com.logsik.timec.domain;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity(name = "help_comment")
public class HelpComment implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_by", updatable = false,insertable= false)
	private User created ;
	
	@Column(name = "created_by")
	private Long createdBy;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "help_ticket_id", updatable = false,insertable= false)
	private HelpTicket helpTicket ;
	
	@Column(name = "help_ticket_id")
	private Long helpTicketId;
	
	@Lob
	@Column(columnDefinition ="longtext")
	private String content;
	
	@Lob
	@Column(columnDefinition ="longtext")
	private String attachedFiles;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getCreated() {
		return created;
	}

//	public void setCreated(User created) {
//		this.created = created;
//	}

	public Long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}

	public HelpTicket getHelpTicket() {
		return helpTicket;
	}

	public void setHelpTicket(HelpTicket helpTicket) {
		this.helpTicket = helpTicket;
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

	public String getAttachedFiles() {
		return attachedFiles;
	}

	public void setAttachedFiles(String attachedFiles) {
		this.attachedFiles = attachedFiles;
	}

	
	
	
	
}
