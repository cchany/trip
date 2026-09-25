"use client";

import { useState } from "react";
import { TABS, scheduleData, documents, parkingInfo } from "../data/schedule";
import MiniMap from "./MiniMap";
import RouteMap from "./RouteMap";
import ParkingModal from "./ParkingModal";
import RabbitIcon from "./RabbitIcon";

export default function TimelineScreen() {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [routeOpen, setRouteOpen] = useState(false);
  const [parkingOpen, setParkingOpen] = useState(false);
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
    if (doc.type === "info") {
      setParkingOpen(true); // PDF 대신 상세 정보 팝업을 띄움
      return;
    }
    if (doc.type === "detail") {
      setExpandedDoc((prev) => (prev === doc.id ? null : doc.id)); // 드롭다운으로 상세 정보 표시
      return;
    }
    window.open(doc.file, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="screen">
      <div className="timeline-wrap">
        <div className="rabbit-roam" aria-hidden="true">
          <div className="rabbit-track">
            <RabbitIcon className="rabbit-icon" />
          </div>
        </div>

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
                <div className={`doc-item-group${doc.type === "detail" && expandedDoc === doc.id ? " doc-item-group-open" : ""}`}>
                  <button type="button" className="doc-item" onClick={() => handleDocClick(doc)}>
                    <span className="doc-item-icon">📄</span>
                    <span className="doc-item-main">
                      <span className="doc-item-title">{doc.title}</span>
                      <span className={`doc-item-badge doc-item-badge-${doc.type || "pdf"}`}>
                        {doc.type === "detail" ? "상세보기" : doc.type === "info" ? "안내" : "PDF 열기"}
                      </span>
                    </span>
                    {doc.type ? (
                      <span className="doc-item-arrow">{expandedDoc === doc.id || (doc.type === "info" && parkingOpen) ? "⌄" : "›"}</span>
                    ) : (
                      <span className="doc-item-arrow doc-item-arrow-external" aria-label="새 창에서 PDF 열림">↗</span>
                    )}
                  </button>
                  {doc.type === "detail" && expandedDoc === doc.id && (
                    <div className="doc-item-detail">
                      <div className="doc-item-detail-row">
                        <span className="doc-item-detail-label">열차정보</span>
                        <span>{doc.detail.train}</span>
                      </div>
                      <div className="doc-item-detail-row">
                        <span className="doc-item-detail-label">탑승 위치</span>
                        <span>{doc.detail.boarding}</span>
                      </div>
                      <button
                        type="button"
                        className="doc-item-detail-qr"
                        onClick={() => window.open(doc.file, "_blank", "noopener,noreferrer")}
                      >
                        QR 보기
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="schedule-list">
            {items.map((item, i) =>
              item.type === "transit" ? (
                <li key={i} className="transit-item">
                  <span className="schedule-rail schedule-rail-transit" aria-hidden="true" />
                  {item.mapUrl ? (
                    <button
                      type="button"
                      className="transit-segment transit-segment-link"
                      onClick={() => window.open(item.mapUrl, "_blank", "noopener,noreferrer")}
                    >
                      <span className="transit-segment-icon" aria-hidden="true">
                        {item.mode}
                      </span>
                      <div className="transit-segment-body">
                        <div className="transit-segment-title">
                          {item.title}
                          {item.duration && <span className="transit-segment-duration"> · {item.duration}</span>}
                        </div>
                        {item.detail && <div className="transit-segment-detail">{item.detail}</div>}
                        <span className="transit-segment-map-hint">구글맵에서 경로 보기 ↗</span>
                      </div>
                    </button>
                  ) : (
                    <div className="transit-segment">
                      <span className="transit-segment-icon" aria-hidden="true">
                        {item.mode}
                      </span>
                      <div className="transit-segment-body">
                        <div className="transit-segment-title">
                          {item.title}
                          {item.duration && <span className="transit-segment-duration"> · {item.duration}</span>}
                        </div>
                        {item.detail && <div className="transit-segment-detail">{item.detail}</div>}
                      </div>
                    </div>
                  )}
                </li>
              ) : (
                <li key={i}>
                  <span className="schedule-rail" aria-hidden="true" />
                  <div className="schedule-card">
                    <button type="button" className="schedule-item" onClick={() => handleItemClick(i)}>
                      <span className="schedule-time">{item.time}</span>
                      <span className="schedule-title-wrap">
                        <span className="schedule-title">{item.title}</span>
                        {item.note && <span className="schedule-note">{item.note}</span>}
                      </span>
                      <span className="schedule-item-arrow">{expandedIndex === i ? "⌄" : "›"}</span>
                    </button>
                    {expandedIndex === i && (
                      <div className="schedule-item-map">
                        <MiniMap point={item} />
                      </div>
                    )}
                  </div>
                </li>
              )
            )}
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

      {parkingOpen && <ParkingModal info={parkingInfo} onClose={() => setParkingOpen(false)} />}
    </div>
  );
}
