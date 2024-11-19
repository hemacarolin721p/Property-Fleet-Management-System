package com.gsu.dbs.team5.controllers;

import com.gsu.dbs.team5.entities.CommonArea;
import com.gsu.dbs.team5.entities.CommonAreaId;
import com.gsu.dbs.team5.services.CommonAreaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")  // Explicitly allow CORS for this controller
@RestController
@RequestMapping("/api/common-areas")
public class CommonAreaController {

    private final CommonAreaService commonAreaService;

    public CommonAreaController(CommonAreaService commonAreaService) {
        this.commonAreaService = commonAreaService;
    }

    @GetMapping
    public List<CommonArea> getAllCommonAreas() {
        return commonAreaService.getAllCommonAreas();
    }

    @GetMapping("/{propertyId}/{areaName}")
    public ResponseEntity<CommonArea> getCommonAreaById(@PathVariable int propertyId, @PathVariable String areaName) {
        CommonAreaId id = new CommonAreaId(propertyId, areaName);
        return commonAreaService.getCommonAreaById(id)
                .map(commonArea -> ResponseEntity.ok(commonArea))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CommonArea> createCommonArea(@RequestBody CommonArea commonArea) {
        CommonArea savedCommonArea = commonAreaService.saveCommonArea(commonArea);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCommonArea);
    }

    @DeleteMapping("/{propertyId}/{areaName}")
    public ResponseEntity<Void> deleteCommonArea(@PathVariable int propertyId, @PathVariable String areaName) {
        CommonAreaId id = new CommonAreaId(propertyId, areaName);
        commonAreaService.deleteCommonArea(id);
        return ResponseEntity.noContent().build();
    }
}
