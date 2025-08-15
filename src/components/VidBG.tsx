import React from 'react';

interface VidBGProps {isDarkMode?: boolean;}

const VidBG: React.FC<VidBGProps> = ({ isDarkMode = false }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      <video
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          opacity: isDarkMode ? 0 : 1
        }}
        src="/day_vid.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <video
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s ease',
          opacity: isDarkMode ? 1 : 0
        }}
        src="/night_vid.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
};

export default VidBG;