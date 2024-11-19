package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.AccessLog;
import com.gsu.dbs.team5.repositories.AccessLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccessLogService {

    private final AccessLogRepository accessLogRepository;

    public AccessLogService(AccessLogRepository accessLogRepository) {
        this.accessLogRepository = accessLogRepository;
    }

    public List<AccessLog> getAllAccessLogs() {
        return accessLogRepository.findAll();
    }

    public Optional<AccessLog> getAccessLogById(int accessLogId) {
        return accessLogRepository.findById(accessLogId);
    }

    public AccessLog saveAccessLog(AccessLog accessLog) {
        return accessLogRepository.save(accessLog);
    }

    public void deleteAccessLog(int accessLogId) {
        accessLogRepository.deleteById(accessLogId);
    }
}
