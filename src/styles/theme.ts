const fontSizes = {
  title: "32px",
  subTitle: "24px",
  text: "16px",
  subText: "12px",
};

const colors = {
  main: "#333",
  bg1f: "#444",
  bg2f: "#4a4a4a",
  white: "#fff",
  black: "#555",
  darkGrey: "#666",
  grey: "#aaa",
  background: "#333",
  translucent: "rgba(0, 0, 0, 0.35)",
  error: "#B00020",
};

const common = {
  boxShadow: `box-shadow: ${colors.translucent} 0 0 4px;`,
  ellipsis: "text-overflow: ellipsis; white-space: nowrap; overflow: hidden;",
  hoverEffect: `transition: filter 0.25s ease; cursor: pointer; :hover { filter: brightness(90%) drop-shadow(0 0 4px rgba(255, 255, 255, 0.5)); }`,
};

const theme = {
  fontSizes,
  colors,
  common,
};

export default theme;
