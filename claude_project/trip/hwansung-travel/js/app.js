// =========================================================
// 여행 앱 Project — 가마쿠라
// 서버 없이 순수 정적 파일로 동작 (오프라인 사용 가능)
// =========================================================

(function () {
  const screens = document.querySelectorAll('.screen');

  function showScreen(id) {
    screens.forEach((s) => s.classList.toggle('active', s.id === id));
  }

  // ---------- 화면 1 → 2 : Yes 클릭 ----------
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  if (btnYes) btnYes.addEventListener('click', () => showScreen('screen-confirm'));
  // NO 버튼 동작은 아직 미정 — 우선 같은 화면 유지 (추후 문구/애니메이션 추가 가능)
  if (btnNo) btnNo.addEventListener('click', () => { /* TODO: NO 눌렀을 때 동작 정의 */ });

  // ---------- 화면 2 → 3 : 확인 클릭 ----------
  const btnConfirm = document.getElementById('btn-confirm');
  if (btnConfirm) btnConfirm.addEventListener('click', () => showScreen('screen-intro'));

  // ---------- 화면 3 → 4 : 일정확인 클릭 ----------
  const btnSchedule = document.getElementById('btn-schedule');
  if (btnSchedule) btnSchedule.addEventListener('click', () => showScreen('screen-timeline'));

  // ---------- 화면 4 : 일정 데이터 & 탭 ----------
  // day: 0 = 전체 여정 요약, 1~4 = 일자별 일정
  // 텍스트는 전부 placeholder이니 실제 일정으로 교체하세요.
  const scheduleData = {
    0: [
      '가마쿠라 도착 및 숙소 체크인',
      '료칸/호텔 주변 산책',
      '전체 여정 미리보기',
    ],
    1: [
      '가마쿠라역 도착',
      '고마치도리 거리 구경',
      '츠루가오카 하치만구 참배',
      '점심 - 시라스동 맛집',
      '유이가하마 해변 산책',
    ],
    2: [
      '고토쿠인 대불 관람',
      '하세데라 사원',
      '에노시마 전철 탑승',
      '에노시마 섬 등대',
      '저녁 - 해산물 요리',
    ],
    3: [
      '엔카쿠지 사원',
      '겐초지 사원',
      '가마쿠라 대나무 정원',
      '카페 투어',
    ],
    4: [
      '기념품 쇼핑',
      '체크아웃',
      '공항 이동',
      '귀국',
    ],
  };

  const tabButtons = document.querySelectorAll('.tab-btn');
  const scheduleList = document.getElementById('schedule-list');

  function renderSchedule(day) {
    if (!scheduleList) return;
    const items = scheduleData[day] || [];
    scheduleList.innerHTML = items.map((text) => `<li>${text}</li>`).join('');
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderSchedule(btn.dataset.day);
    });
  });

  // 초기 렌더링
  renderSchedule('0');
})();
