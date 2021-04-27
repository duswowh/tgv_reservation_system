package com.yeonjae.jo.tgv_reservation_system.web.dto;

import com.yeonjae.jo.tgv_reservation_system.domain.reservation.Reservation;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ReservationSaveRequestDto {
    private String moviename;
    private String phone;
    private int price;
    private String seat;
    private String starttime;
    private Long theaternumber;

//    public toEntity() {
//        return Reservation.builder()
//                .author(author)
//                .title(title)
//                .content(content)
//                .email(email)
//                .build();
//    }
}
