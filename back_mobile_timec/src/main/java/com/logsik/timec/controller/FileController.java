package com.logsik.timec.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.dtos.UploadFileResponse;
import com.logsik.timec.service.impl.DiagnosisReportService;
import com.logsik.timec.service.impl.FileStorageService;
import com.logsik.timec.service.impl.ImageStorageService;

// https://www.callicoder.com/spring-boot-file-upload-download-rest-api-example/
// TODO: check security, only login user can upload, download files.

@RestController
@RequestMapping("/api")
public class FileController extends AbstractController {

	private static final Logger logger = LoggerFactory.getLogger(FileController.class);
// Start Autowired StorageService
	
	
	@Autowired
	private FileStorageService fileStorageService;
	
	@Autowired
	private ImageStorageService imageStorageService;
	
	@Autowired
	private DiagnosisReportService diagnosisReportService;
	

	
// End Autowired StorageService
	// *******************************************Start User Profile File****************************************************

	// Upload Labour ContractController
	public UploadFileResponse uploadUserProfile(MultipartFile file) {
		String fileName = fileStorageService.storeFile(file);
		String api = "/api/downloadUserProfile/";
		String fileDownloadUri = api + fileName;

		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}
	// End Upload Labour File ContractController

//    @PostMapping("/uploadFile")

	@RequestMapping(value = "/uploadUserProfile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadUserProfileFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadUserProfile(file));
	}

	@PostMapping("/uploadMultipleUserProfileFiles")
	public RestResult uploadMultipleUserProfileFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadUserProfile(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadUserProfile/{fileName:.+}")
	public ResponseEntity<Resource> downloadUserProfileFile(@PathVariable String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = fileStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End User Profile File*********************************************************

	// *******************************************Start User Image File****************************************************

	public UploadFileResponse uploadUserImage(MultipartFile file) {
		String fileName = imageStorageService.storeFile(file);
		String api = "/api/downloadUserImage/";
		String fileDownloadUri = api + fileName;
		return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

	}

	@RequestMapping(value = "/uploadUserFile", method = RequestMethod.POST, consumes = "multipart/form-data")
	public RestResult uploadUserImageFile(@RequestParam("file") MultipartFile file) {
		return new RestResult(uploadUserImage(file));
	}

	@PostMapping("/uploadMultipleImageFiles")
	public RestResult uploadMultipleUserImageFiles(@RequestParam("files") MultipartFile[] files) {
		List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadUserImage(file))
				.collect(Collectors.toList());
		return new RestResult(result);
	}

	@GetMapping("/downloadUserImage/{fileName:.+}")
	public ResponseEntity<Resource> downloadUserImageFile(@PathVariable String fileName, HttpServletRequest request) {
		// Load file as Resource
		Resource resource = imageStorageService.loadFileAsResource(fileName);

		// Try to determine file's content type
		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} catch (IOException ex) {
			logger.info("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
	// *******************************************End User Image File****************************************************

	//TODO : UPLOAD file DiagnosisReport
	public UploadFileResponse uploadDiagnosisReportFileResponse(MultipartFile file) {
	String fileName = diagnosisReportService.storeFile(file);
	String api = "/api/downloadDiagnosisReportFile/";
	String fileDownloadUri = api + fileName;
	return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());

}

@RequestMapping(value = "/uploadDiagnosisReportFile", method = RequestMethod.POST, consumes = "multipart/form-data")
public RestResult uploadDiagnosisReportReportFile(@RequestParam("file") MultipartFile file) {
	return new RestResult(uploadDiagnosisReportFileResponse(file));
}

@PostMapping("/uploadMultipleDiagnosisReportFiles")
public RestResult uploadMultipleDiagnosisReportFiles(@RequestParam("files") MultipartFile[] files) {
	List<UploadFileResponse> result = Arrays.asList(files).stream().map(file -> uploadDiagnosisReportFileResponse(file))
			.collect(Collectors.toList());
	return new RestResult(result);
}

@GetMapping("/downloadDiagnosisReportFile/{fileName:.+}")
public ResponseEntity<Resource> downloadDiagnosisReportFile(@PathVariable String fileName,
		HttpServletRequest request) {
	// Load file as Resource
	Resource resource = diagnosisReportService.loadFileAsResource(fileName);

	// Try to determine file's content type
	String contentType = null;
	try {
		contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
	} catch (IOException ex) {
		logger.info("Could not determine file type.");
	}

	// Fallback to the default content type if type could not be determined
	if (contentType == null) {
		contentType = "application/octet-stream";
	}

	return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
			.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
			.body(resource);
}

}
