import React from "react";

export const useImage = (
  url: string,
  crossOrigin?: "anonymous" | "use-credentials"
) => {
  const statusRef = React.useRef<"loading" | "loaded" | "failed">("loading");
  const imageRef = React.useRef<HTMLImageElement>();
  const [_, setStateToken] = React.useState(0);

  const oldUrl = React.useRef<string>();
  const oldCrossOrigin = React.useRef<string>();
  if (oldUrl.current !== url || oldCrossOrigin.current !== crossOrigin) {
    statusRef.current = "loading";
    imageRef.current = undefined;
    oldUrl.current = url;
    oldCrossOrigin.current = crossOrigin;
  }

  React.useLayoutEffect(
    function () {
      if (!url) return;
      const img = document.createElement("img");

      function onload() {
        statusRef.current = "loaded";
        imageRef.current = img;
        setStateToken(Math.random());
      }

      function onerror() {
        statusRef.current = "failed";
        imageRef.current = undefined;
        setStateToken(Math.random());
      }

      img.addEventListener("load", onload);
      img.addEventListener("error", onerror);
      crossOrigin && (img.crossOrigin = crossOrigin);
      img.src = url;

      return function cleanup() {
        img.removeEventListener("load", onload);
        img.removeEventListener("error", onerror);
      };
    },
    [url, crossOrigin]
  );
  return [imageRef.current, statusRef.current] as const;
};
