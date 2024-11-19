package com.gsu.dbs.team5.repositories;

import com.gsu.dbs.team5.entities.CommonArea;
import com.gsu.dbs.team5.entities.CommonAreaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommonAreaRepository extends JpaRepository<CommonArea, CommonAreaId> {
    // Custom query methods can be added here if needed
}
