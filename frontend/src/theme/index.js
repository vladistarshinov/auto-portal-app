import { createTheme } from "@mui/material";

const THEME_COLORS = {
  primary: "#A5A6F6",
  dark: "#343a40",
  text: "#000000DE",
  muted: "#9B9B9B",
};

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "none",
          textTransform: "uppercase",
        },
      },
      variants: [
        {
          props: { color: "primary", variant: "contained" },
          style: {
            padding: "12px 30px",
            color: THEME_COLORS.text,
            "&:focus": {
              outline: "none",
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          //height: "40px",
          [`& fieldset`]: {
            borderRadius: 10,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          transition: ".5s",
          "&:hover": {
            textDecoration: "none",
            color: "inherit",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          transition: ".5s",
          "&:hover": {
            textDecoration: "none",
            color: "inherit",
          },
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          background: "transparent",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: ".5rem",
          "&:not(:first-of-type)": {
            marginTop: 7,
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          padding: "0.5rem 0",
        },
        primary: {
          fontSize: "16px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: THEME_COLORS.primary,
      dark: THEME_COLORS.dark,
    },
    text: {
      primary: THEME_COLORS.text,
      muted: THEME_COLORS.muted,
    },
  },
});
