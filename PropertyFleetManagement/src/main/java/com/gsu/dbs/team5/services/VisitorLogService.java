package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.VisitorLog;
import com.gsu.dbs.team5.repositories.VisitorLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VisitorLogService {

    private final VisitorLogRepository visitorLogRepository;

    public VisitorLogService(VisitorLogRepository visitorLogRepository) {
        this.visitorLogRepository = visitorLogRepository;
    }

    public List<VisitorLog> getAllVisitorLogs() {
        return visitorLogRepository.findAll();
    }

    public Optional<VisitorLog> getVisitorLogById(Integer id) {
        return visitorLogRepository.findById(id);
    }

    public VisitorLog saveVisitorLog(VisitorLog visitorLog) {
        return visitorLogRepository.save(visitorLog);
    }

    public void deleteVisitorLog(Integer id) {
        visitorLogRepository.deleteById(id);
    }
}
