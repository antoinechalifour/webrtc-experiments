import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

import { useAudioStream } from "../../../../hooks/useAudioStream";
import { SoundIcon } from "./styles";

export interface AudioStreamBoxProps {
  mediaStream: MediaStream;
  forceMute?: boolean;
}

export const AudioStreamBox: React.FC<AudioStreamBoxProps> = ({
  mediaStream,
  forceMute,
}) => {
  const { audioRef } = useAudioStream({ mediaStream });

  return (
    <SoundIcon>
      <FontAwesomeIcon icon={faHeadphones} />
      <audio ref={audioRef} autoPlay={true} muted={forceMute} />
    </SoundIcon>
  );
};
