package com.springboot.service;

import java.util.Properties;

import org.springframework.stereotype.Service;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.InternetAddress;

@Service
public class MailSenderService {

	
	 private final String fromEmail = "rk6522484@gmail.com";
	    private final String password = "";


	    public void sendEmail(String toEmail, String subject, String messageText) {
	        Properties props = new Properties();

	        props.put("mail.smtp.auth", "true");
	        props.put("mail.smtp.starttls.enable", "true");
	        props.put("mail.smtp.host", "smtp.gmail.com");
	        props.put("mail.smtp.port", "587");

	        Session session = Session.getInstance(props, new Authenticator() {
	            protected PasswordAuthentication getPasswordAuthentication() {
	                return new PasswordAuthentication(fromEmail, password);
	            }
	        });

	        try {
	        	System.out.println(toEmail);
	            Message message = new MimeMessage(session);
	            message.setFrom(new InternetAddress(fromEmail));
	            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
	            message.setSubject(subject);
	            message.setText(messageText);

	            Transport.send(message);
	            System.out.println("Email sent to: " + toEmail);
	        } catch (MessagingException e) {
	            throw new RuntimeException("Failed to send email", e);
	        }
	    }

	    }
	    
