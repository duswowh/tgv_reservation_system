package com.yeonjae.jo.tgv_reservation_system.service;

import com.yeonjae.jo.tgv_reservation_system.domain.info.Info;
import com.yeonjae.jo.tgv_reservation_system.domain.reservation.Reservation;
import com.yeonjae.jo.tgv_reservation_system.domain.reservation.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class ConfirmService {
    private final ReservationRepository reservationRepository;

    public List<Reservation> findAllDesc(String phonenumber){
        List<Reservation> ret = new ArrayList<>();
        List<Reservation> all = reservationRepository.findAllDesc();
        for(Reservation k : all){
            if(k.getPhone().equals(phonenumber)){
                ret.add(k);
            }
        }
        return ret;
    }
}
