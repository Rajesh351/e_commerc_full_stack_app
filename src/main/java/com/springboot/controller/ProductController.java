package com.springboot.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.springboot.entites.Product;
import com.springboot.entites.User;
import com.springboot.repo.userRepo;
import com.springboot.repo.productRepo;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private userRepo userRepository;

    @Autowired
    private productRepo productRepository;

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping(value = "/add_product")
    public ResponseEntity<String> addProduct(
    		 @RequestBody  MultipartFile image,
            @RequestPart String name,
            @RequestPart String price,
            @RequestPart String description
           ,
            Principal principal) {

    	try {
			String email = principal.getName();
	        User user = userRepository.findByEmail(email)
	               .orElseThrow(() -> new RuntimeException("User not found"));
		 Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
		String imageUrl = uploadResult.get("secure_url").toString();
	        Product product = new Product();
	      
	        product.setName(name);
	        product.setPrice(Double.parseDouble(price));  // ✅ Parse price
	        product.setDescription(description);
	        product.setImageUrl( imageUrl );
	        product.setUser(user);
	        user.getProducts().add(product);
	        userRepository.save(user);
	        return ResponseEntity.ok("Product added successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to add product: " + e.getMessage());		}


    }
    
    @GetMapping("/getall")
    public List<Product>getallproducts()
    {
    	return productRepository.findAll();
    }
    @GetMapping("/{id}")
    public List<Product> getById(@PathVariable long id) {
        List<Product> products=productRepository.findByUserId(id);
        
        return products;
    }

}
