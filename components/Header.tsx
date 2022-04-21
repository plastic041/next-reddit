import { Box, IconButton, Stack } from "@mui/material";

import AppBar from "@mui/material/AppBar";
import GitHubIcon from "@mui/icons-material/GitHub";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Tops } from "~/typings/Tops";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  subreddit: string;
  top: Tops | null;
  onChangeTop: (event: React.ChangeEvent<{}>, value: Tops | null) => void;
};

const Header = ({ subreddit, top, onChangeTop }: HeaderProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: 2,
        alignItems: "center",
        marginBottom: 2,
        flexGrow: 0,
      }}
    >
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        r/{subreddit}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Paper elevation={0}>
          <ToggleButtonGroup
            value={top}
            onChange={onChangeTop}
            exclusive
            size="small"
          >
            <ToggleButton value="day">Day</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>
        </Paper>
        <Box sx={{ color: "#fff" }}>
          <IconButton
            color="inherit"
            component="a"
            href="https://github.com/plastic041/next-reddit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Stack>
    </AppBar>
  );
};
export default Header;
