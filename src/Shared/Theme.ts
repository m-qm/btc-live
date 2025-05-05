import { createTheme } from "@mui/material";

export const theme = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundColor: "#1E1E2F",
				},
			},
		},
	},
	palette: {
		mode: "dark",
	},
});
