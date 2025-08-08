package com.springboot.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.entites.User;
import java.util.Optional;


public interface userRepo extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);  // Use Optional for null-safety
}
