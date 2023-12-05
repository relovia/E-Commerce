//MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setFormField, setError } from "../../redux/signSlice";
import { setCurrentUser } from "../../redux/userSlice";
//Firebase
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.signUp);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormField({ [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Fill the blanks");
    }

    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      dispatch(setCurrentUser(user.uid));
      dispatch(resetForm());
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          dispatch(setError("Invalid login credentials"));
          break;
        case "auth/invalid-email":
          dispatch(setError("Invalid email"));
          break;
        case "auth/user-not-found":
          dispatch(setError("Invalid email"));
          break;
        default:
          console.error("Something went wrong", error);
      }
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <p className="text-red-700 text-center mb-4 capitalize">{error}</p>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body1">
                  <span>If you don`t have an account? Sign up</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignInForm;
