package com.yeonjae.jo.tgv_reservation_system.domain.reservation;

import com.yeonjae.jo.tgv_reservation_system.domain.info.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT p FROM Reservation p ORDER BY p.id")
    List<Reservation> findAllDesc();
}
