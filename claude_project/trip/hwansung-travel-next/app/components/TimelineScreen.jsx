"use client";

import { useState } from "react";
import { TABS, scheduleData } from "../data/schedule";

export default function TimelineScreen() {
  const [activeDay, setActiveDay] = useState(0);
  const items = scheduleData[activeDay] || [];

  return (
    <div className="screen">
      <div className="timeline-wrap">
        <nav className="tab-bar" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.day}
              type="button"
              className={`tab-btn${activeDay === tab.day ? " active" : ""}`}
              onClick={() => setActiveDay(tab.day)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <ul className="schedule-list">
          {items.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
