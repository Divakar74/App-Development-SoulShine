package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modal.User;
import com.example.demo.service.Userservice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    public Userservice userservice;

    @PostMapping("/users")
    public User registerUser(@RequestBody User user) {
        return userservice.saveuser(user);
    }

    @GetMapping("/userstttt")
    public List<User> getAlluser() {
        return userservice.getalluser();
    }

    @PostMapping("/user/login")
    public Optional<User> getCredential(@RequestBody User loginRequest) {
        return userservice.findUser(loginRequest.getEmail(), loginRequest.getPassword());
    }

    @GetMapping("/user/login/{email}/{password}")
    public ResponseEntity<User> getCredential(@PathVariable String email, @PathVariable String password) {
        Optional<User> user = userservice.findUser(email, password);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
    }
}
