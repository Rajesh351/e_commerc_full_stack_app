package com.springboot.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.springboot.entites.User;
import com.springboot.repo.userRepo;

@Service
public class myUserDetailsService implements UserDetailsService {

	 @Autowired
	    private userRepo userRepository;

	 @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		 User user = userRepository.findByEmail(email)
		            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

		        return new UserPrincipal(user);
	    }
}
