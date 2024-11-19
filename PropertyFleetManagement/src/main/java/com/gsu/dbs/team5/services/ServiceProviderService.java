package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.ServiceProvider;
import com.gsu.dbs.team5.entities.ServiceProviderId;
import com.gsu.dbs.team5.repositories.ServiceProviderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceProviderService {

    private final ServiceProviderRepository serviceProviderRepository;

    public ServiceProviderService(ServiceProviderRepository serviceProviderRepository) {
        this.serviceProviderRepository = serviceProviderRepository;
    }

    public List<ServiceProvider> getAllServiceProviders() {
        return serviceProviderRepository.findAll();
    }

    public Optional<ServiceProvider> getServiceProviderById(ServiceProviderId id) {
        return serviceProviderRepository.findById(id);
    }

    public ServiceProvider saveServiceProvider(ServiceProvider serviceProvider) {
        return serviceProviderRepository.save(serviceProvider);
    }

    public void deleteServiceProvider(ServiceProviderId id) {
        serviceProviderRepository.deleteById(id);
    }
}
