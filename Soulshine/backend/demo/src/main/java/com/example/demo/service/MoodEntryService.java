package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.modal.MoodEntry;
import com.example.demo.repository.MoodEntryRepository;

import java.util.List;

@Service
public class MoodEntryService {

    @Autowired
    private MoodEntryRepository repository;

    public List<MoodEntry> getAllMoodEntries() {
        return repository.findAll();
    }

    public MoodEntry createMoodEntry(MoodEntry moodEntry) {
        return repository.save(moodEntry);
    }
}
