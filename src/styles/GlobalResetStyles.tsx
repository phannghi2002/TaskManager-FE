import { GlobalStyles } from "@mui/material";

const GlobalResetStyles = () => {
  return (
    <GlobalStyles
      styles={{
        "html, body, #root": {
          margin: 0,
          padding: 0,
          height: "100%",
          boxSizing: "border-box",
          width: "100%",
        },
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "inherit",
        },
        ul: {
          margin: 0,
          padding: 0,
          listStyle: "none",
        },
        p: {
          margin: 0,
        },
      }}
    />
  );
};

export default GlobalResetStyles;
