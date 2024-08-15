package com.example.demo.modal;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "moodentries")
public class MoodEntry {

   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "selected_mood")
    private String selectedMood;

    @Column(name = "selected_weather")
    private String selectedWeather;

    @Column(name = "selected_social")
    private String selectedSocial;

    @Column(name = "selected_miscellaneous")
    private String selectedMiscellaneous;

    @Column(name = "journal")
    private String journal;

    @Column(name = "created_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSelectedMood() {
        return selectedMood;
    }

    public void setSelectedMood(String selectedMood) {
        this.selectedMood = selectedMood;
    }

    public String getSelectedWeather() {
        return selectedWeather;
    }

    public void setSelectedWeather(String selectedWeather) {
        this.selectedWeather = selectedWeather;
    }

    public String getSelectedSocial() {
        return selectedSocial;
    }

    public void setSelectedSocial(String selectedSocial) {
        this.selectedSocial = selectedSocial;
    }

    public String getSelectedMiscellaneous() {
        return selectedMiscellaneous;
    }

    public void setSelectedMiscellaneous(String selectedMiscellaneous) {
        this.selectedMiscellaneous = selectedMiscellaneous;
    }

    public String getJournal() {
        return journal;
    }

    public void setJournal(String journal) {
        this.journal = journal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    
}
