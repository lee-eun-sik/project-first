$(document).ready(function () {
  loginChecka();
  let regionCodes = [];
  let mapx = 37.5665; // 서울 초기 좌표
  let mapy = 126.978; // 서울 초기 좌표
  let myChart;
  // 지역데이터//////////////////////////////////////////////////////////
  function updateRegion(region) {
    switch (region) {
      case "서울":
        regionCodes = ["918", "901"];
        break;
      case "경기":
        regionCodes = ["901", "919"];
        break;
      case "강원":
        regionCodes = ["918", "902"];
        break;
      case "충청":
        regionCodes = ["907", "958", "903"];
        break;
      case "경상":
        regionCodes = ["906", "905", "908", "915"];
        break;
      case "전라":
        regionCodes = ["927", "928", "904"];
        break;
      default:
        regionCodes = [];
    }
  }
  // 교통 데이터//////////////////////////////////////////////////////////////
  function fetchTrafficData() {
    const requests = regionCodes.map(function (code) {
      return $.ajax({
        url: "https://data.ex.co.kr/openapi/trafficapi/trafficRegion",
        type: "GET",
        data: {
          key: "3762609281",
          type: "json",
          numOfRows: 99,
          pageNo: 1,
          regionCode: code,
          inoutType: 0,
        },
        dataType: "json",
      });
    });

    $.when
      .apply($, requests)
      .done(function () {
        const responses = [].slice.call(arguments).map(function (response) {
          return response[0]; // 각 AJAX 응답의 첫 번째 인자
        });
        console.log("응답 데이터:", responses); // 응답 데이터 확인
        let totalTraffic = [];
        let traffic = 0;
        let name = [];
        for (let j = 0; j < responses.length; j++) {
          let response = responses[j];
          for (let k = 0; k < response.trafficRegion.length; k++) {
            let item = response.trafficRegion[k];
            traffic += parseInt(item.trafficAmout) || 0;
          }

          totalTraffic[j] = traffic;
          name[j] = response.trafficRegion[0].regionName;
        }
        console.log("총 교통량 데이터:", totalTraffic); // 추가: 교통량 데이터 확인
        console.log("지역 이름:", name); // 추가: 지역 이름 확인
        let backgroundColors = [];
        let borderColors = [];
        function getRandomColor() {
          let r = Math.floor(Math.random() * 256);
          let g = Math.floor(Math.random() * 256);
          let b = Math.floor(Math.random() * 256);
          return "rgba(" + r + ", " + g + ", " + b + ")";
        }

        for (let i = 0; i < name.length; i++) {
          backgroundColors.push(getRandomColor());
          borderColors.push("black");
        }

        if (myChart) {
          myChart.destroy();
        }
        // 차트 생성/////////////////////////////////////////////////////////////////
        let ctx = document.getElementById("myChart").getContext("2d");
        myChart = new Chart(ctx, {
          type: "bar", // 차트 종류를 bar로 설정
          data: {
            labels: name, // x축 레이블
            datasets: [
              {
                label: "교통량",
                data: totalTraffic, // 각 막대의 데이터 값
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true, // 반응형 설정
            aspectRatio: 0.78,
            scales: {
              y: {
                beginAtZero: true, // y축을 0부터 시작
              },
            },
          },
        });
      })
      .fail(function () {
        console.error("API 요청 중 오류 발생");
        $("#result").text("API 요청 중 오류 발생");
      });
  }

  $(document).on("change", "#areaCode", function () {
    $("#bardiv").show();
    let region = $("#areaCode").val();
    updateRegion(region); // 지역에 맞는 regionCodes 업데이트
    fetchTrafficData(); // 교통 데이터 요청
    updateRegionm(region); // 지도에 표시할 좌표지정
    sessionStorage.setItem("region", region);
  });

  //1. 버튼 선택시 값이 넘어가게함
  function updateRegionm(region) {
    switch (region) {
      case "서울":
        mapx = 37.5665;
        mapy = 126.978;
        break;
      case "경기":
        mapx = 37.2636;
        mapy = 127.0286;
        break;
      case "강원":
        mapx = 37.8836;
        mapy = 127.7295;
        break;
      case "충청":
        mapx = 36.3504;
        mapy = 127.3845;
        break;
      case "경상":
        mapx = 35.8714;
        mapy = 128.6014;
        break;
      case "전라":
        mapx = 35.824;
        mapy = 127.148;
        break;
      default:
        mapx = 37.5665;
        mapy = 126.978;
    }
    let newCenter = new kakao.maps.LatLng(mapx, mapy);
    map.setCenter(newCenter); // 지도 중심을 새로운 좌표로 이동
  }

  let mapContainer = document.getElementById("map"),
    mapOption = {
      center: new kakao.maps.LatLng(mapx, mapy),
      level: 5,
    };
  let map = new kakao.maps.Map(mapContainer, mapOption);
  function updateMapCenter() {
    let newCenter = new kakao.maps.LatLng(mapx, mapy);
    map.setCenter(newCenter); // 지도 중심을 새로운 좌표로 이동
  }

  // 최초 로드 시에 지도 초기화
  updateMapCenter();

  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
});
