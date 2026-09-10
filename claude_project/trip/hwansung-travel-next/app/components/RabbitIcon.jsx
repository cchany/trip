// 탭 바를 땅 삼아 돌아다니는 픽셀풍 토끼 — 사용자가 준 레퍼런스 이미지 느낌(동글동글한 실루엣,
// 큰 귀에 분홍 안쪽, 점 눈)으로 그린 단일 실루엣입니다. 걷기는 이동(가로 트랙)과 통통 뛰는
// 호핑 애니메이션(부모 CSS: .rabbit-icon)으로 표현합니다.
export default function RabbitIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="-1 -1 16 17"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 몸 전체 실루엣 (귀+머리+몸+발) */}
      <path
        d="M4,0 L6,0 L6,5 L8,5 L8,0 L10,0 L10,5 L11,5 L11,7 L12,7 L12,9 L13,9 L13,11 L12,11 L12,12 L11,12 L11,13 L10,13 L10,14 L7,14 L7,13 L5,13 L5,14 L2,14 L2,13 L2,12 L1,12 L1,8 L2,8 L2,6 L3,6 L3,5 L4,5 Z"
        fill="#FFF6EC"
        stroke="#513C36"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 귀 안쪽 분홍 */}
      <rect x="4.5" y="1" width="1" height="3.2" rx="0.3" fill="#F3B6C6" />
      <rect x="8.5" y="1" width="1" height="3.2" rx="0.3" fill="#F3B6C6" />

      {/* 눈 */}
      <rect x="4.2" y="6.6" width="0.9" height="0.9" fill="#513C36" />
      <rect x="7.6" y="6.6" width="0.9" height="0.9" fill="#513C36" />
    </svg>
  );
}
