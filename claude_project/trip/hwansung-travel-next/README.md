# 여행 앱 Project — 가마쿠라

Next.js + React 기반, 서버 없이 순수 정적 파일로 빌드되는 여행 앱입니다 (Cloudflare Pages 배포용).

## 개발 서버 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인합니다.

## 정적 빌드 (Cloudflare Pages 배포용)

```bash
npm run build
```

`out/` 폴더가 생성됩니다. Cloudflare Pages에서 빌드 명령어를 `npm run build`, 빌드 출력 디렉터리를 `out`으로 지정하면 됩니다. `out/` 폴더는 그대로 오프라인에서도 열립니다.

## 폴더 구조

- `app/components/` — 화면 4개 (HomeScreen, ConfirmScreen, IntroScreen, TimelineScreen)
- `app/data/schedule.js` — 여행지 이름, N번째 여행지 번호, 일정 데이터 (텍스트 placeholder — 여기만 고치면 됩니다)
- `app/fonts.js` — 4개 폰트(next/font/local) 등록
- `app/fonts/` — 실제 폰트 파일
- `app/globals.css` — 컬러 팔레트 및 전체 스타일
- `public/assets/video/kamakura.mp4` — 화면3 배경 영상 (직접 추가)
- `public/assets/images/kamakura-poster.jpg` — 영상 로딩 전 포스터 이미지 (직접 추가)

## 아직 채워야 할 것

- 화면2 메시지 문구 (`app/components/ConfirmScreen.jsx`)
- 가마쿠라 배경 영상/이미지
- 실제 일정 내용 (`app/data/schedule.js`)
