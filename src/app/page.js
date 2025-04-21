// app/page.js
'use client'; // 添加这一行，声明这是客户端组件

  // src/app/page.js

import { useEffect, useRef, useState } from "react";

import TransitionOverlay from "@/components/TransitionOverlay";

import { useRouter } from "next/navigation";

export default function Home() {

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // 确保视频和音频开始时播放
    videoRef.current.play();
    audioRef.current.play();
  }, []);

  const router = useRouter();
  useEffect(() => {
    router.prefetch("/sugar"); // ⏳ 提前偷偷加载 "/sugar" 页面的代码，使过程更流畅
  }, []);

  // 控制音乐播放和暂停的状态
  const [isPlaying, setIsPlaying] = useState(false);

  // 播放/暂停音频的函数
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();  // 如果正在播放则暂停
    } else {
      audioRef.current.play();   // 如果暂停则播放
    }
    setIsPlaying(!isPlaying);    // 切换状态
  };

  // 转场
  const [startTransition, setStartTransition] = useState(false);

  const handleCharacterClick = () => {
    setStartTransition(true);
  };
  
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
  
      <div className="video-container">
        <div className="transparent-box">
          <h1 className="homepage-text">
            Welcome to Magic Wardrobe<br />
            <span>Please choose your guide</span>
          </h1>
  
          <div className="image-container">
            <img
              src="/images/sanbao_icon.png"
              alt="Icon 1"
              className="image-icon"
              onClick={handleCharacterClick}
            />
            <img
              src="/images/tangbao_icon.png"
              alt="Icon 2"
              className="image-icon"
              onClick={handleCharacterClick}
            />
          </div>
        </div>
  
        {/* 控制按钮 */}
        <button className="music-control-button" onClick={toggleAudio}>
          {isPlaying ? "暂停" : "播放"}
        </button>
  
        {/* 音频元素（你前面已经有一个 audio 元素了，这个可以删掉） */}
      </div>
  
      {/* ✨✨✨ 转场就放在这里！在最外层 div 内部！ */}
      <TransitionOverlay
        trigger={startTransition}
        onComplete={() => {
          router.push("/sugar"); 
        }}
      />
    </div>
  );
}