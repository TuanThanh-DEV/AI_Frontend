package com.logsik.timec.service.impl;

import org.springframework.stereotype.Service;

@Service
public class ImageStorageService extends AbstractFileStorageService {
	
	@Override
	protected String getFileStorageLocation() {
		return "./imageUpload";
	}

} 