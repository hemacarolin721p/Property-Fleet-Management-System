package com.gsu.dbs.team5.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // Enable CORS globally
            .and()
            .csrf().disable()  // Disable CSRF (only in development environment)
            .authorizeHttpRequests()
            .requestMatchers("/api/vehicles/**","/api/service-providers/**","/api/vehicle-logs/**","/api/property-owners/**","/api/properties/**","/api/units/**","/api/visitor-logs/**","/api/staff/**","/api/parking-spots/**","/api/residents/**","/api/access-devices/**","/api/common-areas/**","/api/access-logs/**","/api/lease-agreements/**","/api/maintenance-requests/**").permitAll()  // Allow access to this API for now
            .anyRequest().authenticated();  // Require authentication for all other endpoints

        return http.build();
    }
}
