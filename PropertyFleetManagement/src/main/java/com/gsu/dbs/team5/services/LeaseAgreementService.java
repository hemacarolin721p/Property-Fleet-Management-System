package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.LeaseAgreement;
import com.gsu.dbs.team5.repositories.LeaseAgreementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaseAgreementService {

    private final LeaseAgreementRepository leaseAgreementRepository;

    public LeaseAgreementService(LeaseAgreementRepository leaseAgreementRepository) {
        this.leaseAgreementRepository = leaseAgreementRepository;
    }

    public List<LeaseAgreement> getAllLeaseAgreements() {
        return leaseAgreementRepository.findAll();
    }

    public Optional<LeaseAgreement> getLeaseAgreementById(Integer id) {
        return leaseAgreementRepository.findById(id);
    }

    public LeaseAgreement saveLeaseAgreement(LeaseAgreement leaseAgreement) {
        return leaseAgreementRepository.save(leaseAgreement);
    }

    public void deleteLeaseAgreement(Integer id) {
        leaseAgreementRepository.deleteById(id);
    }
}
