import { Composition } from "remotion";
import { FlowoFilm } from "./FlowoFilm";

const FPS = 30;
const DURATION = 46 * FPS;

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="FlowoInstitucional"
        component={FlowoFilm}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ vertical: false }}
      />
      <Composition
        id="FlowoInstitucionalVertical"
        component={FlowoFilm}
        durationInFrames={DURATION}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ vertical: true }}
      />
    </>
  );
}
