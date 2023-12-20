package com.logsik.timec.repository;

import java.util.List;

import com.logsik.timec.domain.FileUpload;

public interface FileUploadRepository extends BaseRepository<FileUpload, Long> {
	List<FileUpload> findByCrmTableNameAndCrmLinkId(String crmTableName, Long crmId);

}
