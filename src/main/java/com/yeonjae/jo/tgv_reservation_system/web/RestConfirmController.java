package com.yeonjae.jo.tgv_reservation_system.web;

import com.yeonjae.jo.tgv_reservation_system.domain.info.Info;
import com.yeonjae.jo.tgv_reservation_system.domain.reservation.Reservation;
import com.yeonjae.jo.tgv_reservation_system.service.ConfirmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RequiredArgsConstructor
@RestController
public class RestConfirmController {
    private final ConfirmService confirmService;
    @GetMapping("/confirm/{phonenumber}")
    public List<Reservation> confirmByPhonenumber(@PathVariable(value = "phonenumber") String phonenumber){
        return confirmService.findAllDesc(phonenumber);
    }
}
