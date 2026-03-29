function createLoginTracker(userInfo) {
  // Initialize attempt count
  let attemptCount = 0;

  // Return arrow function
  return (passwordAttempt) => {
    // Increment attempt count
    attemptCount++;

    // Check if password matches and attempts are within limit
    if (passwordAttempt === userInfo.password && attemptCount <= 3) {
      return "Login successful";
    }

    // If attempts are within 3 but incorrect password
    if (attemptCount <= 3) {
      return `Attempt ${attemptCount}: Login failed`;
    }

    // If attempts exceed 3
    return "Account locked due to too many failed login attempts";
  };
}

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};