import React from "react";
import { Box, Typography, Button } from "@mui/material";

const UserDropdown = ({
  dropdownRef,
  themeColor,
  userDetails,
  handleThemeChange,
  handleLogoutClick,
  setDropdownOpen
}) => {
  return (
    <Box
      ref={dropdownRef}
      sx={{
        position: "absolute",
        top: "10%",
        right: 0,
        mt: 1,
        bgcolor: themeColor === "dark" ? "#2a2a2a" : "#ffffff",
        color: themeColor === "dark" ? "#ffffff" : "#000000",
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        borderRadius: 3,
        p: 2,
        minWidth: { xs: 280, sm: 320 },
        zIndex: 12,
        border: `1px solid ${themeColor === "dark" ? "#404040" : "#e0e0e0"}`,
        backdropFilter: "blur(10px)"
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        User Profile
      </Typography>

      {userDetails ? (
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography><strong>Username:</strong> {userDetails.username}</Typography>
          <Typography><strong>Email:</strong> {userDetails.email}</Typography>
          {userDetails.phone && <Typography><strong>Phone:</strong> {userDetails.phone}</Typography>}
          {userDetails.name && (
            <Typography><strong>Name:</strong> {userDetails.name.firstname} {userDetails.name.lastname}</Typography>
          )}
          {userDetails.address && (
            <Typography>
              <strong>Address:</strong> {userDetails.address.number} {userDetails.address.street}, {userDetails.address.city}, {userDetails.address.zipcode}
            </Typography>
          )}

          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Theme Settings
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {["light", "blue", "green"].map((color) => (
                <Button
                  key={color}
                  variant={themeColor === color ? "contained" : "outlined"}
                  onClick={() => handleThemeChange(color)}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2
                  }}
                >
                  {color}
                </Button>
              ))}
            </Box>
          </Box>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              onClick={handleLogoutClick}
              size="small"
              color="error"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Logout
            </Button>
            <Button
              onClick={() => setDropdownOpen(false)}
              size="small"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>No user details found.</Typography>
      )}
    </Box>
  );
};

export default UserDropdown;
