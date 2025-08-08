package com.springboot.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springboot.entites.Product;

public interface productRepo extends JpaRepository<Product, Long> {

	@Query(value = "SELECT * FROM product WHERE user_id = :userId", nativeQuery = true)
	List<Product> findByUserId(@Param("userId") long userId);




}
