package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.logsik.timec.domain.Role;
import com.logsik.timec.enums.Gender;
import com.logsik.timec.enums.UserRole;
import com.logsik.timec.enums.UserType;

/**
 * Created by phamcongbang on 16/05/2018.
 */
public class UserDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long id;
	private List<UploadFileResponse> imageUpload = new ArrayList<>();
	private String image;
	private String email;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;
	private UserRole role;
	private String fullName;
	private Date birthday;
	private String phone;
	private String address;
	private String labourContract;
	private int leaveDayYear;
	private boolean lock;
	private boolean active;
	private String note;
	private String rememberToken;
	private Set<Role> roles = new HashSet<>();
	private List<UploadFileResponse> profiles = new ArrayList<>();
	private Long identityCardNumber;
	private Date issuedDate;
	private String issuedAt;
	private Gender gender;
	private String permanentAddress;
	private String currentAddress;
	private Date startWorkDate;
	private String position;
	private int numberOfYear;
	private String jobDescription ;
	private String degree;
	private String trainingPlace;
	private String profession;
	private int graduationYear;
	private String foreignLanguageSkill;
	private String level;
	private String familyInformation;
	private String code;
	private String createdUserEmail;
	private String lastedUpdateUserEmail;
	private Date createdDate;
	private Date lastedUpdateDate;
	private int version;
	private UserType userType;
	
	// UserConfig
	private Long hospitalId;
	private boolean hasSalary;
	private long birthdayFee;
	private long holidayFee;
	private long lunchFee;
	private long diligenceFee;
	private long otherSupportFee;
	private long grossSalary;
	private long incomeTax;
	private String otherSupportFeeNote;
	private String maChungChiHanhNgheBacSi;
	
	public Long getHospitalId() {
		return hospitalId;
	}
	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public List<UploadFileResponse> getImageUpload() {
		return imageUpload;
	}
	public void setImageUpload(List<UploadFileResponse> imageUpload) {
		this.imageUpload = imageUpload;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserRole getRole() {
		return role;
	}
	public void setRole(UserRole role) {
		this.role = role;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getLabourContract() {
		return labourContract;
	}
	public void setLabourContract(String labourContract) {
		this.labourContract = labourContract;
	}
	public int getLeaveDayYear() {
//		return leaveDayYear != null ? leaveDayYear.intValue() : 0;
		return leaveDayYear;
	}
	public void setLeaveDayYear(int leaveDayYear) {
		this.leaveDayYear = leaveDayYear;
	}
	public boolean isLock() {
		return lock;
	}
	public void setLock(boolean lock) {
		this.lock = lock;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getRememberToken() {
		return rememberToken;
	}
	public void setRememberToken(String rememberToken) {
		this.rememberToken = rememberToken;
	}
	
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	public List<UploadFileResponse> getProfiles() {
		return profiles;
	}
	public void setProfiles(List<UploadFileResponse> profiles) {
		this.profiles = profiles;
	}
	public long getIdentityCardNumber() {
		return identityCardNumber != null ? identityCardNumber.longValue() : 0;
	}
	public void setIdentityCardNumber(Long identityCardNumber) {
		this.identityCardNumber = identityCardNumber;
	}
	public Date getIssuedDate() {
		return issuedDate;
	}
	public void setIssuedDate(Date issuedDate) {
		this.issuedDate = issuedDate;
	}
	public String getIssuedAt() {
		return issuedAt;
	}
	public void setIssuedAt(String issuedAt) {
		this.issuedAt = issuedAt;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getPermanentAddress() {
		return permanentAddress;
	}
	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
	}
	public String getCurrentAddress() {
		return currentAddress;
	}
	public void setCurrentAddress(String currentAddress) {
		this.currentAddress = currentAddress;
	}
	public Date getStartWorkDate() {
		return startWorkDate;
	}
	public void setStartWorkDate(Date startWorkDate) {
		this.startWorkDate = startWorkDate;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public int getNumberOfYear() {
//		return numberOfYear != null ? numberOfYear.intValue() : 0;
		return numberOfYear;
	}
	public void setNumberOfYear(int numberOfYear) {
		this.numberOfYear = numberOfYear;
	}
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getTrainingPlace() {
		return trainingPlace;
	}
	public void setTrainingPlace(String trainingPlace) {
		this.trainingPlace = trainingPlace;
	}
	public String getProfession() {
		return profession;
	}
	public void setProfession(String profession) {
		this.profession = profession;
	}
	public int getGraduationYear() {
//		return graduationYear != null ? graduationYear.intValue() : 0;
		return graduationYear;
	}
	public void setGraduationYear(int graduationYear) {
		this.graduationYear = graduationYear;
	}
	public String getForeignLanguageSkill() {
		return foreignLanguageSkill;
	}
	public void setForeignLanguageSkill(String foreignLanguageSkill) {
		this.foreignLanguageSkill = foreignLanguageSkill;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getFamilyInformation() {
		return familyInformation;
	}
	public void setFamilyInformation(String familyInformation) {
		this.familyInformation = familyInformation;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCreatedUserEmail() {
		return createdUserEmail;
	}
	public void setCreatedUserEmail(String createdUserEmail) {
		this.createdUserEmail = createdUserEmail;
	}
	public String getLastedUpdateUserEmail() {
		return lastedUpdateUserEmail;
	}
	public void setLastedUpdateUserEmail(String lastedUpdateUserEmail) {
		this.lastedUpdateUserEmail = lastedUpdateUserEmail;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getLastedUpdateDate() {
		return lastedUpdateDate;
	}
	public void setLastedUpdateDate(Date lastedUpdateDate) {
		this.lastedUpdateDate = lastedUpdateDate;
	}
	public int getVersion() {
//		return version != null ? version.intValue() : 0;
		return version;
	}
	public void setVersion(int version) {
		this.version = version;
	}
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public boolean isHasSalary() {
		return hasSalary;
	}
	public void setHasSalary(boolean hasSalary) {
		this.hasSalary = hasSalary;
	}
	public long getBirthdayFee() {
		return birthdayFee;
	}
	public void setBirthdayFee(long birthdayFee) {
		this.birthdayFee = birthdayFee;
	}
	public long getHolidayFee() {
		return holidayFee;
	}
	public void setHolidayFee(long holidayFee) {
		this.holidayFee = holidayFee;
	}
	public long getLunchFee() {
		return lunchFee;
	}
	public void setLunchFee(long lunchFee) {
		this.lunchFee = lunchFee;
	}
	public long getDiligenceFee() {
		return diligenceFee;
	}
	public void setDiligenceFee(long diligenceFee) {
		this.diligenceFee = diligenceFee;
	}
	public long getOtherSupportFee() {
		return otherSupportFee;
	}
	public void setOtherSupportFee(long otherSupportFee) {
		this.otherSupportFee = otherSupportFee;
	}
	public long getGrossSalary() {
		return grossSalary;
	}
	public void setGrossSalary(long grossSalary) {
		this.grossSalary = grossSalary;
	}
	public long getIncomeTax() {
		return incomeTax;
	}
	public void setIncomeTax(long incomeTax) {
		this.incomeTax = incomeTax;
	}
	public String getOtherSupportFeeNote() {
		return otherSupportFeeNote;
	}
	public void setOtherSupportFeeNote(String otherSupportFeeNote) {
		this.otherSupportFeeNote = otherSupportFeeNote;
	}
	public String getMaChungChiHanhNgheBacSi() {
		return maChungChiHanhNgheBacSi;
	}
	public void setMaChungChiHanhNgheBacSi(String maChungChiHanhNgheBacSi) {
		this.maChungChiHanhNgheBacSi = maChungChiHanhNgheBacSi;
	}
	
}
