import decode from 'jwt-decode';

class AuthService {
  // Get user data from token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Save token to localStorage and reload page
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Clear token from localStorage and reload page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService(); 