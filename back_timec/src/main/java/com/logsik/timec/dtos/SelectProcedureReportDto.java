package com.logsik.timec.dtos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class SelectProcedureReportDto  implements Serializable {

	private static final long serialVersionUID = 1L;
	private Long prescriptionId;
	private List<Long> listProcedureServiceIds = new ArrayList<Long>();
	
	public Long getPrescriptionId() {
		return prescriptionId;
	}
	public void setPrescriptionId(Long prescriptionId) {
		this.prescriptionId = prescriptionId;
	}
	public List<Long> getListProcedureServiceIds() {
		return listProcedureServiceIds;
	}
	public void setListProcedureServiceIds(List<Long> listProcedureServiceIds) {
		this.listProcedureServiceIds = listProcedureServiceIds;
	}

}
