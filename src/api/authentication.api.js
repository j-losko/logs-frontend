import api from './api.js';

class AuthenticationService {

  signIn(request) {
    return api.httpPOST('/api/auth/signin', request)
      .then(this.saveToken);
  }

  signUp(request) {
    return api.httpPOST('/api/auth/signup', request);
  }

  saveToken = (response) => {
    const token = response.accessToken;
    localStorage.setItem('token', JSON.stringify(token));
    return response.accessToken;
  }

}

const authenticationService = new AuthenticationService();
export default authenticationService;