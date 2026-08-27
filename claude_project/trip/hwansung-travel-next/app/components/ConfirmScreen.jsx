"use client";

import { useState } from "react";

export default function ConfirmScreen({ onConfirm }) {
  // 0: 봉투만 떠있음, 1~2: 빈 대화창이 순서대로 등장, 3: 최종 카드 등장 (클릭 시 다음 화면)
  const [stage, setStage] = useState(0);

  function handleEnvelopeClick() {
    if (stage > 0) return; // 이미 열었으면 무시
    setStage(1);
    setTimeout(() => setStage(2), 5000);
    setTimeout(() => setStage(3), 10000);
  }

  return (
    <div className="screen confirm-screen">
      <div className="message-stack">
        {stage >= 1 && (
          <div className="chat-bubble bubble-pop">
            <span className="chat-bubble-text">안녕</span>
          </div>
        )}
        {stage >= 2 && (
          <div className="chat-bubble bubble-pop">
            <span className="chat-bubble-text">여행가자</span>
          </div>
        )}
        {stage >= 3 && (
          <button type="button" className="select-card bubble-pop" onClick={onConfirm}>
            <span className="select-card-text">
              &ldquo;당신의 X는
              <br />
              당신을 선택했습니다&rdquo;
            </span>
          </button>
        )}
      </div>

      <button
        type="button"
        className={`envelope-fab${stage > 0 ? " opened" : ""}`}
        onClick={handleEnvelopeClick}
        aria-label="메시지 열기"
      >
        <img src="/assets/images/message-icon.png" alt="메시지 봉투" />
      </button>
    </div>
  );
}
