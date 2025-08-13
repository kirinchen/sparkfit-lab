import React from 'react';
import YouTube from 'react-youtube';
import type { Exercise } from '../model/Models';

// YouTube 影片播放元件
// --------------------------------------------------------------------------------

const animationToVideoId: Record<string, string> = {
  squat: 'C_VtOYc6j5c',
  jumpingJacks: 'c4DAnQ6DtF8',
  pushups: 'Pkj8H2gI_x0',
  highKnees: 'D0_A_cEXz38',
  burpees: 'TU8QYVW0gDU',
  plank: 'pD3_GgP-dO4',
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