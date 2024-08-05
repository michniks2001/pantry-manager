import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../firebaseconfig";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLoginClick = () => {
    setOpen(true);
    setIsSigningUp(false);
  };

  const handleSignUpClick = () => {
    setOpen(true);
    setIsSigningUp(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setOpen(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setOpen(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        console.log("User successfully signed out");
      })
      .catch((error) => {
        console.error("User was not successfully signed out: ", error);
      });
    window.location.reload();
  };

  return (
    <AppBar sx={{ bgcolor: "lightblue " }} position="relative">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "black", flexGrow: 1 }}
        >
          Pantry Manager
        </Typography>
        {user ? (
          <Button color="inherit" onClick={handleSignOut}>
            Log out
          </Button>
        ) : (
          <>
            <Button
              sx={{ color: "black" }}
              color="inherit"
              onClick={handleLoginClick}
            >
              Log In
            </Button>
            <Button
              sx={{ color: "black" }}
              color="inherit"
              onClick={handleSignUpClick}
            >
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{isSigningUp ? "Sign Up" : "Log In"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isSigningUp
              ? "Please enter your email and password to sign up."
              : "Please enter your email and password to log in."}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSigningUp ? (
            <TextField
              autoFocus
              required
              margin="dense"
              id="confirm-password"
              name="confirm-password"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          {isSigningUp ? (
            <Button onClick={handleSignUp}>Sign Up</Button>
          ) : (
            <Button onClick={handleSignIn}>Log In</Button>
          )}
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
