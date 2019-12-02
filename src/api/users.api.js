import api from './api.js';

class UserService {

  getCurrentUser() {
    return api.httpGET('/api/user/me');
  }

  checkUsernameAvailability(username) {
    return api.httpGET(`/api/user/checkUsernameAvailability?username=${username}`);
  }

  checkEmailAvailability(email) {
    return api.httpGET(`/api/user/checkEmailAvailability?email=${email}`);
  }
}

const userService = new UserService();
export default userService;