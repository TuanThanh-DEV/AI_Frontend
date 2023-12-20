/*
 * Copyright 2012-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.logsik.timec.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

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
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.validator.constraints.Email;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.logsik.timec.enums.Gender;
import com.logsik.timec.enums.UserRole;
import com.logsik.timec.enums.UserType;

@Entity(name = "user_table")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Access(AccessType.PROPERTY)
	private Long id;
	
	@Column
	private String image;

	@Column
	@Email
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Column
	private String password;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private UserRole role;

	@Column(length = 255)
	private String fullName;

	@Column
	@Temporal(TemporalType.DATE)
	private Date birthday;

	@Column(length = 255)
	private String phone;

	@Column(length = 1024)
	private String address;
	
	@Column
	private String labourContract;
	
	@Column
	private int leaveDayYear;
	
	@Column
	private boolean isLock = false;

	@Column
	private boolean isActive = false;
	
	@Lob
	@Column(columnDefinition = "longtext")
	private String note;

	@Column(length = 100)
	private String rememberToken;
	
	 
	 
	 @Column(name = "identity_card_number")
	 private long identityCardNumber;
	 
	 @Column(name = "issued_date")
	 @Temporal(TemporalType.DATE)
	 private Date issuedDate;
	 
	 @Column(name = "issued_at")
	 private String issuedAt;
	 
	 @Column(name = "gender")
	 @Enumerated(EnumType.STRING)
	 private Gender gender;
	 
	 @Lob               
	 @Column(name = "permanent_address", columnDefinition = "longtext")
	 private String permanentAddress;
	 
	 @Lob
	 @Column(name = "current_address",columnDefinition = "longtext")
	 private String currentAddress;
	 
	 @Column(name = "start_work_date")
	 @Temporal(TemporalType.DATE)
	 private Date startWorkDate;
	 
	 @Column(name = "position")
	 private String position;
	 
	 @Column(name = "number_of_year")
	 private int numberOfYear;
	 
	 @Lob
	 @Column(name = "job_description", columnDefinition = "longtext")
	 private String jobDescription ;
	 
	 @Column(name = "degree")
	 private String degree;
	 
	 @Column(name = "training_place")
	 private String trainingPlace;
	 
	 @Column(name = "profession")
	 private String profession;
	 
	 @Column(name = "graduation_year")
	 private int graduationYear;
	 
	 @Column(name = "foreign_language_skill")
	 private String foreignLanguageSkill;
	 
	 @Column(name = "level")
	 private String level ;
	 
	 @Lob
	 @Column(name = "family_information",columnDefinition = "longtext")
	 private String familyInformation;
	 
	 @Column(name = "code")
	 private String code ;
	 
	 @Column
	 private String createdUserEmail;
	 
	 @Column
	 private String lastedUpdateUserEmail;
	 
	 @Column
	 @Temporal(TemporalType.DATE)
	 private Date createdDate;
	 
	 @Column
	 @Temporal(TemporalType.DATE)
	 private Date lastedUpdateDate;
	 
	 @Column
	 private Integer version;
	 
	 @ManyToOne(fetch=FetchType.LAZY)
	 @JoinColumn(name="hospital_id", updatable = false,insertable= false)
	 private Hospital hospital;
	 
	 @Column(name="hospital_id")
	 private Long hospitalId;

	 @Column
	 @Enumerated(EnumType.STRING)
	 private UserType userType;
	 
	 @ManyToMany
	 @JoinTable(name = "user_role",
	 		joinColumns = @JoinColumn(name = "user_id"),
	        inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles;
	 
	 @ManyToMany
	 @JoinTable(name = "user_department",
	 		joinColumns = @JoinColumn(name = "user_id"),
	        inverseJoinColumns = @JoinColumn(name = "department_id"))
	private Set<Department> departments;
	 
//	 @OneToOne
//	 private UserConfig userConfig;
	 

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
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
		return leaveDayYear;
	}


	public void setLeaveDayYear(int leaveDayYear) {
		this.leaveDayYear = leaveDayYear;
	}


	public boolean isLock() {
		return isLock;
	}


	public void setLock(boolean isLock) {
		this.isLock = isLock;
	}


	public boolean isActive() {
		return isActive;
	}


	public void setActive(boolean isActive) {
		this.isActive = isActive;
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


	public long getIdentityCardNumber() {
		return identityCardNumber;
	}


	public void setIdentityCardNumber(long identityCardNumber) {
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


	public Integer getVersion() {
		return version;
	}


	public void setVersion(Integer version) {
		this.version = version;
	}


	public UserType getUserType() {
		return userType;
	}


	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public Hospital getHospital() {
		return hospital;
	}


//	public void setHospital(Hospital hospital) {
//		this.hospital = hospital;
//	}


	public Set<Department> getDepartments() {
		return departments;
	}


	public void setDepartments(Set<Department> departments) {
		this.departments = departments;
	}


	public Long getHospitalId() {
		return hospitalId;
	}


	public void setHospitalId(Long hospitalId) {
		this.hospitalId = hospitalId;
	}


//	public UserConfig getUserConfig() {
//		return userConfig;
//	}
//
//
//	public void setUserConfig(UserConfig userConfig) {
//		this.userConfig = userConfig;
//	}
	
	
	
}
