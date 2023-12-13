import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  Grid,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Qc2Context } from "../context/Qc2Provider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.2)",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const { userToken, setUserToken } = useContext(Qc2Context);
  const navigate = useNavigate();
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_BASE_URL;
    try {
      const res = await axios.post(`${url}/authenticate/`, {
        loginname: values.username,
        password: values.password,
      });
      if (res.status === 200) {
        localStorage.setItem("user", res.data.access_token);
        setUserToken(localStorage.getItem("user"));
        userToken && navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <Paper elevation={3} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={values.username}
              onChange={handleChange("username")}
              autoFocus
            />
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
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
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
                style={{ border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
