let phonenumber = document.getElementById("phonenumber");
let confirm = document.getElementById("confirm");
let result = document.getElementById("result");

confirm.addEventListener("click", () => {

    let regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})?[0-9]{3,4}?[0-9]{4}$/;

    if( !regExp.test(phonenumber.value)) {
        alert("유효하지 않은 핸드폰 번호입니다.");
        return;
    }

    $.ajax({
        type: 'GET',
        url: '/confirm/' + phonenumber.value,
        dataType: 'json',
        contentType:'application/json; charset=utf-8',
    }).done((confirmInfo)=>{
        regex = /%/gi;
        let message = "총 " + confirmInfo.length + "건의 예매가 있습니다.<br><br>";
        for(let i = 0; i<confirmInfo.length; i++){
            confirmInfo[i].seat = confirmInfo[i].seat.replace(regex, ", ");
            message += "-------------" + (i+1) + " 번 예약건-------------<br>";
            message += "상영관: " + confirmInfo[i].theaternumber + "관<br>";
            message += "상영작: " + confirmInfo[i].moviename + "<br>";
            message += "상영시각: " + confirmInfo[i].starttime + "<br>";
            message += "예약좌석: " + confirmInfo[i].seat + "<br>";
            message += "예약금액: " + confirmInfo[i].price + "<br>";
            message += "예약자 연락처: " + confirmInfo[i].phone + "<br><br>";
        }
        
        result.innerHTML = message;
    }).fail(function (error) {
        alert(JSON.stringify(error));
    });

});
