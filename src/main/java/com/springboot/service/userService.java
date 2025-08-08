package com.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.entites.User;
import com.springboot.repo.userRepo;

@Service
public class userService {

    @Autowired
    private JWTService jwtService;
	@Autowired
	private userRepo userrepo;
	
	@Autowired
	private JWTService jwtservice;
	
	@Autowired
	AuthenticationManager authmanager;
	
	  private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

	    public User register(User user) {
	        user.setPassword(encoder.encode(user.getPassword()));
	        userrepo.save(user);
	        return user;
	    }

	    public String verify(User user) {
	        Authentication authentication = authmanager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
	        if (authentication.isAuthenticated()) {
	            return jwtService.generateToken(user.getEmail());
	        } else {
	            return "fail";
	        }
	    }
}
