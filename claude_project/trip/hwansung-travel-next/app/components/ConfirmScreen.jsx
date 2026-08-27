export default function ConfirmScreen({ onConfirm }) {
  return (
    <div className="screen">
      <div className="confirm-wrap">
        <div className="message-box">
          {/* 하늘색 문자 메시지 UI: 텍스트는 추후 작성 예정 */}
          <div className="message-line" />
          <div className="message-line short" />
          <div className="message-line" />
        </div>

        <div className="confirm-actions">
          <button className="btn btn-primary pill-lg" type="button" onClick={onConfirm}>
            확인
          </button>
          <div className="side-box" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
