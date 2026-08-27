"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS } from "../data/music";

const START_OFFSET = 2; // 재생 시작 지점(초) — 인트로 2초를 건너뛰고 시작합니다
const AUTOPLAY_TRACK_ID = 1; // 사이트 진입 시 자동재생할 트랙 (track1)

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(AUTOPLAY_TRACK_ID);
  const [isPlaying, setIsPlaying] = useState(false); // 실제 재생 상태 (audio의 play/pause 이벤트로 동기화)
  const audioRef = useRef(null);

  const currentTrack = TRACKS.find((t) => t.id === currentId) || null;

  // 트랙이 바뀔 때(최초 진입 포함): 메타데이터가 로드되면 2초 지점으로 이동 후 재생 시도
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    function seekToStart() {
      audio.currentTime = START_OFFSET;
      // 브라우저 자동재생 정책상 사용자 인터랙션 전에는 재생이 막힐 수 있음 — 그 경우 아래 fallback이 처리
      audio.play().catch(() => {});
    }

    audio.addEventListener("loadedmetadata", seekToStart);
    return () => audio.removeEventListener("loadedmetadata", seekToStart);
  }, [currentTrack]);

  // 곡이 끝나면 0초가 아니라 2초 지점부터 다시 반복 재생
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    function handleEnded() {
      audio.currentTime = START_OFFSET;
      audio.play().catch(() => {});
    }
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentId]);

  // 자동재생이 브라우저 정책으로 막혔을 경우, 사용자의 첫 클릭/터치에서 재생 재시도
  useEffect(() => {
    function tryPlayOnFirstInteraction() {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    }
    document.addEventListener("pointerdown", tryPlayOnFirstInteraction, { once: true });
    return () => document.removeEventListener("pointerdown", tryPlayOnFirstInteraction);
  }, []);

  function handleTrackClick(track) {
    const audio = audioRef.current;
    if (track.id === currentId) {
      // 같은 곡 다시 클릭 → 재생/일시정지 토글
      if (audio) {
        audio.paused ? audio.play().catch(() => {}) : audio.pause();
      }
    } else {
      // 다른 곡 선택 → 곡 변경 (loadedmetadata에서 2초로 이동 후 자동 재생)
      setCurrentId(track.id);
    }
    setIsOpen(false); // 곡 선택 시 패널 닫기
  }

  function handleStop() {
    audioRef.current?.pause();
    setCurrentId(null);
  }

  return (
    <div className="music-player">
      <button
        type="button"
        className={`music-fab${isPlaying ? " playing" : ""}`}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="배경음악 선택"
      >
        🎵
      </button>

      {isOpen && (
        <div className="music-panel">
          {TRACKS.map((track) => (
            <button
              key={track.id}
              type="button"
              className={`music-track${track.id === currentId ? " active" : ""}`}
              onClick={() => handleTrackClick(track)}
            >
              <span className="music-track-icon">
                {track.id === currentId && isPlaying ? "⏸" : "▶"}
              </span>
              <span className="music-track-title">{track.title}</span>
            </button>
          ))}
          {currentId !== null && (
            <button type="button" className="music-track music-stop" onClick={handleStop}>
              <span className="music-track-icon">⏹</span>
              <span className="music-track-title">정지</span>
            </button>
          )}
        </div>
      )}

      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}
