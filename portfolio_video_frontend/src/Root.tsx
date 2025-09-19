import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { PortfolioTemplateA, PortfolioSchema } from "./compositions/PortfolioTemplateA";
import { PortfolioTemplateB } from "./compositions/PortfolioTemplateB";
import { defaultProfile } from "./types/portfolio";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      <Composition
        id="PortfolioA"
        component={PortfolioTemplateA}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
        schema={PortfolioSchema}
        defaultProps={{
          profile: defaultProfile,
          background: "#F3F4F6",
        }}
      />

      <Composition
        id="PortfolioB"
        component={PortfolioTemplateB}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          profile: {
            ...defaultProfile,
            accentPrimary: "#2563EB",
            accentSecondary: "#F59E0B",
          },
        }}
      />
    </>
  );
};
