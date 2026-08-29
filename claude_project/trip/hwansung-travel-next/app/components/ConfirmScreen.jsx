"use client";

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";

const REVEAL_INTERVAL = 5000; // 메시지 사이 자동 등장 간격(ms)

// 오른쪽 여백 클릭/왼쪽 스와이프로 "다음 화면"을 시도할 때 이 화면이 어떻게 반응할지
// 부모(HwansungApp)가 ref로 호출할 수 있도록 advance()를 노출합니다.
const ConfirmScreen = forwardRef(function ConfirmScreen({ onConfirm }, ref) {
  // 0: 봉투만 떠있음, 1~3: 메시지가 순서대로 등장, 4: 최종 카드 등장 (클릭 시 다음 화면)
  const [stage, setStage] = useState(0);
  const timerRef = useRef(null);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  // stage를 next로 바꾸고, 다음 단계가 남아있으면 5초 뒤 자동 진행을 다시 예약합니다.
  // (스와이프 등으로 수동 진행했을 때 기존 타이머가 뒤늦게 겹쳐 실행되지 않도록
  // 항상 이전 타이머를 먼저 취소합니다.)
  function goToStage(next) {
    clearTimer();
    setStage(next);
    if (next < 4) {
      timerRef.current = setTimeout(() => goToStage(next + 1), REVEAL_INTERVAL);
    }
  }

  function handleEnvelopeClick() {
    if (stage > 0) return; // 이미 열었으면 무시
    goToStage(1);
  }

  useEffect(() => clearTimer, []); // 화면을 벗어나면 남은 타이머 정리

  useImperativeHandle(ref, () => ({
    advance() {
      if (stage === 0) {
        handleEnvelopeClick(); // 아직 안 열었으면 봉투부터 엶
      } else if (stage < 4) {
        // 메시지가 올라오는 중이면 화면 전환 대신, 다음 메시지를 바로 보여줍니다.
        // (건너뛰지 않고 순서대로 다 보여주되, 기다리지 않고 넘어갈 수 있게)
        goToStage(stage + 1);
      } else {
        onConfirm(); // 다 보여줬으면 다음 화면으로
      }
    },
  }));

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
          <div className="chat-bubble bubble-pop">
            <span className="chat-bubble-text">나는 계속 너야</span>
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
