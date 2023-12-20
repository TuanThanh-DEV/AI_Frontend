package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class SelectDiagnosisReportDto implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private Long prescrioptionId;
	private List<Long> listDiagnosisServiceIds = new ArrayList<Long>();
	public Long getPrescrioptionId() {
		return prescrioptionId;
	}
	public void setPrescrioptionId(Long prescrioptionId) {
		this.prescrioptionId = prescrioptionId;
	}
	public List<Long> getListDiagnosisServiceIds() {
		return listDiagnosisServiceIds;
	}
	public void setListDiagnosisServiceIds(List<Long> listDiagnosisServiceIds) {
		this.listDiagnosisServiceIds = listDiagnosisServiceIds;
	}

}
