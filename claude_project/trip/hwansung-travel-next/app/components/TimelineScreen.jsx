"use client";

import { useState } from "react";
import { TABS, scheduleData, documents } from "../data/schedule";
import MiniMap from "./MiniMap";
import RouteMap from "./RouteMap";

export default function TimelineScreen() {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [routeOpen, setRouteOpen] = useState(false);
  const items = scheduleData[activeDay] || [];
  const activeTab = TABS.find((t) => t.day === activeDay);

  function handleTabClick(day) {
    setActiveDay(day);
    setExpandedIndex(null);
  }

  function handleItemClick(i) {
    setExpandedIndex((prev) => (prev === i ? null : i));
  }

  function handleDocClick(doc) {
    window.open(doc.file, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="screen">
      <div className="timeline-wrap">
        <nav className="tab-bar" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.day}
              type="button"
              className={`tab-btn${activeDay === tab.day ? " active" : ""}`}
              onClick={() => handleTabClick(tab.day)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeDay === 0 ? (
          <ul className="doc-list">
            {documents.map((doc) => (
              <li key={doc.id}>
                <button type="button" className="doc-item" onClick={() => handleDocClick(doc)}>
                  <span className="doc-item-icon">📄</span>
                  <span className="doc-item-title">{doc.title}</span>
                  <span className="doc-item-arrow">›</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="schedule-list">
            {items.map((item, i) => (
              <li key={i}>
                <button type="button" className="schedule-item" onClick={() => handleItemClick(i)}>
                  <span className="schedule-time">{item.time}</span>
                  <span className="schedule-title">{item.title}</span>
                </button>
                {expandedIndex === i && (
                  <div className="schedule-item-map">
                    <MiniMap point={item} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {activeDay !== 0 && (
        <button
          type="button"
          className="route-fab"
          onClick={() => setRouteOpen(true)}
          aria-label="이동 루트 지도 보기"
        >
          🗺️
        </button>
      )}

      {routeOpen && (
        <RouteMap dayLabel={activeTab?.label} points={items} onClose={() => setRouteOpen(false)} />
      )}
    </div>
  );
}
