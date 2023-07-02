import { renderToStaticMarkup } from "react-dom/server";
import * as icons from "./icons";
import { useImage } from "./useImage";

type Icons = keyof typeof icons;

export const useIconImage = (icon: Icons, size?: number) => {
  const svgString = encodeURIComponent(
    renderToStaticMarkup(icons[icon]({ size }))
  );
  const dataUri = `data:image/svg+xml,${svgString}`;

  const [image] = useImage(dataUri);
  return image;
};
