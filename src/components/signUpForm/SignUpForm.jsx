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
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, password, confirmPassword, error } =
    useSelector((state) => state.signUp);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormField({ [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match, please try again."));
      return;
    }

    try {
      const result = await createAuthUserWithEmailAndPassword(
        email,
        password,
        firstName,
        lastName
      );

      if (result && result.user) {
        // If user is defined in result, continue
        const user = result.user;

        await createUserDocumentFromAuth(user, {
          displayName: { firstName, lastName },
        });
        dispatch(resetForm());
        dispatch(setCurrentUser(user.uid));
      } else {
        dispatch(setError("User not found in the result."));
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          dispatch(setError("Cannot create user, email already in use"));
          break;
        case "auth/invalid-email":
          dispatch(setError("Invalid email"));
          break;
        case "auth/weak-password":
          dispatch(setError("Password should be at least 6 characters"));
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
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  aria-required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={handleChange}
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
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
              Sign Up
            </Button>
            <p className="text-red-700 text-center mb-4 capitalize">{error}</p>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signin" variant="body1">
                  <span>Already have an account? Sign in</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpForm;
