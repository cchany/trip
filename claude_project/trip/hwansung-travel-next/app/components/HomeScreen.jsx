export default function HomeScreen({ onYes, onNo }) {
  return (
    <div className="screen">
      <div className="notify-card">
        <div className="notify-top">
          <span className="notify-bell" aria-hidden="true">🔔</span>
        </div>
        <p className="notify-message">
          <span className="notify-name"><b>X</b></span>에게 메시지가
          <br />
          도착했습니다.
        </p>
        <div className="notify-actions">
          <button className="btn btn-outline" type="button" onClick={onNo}>
            거절
          </button>
          <button className="btn btn-primary" type="button" onClick={onYes}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
