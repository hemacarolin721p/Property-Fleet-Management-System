package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.ServiceProvider;
import com.gsu.dbs.team5.entities.ServiceProviderId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, ServiceProviderId> {
    // Custom query methods can be added here if needed
}
