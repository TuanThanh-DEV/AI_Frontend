package com.logsik.timec.dtos;

public class UserAttendanceSumDto {

	private Double sumWorkHours;

	public Double getSumWorkHours() {
		return sumWorkHours;
	}

	public void setSumWorkHours(Double sumWorkHours) {
		this.sumWorkHours = sumWorkHours;
	}

	public UserAttendanceSumDto(Double sumWorkHours) {
		super();
		this.sumWorkHours = sumWorkHours;
	}

	public UserAttendanceSumDto() {
		super();
	}
	
}
