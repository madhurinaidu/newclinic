'use client';

import { JitsiMeeting } from '@jitsi/react-sdk';

export default function Jitsi({
  roomName,
  name,
  onEnd,
}: {
  roomName: string;
  name?: string;
  onEnd?: () => void;
}) {
  return (
    <JitsiMeeting
      domain={'meet.aairavx.com'}
      roomName={roomName}
      configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        startScreenSharing: true,
        enableEmailInStats: false,
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
      }}
      userInfo={{
        displayName: name ? decodeURIComponent(name) : 'YOUR_USERNAME',
        email: 'vinay@gmail',
      }}
      onApiReady={(externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
      }}
      onReadyToClose={() => {
        onEnd?.();
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = 'calc(100vh - 64px - 2rem)';
      }}
    />
  );
}
