package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.PrescriptionReviewStatus;

public class PrescriptionReviewDto {
	
	private Long id;
	private Long reviewerId;
	private Long prescriptionId;
	private Long doctorId;
	private Integer score;
	private Date createdDate;
	private Date dueDate;
	private Date finishDate;
	private String note;
	private PrescriptionReviewStatus status;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getReviewerId() {
		return reviewerId;
	}
	public void setReviewerId(Long reviewerId) {
		this.reviewerId = reviewerId;
	}
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public Long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}
	public Date getFinishDate() {
		return finishDate;
	}
	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public PrescriptionReviewStatus getStatus() {
		return status;
	}
	public void setStatus(PrescriptionReviewStatus status) {
		this.status = status;
	}
	
}
