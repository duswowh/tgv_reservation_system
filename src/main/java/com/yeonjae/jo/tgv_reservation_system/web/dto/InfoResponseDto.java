package com.yeonjae.jo.tgv_reservation_system.web.dto;

public class InfoResponseDto {
    private Long id;
    private Long theaternumber;
    private Long r;
    private Long c;
    private String moviename;
    private int price;
    private String starttime;

    public InfoResponseDto(Long id, Long theaternumber, Long r, Long c, String moviename, int price, String starttime) {
        this.id = id;
        this.theaternumber = theaternumber;
        this.r = r;
        this.c = c;
        this.moviename = moviename;
        this.price = price;
        this.starttime = starttime;
    }
}
