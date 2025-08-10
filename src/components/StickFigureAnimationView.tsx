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

const YouTubePlayerView: React.FC<{ animationType: Exercise['animationType'] }> = ({ animationType }) => {
  const videoId = animationToVideoId[animationType];

  const opts = {
    height: '192',
    width: '96',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      loop: 1,
      playlist: videoId, // needed for loop to work
    },
  };

  if (!videoId) {
    return <div className="relative w-24 h-48 flex items-center justify-center bg-gray-200">動畫不存在</div>;
  }

  return (
    <div
      className="relative w-24 h-48"
      style={{ width: 96, height: 192, flex: '0 0 auto' }}
    >
      <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayerView;