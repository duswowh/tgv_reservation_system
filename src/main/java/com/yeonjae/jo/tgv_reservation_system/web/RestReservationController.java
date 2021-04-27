package com.yeonjae.jo.tgv_reservation_system.web;

import com.yeonjae.jo.tgv_reservation_system.domain.info.Info;
import com.yeonjae.jo.tgv_reservation_system.domain.reservation.Reservation;
import com.yeonjae.jo.tgv_reservation_system.service.ReservationService;
import com.yeonjae.jo.tgv_reservation_system.web.dto.ModifiedSeatDto;
import com.yeonjae.jo.tgv_reservation_system.web.dto.ReservationSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class RestReservationController {
    private final ReservationService reservationService;
    @GetMapping("/getInfos")
    public List<Info> getInfos(){
        return reservationService.findAllDesc();
    }

    @PostMapping("/postReservation")
    public boolean postReservation(@RequestBody Reservation reservation){
        reservationService.save(reservation);
        return true;
    }
    @PostMapping("/postChangeSeatInfo")
    public Info postChangeSeatInfo(@RequestBody ModifiedSeatDto modifiedSeatDto){
         return reservationService.update(modifiedSeatDto);
    }


}
