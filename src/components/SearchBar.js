import React from "react";
import { Box, InputBase, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, themeColor, isMobile, isTablet }) => {
  const theme = useTheme();

  const getSearchBarWidth = () => {
    if (isMobile) return '120px';
    if (isTablet) return '200px';
    return '300px';
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        bgcolor: themeColor === "dark" ? "#2a2a2a" : "#f5f5f5",
        borderRadius: 25,
        border: `1px solid ${themeColor === "dark" ? "#404040" : "#e0e0e0"}`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transform: "translateY(-1px)"
        },
        "&:focus-within": {
          border: `2px solid ${theme.palette.primary.main}`,
          boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`
        }
      }}
    >
      <InputBase
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        sx={{
          px: 2,
          py: 0.5,
          width: getSearchBarWidth(),
          fontSize: { xs: '0.875rem', sm: '1rem' },
          color: themeColor === "dark" ? "#ffffff" : "#000000",
          "& ::placeholder": {
            color: themeColor === "dark" ? "#aaa" : "#666",
            opacity: 1
          }
        }}
      />
      <IconButton
        onClick={handleSearch}
        sx={{
          p: 1,
          color: theme.palette.primary.main,
          "&:hover": {
            bgcolor: `${theme.palette.primary.main}10`
          }
        }}
      >
        <SearchIcon fontSize={isMobile ? "small" : "medium"} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
