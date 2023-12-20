package com.logsik.timec.dtos;

import java.util.Date;

import com.logsik.timec.enums.Gender;
import com.logsik.timec.enums.QueueNumberStatus;
import com.logsik.timec.enums.QueueType;

public class QueuePatientDto {

	private Long id;
	private String fullName;
	private Gender gender;
	private Date birthday;
	private String phone;
	private String email;
	private String address;
	private String fatherName;
	private String fatherPhone;
	private String motherName;
	private String motherPhone;
	private String code;
	private String note;
	private Date createdDate;
	private String insuranceCode;
	private Long patientId;
	private Date fromDate;
	private Date toDate;
	private Long insuranceTypeId;
	private String nation;
	private Long queueId;
	private Integer theNumber;
	private Date callTime;
	private QueueType type;
	private QueueNumberStatus status;
	private String reasonForReceiving;
	private String formArrived;
	private String packageId;
	private String couponId;
	private String addressBHYT;
	private String addressDKBD;
	private String maDKBD;
	
	public String getInsuranceCode() {
		return insuranceCode;
	}

	public void setInsuranceCode(String insuranceCode) {
		this.insuranceCode = insuranceCode;
	}

	public Long getPatientId() {
		return patientId;
	}

	public void setPatientId(Long patientId) {
		this.patientId = patientId;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public Long getInsuranceTypeId() {
		return insuranceTypeId;
	}

	public void setInsuranceTypeId(Long insuranceTypeId) {
		this.insuranceTypeId = insuranceTypeId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public String getFatherPhone() {
		return fatherPhone;
	}

	public void setFatherPhone(String fatherPhone) {
		this.fatherPhone = fatherPhone;
	}

	public String getMotherName() {
		return motherName;
	}

	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	public String getMotherPhone() {
		return motherPhone;
	}

	public void setMotherPhone(String motherPhone) {
		this.motherPhone = motherPhone;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public Long getQueueId() {
		return queueId;
	}

	public void setQueueId(Long queueId) {
		this.queueId = queueId;
	}

	public Integer getTheNumber() {
		return theNumber;
	}

	public void setTheNumber(Integer theNumber) {
		this.theNumber = theNumber;
	}

	public Date getCallTime() {
		return callTime;
	}

	public void setCallTime(Date callTime) {
		this.callTime = callTime;
	}

	public QueueType getType() {
		return type;
	}

	public void setType(QueueType type) {
		this.type = type;
	}

	public QueueNumberStatus getStatus() {
		return status;
	}

	public void setStatus(QueueNumberStatus status) {
		this.status = status;
	}

	public String getReasonForReceiving() {
		return reasonForReceiving;
	}

	public void setReasonForReceiving(String reasonForReceiving) {
		this.reasonForReceiving = reasonForReceiving;
	}

	public String getFormArrived() {
		return formArrived;
	}

	public void setFormArrived(String formArrived) {
		this.formArrived = formArrived;
	}

	public String getPackageId() {
		return packageId;
	}

	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}

	public String getCouponId() {
		return couponId;
	}

	public void setCouponId(String couponId) {
		this.couponId = couponId;
	}

	public String getAddressBHYT() {
		return addressBHYT;
	}

	public String getAddressDKBD() {
		return addressDKBD;
	}

	public String getMaDKBD() {
		return maDKBD;
	}

	public void setAddressBHYT(String addressBHYT) {
		this.addressBHYT = addressBHYT;
	}

	public void setAddressDKBD(String addressDKBD) {
		this.addressDKBD = addressDKBD;
	}

	public void setMaDKBD(String maDKBD) {
		this.maDKBD = maDKBD;
	}

}
