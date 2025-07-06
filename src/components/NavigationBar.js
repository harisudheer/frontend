import React, { useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; 
import BrandLogo from "./BrandLogo";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import CategoryTabs from "./CategoryTabs";
import SearchResults from "./SearchResults";
import UserDropdown from "./UserDropdown";

const Navbar = ({ isLoggedIn, onLogout, onCategoryChange, cartCount = 0 }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem("themeColor") || "light");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const dropdownRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const categories = [
    { name: "Products", image: "https://th.bing.com/th/id/OIP.YJzUtSYL9JylTCYtokaDXwHaE8?w=248" },
    { name: "electronics", image: "https://th.bing.com/th/id/OIP.yTRFBZ4PKUUWP1zGArnHLwAAAA?o=7" },
    { name: "jewelery", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN0c6kKWXIZvRP5163iddo4jtL43fnzUt4UQ&s" },
    { name: "men's clothing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe4fi2psm7ivrmbeKJjHsAqQc1sNMf7mpQLA&s" },
    { name: "women's clothing", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBiLmWz0MDRTYwIiPOE2aXFiHUZaAPQif14A&s" },
  ];

  const hideTabsRoutes = ["/cart", "/payment"];
  const hideCategoryTabs =
    hideTabsRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/product/");

  useEffect(() => {
    document.body.style.backgroundColor =
      themeColor === "light" ? "#fff" :
      themeColor === "dark" ? "#121212" :
      themeColor === "blue" ? "#e3f2fd" : "#e8f5e9";
  }, [themeColor]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserDetails(user);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowResults(false);
      setFilteredResults([]);
    }
  }, [searchQuery]);

  const handleThemeChange = (color) => {
    setThemeColor(color);
    localStorage.setItem("themeColor", color);
  };

  const handleLogoutClick = () => {
    onLogout();
    setDropdownOpen(false);
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const results = products.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
      setFilteredResults([]);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: themeColor === "dark"
          ? "linear-gradient(90deg, #0f2027, #203a43, #2c5364)"
          : "linear-gradient(90deg, #ffffff, #f7f7f7)",
          color: themeColor === "dark" ? "#ffffff" : "#000000",
          borderBottom: `1px solid ${themeColor === "dark" ? "#333" : "#e0e0e0"}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: '56px', sm: '64px' },
            px: { xs: 1, sm: 2 }
          }}
        >
          <BrandLogo isMobile={isMobile} />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            themeColor={themeColor}
            isMobile={isMobile}
            isTablet={isTablet}
          />
          <UserActions
            isLoggedIn={isLoggedIn}
            cartCount={cartCount}
            userDetails={userDetails}
            themeColor={themeColor}
            isMobile={isMobile}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            navigate={navigate}
          />
        </Toolbar>
      </AppBar>

      {!showResults && !hideCategoryTabs && (
        <CategoryTabs
          categories={categories}
          onCategoryChange={onCategoryChange}
          themeColor={themeColor}
        />
      )}

      {showResults && (
        <SearchResults
          searchQuery={searchQuery}
          filteredResults={filteredResults}
          themeColor={themeColor}
          setShowResults={setShowResults}
          setSearchQuery={setSearchQuery}
          navigate={navigate}
        />
      )}

      {dropdownOpen && (
        <UserDropdown
          dropdownRef={dropdownRef}
          themeColor={themeColor}
          userDetails={userDetails}
          handleThemeChange={handleThemeChange}
          handleLogoutClick={handleLogoutClick}
          setDropdownOpen={setDropdownOpen}
        />
      )}
    </>
  );
};

export default Navbar;
