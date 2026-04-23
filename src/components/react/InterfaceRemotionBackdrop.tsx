import { Player } from "@remotion/player";
import { InterfaceBackdrop } from "../../remotion/compositions/InterfaceBackdrop";

const DURATION_FRAMES = 300;

export type InterfaceRemotionBackdropProps = {
  accent: string;
  variant: string;
};

/**
 * Looping Remotion backdrop — no scroll binding. Client-only.
 */
export function InterfaceRemotionBackdrop({ accent, variant }: InterfaceRemotionBackdropProps) {
  return (
    <div
      className="lyra-layer-ambient opacity-[0.92]"
      aria-hidden
    >
      <Player
        component={InterfaceBackdrop}
        inputProps={{ accent, variant }}
        durationInFrames={DURATION_FRAMES}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        style={{ width: "100%", height: "100%" }}
        controls={false}
        autoPlay
        loop
        numberOfSharedAudioTags={0}
        acknowledgeRemotionLicense
      />
    </div>
  );
}
