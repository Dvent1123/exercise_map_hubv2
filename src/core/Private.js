import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { isAuth, getCookie, signout } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const Private = ({ history }) => {
  const [values, setValues] = useState({
    role: "",
    name: "",
    email: "",
    weight: 114,
    sex: "",
    password: "",
    buttonText: "Submit",
  });

  const token = getCookie("token");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("private profile update", res);
        const { role, name, weight, email, sex } = res.data;
        setValues({ ...values, role, name, email, weight, sex });
      })
      .catch((error) => {
        console.log("private profile update error", error);
        if (error === 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };

  const { role, name, email, weight, sex, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      data: {
        name: name,
        password: password,
        weight: weight,
        sex: sex,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("profile update success", res);
        setValues({ ...values, buttonText: "Submitted" });
        toast.success("Profile updated successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(err.response.data.error);
      });
  };

  return (
    <Layout>
      <ToastContainer />
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
            Settings
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
              value={name}
              onChange={handleChange("name")}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Role"
              label="Role"
              type="role"
              id="role"
              autoComplete="role"
              value={role}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              disabled
            />
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange("password")}
              autoComplete="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Settings
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Private;
