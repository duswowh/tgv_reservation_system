package com.yeonjae.jo.tgv_reservation_system.web;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/")
    public String main(){
        return "main";
    }
    @GetMapping("/reservation")
    public String toReservation(){
        return "reservation";
    }

    @GetMapping("/confirm")
    public String toConfirm(){
        return "confirm";
    }
}
