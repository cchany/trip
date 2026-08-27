"use client";

import { useState } from "react";
import HomeScreen from "./HomeScreen";
import ConfirmScreen from "./ConfirmScreen";
import IntroScreen from "./IntroScreen";
import TimelineScreen from "./TimelineScreen";

const SCREENS = {
  HOME: "home",
  CONFIRM: "confirm",
  INTRO: "intro",
  TIMELINE: "timeline",
};

export default function HwansungApp() {
  const [screen, setScreen] = useState(SCREENS.HOME);

  return (
    <div className="app-shell">
      {screen === SCREENS.HOME && (
        <HomeScreen
          onYes={() => setScreen(SCREENS.CONFIRM)}
          onNo={() => {
            /* TODO: NO 눌렀을 때 동작 정의 */
          }}
        />
      )}
      {screen === SCREENS.CONFIRM && (
        <ConfirmScreen onConfirm={() => setScreen(SCREENS.INTRO)} />
      )}
      {screen === SCREENS.INTRO && (
        <IntroScreen onSchedule={() => setScreen(SCREENS.TIMELINE)} />
      )}
      {screen === SCREENS.TIMELINE && <TimelineScreen />}
    </div>
  );
}
