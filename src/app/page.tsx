"use client";
import React from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Paper,
  Grid,
  Button,
  styled,
  alpha,
  Card,
  CardContent,
  Fade,
  Zoom,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  AccountBalanceWallet,
  Castle,
  Diamond,
  EmojiEvents,
  Security,
  TrendingUp,
  Star,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import InfinityTower from "./components/organisms/InfinityTower/InfinityTower";
import FloorCreationModal from "./components/organisms/FloorCreationModal/FloorCreationModal";

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(102, 126, 234, 0); }
  100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  backgroundSize: "200% 200%",
  color: "white",
  padding: "14px 36px",
  borderRadius: "25px",
  fontWeight: 700,
  fontSize: "1.2rem",
  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
  transition: "all 0.3s ease",
  animation: `${pulseAnimation} 2s infinite`,
  "&:hover": {
    transform: "translateY(-4px) scale(1.05)",
    boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.6)}`,
    animation: "none",
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: "25px",
  backdropFilter: "blur(15px)",
  backgroundColor: alpha(theme.palette.background.paper, 0.85),
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: `0 25px 50px ${alpha(theme.palette.primary.main, 0.25)}`,
    borderColor: alpha(theme.palette.primary.main, 0.5),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  background: `linear-gradient(-45deg, #0a0a2a, #1a1a4a, #2a2a6a, #3a3a8a)`,
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 15s ease infinite`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage:
      "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
  },
}));

const FloatingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: "35px",
  backdropFilter: "blur(25px)",
  backgroundColor: alpha("#0a0a2a", 0.85),
  boxShadow: `0 30px 60px ${alpha("#000", 0.5)}`,
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  animation: `${floatAnimation} 6s ease-in-out infinite`,
}));

const GameContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(180deg, #0a0a2a 0%, #1a1a4a 50%, #2a2a6a 100%)`,
  padding: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '"∞"',
    position: "absolute",
    fontSize: "500px",
    opacity: 0.03,
    color: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: 900,
  },
}));

const GameCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha("#1a1a4a", 0.9)}, ${alpha(
    "#0a0a2a",
    0.95
  )})`,
  borderRadius: "30px",
  backdropFilter: "blur(20px)",
  border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  boxShadow: `0 25px 50px ${alpha("#000", 0.4)}`,
  overflow: "hidden",
  transition: "all 0.4s ease",
  "&:hover": {
    boxShadow: `0 35px 70px ${alpha(theme.palette.primary.main, 0.3)}`,
    transform: "translateY(-10px)",
  },
}));

const StatBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: "50px",
  background: alpha(theme.palette.primary.main, 0.2),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
}));

export default function Home() {
  const { address, isConnected } = useAccount();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmitFloor = (formData: Record<string, unknown>) => {
    console.log("New floor created:", formData);
    // Handle the form submission - send to backend, update state, etc.
    handleCloseModal();
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: "blur(15px)",
          backgroundColor: alpha("#0a0a2a", 0.9),
          borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(45deg, #FFD700, #FFA500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Infinity Tower
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              {isConnected && address && (
                <Fade in={true}>
                  <StatBadge>
                    <Star sx={{ color: "#FFD700" }} />
                    <Typography
                      variant="body2"
                      color="white"
                      fontWeight="medium"
                    >
                      Score: 1,245
                    </Typography>
                  </StatBadge>
                </Fade>
              )}
              <ConnectButton
                accountStatus="full"
                chainStatus="icon"
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar /> {/* Spacer for AppBar */}
      {/* Main Content */}
      {!isConnected ? (
        <HeroSection>
          <Container maxWidth="xl">
            <Zoom in={true} style={{ transitionDelay: "100ms" }}>
              <FloatingCard>
                <Grid container spacing={8} alignItems="center">
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 4,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h1"
                          fontWeight="bold"
                          gutterBottom
                          sx={{
                            background:
                              "linear-gradient(45deg, #FFD700, #FFA500, #FF6347)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: { xs: "3rem", md: "4rem" },
                          }}
                        >
                          Infinity Tower
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: alpha("#fff", 0.9),
                            fontStyle: "italic",
                          }}
                        >
                          Build Higher, Earn More
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{ color: "white", mb: 4, lineHeight: 1.6 }}
                    >
                      Welcome to the ultimate Web3 tower-building adventure!
                      Connect your wallet to start building your infinite tower,
                      compete with players worldwide, and earn real rewards.
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        mb: 6,
                      }}
                    >
                      <GradientButton
                        size="large"
                        startIcon={<AccountBalanceWallet />}
                        onClick={() => {
                          (
                            document.querySelector(
                              '[data-testid="rk-connect-button"]'
                            ) as HTMLElement
                          )?.click();
                        }}
                      >
                        Connect & Play Now
                      </GradientButton>

                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "white",
                          }}
                        >
                          <Security color="success" /> Secure
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "white",
                          }}
                        >
                          <Diamond sx={{ color: "#FFD700" }} /> Play-to-Earn
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "white",
                          }}
                        >
                          <Castle sx={{ color: "#FF6347" }} /> Multiplayer
                        </Typography>
                      </Box>
                    </Box>

                    {/* Stats */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{ color: "#FFD700" }}
                          >
                            50K+
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: alpha("#fff", 0.8) }}
                          >
                            Players
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{ color: "#FF6347" }}
                          >
                            2.5M
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: alpha("#fff", 0.8) }}
                          >
                            Towers Built
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Box sx={{ textAlign: "center" }}>
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            sx={{ color: "#9370DB" }}
                          >
                            500K+
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: alpha("#fff", 0.8) }}
                          >
                            Rewards Paid
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={3}>
                      {[
                        {
                          icon: (
                            <Castle sx={{ fontSize: 50, color: "#FF6347" }} />
                          ),
                          title: "Build Your Tower",
                          desc: "Construct floors, add special rooms, and upgrade your tower to infinity",
                        },
                        {
                          icon: (
                            <EmojiEvents
                              sx={{ fontSize: 50, color: "#FFD700" }}
                            />
                          ),
                          title: "Compete & Win",
                          desc: "Battle other players, climb leaderboards, and win massive rewards",
                        },
                        {
                          icon: (
                            <Diamond sx={{ fontSize: 50, color: "#9370DB" }} />
                          ),
                          title: "Collect Rewards",
                          desc: "Earn tokens, NFTs, and special items as you build higher",
                        },
                        {
                          icon: (
                            <TrendingUp
                              sx={{ fontSize: 50, color: "#00FF7F" }}
                            />
                          ),
                          title: "Trade Assets",
                          desc: "Buy, sell, and trade tower parts in the marketplace",
                        },
                      ].map((feature, index) => (
                        <Grid size={{ xs: 6 }} key={index}>
                          <Zoom
                            in={true}
                            style={{
                              transitionDelay: `${index * 100 + 200}ms`,
                            }}
                          >
                            <FeatureCard>
                              {feature.icon}
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ color: "white", my: 2 }}
                              >
                                {feature.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: alpha("#fff", 0.8) }}
                              >
                                {feature.desc}
                              </Typography>
                            </FeatureCard>
                          </Zoom>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </FloatingCard>
            </Zoom>
          </Container>
        </HeroSection>
      ) : (
        <GameContainer>
          <Container maxWidth="xl">
            {/* Game Header */}
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{
                  background: "linear-gradient(45deg, #FFD700, #FFA500)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                Your Infinity Tower
              </Typography>
              <Typography variant="h6" sx={{ color: alpha("#fff", 0.9) }}>
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </Typography>
            </Box>

            {/* Game Content */}
            <Grid container spacing={4}>
              {/* Tower Visualization */}
              <Grid size={{ xs: 12, md: 8 }}>
                <InfinityTower />
              </Grid>

              {/* Game Controls & Stats */}
              <Grid size={{ xs: 12, md: 4 }}>
                <GameCard sx={{ mb: 4 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: "white", mb: 3 }}
                    >
                      Tower Stats
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        {
                          label: "Height",
                          value: "7 Floors",
                          color: "#FFD700",
                        },
                        { label: "Strength", value: "85%", color: "#FF6347" },
                        { label: "Value", value: "2.5 ETH", color: "#00FF7F" },
                        { label: "Rank", value: "#1,245", color: "#9370DB" },
                      ].map((stat, index) => (
                        <Grid size={{ xs: 6 }} key={index}>
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: "15px",
                              background: alpha(stat.color, 0.1),
                              border: `1px solid ${alpha(stat.color, 0.3)}`,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: alpha("#fff", 0.7) }}
                            >
                              {stat.label}
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              sx={{ color: stat.color }}
                            >
                              {stat.value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </GameCard>

                {/* Game Actions */}
                <GameCard>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: "white", mb: 3 }}
                    >
                      Build Actions
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        {
                          label: "Add Floor",
                          cost: "0.1 ETH",
                          color: "primary" as const,
                          onClick: handleOpenModal,
                        },
                        {
                          label: "Reinforce",
                          cost: "0.05 ETH",
                          color: "secondary" as const,
                        },
                        {
                          label: "Add Special Room",
                          cost: "0.2 ETH",
                          color: "error" as const,
                        },
                        {
                          label: "Upgrade All",
                          cost: "0.5 ETH",
                          color: "success" as const,
                        },
                      ].map((action, index) => (
                        <Grid size={{ xs: 12 }} key={index}>
                          <Button
                            fullWidth
                            variant="contained"
                            color={action.color}
                            onClick={action.onClick} // Attach the click handler
                            sx={{
                              py: 2,
                              borderRadius: "15px",
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            {action.label}
                            <Typography
                              variant="caption"
                              sx={{ ml: 1, opacity: 0.9 }}
                            >
                              ({action.cost})
                            </Typography>
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </GameCard>
              </Grid>
            </Grid>

            {/* Leaderboard */}
            <GameCard sx={{ mt: 6 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: "white", mb: 3 }}
                >
                  Global Leaderboard
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      rank: 1,
                      player: "0xabc...123",
                      height: 145,
                      reward: "25 ETH",
                    },
                    {
                      rank: 2,
                      player: "0xdef...456",
                      height: 132,
                      reward: "18 ETH",
                    },
                    {
                      rank: 3,
                      player: "0xghi...789",
                      height: 128,
                      reward: "15 ETH",
                    },
                    {
                      rank: 1245,
                      player: address?.slice(0, 6) + "..." + address?.slice(-4),
                      height: 7,
                      reward: "0.05 ETH",
                    },
                  ].map((item, index) => (
                    <Grid size={{ xs: 12 }} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "15px",
                          background:
                            index === 3
                              ? alpha("#FFD700", 0.1)
                              : alpha("#fff", 0.05),
                          border: `1px solid ${
                            index === 3
                              ? alpha("#FFD700", 0.3)
                              : alpha("#fff", 0.1)
                          }`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 3 }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              color: index < 3 ? "#FFD700" : "white",
                              fontWeight: "bold",
                              minWidth: "40px",
                            }}
                          >
                            #{item.rank}
                          </Typography>
                          <Typography sx={{ color: "white" }}>
                            {item.player}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 4 }}
                        >
                          <Typography sx={{ color: alpha("#fff", 0.8) }}>
                            Height: <strong>{item.height}</strong> floors
                          </Typography>
                          <Typography
                            sx={{ color: "#00FF7F", fontWeight: "bold" }}
                          >
                            {item.reward}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </GameCard>
          </Container>
        </GameContainer>
      )}
      {/* Footer */}
      {!isConnected && (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            background: alpha("#0a0a2a", 0.9),
            borderTop: `1px solid ${alpha("#fff", 0.1)}`,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="body2" sx={{ color: alpha("#fff", 0.6) }}>
              Infinity Tower © 2024 • Built on Ethereum • Connect with MetaMask,
              Coinbase Wallet, or WalletConnect
            </Typography>
          </Container>
        </Box>
      )}
      <FloorCreationModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFloor}
      />
    </Box>
  );
}
