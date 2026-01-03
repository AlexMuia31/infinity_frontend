import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <Container>
      <Box>
        <AppBar>
          <Toolbar>
            <ConnectButton />
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
}
