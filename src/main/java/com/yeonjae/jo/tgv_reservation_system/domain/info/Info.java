package com.yeonjae.jo.tgv_reservation_system.domain.info;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Info {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long theaternumber;

    @Column(nullable=false)
    private Long r;
    @Column(nullable=false)
    private Long c;

    @Column(nullable = false)
    private String moviename;
    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String starttime;

    @Column(nullable = false)
    private String seatinfo;

    @Builder
    public Info(Long theaternumber, Long r, Long c, String moviename, int price, String starttime, String seatinfo){
        this.theaternumber = theaternumber;
        this.r = r;
        this.c = c;
        this.moviename = moviename;
        this.price = price;
        this.starttime = starttime;
        this.seatinfo = seatinfo;
    }
    public Info update(String modifiedString){
        this.seatinfo = modifiedString;
        return this;
    }
}
