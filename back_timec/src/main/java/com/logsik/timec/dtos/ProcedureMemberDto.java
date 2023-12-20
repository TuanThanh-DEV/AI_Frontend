package com.logsik.timec.dtos;

import com.logsik.timec.enums.ProcedureMemberRole;

public class ProcedureMemberDto {
	
	private Long id;
	private ProcedureMemberRole role;
	private Long procedureReportId;
	private Long userId;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public ProcedureMemberRole getRole() {
		return role;
	}
	public void setRole(ProcedureMemberRole role) {
		this.role = role;
	}
	public Long getProcedureReportId() {
		return procedureReportId;
	}
	public void setProcedureReportId(Long procedureReportId) {
		this.procedureReportId = procedureReportId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
}
