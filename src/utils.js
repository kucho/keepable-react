export const Colors = {
  white: {
    code: "#FFFFFF",
    border: "#999B9E",
  },
  salmon: { code: "#F28B82" },
  orange: { code: "#FBBC04" },
  yellow: { code: "#FFF475" },
  green: { code: "#CCFF90" },
  teal: { code: "#A7FFEB" },
  light_blue: { code: "#CBF0F8" },
  blue: { code: "#AECBFA" },
  purple: { code: "#D7AEFB" },
  pink: { code: "#FDCFE8" },
};

export function getColorName(code) {
  const colorObj = Object.entries(Colors).find(
    ([_, value]) => value.code === code
  );
  return Object.values(colorObj)[0];
}
