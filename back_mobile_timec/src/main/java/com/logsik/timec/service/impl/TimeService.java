package com.logsik.timec.service.impl;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TimeService {
	public Long getTime(Time referenceTime) {
		return referenceTime.getHours() * 3600l + referenceTime.getMinutes() * 60l + referenceTime.getSeconds();
	}

	public Date getLastDayOfMonth(Date referenceDate) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceDate);

		calendar.add(Calendar.MONTH, 1);
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.add(Calendar.DATE, -1);
		truncateTime(calendar);

		Date lastDayOfMonth = calendar.getTime();

		return lastDayOfMonth;

	}

	public Date getLastDayOfMonth(Integer month, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.YEAR, year);
		truncateTime(calendar);
		return getLastDayOfMonth(calendar.getTime());
	}

	public Date getFirstDayOfMonth(Date referenceDate) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceDate);

		calendar.set(Calendar.DAY_OF_MONTH, 1);
		truncateTime(calendar);

		Date firstDayOfMonth = calendar.getTime();

		return firstDayOfMonth;

	}

	public Date getFirstDayOfMonth(Integer month, Integer year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.YEAR, year);
		truncateTime(calendar);
		return getFirstDayOfMonth(calendar.getTime());
	}

	private void truncateTime(Calendar calendar) {
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
	}

	public Integer getYear(Date referenceYear) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceYear);

		Integer year = calendar.get(Calendar.YEAR);

		return year;

	}

	public Integer getMonth(Date referenceMonth) {

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(referenceMonth);

		Integer month = calendar.get(Calendar.MONTH) + 1;

		return month;

	}

	public Date addDays(Date currentDate, Integer days) {
		Calendar c = Calendar.getInstance();
		c.setTime(currentDate);
		c.add(Calendar.DATE, days);
		return c.getTime();
	}

	public Date getFirstDayOfYear() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 1);
		calendar.set(Calendar.MONTH, 0);
		calendar.set(Calendar.YEAR, getYear(new Date()));
		return calendar.getTime();
	}

	public Date getLastDayOfYear() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, 31);
		calendar.set(Calendar.MONTH, 11);
		calendar.set(Calendar.YEAR, getYear(new Date()));
		return calendar.getTime();

	}

	public Date getStartOfDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 0, 0, 0);
		return calendar.getTime();
	}

	public Date getEndOfDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DATE);
		calendar.set(year, month, day, 23, 59, 59);
		return calendar.getTime();
	}

	public List<Date> getDaysBetweenDates(Date startdate, Date enddate) {
		List<Date> dates = new ArrayList<Date>();
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(startdate);

		while (calendar.getTime().before(enddate)) {
			Date result = calendar.getTime();
			dates.add(result);
			calendar.add(Calendar.DATE, 1);
		}
		return dates;
	}

}
