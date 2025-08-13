import React from 'react';
import YouTube from 'react-youtube';
import type { Exercise } from '../model/Models';

// YouTube 影片播放元件
// --------------------------------------------------------------------------------

const animationToVideoId: Record<string, string> = {
  squat: 'l0gDNCj3-MA',
  jumpingJacks: 'c4DAnQ6DtF8',
  pushups: 'Pkj8H2gI_x0',
  highKnees: 'QPgKQLwjw_s',
  burpees: 'TU8QYVW0gDU',
  plank: 'pD3_GgP-dO4',
  quickFeet: 'l0gDNCj3-MA',
  buttKicks: 'R-8E5w1a_c4',
  squatJacksWithFloorTouch: 'JOO5-5l_12E',
  halfBurpee: 'j_pA2aP1P4c',
  mountainClimbers: 'nmwgirg2gaE',
  tuckJumps: 'hQr_s5o2keE',
  flutterKicks: 'ANVdMDa4z-E',
  crunches: 'Xyd_fa5zoEU',
  heelTaps: 'b4uYpr0tyVE',
  bicycleCrunches: 'Iwyvozckjak',
  reverseCrunches: 'gXg-u_m9T-s',
  toeTouches: 't_1a5sOAToY',
  vUps: 'iP2fjvG_xMw',
  obliqueVUps: 'hE6I_S_A0pY',
};

const YouTubePlayerView: React.FC<{ animationType: Exercise['animationType']; muted?: boolean }> = ({ animationType, muted = true }) => {
  const videoId = animationToVideoId[animationType];

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      loop: 1,
      playlist: videoId, // needed for loop to work
      mute: muted ? 1 : 0,
    },
  };

  if (!videoId) {
    return <div className="relative w-24 h-48 flex items-center justify-center bg-gray-200">動畫不存在</div>;
  }

  return (
    <div
      className="relative "
      style={{  }}
    >
      <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayerView;
