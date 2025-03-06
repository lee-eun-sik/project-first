let callCheck = false;
$(document).ready(function () {
  let loginstatus = sessionStorage.getItem("loginstatus");
  let name = localStorage.getItem("name");

  // header.html 로드 후 로그인 상태 확인
  $("#header").load("header.html", function () {
    if (loginstatus === "true") {
      // 로그인 상태일 때
      $("#login, #join").hide(); // 로그인 & 회원가입 버튼 숨김
      $("#welcome-text").text(`${name}님, 환영합니다!`).show(); // 환영 메시지 표시
      $("#logout").show(); // 로그아웃 버튼 표시
      pageopt();
    } else {
      // 로그아웃 상태일 때
      $("#login, #join").show(); // 로그인 & 회원가입 버튼 표시
      $("#welcome-text, #logout").hide(); // 환영 메시지 & 로그아웃 버튼 숨김
      pageopt();
    }
    if (callCheck) {
      timingcheck();
    }
  });
  $("#headerhome").load("headerhome.html", function () {
    if (loginstatus === "true") {
      // 로그인 상태일 때
      $("#login, #join").hide(); // 로그인 & 회원가입 버튼 숨김
      $("#welcome-text").text(`${name}님, 환영합니다!`).show(); // 환영 메시지 표시
      $("#logout").show(); // 로그아웃 버튼 표시
    } else {
      // 로그아웃 상태일 때
      $("#login, #join").show(); // 로그인 & 회원가입 버튼 표시
      $("#welcome-text, #logout").hide(); // 환영 메시지 & 로그아웃 버튼 숨김
    }
  });
  $("#headertraffic").load("headertraffic.html", function () {
    if (loginstatus === "true") {
      // 로그인 상태일 때
      $("#login, #join").hide(); // 로그인 & 회원가입 버튼 숨김
      $("#welcome-text").text(`${name}님, 환영합니다!`).show(); // 환영 메시지 표시
      $("#logout").show(); // 로그아웃 버튼 표시
    } else {
      // 로그아웃 상태일 때
      $("#login, #join").show(); // 로그인 & 회원가입 버튼 표시
      $("#welcome-text, #logout").hide(); // 환영 메시지 & 로그아웃 버튼 숨김
    }
  });
  // 로그아웃 버튼 클릭 이벤트
  $(document).on("click", "#logout", function () {
    sessionStorage.setItem("loginstatus", "false");
    alert("로그아웃되었습니다.");
    window.location.href = "Home.html";
  });
});
function dataPass() {
  sessionStorage.setItem("stdRestCd",this.stdRestCd);
}
function loginCheck(name) {
  let loginstatus = sessionStorage.getItem("loginstatus") === "true";
  if (loginstatus == true) {
    move(name);
  } else {
    alert("로그인을 해주세요.");
  }
}
function move(name) {
  // 현재 페이지와 이동할 페이지가 다르면 데이터 초기화
  let currentPage = sessionStorage.getItem("pagestatus");
  if (currentPage !== name) {
    sessionStorage.removeItem("travelList"); // 여행 데이터 초기화
    sessionStorage.removeItem("selectedAreaCode"); // 선택한 지역 초기화
    sessionStorage.removeItem("selectedCourseCode"); // 선택한 코스 초기화
  }

  sessionStorage.setItem("pagestatus", name);
  window.location.href = `${name}.html`;
}
function loginChecka() {
  let loginstatus = sessionStorage.getItem("loginstatus") === "true";
  if (loginstatus != true) {
    alert("로그인을 해주세요.");
    window.location.href = "Home.html";
  }
}

function pageopt() {
  let pagestatus = sessionStorage.getItem("pagestatus");
  if (pagestatus === "여행코스") {
    $("#opt7,#opt8,#opt9,#opt10").hide();
    $("#opt1").val("C0112").text("#가족코스");
    $("#opt2").val("C0113").text("#나홀로코스");
    $("#opt3").val("C0114").text("#힐링코스");
    $("#opt4").val("C0115").text("#도보코스");
    $("#opt5").val("C0116").text("#캠핑코스");
    $("#opt6").val("C0117").text("#맛코스");
  } else if (pagestatus === "숙박") {
    $("#opt1").val("B02010100").text("#관광호텔");
    $("#opt2").val("B02010500").text("#콘도미니엄");
    $("#opt3").val("B02010600").text("#유스호스텔");
    $("#opt4").val("B02010700").text("#펜션");
    $("#opt5").val("B02010900").text("#모텔");
    $("#opt6").val("B02011000").text("#민박");
    $("#opt7").val("B02011100").text("#게스트하우스");
    $("#opt8").val("B02011200").text("#홈스테이");
    $("#opt9").val("B02011300").text("#서비스드레지던스");
    $("#opt10").val("B02011600").text("#한옥");
  } else if (pagestatus === "축제공연") {
    $("#opt3,#opt4,#opt5,#opt6,#opt7,#opt8,#opt9,#opt10").hide();
    $("#opt1").val("A0207");
    $("#opt1").text("#축제");
    $("#opt2").val("A0208");
    $("#opt2").text("#공연/행사");
  } else if (pagestatus === "음식점") {
    $("#opt7,#opt8,#opt9,#opt10").hide();
    $("#opt1").val("A05020100").text("#한식");
    $("#opt2").val("A05020200").text("#서양식");
    $("#opt3").val("A05020300").text("#일식");
    $("#opt4").val("A05020400").text("#중식");
    $("#opt5").val("A05020700").text("#이색음식점");
    $("#opt6").val("A05020900").text("#카페/전통찻집");
  } else if (pagestatus === "문화시설") {
    $("#opt4,#opt5,#opt6,#opt7,#opt8,#opt9,#opt10").hide();
    $("#opt1").val("A0202").text("#아쿠아리움");
    $("#opt2").val("A0203").text("#문화센터");
    $("#opt3").val("A0206").text("#전시관");
  } else if (pagestatus === "관광지") {
    $("#opt4,#opt5,#opt6,#opt7,#opt8,#opt9,#opt10").hide();
    $("#opt1").val("A0101").text("#자연관광지");
    $("#opt2").val("A0102").text("#인문(문화/역사)관광지");
    $("#opt3").val("A0103").text("#체험관광지");  
  } else if (pagestatus === "레포츠") {
    $("#opt5,#opt6,#opt7,#opt8,#opt9,#opt10").hide();
    $("#opt1").val("A0302").text("#육상레포츠");
    $("#opt2").val("A0303").text("#수상레포츠");
    $("#opt3").val("A0304").text("#항공레포츠");
    $("#opt4").val("A0305").text("#복합레포츠");
  } else {
  }
}
// 페이지 벨류에 따라서 보기 바꾸고
// 페이지 벨류에 따라서 보기 갯수도 바꾸기
