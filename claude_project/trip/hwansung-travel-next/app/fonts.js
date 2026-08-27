import localFont from 'next/font/local';

// 완주대둔산체 (전라북도 완주군, KOGL 출처표시 — Bold 웨이트만 배포됨)
export const wanjuDaedunsan = localFont({
  src: './fonts/WanjuDaedunsan-Bold.ttf',
  weight: '700',
  variable: '--font-wanju',
  display: 'swap',
});

// KCC한빛체 (한국저작권위원회 공유마당, OFL)
export const kccHanbit = localFont({
  src: './fonts/KCC-Hanbit.ttf',
  weight: '400',
  variable: '--font-kcc',
  display: 'swap',
});

// 강원교육모두체 (강원도교육청, 무료 배포)
export const gangwonEduAll = localFont({
  src: [
    { path: './fonts/GangwonEduAll-Bold.ttf', weight: '700' },
    { path: './fonts/GangwonEduAll-Light.ttf', weight: '300' },
  ],
  variable: '--font-gangwon',
  display: 'swap',
});

// 나눔바른펜 (네이버 나눔글꼴, 무료 배포)
export const nanumBarunpen = localFont({
  src: [
    { path: './fonts/NanumBarunpenR.otf', weight: '400' },
    { path: './fonts/NanumBarunpenB.otf', weight: '700' },
  ],
  variable: '--font-nanum',
  display: 'swap',
});
