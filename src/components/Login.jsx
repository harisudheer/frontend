import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState([]);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = () => {
    const foundUser = users.find(
      (user) =>
        user.username === login.username && user.password === login.password
    );
    if (foundUser) {
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(foundUser));
      onLogin(foundUser);
    } else {
      toast.error("Invalid username or password");
    }
  };

  const handleSignup = () => {
    if (signup.password !== signup.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log("Signup submitted:", signup);
    toast.success("Signup successful (mock)");
    setIsSignup(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img src="/logo192.png" alt="logo" width="80" />
        </Box>

        <Paper
          elevation={1}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6" mb={2} fontWeight="bold">
            {isSignup ? "Create account" : "Sign in"}
          </Typography>

          {isSignup ? (
            <>
              <TextField
                fullWidth
                label="Username"
                value={signup.username}
                onChange={(e) =>
                  setSignup({ ...signup, username: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Name"
                value={signup.name}
                onChange={(e) =>
                  setSignup({ ...signup, name: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={signup.email}
                onChange={(e) =>
                  setSignup({ ...signup, email: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={signup.phone}
                onChange={(e) =>
                  setSignup({ ...signup, phone: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={signup.address}
                onChange={(e) =>
                  setSignup({ ...signup, address: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={signup.password}
                onChange={(e) =>
                  setSignup({ ...signup, password: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={signup.confirmPassword}
                onChange={(e) =>
                  setSignup({ ...signup, confirmPassword: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#f0c14b",
                  color: "#111",
                  fontWeight: "bold",
                  mt: 1,
                  "&:hover": { backgroundColor: "#ddb347" },
                }}
                onClick={handleSignup}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Username"
                value={login.username}
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#f0c14b",
                  color: "#111",
                  fontWeight: "bold",
                  mt: 1,
                  "&:hover": { backgroundColor: "#ddb347" },
                }}
                onClick={handleLogin}
              >
                Continue
              </Button>
            </>
          )}

          <Typography
            fontSize="12px"
            color="text.secondary"
            mt={2}
            textAlign="left"
          >
            By continuing, you agree to our{" "}
            <span style={{ color: "#0066c0", cursor: "pointer" }}>
              Conditions of Use
            </span>{" "}
            and{" "}
            <span style={{ color: "#0066c0", cursor: "pointer" }}>
              Privacy Notice
            </span>
            .
          </Typography>

          <Typography
            fontSize="13px"
            textAlign="center"
            mt={3}
            sx={{ color: "#0066c0", cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Sign in"
              : "Create your account/Register Here"}
          </Typography>
        </Paper>
      </Box>
      <ToastContainer position="top-center" />
    </Box>
  );
};

export default LoginSignup;
