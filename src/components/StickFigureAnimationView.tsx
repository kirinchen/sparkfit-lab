
import React, { useEffect, useRef } from 'react';
import type { Exercise } from '../model/Models';
// 火柴人動畫元件
// --------------------------------------------------------------------------------
type AnimeElement = Element | null;
type AnimeTargets = AnimeElement | AnimeElement[];
interface AnimeParams {
  targets: AnimeTargets;
  translateY?: [number, number] | number[];
  rotate?: [number, number] | number[];
  direction?: 'normal' | 'reverse' | 'alternate';
  loop?: boolean | number;
  easing?: string;
  duration?: number;
}
interface AnimeStatic {
  (params: AnimeParams): void;
  remove(targets?: AnimeTargets): void;
}
declare const anime: AnimeStatic; // 來自 index.html 以 CDN 載入的全域變數

const StickFigureAnimationView: React.FC<{ animationType: Exercise['animationType'] }> = ({ animationType }) => {
  const figureRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const leftArmRef = useRef<HTMLDivElement>(null);
  const rightArmRef = useRef<HTMLDivElement>(null);
  const leftLegRef = useRef<HTMLDivElement>(null);
  const rightLegRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 確保所有元素都已掛載
    const targets = [
      figureRef.current,
      headRef.current,
      bodyRef.current,
      leftArmRef.current,
      rightArmRef.current,
      leftLegRef.current,
      rightLegRef.current,
    ];
    if (targets.some(t => !t)) return;

    // 每次動畫類型改變時，先移除舊的動畫
    anime.remove(targets);

    // 根據 animationType 設定新的動畫
    switch (animationType) {
      case 'squat':
        anime({ targets: figureRef.current, translateY: [0, 20], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 800 });
        break;
      case 'jumpingJacks':
        anime({ targets: leftArmRef.current, rotate: [20, -160], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 500 });
        anime({ targets: rightArmRef.current, rotate: [-20, 160], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 500 });
        anime({ targets: leftLegRef.current, rotate: [10, -30], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 500 });
        anime({ targets: rightLegRef.current, rotate: [-10, 30], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 500 });
        break;
      case 'pushups':
        anime({ targets: figureRef.current, translateY: [0, 30], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 1000 });
        anime({ targets: [leftArmRef.current, rightArmRef.current], rotate: [0, -45], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 1000 });
        break;
      case 'highKnees':
        anime({ targets: leftLegRef.current, rotate: [10, -90], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 300 });
        anime({ targets: rightLegRef.current, rotate: [-10, 90], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 300 });
        anime({ targets: leftArmRef.current, rotate: [20, 90], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 300 });
        anime({ targets: rightArmRef.current, rotate: [-20, -90], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 300 });
        break;
      case 'burpees':
        // 模擬波比跳：下蹲→伏地→跳起的循環
        anime({ targets: figureRef.current, translateY: [0, 40], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 700 });
        anime({ targets: [leftArmRef.current, rightArmRef.current], rotate: [0, -70], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 700 });
        anime({ targets: [leftLegRef.current, rightLegRef.current], rotate: [5, -35], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 700 });
        break;
      case 'plank':
        // 棒式是靜態的，所以沒有動畫
        break;
    }

    // 清理：在元件卸載或 animationType 改變前移除動畫，避免記憶體洩漏
    return () => {
      anime.remove(targets);
    };
  }, [animationType]);

  const partBaseStyle = "absolute bg-cyan-300 rounded-full";
  return (
    <div
      ref={figureRef}
      className="relative w-24 h-48"
      style={{ width: 96, height: 192, flex: '0 0 auto' }}
    >
      <div ref={headRef} style={{backgroundColor:'red'}} className={`${partBaseStyle} w-8 h-8 top-0 left-1/2 -translate-x-1/2`}></div>
      <div ref={bodyRef} className={`${partBaseStyle} w-1.5 h-16 top-8 left-1/2 -translate-x-1/2`}></div>
      <div ref={leftArmRef} className={`${partBaseStyle} w-1.5 h-12 top-9 left-1/2 -translate-x-1/2 origin-top transform rotate-[20deg]`}></div>
      <div ref={rightArmRef} className={`${partBaseStyle} w-1.5 h-12 top-9 left-1/2 -translate-x-1/2 origin-top transform -rotate-[20deg]`}></div>
      <div ref={leftLegRef} className={`${partBaseStyle} w-1.5 h-14 top-24 left-1/2 -translate-x-1/2 origin-top transform rotate-[10deg]`}></div>
      <div ref={rightLegRef} className={`${partBaseStyle} w-1.5 h-14 top-24 left-1/2 -translate-x-1/2 origin-top transform -rotate-[10deg]`}></div>
    </div>
  );
};

export default StickFigureAnimationView;