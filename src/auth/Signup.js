import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { authenticate, isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const Signup = ({ history }) => {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    weight: 114,
    sex: "M",
  });

  const { weight, sex } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        weight: weight,
        sex: sex
      },
    })
      .then((response) => {
        authenticate(response, () => {
          isAuth() && isAuth().role === "admin"
            ? navigate("/admin", { replace: true })
            : navigate("/athlete_type", { replace: true });
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <Layout>
      <ToastContainer />
      {isAuth() ? <Navigate to="/" /> : null}
      <Container>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={clickSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sex">Sex</InputLabel>
              <Select
                labelId="sex"
                id="sex"
                value={sex}
                label="Sex"
                onChange={handleChange("sex")}
              >
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="weight-class">Weight Class</InputLabel>
              <Select
                labelId="weight-class"
                id="weight-class"
                value={weight}
                label="Weight Class"
                onChange={handleChange("weight")}
              >
                <MenuItem value={114}>114</MenuItem>
                <MenuItem value={123}>123</MenuItem>
                <MenuItem value={132}>132</MenuItem>
                <MenuItem value={148}>148</MenuItem>
                <MenuItem value={165}>165</MenuItem>
                <MenuItem value={181}>181</MenuItem>
                <MenuItem value={198}>198</MenuItem>
                <MenuItem value={220}>220</MenuItem>
                <MenuItem value={242}>242</MenuItem>
                <MenuItem value={275}>275</MenuItem>
                <MenuItem value={319}>319</MenuItem>
                <MenuItem value={320}>320+</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="https://exercisemaphub.com/signin" variant="body2">
                  {"Have an Account? Signin"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Signup;
