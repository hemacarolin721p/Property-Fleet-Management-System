package com.gsu.dbs.team5.services;

import com.gsu.dbs.team5.entities.CommonArea;
import com.gsu.dbs.team5.entities.CommonAreaId;
import com.gsu.dbs.team5.repositories.CommonAreaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommonAreaService {

    private final CommonAreaRepository commonAreaRepository;

    public CommonAreaService(CommonAreaRepository commonAreaRepository) {
        this.commonAreaRepository = commonAreaRepository;
    }

    public List<CommonArea> getAllCommonAreas() {
        return commonAreaRepository.findAll();
    }

    public Optional<CommonArea> getCommonAreaById(CommonAreaId id) {
        return commonAreaRepository.findById(id);
    }

    public CommonArea saveCommonArea(CommonArea commonArea) {
        return commonAreaRepository.save(commonArea);
    }

    public void deleteCommonArea(CommonAreaId id) {
        commonAreaRepository.deleteById(id);
    }
}
