// app/page.js
'use client'; // 添加这一行，声明这是客户端组件

  // src/app/page.js

import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // 确保视频和音频开始时播放
    videoRef.current.play();
    audioRef.current.play();
  }, []);

  return (
    <div className="home-page">
      <video
        ref={videoRef}
        className="background-video"
        src="/videos/Homepagevideo.mp4"
        loop
        muted
        autoPlay
        playsInline
      />
      <audio
        ref={audioRef}
        src="/audios/Homepagemusic.mp3"
        loop
        autoPlay
      />
      <div className="content">
        <h1>Welcome to My Skin Gallery!</h1>
        <p>This is the homepage of the gallery with background video and music.</p>
      </div>
    </div>
  );
}
