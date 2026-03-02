export const getImage = async (options: any) => ({
  src: options.src.src || options.src,
  attributes: {
    width: options.width,
    height: options.height,
  },
});
