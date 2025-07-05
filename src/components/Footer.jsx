import React from "react";
import { Box, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import { Facebook as FacebookIcon, Instagram as InstagramIcon, Twitter as TwitterIcon, Email as EmailIcon, Phone as PhoneIcon } from "@mui/icons-material";

const Footer = ({ onCategoryChange }) => {
  const categories = [ "electronics", "jewelery", "men's clothing", "women's clothing" ];

  const customerServiceItems = [
    { label: "Help Center", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Track Order", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  const handleCategoryClick = (cat) => {
    onCategoryChange(cat);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1a1a",
        color: "#fff",
        py: { xs: 3, sm: 5 },
        px: { xs: 2, sm: 3, md: 6, lg: 8 },
        mt: 2,
      }}
    >
      <Grid 
        container 
        spacing={{ xs: 4, sm: 3, md: 5 }}
        justifyContent="space-between"
        sx={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: { xs: '0 8px', sm: '0 12px' }
        }}
      >
        <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 150 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            MyStore
          </Typography>
          <Typography variant="body2" sx={{ color: "#bbb", lineHeight: 1.6 }}>
            Your one-stop shop for the latest electronics, fashion and more.
          </Typography>
        </Grid>

        <Grid item xs={6} sm={4} md={2} sx={{ minWidth: 150 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Categories
          </Typography>
          {categories.map((cat) => (
            <Typography key={cat} variant="body2" sx={{ mb: 1 }}>
              <Link
                component="button"
                onClick={() => handleCategoryClick(cat)}
                underline="hover"
                sx={{
                  color: "#bbb",
                  textTransform: "capitalize",
                  fontSize: "0.875rem",
                  "&:hover": { color: "#fff" }
                }}
              >
                {cat}
              </Link>
            </Typography>
          ))}
        </Grid>

        <Grid item xs={6} sm={4} md={2} sx={{ minWidth: 150 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Customer Service
          </Typography>
          {customerServiceItems.map((item) => (
            <Typography key={item.label} variant="body2" sx={{ mb: 1 }}>
              <Link
                href={item.href}
                underline="hover"
                sx={{ 
                  color: "#bbb", 
                  fontSize: "0.875rem",
                  "&:hover": { color: "#fff" }
                }}
              >
                {item.label}
              </Link>
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12} sm={4} md={3} sx={{ minWidth: 200 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Contact Us
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", mb: 1.5, color: "#bbb" }}
            >
              <EmailIcon fontSize="small" sx={{ mr: 1 }} />
              support@mystore.com
            </Typography>
            <Typography
              variant="body2"
              sx={{ display: "flex", alignItems: "center", color: "#bbb" }}
            >
              <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
              +91 9009090909
            </Typography>
          </Box>

          <Box>
            <IconButton
              aria-label="Facebook"
              href="#"
              sx={{ color: "#bbb", "&:hover": { color: "#1877f2" } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              href="#"
              sx={{ color: "#bbb", "&:hover": { color: "#e4405f" } }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              href="#"
              sx={{ color: "#bbb", "&:hover": { color: "#1da1f2" } }}
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ 
        my: { xs: 3, sm: 4 }, 
        bgcolor: "#444",
        maxWidth: 1280,
        margin: { xs: '20px auto 0', sm: '24px auto 0' }
      }} />
      <Typography
        variant="body2"
        align="center"
        sx={{ 
          color: "#888", 
          fontSize: "0.75rem",
          pt: 1,
          maxWidth: 1280,
          margin: '0 auto'
        }}
      >
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;