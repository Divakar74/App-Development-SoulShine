package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modal.User;
import com.example.demo.repository.UserRepository;

@Service
public class Userservice {
    @Autowired
    private UserRepository userrepo;

    public User saveuser(User user)
    {
        return userrepo.save(user);
    }
    public List<User> getalluser()
    {
        return userrepo.findAll();
    }
    public Optional<User> findUser(String email,String password)
    {
        return userrepo.findByEmailAndPassword(email, password);
    }
}
