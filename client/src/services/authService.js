const authService = {
  isAuthenticated: () => {
    // check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    return true;
  }
};

export default authService;
