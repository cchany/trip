"use client";

import { useEffect, useRef, useState } from "react";
import { TRACKS } from "../data/music";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = TRACKS.find((t) => t.id === currentId) || null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentId]);

  function handleTrackClick(track) {
    if (track.id === currentId) {
      // 같은 곡 다시 클릭 → 재생/일시정지 토글
      setIsPlaying((p) => !p);
    } else {
      // 다른 곡 선택 → 곡 변경 후 재생
      setCurrentId(track.id);
      setIsPlaying(true);
    }
  }

  function handleStop() {
    setIsPlaying(false);
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
        <audio ref={audioRef} src={currentTrack.src} loop />
      )}
    </div>
  );
}
