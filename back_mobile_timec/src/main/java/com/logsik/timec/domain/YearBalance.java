package com.logsik.timec.domain;

import java.io.Serializable;
import java.util.Date;

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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity(name = "year_balance")
public class YearBalance implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Access(AccessType.PROPERTY)
	private Long id;

	@Column(name = "date")
	@Temporal(TemporalType.DATE)
	private Date date;

	@Column(name = "company_name")
	private String companyName;
	@Column(name = "code")
	private String code;

	@Column(name = "address")
	private String address;

	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	@Column(name = "has_validated")
	private boolean hasValidated = false;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "validated_by", updatable = false, insertable = false)
	private User validatedBy;

	@Column(name = "validated_by")
	private Long validatedById;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public boolean isHasValidated() {
		return hasValidated;
	}

	public void setHasValidated(boolean hasValidated) {
		this.hasValidated = hasValidated;
	}

	public User getValidatedBy() {
		return validatedBy;
	}

	public void setValidatedBy(User validatedBy) {
		this.validatedBy = validatedBy;
	}

	public Long getValidatedById() {
		return validatedById;
	}

	public void setValidatedById(Long validatedById) {
		this.validatedById = validatedById;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	
	
	

}
