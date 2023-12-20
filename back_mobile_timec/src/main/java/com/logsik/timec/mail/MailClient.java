package com.logsik.timec.mail;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.logsik.timec.domain.User;

/**
 * Created by phamcongbang on 14/05/2018.
 */
@Service
public class MailClient {
	private static final Logger LOGGER = LoggerFactory.getLogger(MailClient.class);

	@Value("${spring.production.url}")
    private String productionUrl;
	
	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private MailContentBuilder mailContentBuilder;

	private static String emailFrom = "noreply@tamancons.com";

	/**
	 * TEST method
	 */
	public Boolean prepareAndSend(String recipient, String subject, String message) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			messageHelper.setTo(recipient);
			messageHelper.setSubject(subject);

			// String content = mailContentBuilder.build(message);
			Map<String, Object> variables = new HashMap<>();
			variables.put("message", message);
			// variables.put("brand", brandDto); // TODO: put table price here
			String content = mailContentBuilder.buildVariables("mailTemplate", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			System.out.println(e.getMessage());
			return false;
		}
	}

	public Boolean sendValidationLeaveEmail( User user, User approvedBy) {
		MimeMessagePreparator messagePreparator = mimeMessage -> {
			MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
			messageHelper.setFrom(emailFrom);
			messageHelper.setTo(approvedBy.getEmail());
			messageHelper.setSubject("Duyệt đơn xin nghỉ phép " + user.getFullName());
			messageHelper.setReplyTo(emailFrom);
			Map<String, Object> variables = new HashMap<>();
			variables.put("welcomeMessage", "Xin chào " + approvedBy.getFullName() + ",");
			variables.put("staff", user);

			// TODO: Hash the id to hide information
			String content = mailContentBuilder.buildVariables("validateLeave", variables);
			messageHelper.setText(content, true);
		};
		try {
			mailSender.send(messagePreparator);
			return true;
		} catch (MailException e) {
			// runtime exception; compiler will not force you to handle it
			LOGGER.error("Cannot send validation email. " + e.getMessage());
			return false;
		}
	}

}
