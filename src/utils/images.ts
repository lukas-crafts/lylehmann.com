import type { ImageMetadata } from "astro";
import {
  astroAsseetsOptimizer,
  isUnpicCompatible,
  unpicOptimizer,
} from "./images-optimization";

const load = async () => {
  let images: Record<string, () => Promise<unknown>> | undefined;
  try {
    images = import.meta.glob(
      "../assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}",
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // continue regardless of error
  }
  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined;

/** */
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

/** */
export const findImage = async (
  imagePath?: string | ImageMetadata | null,
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== "string") {
    return imagePath;
  }

  // Absolute paths
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("/")
  ) {
    return imagePath;
  }

  // Normalize ~/ or ../../ to ../ (relative to this utility in src/utils/images.ts)
  let normalizedPath = imagePath;
  if (normalizedPath.startsWith("~/")) {
    normalizedPath = normalizedPath.replace("~/", "../");
  } else if (normalizedPath.startsWith("../../")) {
    normalizedPath = normalizedPath.replace("../../", "../");
  }

  if (!normalizedPath.startsWith("../assets/images")) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  if (!images) return null;

  // Try exact key
  if (typeof images[normalizedPath] === "function") {
    return ((await images[normalizedPath]()) as { default: ImageMetadata }).default;
  }

  // Try /src/ variant
  const altKey = normalizedPath.replace("../", "/src/");
  if (typeof images[altKey] === "function") {
    return ((await images[altKey]()) as { default: ImageMetadata }).default;
  }

  // Fallback: search by filename
  const filename = normalizedPath.split("/").pop();
  if (filename) {
    const foundKey = Object.keys(images).find((k) => k.endsWith("/" + filename));
    if (foundKey && typeof images[foundKey] === "function") {
      return ((await images[foundKey]()) as { default: ImageMetadata }).default;
    }
  }

  // Final safeguard: if it looks like a local path but wasn't resolved, return null
  if (imagePath.startsWith("..") || imagePath.startsWith("~") || imagePath.includes("assets/")) {
    return null;
  }

  return imagePath;
};

/** */
export const adaptOpenGraphImages = async (
  openGraph: any,
  astroSite: URL | undefined,
): Promise<any> => {
  const finalOpenGraph = openGraph || {};
  if (!finalOpenGraph?.images?.length) {
    return finalOpenGraph;
  }

  const images = finalOpenGraph.images;
  const defaultWidth = 1200;
  const defaultHeight = 626;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as
          | ImageMetadata
          | string
          | undefined;
        if (!resolvedImage) {
          return {
            url: "",
          };
        }

        let _image: { src: string; width: number; height?: number } | undefined;

        if (
          typeof resolvedImage === "string" &&
          (resolvedImage.startsWith("http://") ||
            resolvedImage.startsWith("https://")) &&
          isUnpicCompatible(resolvedImage)
        ) {
          _image = (
            await unpicOptimizer(
              resolvedImage,
              [defaultWidth],
              defaultWidth,
              defaultHeight,
              "jpg",
            )
          )[0];
        } else if (resolvedImage) {
          const dimensions =
            typeof resolvedImage !== "string" &&
            resolvedImage?.width <= defaultWidth
              ? [resolvedImage?.width, resolvedImage?.height]
              : [defaultWidth, defaultHeight];
          _image = (
            await astroAsseetsOptimizer(
              resolvedImage,
              [dimensions[0]],
              dimensions[0],
              dimensions[1],
              "jpg",
            )
          )[0];
        }

        if (typeof _image === "object") {
          return {
            url:
              "src" in _image && typeof _image.src === "string" && astroSite
                ? String(new URL(_image.src, astroSite))
                : "src" in _image && typeof _image.src === "string"
                  ? _image.src
                  : "",
            width:
              "width" in _image && typeof _image.width === "number"
                ? _image.width
                : undefined,
            height:
              "height" in _image && typeof _image.height === "number"
                ? _image.height
                : undefined,
          };
        }
        return {
          url: "",
        };
      }

      return {
        url: "",
      };
    }),
  );

  return {
    ...finalOpenGraph,
    ...(adaptedImages ? { images: adaptedImages } : {}),
  };
};
