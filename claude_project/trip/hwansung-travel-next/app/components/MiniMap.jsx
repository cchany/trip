"use client";

import { useEffect, useRef } from "react";

// 장소 하나를 보여주는 작은 미리보기 지도 — 클릭하면 구글맵이 새 탭에서 열립니다.
// Leaflet + OpenStreetMap 기반 무료 지도라 별도 API 키가 필요 없습니다.
export default function MiniMap({ point }) {
  const canvasRef = useRef(null);
  const mapRef = useRef(null);
  const hasPoint = point && typeof point.lat === "number" && typeof point.lng === "number";

  useEffect(() => {
    if (!hasPoint || !canvasRef.current) return;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !canvasRef.current) return;

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(canvasRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        tap: false,
      }).setView([point.lat, point.lng], 15);
      mapRef.current = map;

      // OpenStreetMap 표준 타일 — 별도 API 키 없이 완전 무료로 쓸 수 있습니다.
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        subdomains: "abc",
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      L.marker([point.lat, point.lng]).addTo(map);
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [hasPoint, point?.lat, point?.lng]);

  if (!hasPoint) {
    return <div className="mini-map mini-map-empty">장소가 정해지면 지도가 표시됩니다</div>;
  }

  function handleClick() {
    // 장소명(query)이 있으면 좌표 대신 이름으로 검색해서 실제 장소 카드(핀+이름)가 뜨도록 합니다.
    const q = point.query ? encodeURIComponent(point.query) : `${point.lat},${point.lng}`;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${q}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div
      className="mini-map"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
      aria-label="구글맵에서 열기"
    >
      <div ref={canvasRef} className="mini-map-canvas" />
      <span className="mini-map-hint">구글맵에서 열기 ↗</span>
    </div>
  );
}
