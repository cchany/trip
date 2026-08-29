"use client";

import { useEffect, useRef } from "react";

// 하루치 이동 루트를 번호가 매겨진 마커 + 선으로 보여주는 전체 화면 지도.
// TimelineScreen의 지도 아이콘(우측 하단 고정)을 누르면 열립니다.
export default function RouteMap({ dayLabel, points, onClose }) {
  const canvasRef = useRef(null);
  const mapRef = useRef(null);
  const validPoints = points.filter((p) => typeof p.lat === "number" && typeof p.lng === "number");

  useEffect(() => {
    if (validPoints.length === 0 || !canvasRef.current) return;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !canvasRef.current) return;

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(canvasRef.current, { zoomControl: true, attributionControl: true });
      mapRef.current = map;

      // OpenStreetMap 표준 타일 — 별도 API 키 없이 완전 무료로 쓸 수 있습니다.
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        subdomains: "abc",
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const latlngs = validPoints.map((p) => [p.lat, p.lng]);
      validPoints.forEach((p, i) => {
        L.marker([p.lat, p.lng])
          .addTo(map)
          .bindPopup(`${i + 1}. ${p.title}`);
      });

      if (latlngs.length > 1) {
        L.polyline(latlngs, { color: "#DB413E", weight: 4, opacity: 0.85 }).addTo(map);
        map.fitBounds(latlngs, { padding: [32, 32] });
      } else {
        map.setView(latlngs[0], 14);
      }
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 장소명(query)이 있으면 좌표 대신 이름으로 검색해서 실제 장소 카드가 뜨도록 합니다.
  function placeParam(p) {
    return p.query ? encodeURIComponent(p.query) : `${p.lat},${p.lng}`;
  }

  function handleOpenGoogleMaps() {
    if (validPoints.length === 0) return;
    let url;
    if (validPoints.length > 1) {
      const origin = validPoints[0];
      const destination = validPoints[validPoints.length - 1];
      const waypoints = validPoints.slice(1, -1).map(placeParam).join("|");
      url = `https://www.google.com/maps/dir/?api=1&origin=${placeParam(origin)}&destination=${placeParam(destination)}${
        waypoints ? `&waypoints=${waypoints}` : ""
      }`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${placeParam(validPoints[0])}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="route-modal-overlay" onClick={onClose}>
      <div className="route-modal" onClick={(e) => e.stopPropagation()}>
        <div className="route-modal-header">
          <span className="route-modal-title">{dayLabel} 이동 루트</span>
          <button type="button" className="route-modal-close" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </div>

        {validPoints.length === 0 ? (
          <div className="route-modal-empty">아직 장소가 정해지지 않았습니다</div>
        ) : (
          <div ref={canvasRef} className="route-map-canvas" />
        )}

        {validPoints.length > 0 && (
          <button type="button" className="route-modal-gmaps" onClick={handleOpenGoogleMaps}>
            구글맵에서 경로 보기 ↗
          </button>
        )}
      </div>
    </div>
  );
}
