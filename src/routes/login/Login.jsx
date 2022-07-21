import React, { useState, useContext, forwardRef } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Box,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Button,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./login-style.css";
import UserContext from "../../userContext";
import { REGISTERED_USERS, STORAGE } from "../../constants";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const { user, onSetUser } = useContext(UserContext);
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [isButtonHover, setButtonHover] = useState(false);
  const [isLoginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!values.username || !values.password) return;
    const foundUser = REGISTERED_USERS.find(
      (d) => values.username === d.username && values.password === d.password
    );
    if (foundUser) {
      const userState = { isLogin: true, username: values.username };
      sessionStorage.setItem(STORAGE.ACTIVE_USER, JSON.stringify(userState));
      onSetUser(userState);
      navigate("/home", { replace: true });
    } else {
      setLoginError(true);
    }
  };

  if (user?.isLogin) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="page-wrapper">
      <main className="login-content">
        <h2 style={{ marginBottom: "40px" }}>Sign In Page</h2>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "300px",
            maxWidth: "360px",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <TextField
            error={false}
            id="outlined-error"
            label="Username"
            value={values.username}
            onChange={handleChange("username")}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Button
            type="submit"
            variant={isButtonHover ? "contained" : "outlined"}
            size="large"
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            Sign In
          </Button>
        </Box>
      </main>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isLoginError}
        autoHideDuration={6000}
        onClose={() => setLoginError(false)}
      >
        <Alert
          onClose={() => setLoginError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Username or password is not correct!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
