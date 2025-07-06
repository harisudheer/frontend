import React from "react";
import { Box, IconButton, Button, Avatar, Badge, useTheme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserActions = ({
  isLoggedIn,
  cartCount,
  userDetails,
  themeColor,
  isMobile,
  dropdownOpen,
  setDropdownOpen,
  navigate
}) => {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" gap={1} position="relative">
      <IconButton
        onClick={() => isLoggedIn ? navigate("/cart") : navigate("/login")}
        sx={{
          color: themeColor === "dark" ? "#ffffff" : "#000000",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
            bgcolor: `${theme.palette.primary.main}10`
          }
        }}
      >
        <Badge
          badgeContent={cartCount}
          color="error"
          max={99}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.65rem",
              height: "18px",
              minWidth: "18px",
              top: 5,
              right: 5,
              border: `1px solid ${themeColor === "dark" ? "#1a1a1a" : "#ffffff"}`,
            }
          }}
        >
          <ShoppingCartIcon fontSize={isMobile ? "small" : "medium"} />
        </Badge>
      </IconButton>

      {isLoggedIn ? (
        <>
          <IconButton
            onClick={() => setDropdownOpen((prev) => !prev)}
            sx={{
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)"
              }
            }}
          >
            <Avatar
              sx={{
                width: isMobile ? 23 : 34,
                height: isMobile ? 28 : 34,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                fontSize: isMobile ? "0.775rem" : "0.9rem"
              }}
            >
              {(userDetails?.username || "U")[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </>
      ) : (
        <Button
          onClick={() => navigate("/login")}
          variant="contained"
          size="small"
          sx={{
            borderRadius: 10,
            px: { xs: 1, sm: 2 },
            py: 1,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(33, 203, 243, .4)"
            },
            transition: "all 0.3s ease"
          }}
        >
          Login
        </Button>
      )}
    </Box>
  );
};

export default UserActions;
