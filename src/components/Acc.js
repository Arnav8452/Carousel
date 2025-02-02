import React, { useState, useEffect } from "react";
import { 
  auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "./firebase";
import "../styles/Acc.css";
import "../styles/HoverCard.css"; // Import the HoverCard styles
import { IoEye, IoEyeOff } from 'react-icons/io5'; // Import eye icons for visibility toggle

const Acc = () => {
  const [user, setUser] = useState(null); // For tracking the logged-in user
  const [isSigningUp, setIsSigningUp] = useState(false); // Toggle between login and signup
  const [isModalOpen, setIsModalOpen] = useState(true); // Track modal visibility
  const [email, setEmail] = useState(""); // Store email input
  const [password, setPassword] = useState(""); // Store password input
  const [isPasswordInputVisible, setIsPasswordInputVisible] = useState(false); // Track visibility of password input
  const [error, setError] = useState(""); // Store error messages
  const [showPassword, setShowPassword] = useState(false); // Toggle show/hide password visibility
  const [emailError, setEmailError] = useState(""); // Store email error
  const [passwordError, setPasswordError] = useState(""); // Store password error

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsModalOpen(!user); // Close the modal when the user is logged in
    });
    return () => unsubscribe();
  }, []);

  // Google login function
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  // Email/Password login
const handleEmailPasswordLogin = async () => {
  setError(""); // Clear previous error
  setEmailError(""); // Clear email error
  setPasswordError(""); // Clear password error

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    setError(error.message); // Set error message

    // Check error message directly
    if (error.message.includes('auth/invalid-email')) {
      setEmailError("Invalid email format"); // Set email error
    } else if (error.message.includes('auth/user-not-found')) {
      setEmailError("No user found with this email"); // Set email error
    } else if (error.message.includes('auth/wrong-password')) {
      setPasswordError("Incorrect password"); // Set password error
    }
  }
};


  // Email/Password signup
  const handleEmailPasswordSignup = async () => {
    setError(""); // Clear previous error
    setEmailError(""); // Clear email error
    setPasswordError(""); // Clear password error
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message); // Set error message
      if (error.code.includes('auth/invalid-email')) {
        setEmailError("Invalid email format"); // Set email error
      } else if (error.code.includes('auth/weak-password')) {
        setPasswordError("Password should be at least 6 characters"); // Set password error
      }
      else if (error.message.includes('auth/email-already-in-use')) {
      setEmailError("This email is already registered. Please log in instead.");
    }
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setIsPasswordInputVisible(true); // Show password input once email is entered
    }
    setError(""); // Clear error when user starts typing
    setEmailError(""); // Clear email error
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error when user starts typing
    setPasswordError(""); // Clear password error
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsModalOpen(true); // Re-open modal after logout
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <div className="Acc">
      {/* Show modal if not logged in */}
      {!user && isModalOpen && (
        <div className="login-modal">
          <h2>{isSigningUp ? "Sign Up" : "Sign In"}</h2>
          <div className="auth-buttons">
            <button className="google-btn" onClick={handleGoogleLogin}>
              <img src="/Google_logo.png" alt="Google Logo" />
              Continue with Google
            </button>
            <p className="or-text">OR</p>
            <div className="email-auth">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className={`email-input ${emailError ? 'error' : ''}`} // Add error class if emailError exists
              />
              {emailError && <p className="error-message">{emailError}</p>} {/* Display email error message */}

              {isPasswordInputVisible && (
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between password and text
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`password-input ${passwordError ? 'error' : ''}`} // Add error class if passwordError exists
                  />
                  <button type="button" className="eye-btn" onClick={togglePasswordVisibility}>
                    {showPassword ? <IoEyeOff /> : <IoEye />} {/* Show Eye or EyeOff icon */}
                  </button>
                </div>
              )}
              {passwordError && <p className="error-message">{passwordError}</p>} {/* Display password error message */}
              <div className="auth-action">
                {isSigningUp ? (
                  <button className="email-btn" onClick={handleEmailPasswordSignup}>
                    Sign Up with Email
                  </button>
                ) : (
                  <button className="email-btn" onClick={handleEmailPasswordLogin}>
                    Sign In with Email
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="toggle-signup-login">
            <button className="toggle-btn" onClick={() => setIsSigningUp(!isSigningUp)}>
              {isSigningUp ? "Already have an account? Sign In" : "Don’t have an account? Sign Up"}
            </button>
          </div>
        </div>
      )}

      {/* Show profile page if user is logged in */}
      {user && !isModalOpen && (
        <div>
          <h2>Welcome, {user.displayName || user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
          {/* Hover Card Section */}
          <div className="container noselect">
            <div className="canvas">
              <div className="tracker"></div>
              <div id="card">
                <p id="prompt">HOVER OVER ME :D</p>
                <div className="title">
                  <div><b>User Info:</b></div>
                  <div>Name: {user.displayName || "User"}</div>
                  <div>Email: {user.email}</div>
                  <div>City: Unknown</div>
                  <div>Profession: User</div>
                </div>
                <div className="subtitle">Mouse Hover Tracker</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Acc;
