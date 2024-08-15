package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.modal.MoodEntry;
import com.example.demo.service.MoodEntryService;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/api/mood-entries")
public class MoodEntryController {
    @Autowired
    private MoodEntryService moodEntryService;

    @GetMapping
    public List<MoodEntry> getAllMoodEntries() {
        return moodEntryService.getAllMoodEntries();
    }

    @PostMapping
    public MoodEntry createMoodEntry(@RequestBody MoodEntry moodEntry) {
        return moodEntryService.createMoodEntry(moodEntry);
    }
}
