import { HTTPClient } from '../../services/HTTPClient';

class UsersController {
  constructor(private db: HTTPClient) {}

  async validateUserInfo(username: string, password: string) {
    const response = await this.db
      .validateUser(username, password)
      .then((response) => {
        const loginResponse: loginData = response.data;
        return loginResponse;
      })
      .catch((error) => {
        return { message: error.response.data.message, username: '' };
      });

    return response;
  }
}

interface loginData {
  username?: string;
  isAdmin?: boolean;
  message: string;
  authtoken?: string;
}

export default UsersController;
