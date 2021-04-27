package com.yeonjae.jo.tgv_reservation_system.service;

import com.yeonjae.jo.tgv_reservation_system.domain.info.Info;
import com.yeonjae.jo.tgv_reservation_system.domain.info.InfoRepository;
import com.yeonjae.jo.tgv_reservation_system.domain.reservation.Reservation;
import com.yeonjae.jo.tgv_reservation_system.domain.reservation.ReservationRepository;
import com.yeonjae.jo.tgv_reservation_system.web.dto.ModifiedSeatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@RequiredArgsConstructor
@Service
public class ReservationService {
    private final InfoRepository infoRepository;
    private final ReservationRepository reservationRepository;
    public List<Info> findAllDesc(){
        return infoRepository.findAllDesc();
    }

    public void save(Reservation reservation){
        reservationRepository.save(reservation);
    }

    @Transactional
    public Info update(ModifiedSeatDto modifiedSeatDto){
        Info info = infoRepository.findById(modifiedSeatDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 id가 없습니다."));
        return info.update(
                modifiedSeatDto.getModifiedString());
    }
}
