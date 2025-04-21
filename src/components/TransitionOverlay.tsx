import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TransitionOverlayProps = {
  trigger: boolean;
  onComplete: () => void;
};

export default function TransitionOverlay({ trigger, onComplete }: TransitionOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      setRotation(180);

      // 等扇子展开动画完成后再跳转
      setTimeout(() => {
        onComplete();
        setRotation(360);

        // 等合拢动画完成后隐藏扇子
        setTimeout(() => {
          setVisible(false);
          setRotation(0);
        }, 1000);
      }, 1000); // 展开动画 1 秒
    }
  }, [trigger, onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-1/2 z-50 w-[100vw] h-[100vh] -translate-x-1/2 pointer-events-none"
      style={{
        transformOrigin: "bottom center",
        rotate: `${rotation}deg`,
        transition: "rotate 1s ease-in-out",
        backgroundColor: "rgba(0,0,0,0.2)",
        border: "2px dashed red",
      }}
    >
      <img
        src="/images/fan_magic.png"
        alt="Fan"
        className="w-full h-full object-contain"
        style={{ display: "block" }}
      />
    </motion.div>
  );
}
