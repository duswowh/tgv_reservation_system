package com.yeonjae.jo.tgv_reservation_system.domain.reservation;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String moviename;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String seat;
    @Column(nullable = false)
    private String starttime;
    @Column(nullable = false)
    private Long theaternumber;

    @Builder
    public Reservation(Long theaternumber, String moviename, String phone, int price, String starttime, String seat){
        this.theaternumber = theaternumber;
        this.moviename = moviename;
        this.phone = phone;
        this.price = price;
        this.starttime = starttime;
        this.seat = seat;
    }
}
