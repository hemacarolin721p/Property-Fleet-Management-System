package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.AccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessLogRepository extends JpaRepository<AccessLog, Integer> {
    // Custom query methods can be added here if needed
}
