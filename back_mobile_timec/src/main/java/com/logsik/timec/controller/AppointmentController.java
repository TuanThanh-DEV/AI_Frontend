package com.logsik.timec.controller;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logsik.timec.domain.Appointment;
import com.logsik.timec.dtos.AppointmentDto;
import com.logsik.timec.dtos.RestResult;
import com.logsik.timec.queries.AppointmentSpecification;
import com.logsik.timec.repository.AppointmentRepository;
import com.logsik.timec.service.impl.DtoConverter;
import com.logsik.timec.service.impl.TimeService;



@RestController
@RequestMapping("/api")
public class AppointmentController extends AbstractController {
	private static final Logger LOGGER = LoggerFactory.getLogger(Appointment.class);

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private DtoConverter dtoConverter;

	@Autowired
	private TimeService timeService;

	@RequestMapping("appointment/{id}")
	public RestResult findById(@PathVariable(value = "id") Long id) {
		return new RestResult(appointmentRepository.findOne(id));
	}

	@RequestMapping(value = "/appointment/add", method = RequestMethod.POST)
	public RestResult add(@RequestBody AppointmentDto appointmentDto) {
		try {
			Appointment appointment = dtoConverter.convertToAppointment(appointmentDto);
			Appointment newappointment = appointmentRepository.save(appointment);
			return new RestResult(newappointment);
		} catch (Exception e) {
			LOGGER.error("Error when adding Appointment.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@RequestMapping(value = "/appointment/update", method = RequestMethod.POST)
	public RestResult update(@RequestBody AppointmentDto appointmentDto) {
		try {
			Appointment updated = appointmentRepository.save(dtoConverter.convertToAppointment(appointmentDto));
			return new RestResult(updated);
		} catch (Exception e) {
			LOGGER.error("Error when updating appointment.", e);
			return new RestResult(true, MESSAGE_CANNOT_SAVE);
		}
	}

	@DeleteMapping("/appointment/{id}")
	public RestResult delete(@PathVariable("id") Long id) throws Exception {
		System.out.println("Delete appointment with ID = " + id + "...");

		try {
			appointmentRepository.delete(id);
		} catch (Exception e) {
			LOGGER.error("Error when delete appointment.", e);
			return new RestResult(true, MESSAGE_CANNOT_DELETE);
		}
		return new RestResult("ok");
	}

	@RequestMapping(value = "/appointment/list")
	public RestResult list(@RequestParam("search") String search, Pageable pageable) {
		Object result;
		if (StringUtils.isEmpty(search)) {
			result = appointmentRepository.findAll(pageable);
		} else {
			result = appointmentRepository.findByStatusContaining(search, pageable);
		}

		return new RestResult(result);
	}


	@RequestMapping(value = "/appointmentMobile/listFindCurrentUser")
	public RestResult listByPatientId() {
		return new RestResult(appointmentRepository.findByPatientId(getCurrentUser().getId()));

	}
	
	@RequestMapping(value = "/appointment/listByCurrentUser")
	public RestResult listByCurrentUser() {
		Date startOfToday = timeService.getStartOfDay(new Date());
		Date endOfTommorow = timeService.getEndOfDay(timeService.addDays(new Date(), 1));
		return new RestResult(appointmentRepository.findByUserIdAndAppointDateGreaterThanAndAppointDateLessThan(
				getCurrentUser().getId(), startOfToday, endOfTommorow));

	}

	@RequestMapping(value = "/appointment/count")
	public RestResult count() {
		return new RestResult(appointmentRepository.count());

	}

	@RequestMapping(value = "/appointment/listFindByAppointmentDateBetween")
	public RestResult listFindByAppointmentDateBetween(

			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date fromDate,

			@DateTimeFormat(pattern = "yyyy-MM-dd-HH:mm:ss") Date toDate,
			@RequestParam("doctorNameOrPatientName") String doctorNameOrPatientName, Pageable pageable) {
		Page<Appointment> result = appointmentRepository
				.findAll(new AppointmentSpecification(timeService.getStartOfDay(fromDate),
						timeService.getEndOfDay(toDate), doctorNameOrPatientName), pageable);
		return new RestResult(result);

	}

	@RequestMapping(value = "/appointment/listAll")
	public RestResult listAll() {
		return new RestResult(appointmentRepository.findAll());
	}

	@RequestMapping(value = "/appointment/listFindByPrescriptionId")
	public RestResult listFindByPrescriptionId(@RequestParam("prescriptionId") Long prescriptionId) {
		return new RestResult(appointmentRepository.findByPrescriptionId(prescriptionId));

	}
}