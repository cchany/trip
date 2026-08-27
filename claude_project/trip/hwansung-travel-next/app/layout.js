import "./globals.css";
import { wanjuDaedunsan, kccHanbit, gangwonEduAll, nanumBarunpen } from "./fonts";

export const metadata = {
  title: "여행 앱 Project - 가마쿠라",
  description: "환승연애st 감성 가마쿠라 여행 앱",
};

export default function RootLayout({ children }) {
  const fontVars = [
    wanjuDaedunsan.variable,
    kccHanbit.variable,
    gangwonEduAll.variable,
    nanumBarunpen.variable,
  ].join(" ");

  return (
    <html lang="ko" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
