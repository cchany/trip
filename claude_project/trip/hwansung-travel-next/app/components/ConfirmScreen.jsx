"use client";

import { useState, useImperativeHandle, forwardRef } from "react";

// 오른쪽 여백 클릭/왼쪽 스와이프로 "다음 화면"을 시도할 때 이 화면이 어떻게 반응할지
// 부모(HwansungApp)가 ref로 호출할 수 있도록 advance()를 노출합니다.
const ConfirmScreen = forwardRef(function ConfirmScreen({ onConfirm }, ref) {
  // 0: 봉투만 떠있음, 1~3: 메시지가 순서대로 등장, 4: 최종 카드 등장 (클릭 시 다음 화면)
  const [stage, setStage] = useState(0);

  function handleEnvelopeClick() {
    if (stage > 0) return; // 이미 열었으면 무시
    setStage(1);
    setTimeout(() => setStage(2), 5000);
    setTimeout(() => setStage(3), 10000);
    setTimeout(() => setStage(4), 15000);
  }

  useImperativeHandle(ref, () => ({
    advance() {
      if (stage === 0) {
        handleEnvelopeClick(); // 아직 안 열었으면 봉투부터 엶
      } else if (stage === 4) {
        onConfirm(); // 다 보여줬으면 다음 화면으로
      }
      // stage 1~3(메시지가 올라오는 중)는 애니메이션을 건너뛰지 않도록 무시합니다
    },
  }));

  return (
    <div className="screen confirm-screen">
      <div className="message-stack">
        {stage >= 1 && (
          <div className="chat-bubble bubble-pop">
            <span className="chat-bubble-text">우리 열여섯에 만났는데..</span>
          </div>
        )}
        {stage >= 2 && (
          <div className="chat-bubble bubble-pop">
            <span className="chat-bubble-text">벌써 스물아홉이야!</span>
          </div>
        )}
        {stage >= 3 && (
          <div className="chat-bubble bubble-pop">
            <span className="chat-bubble-text">아직도 나는 계속 너야</span>
          </div>
        )}
        {stage >= 4 && (
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
});

export default ConfirmScreen;
