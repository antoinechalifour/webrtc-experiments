import { RemoteUser } from "../../../models/RemoteUser";
import { ConferenceViewModel } from "../../../viewmodels/ConferenceViewModel";
import { UserPayload } from "./types";
import { logSignaling } from "./signaling";

export const useRtcIceCandidateReceivedHandler = (
  conference: ConferenceViewModel
) => {
  return async (sender: UserPayload, iceCandidate: RTCIceCandidateInit) => {
    logSignaling(`[IN] Ice Candidate | ${sender.name} ${sender.id}`);

    const remotePeer = conference.remotePeerByUser(
      RemoteUser.create(sender.id, sender.name)
    );

    if (!remotePeer) return;

    await remotePeer.addIceCandidate(iceCandidate);
  };
};
