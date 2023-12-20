package com.logsik.timec.service.impl;

import org.springframework.stereotype.Service;

@Service
public class DiagnosisReportService extends AbstractFileStorageService {
	
	@Override
	protected String getFileStorageLocation() {
		return "./diagnosisReportUpload";
	}

}
