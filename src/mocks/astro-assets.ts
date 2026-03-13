export const getImage = async (options: {
  src: string | { src: string };
  width?: number;
  height?: number;
}) => ({
  src: typeof options.src === "string" ? options.src : options.src.src,
  attributes: {
    width: options.width,
    height: options.height,
  },
});
