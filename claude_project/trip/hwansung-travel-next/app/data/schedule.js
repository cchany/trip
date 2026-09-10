// 일정 데이터 — 시간/장소가 확정되는 대로 계속 업데이트해주세요.
// day: 0 = 서류함(체크리스트), 1~4 = 일자별 시간순 일정
export const TRIP_NUMBER = 4;
export const TRIP_NAME = "가마쿠라";

export const TABS = [
  { day: 0, label: "서류함" },
  { day: 1, label: "1일차" },
  { day: 2, label: "2일차" },
  { day: 3, label: "3일차" },
  { day: 4, label: "4일차" },
];

// 여권/항공권/숙소 예약 등 서류 체크리스트.
// file 경로에 실제 PDF를 넣어주세요 (public/assets/docs/ 폴더, 파일명 동일하게).
// type: "info" 인 항목은 PDF 대신 아래 parkingInfo 같은 데이터로 팝업을 띄웁니다.
export const documents = [
  { id: "passport", title: "여권 정보", file: "/assets/docs/passport.pdf" },
  { id: "flight", title: "항공권 e-티켓", file: "/assets/docs/flight.pdf" },
  { id: "hotel-shinjuku", title: "숙소 예약 - 신주쿠", file: "/assets/docs/hotel-shinjuku.pdf" },
  { id: "hotel-kamakura", title: "숙소 예약 - 가마쿠라", file: "/assets/docs/hotel-kamakura.pdf" },
  { id: "parking", title: "공항 주차 위치", type: "info" },
];

// 공항 주차 예약 정보 — "공항 주차 위치" 항목을 누르면 팝업으로 표시됩니다.
export const parkingInfo = {
  title: "공항 주차 위치",
  vehicleNumber: "356더7299",
  reservationNumber: "T1IPIA",
  lot: {
    name: "버터플라이시티",
    address: "인천 영종구 흰바위로59번길 8",
  },
  floor: {
    text: "지하 3층 아마노코리아 전용주차장 (입구는 B2에 위치)",
    note: "지정 층수 위반 시 일 3~5만원씩 벌금 부과됩니다.",
  },
  accessCode: {
    text: "없음, 지정 엘레베이터 (GATE B 좌측 엘레베이터) 이용 권장",
  },
  remarks: "B3 자리 없는 경우 B2 아마노코리아 전용주차장 내 주차 가능 (B2 차단기 내부 주차 필수!)",
  schedule: {
    text: "2026년 9월 26일 오전 5시 00분 ~ 2026년 9월 29일 오후 11시 00분",
    note: "예약 시간과 실제 이용 시간이 크게 차이가 나게 될 경우 상담원 연결을 통해 예약 변경을 요청해주세요.",
  },
  payment: {
    total: "31,200원",
    discountLabel: "신규 가입자 쿠폰",
    discount: "-1,560원",
    paid: "29,640원",
    final: "29,640원",
  },
};

// 각 항목: time(시간), title(내용), lat/lng(지도 표시 좌표), query(구글맵에서 열 때 검색할 정확한 장소명 — 이게 있으면 좌표 대신 이 이름으로 검색해서 실제 장소 카드가 뜹니다)
export const scheduleData = {
  1: [
    // 9/26(토) — 인천 출발 → 나리타 도착 → 신주쿠 숙박
    { time: "08:00", title: "인천국제공항 출발", lat: 37.4602, lng: 126.4407, query: "인천국제공항" },
    { time: "11:00", title: "나리타국제공항 도착", lat: 35.76528, lng: 140.38556, query: "나리타 국제공항" },
    { time: "오후", title: "나리타 인근 관광 (장소 미정)", lat: null, lng: null },
    { time: "저녁", title: "신주쿠 숙소 체크인", lat: 35.69056, lng: 139.69944, query: "신주쿠역" },
  ],
  2: [
    // 9/27(일) — 신주쿠 → 가마쿠라 이동(후지사와 환승), 가마쿠라 관광 및 숙박
    { time: "08:00", title: "신주쿠역 출발 (기차)", lat: 35.69056, lng: 139.69944, query: "신주쿠역" },
    { time: "오전~오후", title: "가마쿠라 관광", lat: 35.3187, lng: 139.55194, query: "가마쿠라역" },
    { time: "저녁", title: "가마쿠라 숙소 체크인", lat: 35.3187, lng: 139.55194, query: "가마쿠라역" },
  ],
  3: [
    // 9/28(월) — 이즈 샤보텐 동물공원
    { time: "종일", title: "이즈 샤보텐 동물공원", lat: 34.9071258, lng: 139.1008839, query: "이즈 샤보텐 동물공원" },
  ],
  4: [
    // 9/29(화) — 오전~오후 미정, 저녁 귀국 (나리타 출발 가정)
    { time: "오전~오후", title: "일정 미정", lat: null, lng: null },
    { time: "20:00", title: "귀국 비행 출발 (나리타)", lat: 35.76528, lng: 140.38556, query: "나리타 국제공항" },
    { time: "22:30", title: "인천국제공항 도착", lat: 37.4602, lng: 126.4407, query: "인천국제공항" },
  ],
};

// 참고용 — 아직 일정에 반영되지 않은 경유지(추후 환승 경로 추가 시 사용)
// 후지사와역: 35.338686, 139.487095
