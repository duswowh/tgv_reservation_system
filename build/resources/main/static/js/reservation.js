let data;//info table에서 가져온 모든 튜플값
let theaternumberContent = document.getElementById("theaternumberContent");
let movienameContent = document.getElementById("movienameContent");
let starttimeContent = document.getElementById("starttimeContent");
let displaySeat = document.getElementById("displaySeat");
let control = document.getElementById("control");
let langSelect;
let people = 1;//예매 인원 수
let selectedSeatCoordinates;//예매 시 선택한 좌표들을 저장하는 배열
let finalidx;//info table에서 선택한 id값


//좌석선택 및 핸드폰번호 입력 후 예매하기 버튼 눌렀을 경우.
let doReservation = () => {

    //예약인원과 선택좌석수 mismatch일 때
    if(selectedSeatCoordinates.length != people){
        alert("좌석을 선택해 주세요.");
        return;
    }

    //핸드폰번호 유효성검사
    let regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})?[0-9]{3,4}?[0-9]{4}$/;

    if( !regExp.test(document.getElementById("phonenumber").value)) {
        alert("유효하지 않은 핸드폰 번호입니다.");
        return;
    }

    //예매정보 요약하여 alert 띄우기
    //상영관/상영작/상영시간/관람인원/선택좌석/총가격 표기
    let message = "";
    message += "상영관: " + data[finalidx].theaternumber + "관\n"
    message += "상영작: " + data[finalidx].moviename + "\n";
    message += "상영시각: " + data[finalidx].starttime + "\n";
    message += "관람인원: " + people + "\n";
    message += "선택좌석: ";

    let sendseat = "";

    for(let i = 0; i<selectedSeatCoordinates.length; i++){
        let splited = selectedSeatCoordinates[i].split(",");
        let row = String.fromCharCode('A'.charCodeAt() + splited[0]*1);
        let col = splited[1]*1+1;
        message += row + " - " + col + ", ";
        sendseat += row+" - "+ col + "%";
    }
    message += "\n";
    message += "총가격: " + data[finalidx].price * people + "\n";
    message += "예약자 연락처: " + document.getElementById("phonenumber").value + "\n\n";
    message += "위 정보로 예약하시겠습니까?"

    //확인 클릭 시 예약 진행됨
    if(!confirm(message)){
        return;
    }

    //예약정보 객체로 만든다. ajax를 통해 서버로 전달
    let send = {
        //moviename phone price seat starttime, theaternumber
        moviename: data[finalidx].moviename,
        phone: document.getElementById("phonenumber").value,
        price: data[finalidx].price * people,
        seat: sendseat,
        starttime: data[finalidx].starttime,
        theaternumber: data[finalidx].theaternumber
    };

    //예약한 정보를 reservation table에 저장요청한다.
    $.ajax({
        type: 'POST',
        url: '/postReservation',
        dataType: 'json',
        contentType:'application/json; charset=utf-8',
        data: JSON.stringify(send)
    }).done(()=>{

        //저장 완료 후 사용가능한 좌석 정보를 갱신해야 한다.
        //좌석정보가 갱신된 modifiedString 을 얻는다.
        let modifiedString = "";
        let coordinatesIdx = 0;
        for(let i = 0; i<data[finalidx].r; i++){
            for(let j = 0; j<data[finalidx].c; j++){
                if(coordinatesIdx < selectedSeatCoordinates.length && selectedSeatCoordinates[coordinatesIdx] == (i+","+j)){
                    ++coordinatesIdx;
                    modifiedString += 1;
                    continue;
                }
                modifiedString += data[finalidx].seatinfo[i*data[finalidx].c + j];
            }
            
        }

        send = {
            id: finalidx+1,
            modifiedString: modifiedString
        };

        $.ajax({
            type: 'POST',
            url: '/postChangeSeatInfo',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(send)
        }).done(()=>{
            //예매 완료 시 "/"로 이동
            window.location.href="/";
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    }).fail(function (error) {
        alert(JSON.stringify(error));
    });
}


//좌석 버튼 누를 때마다 실행 되는 함수.
//누른 좌석 좌표를 배열에 추가하고 좌석색을 변경한다.
//저장된 좌석좌표들의 갯수가 people보다 클 경우 배열 맨 앞 원소하나를 제거한 후 그 제거한 좌표좌석의 색 되돌린다.
let checkSeat = (id) => {
    
    let targetSeat = document.getElementById(id);
    if(targetSeat.style.backgroundColor == "red") return;
    selectedSeatCoordinates.push(id);
    targetSeat.style.backgroundColor = "red";

    while(selectedSeatCoordinates.length > people){
        let deleted = selectedSeatCoordinates.shift();
        targetSeat = document.getElementById(deleted);
        targetSeat.style.backgroundColor = "";
    }
}

//예매 인원 선택 셀렉트박스에서 값이 바뀔 때 실행되는 함수
//기존에 선택해 놓은 좌석 좌표들을 비우고, 그 좌표들의 색값을 되돌린다.
let chageLangSelect = () => {
    while(selectedSeatCoordinates.length != 0){
        let targetSeat = document.getElementById(selectedSeatCoordinates.shift());
        targetSeat.style.backgroundColor = "";
    }
    people = langSelect.options[langSelect.selectedIndex].value;
    

}

//상영관 버튼 html을 할당해 주는 함수
let display = () => {
    let html = "";
    //상영관 번호 1, 2, 3 을 추출해 내기
    let mySet = new Set();
    for(let i = 0; i<data.length; i++){
        mySet.add(data[i].theaternumber);
    }

    //상영관 1, 2, 3 버튼을 생성한다.
    for(let item of mySet){
        html += "<button onclick=findMovie(" + item + ")>" + item + "</button>";
    }
    //상영관 html 값 할당.
    theaternumberContent.innerHTML = html;
}

//상영관 번호에 해당하는 영화를 찾아 영화 버튼 html을 할당하는 함수
let findMovie = (theaternumber) => {
    //초기화
    selectedSeatCoordinates = [];
    people=1;
    starttimeContent.innerHTML = "";
    displaySeat.innerHTML = "";
    control.innerHTML = "";
    
    //상영관 번호가 일치하는 영화이름 추출
    let mySet = new Set();
    for(let i = 0; i<data.length; i++){
        if(data[i].theaternumber != theaternumber) continue;
        mySet.add(data[i].moviename);
    }
    let html = "";

    //영화 이름으로 버튼 생성
    //영화 이름에 공백이 있을 경우 공백에 #채움
    let regex = / /gi;
    for(let item of mySet){
        html += "<button onclick=findStarttime(" +"'" + item.replace(regex, "#") +"'" + ")>" + item + "</button>";
    }
    
    movienameContent.innerHTML = html;
}

//영화 이름을 가지고 그 영화의 상영시간 버튼 html을 할당하는 함수
let findStarttime = (moviename) => {
    //초기화
    selectedSeatCoordinates = [];
    people=1;
    displaySeat.innerHTML = "";
    control.innerHTML = "";

    //영화이름에 #이 있을 수 있으므로 #을 다시 공백으로 대체
    let regex = /#/gi;
    moviename = moviename.replace(regex, " ");

    let html = "";
    //영화이름이 일치하는 데이터를 찾고
    for(let i = 0; i<data.length; i++){
        if(data[i].moviename != moviename) continue;
        //그 데이터의 좌석정보에서 사용가능좌석 개수를 센다.
        let available = 0;
        for(let j = 0; j<data[i].seatinfo.length; j++){
            if(data[i].seatinfo[j] == 0)
            ++available;
        }

        html += "<button onclick=selSeat(" + i + ")>" + data[i].starttime + " | " + available + "/" + data[i].seatinfo.length +  "</button>";
    }

    starttimeContent.innerHTML = html;
}

//좌석을 그리드 형태로 나타내 주는 함수
let selSeat = (idx) => {
    finalidx = idx;
    selectedSeatCoordinates = [];
    people=1;
    let html = "";
    
    //테이블을 활용해 좌석을 그리드형식으로 표현
    html += "<table><tr>Screen</tr>"
    for(let i = 0; i<data[idx].r; i++){
        html+="<tr>"
        for(let j = 0; j<data[idx].c; j++){
            html+="<td>";
            
            //앉을 수 있는 좌석일 경우 'o' 로 표시, 누를 경우 버튼이벤트 추가
            if(data[idx].seatinfo[i*data[idx].c+j] == 0){
                let id = i +"," + j;
                html += "<button onclick=checkSeat(" + "'" +id+"'" + ") id=" +"'" +id+"'" +">";
                html+="o";
            }
            else {
            //앉을 수 없는 좌석은 'x' 로 표시, onclick 이벤트 없음
                html += "<button>"; 
                html+="x";
            }
            html+="</button></td>";
        }
        html += "</tr>";
    }
    html += "</table>";

    displaySeat.innerHTML = html;

    //좌석 그리드 밑에 표시할 ui들 할당
    //관람인원수 선택하기 위한 셀렉트박스, 핸드폰번호 입력을 위한 input 태그
    html = "";
    html += "<span>관람인원수</span>";
    html += "<select id='id-lang' name='people' onchange='chageLangSelect()'><option value='1' selected='selected'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option></select>"
    html += "<input id='phonenumber' placeholder='01012341234'>";
    html += "<button onclick=doReservation()>예매하기</button>";
    control.innerHTML = html;
    langSelect =  document.getElementById("id-lang");
}


//예매 페이지 최초 로드 시 예매정보(상영관, 상영작, 상영시각 등) 테이블에서 데이터를 전부 받아 온다.
$.ajax({
    type: 'GET',
    url: '/getInfos',
    contentType:'application/json; charset=utf-8'
}).done((d)=>{
    //받아온 데이터 d를 전역 변수 data에 할당
    data = d;
    //최초 선택인 상영관 목록을 출력한다.
    display();
}).fail(function (error) {
    alert(JSON.stringify(error));
});


