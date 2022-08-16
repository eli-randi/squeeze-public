import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BigOrange from "./big-orange.jpg";
import { loginToAPI } from "../util/API";
import CSRFToken from "../util/Csrf";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate, useLocation } from "react-router-dom";
import { MetaContext } from "../Components/Auth";
import Loader from "../Components/Loader";
import { ErrorContext } from "../Components/Error";
import SqueezeLogo from "../Components/SqueezeLogo.png";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const errorContext = useContext(ErrorContext);
  let navigate = useNavigate();
  let auth = useContext(MetaContext);
  let location = useLocation();
  let from = location.state?.from?.pathname || "/home";

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginError(false);
    const loggedInPromise = loginToAPI(username, password, errorContext);
    loggedInPromise.then((loggedIn) => {
      if (loggedIn) {
        auth.refreshLoginFromServer();
        navigate(from);
      } else {
        setLoginError(true);
      }
    });
  };

  if (auth.isLoggedIn == null) {
    return <Loader />;
  }

  if (auth.isLoggedIn) {
    navigate(from, { replace: true });
    return <Loader />;
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${BigOrange})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1 }} src={SqueezeLogo} />
          <Typography variant="h5">Sign in</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <CSRFToken />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              error={loginError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              error={loginError}
            />
            {loginError && (
              <FormHelperText error>
                Username or password incorrect
              </FormHelperText>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs textAlign="center">
                <Link
                  href="mailto:hello@thisissqueeze.com"
                  variant="body2"
                  color="secondary"
                >
                  {"Don't have an account? Get in touch."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
