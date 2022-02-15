import { FC, Suspense } from "react";
import { useFont } from "../hooks/useFont";

export default {
  title: "Hooks",
  argTypes: {
    font: {
      control: {
        type: "text",
      },
    },
  },
};

const getFontFromStory = (args: IArguments) => {
  const font = args[0].font;
  return font;
};

export function useFontHook() {
  const font = getFontFromStory(arguments);

  useFont([font, "Inter"]);
  return (
    <div style={{ fontFamily: `"${font}",Inter` }}>
      <h1>Hello there!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
}

export function useFontWithSuspense() {
  const font = getFontFromStory(arguments);

  const Content = () => {
    useFont([font, "Inter"], true);
    return (
      <div style={{ fontFamily: `"${font}",Inter` }}>
        <h1>Hello there!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    );
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Content />
    </Suspense>
  );
}
