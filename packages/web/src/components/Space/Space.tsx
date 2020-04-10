import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {
  ControlsLayout,
  HeaderLayout,
  SpaceLayout,
  MainContent,
} from "./styles";
import { UserMediaControls } from "./UserMediaControls/UserMediaControls";
import { useRtc } from "./webrtc/useRtc";
import { SpaceQrCode } from "./SpaceQrCode";
import { useNotifier } from "./useNotifier";
import { Layout } from "./Layouts/Layout";

export interface SpaceProps {
  userName: string;
  slug: string;
}

export const Space: React.FC<SpaceProps> = ({ userName, slug }) => {
  const {
    remotePeers,
    localStream,
    addLocalStream,
    removeLocalStream,
  } = useRtc(slug);

  useNotifier({ remotePeers });

  return (
    <SpaceLayout>
      <HeaderLayout>
        <h1>
          WebRTC Experiments
          <span> / {slug}</span>
        </h1>
        <p>
          <FontAwesomeIcon icon={faUser} /> {userName}
        </p>
      </HeaderLayout>

      <MainContent>
        <Layout
          remotePeers={remotePeers}
          localUser={{ name: userName, mediaStream: localStream }}
        />

        <SpaceQrCode />
      </MainContent>

      <ControlsLayout>
        <UserMediaControls
          onUserMediaAdded={addLocalStream}
          onUserMediaRemoved={removeLocalStream}
        />
      </ControlsLayout>
    </SpaceLayout>
  );
};
