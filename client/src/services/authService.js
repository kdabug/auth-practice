const authService = {
  isAuthenticated: () => {
    // check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    return true;
  },

  signOut: () => {
    // remove token from localStorage
    localStorage.removeItem("token");
  }
};

export default authService;
