package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.LeaseAgreement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaseAgreementRepository extends JpaRepository<LeaseAgreement, Integer> {
    // Additional custom query methods can be defined here if needed
}
