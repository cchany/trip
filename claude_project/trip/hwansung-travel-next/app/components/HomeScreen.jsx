export default function HomeScreen({ onYes, onNo, onSchedule }) {
  return (
    <div className="screen">
      <div className="notify-card">
        <div className="notify-top">
          <span className="notify-bell" aria-hidden="true">🔔</span>
          <span className="notify-label">딩동</span>
        </div>
        <p className="notify-message">
          <span className="notify-name">OO</span>에게 메시지가
          <br />
          왔습니다.
        </p>
        <div className="notify-actions">
          <button className="btn btn-outline" type="button" onClick={onNo}>
            NO
          </button>
          <button className="btn btn-primary" type="button" onClick={onYes}>
            YES
          </button>
        </div>
      </div>

      {/* 우측 하단 고정 — 바로 일정 확인 화면으로 이동 (.route-fab과 동일한 스타일 재사용) */}
      <button type="button" className="route-fab" onClick={onSchedule} aria-label="일정 확인">
        🗓️
      </button>
    </div>
  );
}
