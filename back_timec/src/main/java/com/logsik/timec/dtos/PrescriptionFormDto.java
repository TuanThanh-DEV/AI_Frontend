package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.Date;

public class PrescriptionFormDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Long createdUserId;
	private Long prescriptionId;
	private Date createdDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreateDate() {
		return createdDate;
	}

	public void setCreateDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Long getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(Long createdUserId) {
		this.createdUserId = createdUserId;
	}

	public Long getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

}
