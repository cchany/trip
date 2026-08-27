/** @type {import('next').NextConfig} */
const nextConfig = {
  // 서버 없이 순수 정적 파일로 빌드 (Cloudflare Pages 배포용)
  output: 'export',
  images: {
    unoptimized: true, // 정적 export에서는 next/image 서버 최적화를 사용할 수 없음
  },
  trailingSlash: true, // 정적 호스팅에서 라우팅 경로 안정성을 위해 권장
};

export default nextConfig;
