"use client";

// 공항 주차 예약 정보를 보여주는 팝업 — 서류함 탭의 "공항 주차 위치" 항목을 누르면 열립니다.
// RouteMap과 같은 바텀시트 스타일(.route-modal-*)을 재사용합니다.
export default function ParkingModal({ info, onClose }) {
  if (!info) return null;

  return (
    <div className="route-modal-overlay" onClick={onClose}>
      <div className="route-modal parking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="route-modal-header">
          <span className="route-modal-title">{info.title}</span>
          <button type="button" className="route-modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        <div className="parking-info-body">
          <div className="parking-info-row">
            <span className="parking-info-label">차량번호</span>
            <span className="parking-info-value">{info.vehicleNumber}</span>
          </div>

          <div className="parking-info-row">
            <span className="parking-info-label">예약번호</span>
            <span className="parking-info-value">{info.reservationNumber}</span>
          </div>

          <div className="parking-info-row">
            <span className="parking-info-label">주차장</span>
            <span className="parking-info-value">
              {info.lot.name}
              <br />
              {info.lot.address}
            </span>
          </div>

          <div className="parking-info-row">
            <span className="parking-info-label">지정 층수</span>
            <span className="parking-info-value">{info.floor.text}</span>
            {info.floor.note && <span className="parking-info-note">{info.floor.note}</span>}
          </div>

          <div className="parking-info-row">
            <span className="parking-info-label">출입 비밀번호</span>
            <span className="parking-info-value">{info.accessCode.text}</span>
          </div>

          <div className="parking-info-row">
            <span className="parking-info-label">주차장 비고</span>
            <span className="parking-info-value">{info.remarks}</span>
          </div>

          <div className="parking-info-row">
            <span className="parking-info-label">일정</span>
            <span className="parking-info-value">{info.schedule.text}</span>
            {info.schedule.note && <span className="parking-info-note">{info.schedule.note}</span>}
          </div>

          <div className="parking-info-row">
            <span className="parking-info-label">결제 정보</span>
            <div className="parking-payment-table">
              <div className="parking-payment-line">
                <span>총 금액</span>
                <span>{info.payment.total}</span>
              </div>
              <div className="parking-payment-line discount">
                <span>{info.payment.discountLabel}</span>
                <span>{info.payment.discount}</span>
              </div>
              <div className="parking-payment-line">
                <span>결제금액</span>
                <span>{info.payment.paid}</span>
              </div>
              <div className="parking-payment-line final">
                <span>최종금액</span>
                <span>{info.payment.final}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
