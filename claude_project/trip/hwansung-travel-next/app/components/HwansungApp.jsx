"use client";

import { useRef, useState } from "react";
import HomeScreen from "./HomeScreen";
import ConfirmScreen from "./ConfirmScreen";
import IntroScreen from "./IntroScreen";
import TimelineScreen from "./TimelineScreen";
import MusicPlayer from "./MusicPlayer";

const SCREENS = {
  HOME: "home",
  CONFIRM: "confirm",
  INTRO: "intro",
  TIMELINE: "timeline",
};

const SCREEN_ORDER = [SCREENS.HOME, SCREENS.CONFIRM, SCREENS.INTRO, SCREENS.TIMELINE];

// 스와이프로 인정할 최소 이동 거리(px) — 짧은 탭이나 스크롤 제스처가 오작동하지 않도록
const SWIPE_THRESHOLD = 50;

export default function HwansungApp() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const confirmRef = useRef(null);
  const touchStartRef = useRef(null);

  const currentIndex = SCREEN_ORDER.indexOf(screen);
  const canGoPrev = currentIndex > 0;
  const canGoNext = screen !== SCREENS.TIMELINE;

  function goToPrev() {
    if (currentIndex > 0) setScreen(SCREEN_ORDER[currentIndex - 1]);
  }

  // 각 화면의 "다음으로 넘어가는 조건"을 그대로 재사용합니다 —
  // 메시지 확인 화면은 애니메이션을 다 보여준 뒤에만 다음으로 넘어갑니다.
  function goToNext() {
    if (screen === SCREENS.HOME) {
      setScreen(SCREENS.CONFIRM);
    } else if (screen === SCREENS.CONFIRM) {
      confirmRef.current?.advance();
    } else if (screen === SCREENS.INTRO) {
      setScreen(SCREENS.TIMELINE);
    }
    // TIMELINE(마지막 화면)에서는 다음이 없음
  }

  function handleTouchStart(e) {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }

  function handleTouchEnd(e) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // 세로 이동이 더 크면(스크롤 의도) 화면 전환으로 처리하지 않음
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goToPrev(); // 오른쪽으로 슬라이드 → 이전 화면
    else goToNext(); // 왼쪽으로 슬라이드 → 다음 화면
  }

  return (
    <div className="app-viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div
        className={`app-margin app-margin-left${canGoPrev ? "" : " app-margin-disabled"}`}
        onClick={canGoPrev ? goToPrev : undefined}
        role="button"
        aria-label="이전 화면"
      >
        <span className="app-margin-arrow">‹</span>
      </div>

      <div className="app-shell">
        <MusicPlayer />
        {screen === SCREENS.HOME && (
          <HomeScreen
            onYes={() => setScreen(SCREENS.CONFIRM)}
            onNo={() => {
              /* TODO: NO 눌렀을 때 동작 정의 */
            }}
            onSchedule={() => setScreen(SCREENS.TIMELINE)}
          />
        )}
        {screen === SCREENS.CONFIRM && (
          <ConfirmScreen ref={confirmRef} onConfirm={() => setScreen(SCREENS.INTRO)} />
        )}
        {screen === SCREENS.INTRO && (
          <IntroScreen onSchedule={() => setScreen(SCREENS.TIMELINE)} />
        )}
        {screen === SCREENS.TIMELINE && <TimelineScreen />}
      </div>

      <div
        className={`app-margin app-margin-right${canGoNext ? "" : " app-margin-disabled"}`}
        onClick={canGoNext ? goToNext : undefined}
        role="button"
        aria-label="다음 화면"
      >
        <span className="app-margin-arrow">›</span>
      </div>
    </div>
  );
}
