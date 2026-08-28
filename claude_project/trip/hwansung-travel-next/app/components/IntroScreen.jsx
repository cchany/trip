import { TRIP_NUMBER, TRIP_NAME } from "../data/schedule";

export default function IntroScreen({ onSchedule }) {
  return (
    <div className="screen screen-intro">
      <div className="intro-bg">
        {/* 배경은 가마쿠라 영상: public/assets/video/kamakura.mp4 를 넣으면 자동 재생됩니다 */}
        <video
          className="intro-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/images/kamakura-poster.jpg"
        >
          <source src="/assets/video/kamakura.webm" type="video/webm" />
          <source src="/assets/video/kamakura.mp4" type="video/mp4" />
        </video>
        <div className="intro-overlay" />
      </div>
      <div className="intro-content">
        <p className="intro-eyebrow">
          <span>{TRIP_NUMBER}</span>번째 여행지,
        </p>
        <h1 className="intro-title">{TRIP_NAME}</h1>
        <button className="btn btn-primary pill-lg" type="button" onClick={onSchedule}>
          일정확인
        </button>
      </div>
    </div>
  );
}
