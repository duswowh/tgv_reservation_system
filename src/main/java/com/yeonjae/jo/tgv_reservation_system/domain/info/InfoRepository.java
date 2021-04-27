package com.yeonjae.jo.tgv_reservation_system.domain.info;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoRepository extends JpaRepository<Info, Long> {
    @Query("SELECT p FROM Info p ORDER BY p.id")
    List<Info> findAllDesc();
}