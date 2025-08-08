package com.springboot.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.springboot.entites.User;
import com.springboot.repo.userRepo;
import com.springboot.service.MailSenderService;
import com.springboot.service.userService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

	@Autowired
	private userRepo userRepository;

	@Autowired
	private userService userservice;
	@Autowired
	private Cloudinary cloudinary;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private MailSenderService mailSenderService;

	@PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> registerUser(@RequestPart("name") String name, @RequestPart("email") String email,
			@RequestPart("password") String password, @RequestPart("image") MultipartFile image) {

		try {
			Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
			String imageUrl = uploadResult.get("secure_url").toString();
			User user = new User();
			user.setName(name);
			user.setEmail(email);
			user.setProfileImage(imageUrl);
			user.setPassword(passwordEncoder.encode(password));
			userRepository.save(user);
			String subject = "Welcome to E-Commerce App!";
            String body = "Hi " + name + ",\n\nThank you for registering.\n\nRegards,\nE-Commerce Team";
            mailSenderService.sendEmail(email, subject, body);

			return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong"+e.getMessage());

		}

	}

	@GetMapping
	public String show() {
		return "This is home page";
	}

	@PostMapping("/login")
	public List<String>login(@RequestBody User user) {

		 try {
		        List<String> data = new ArrayList<>();
		        String token = userservice.verify(user);
		        data.add(token);

		        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
		        User user1 = optionalUser.get();
		        data.add(user1.getEmail());
		        data.add(user1.getName());
		        data.add(user1.getProfileImage());
		        data.add(user1.getId().toString());
		        return data;
		    } catch (Exception e) {
		        return new ArrayList<>();
		    }
	    	       
	}


	@PostMapping("/api/logout")
	public ResponseEntity<?> logout() {
		// JWT is stateless: we can't "log out" server-side unless blacklisting
		return ResponseEntity.ok("Logout successful. Token should be deleted on client.");
	}

	@PostMapping("/raj")
	public Optional<User> showraje(Principal principal) {
		String str = principal.getName();
		return userRepository.findByEmail(str);
	}
	@PostMapping("/forgot")
	public ResponseEntity<String> ForgotPassword(@RequestBody User user)
	{
		Optional<User>optionalUser=userRepository.findByEmail(user.getEmail());
		if (optionalUser.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is not registered");
	    }

	    User user1 = optionalUser.get();
	    user1.setPassword(passwordEncoder.encode(user.getPassword()));
	    userRepository.save(user1);
		String subject = "Welcome to E-Commerce App!";
        String body = "Hi " + user.getEmail() + ",\n\nThank you for updating passowrd.\n\nRegards,\nE-Commerce Team";
        mailSenderService.sendEmail(user.getEmail(), subject, body);
	    return ResponseEntity.status(HttpStatus.ACCEPTED).body("Password updated successfully");
		
	}
	

}
