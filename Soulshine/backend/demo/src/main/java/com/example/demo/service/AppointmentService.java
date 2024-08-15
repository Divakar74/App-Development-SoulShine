package com.example.demo.service;

import com.example.demo.modal.Appointment;
import com.example.demo.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment createAppointment(Appointment appointment) {
        // Here, you can add any additional business logic if needed
        return appointmentRepository.save(appointment);
    }

    // Add more methods as needed for other operations
}
