import { HTTPClient } from '../../services/HTTPClient';

class UsersController {
  constructor(private db: HTTPClient) {}

  async validateUserInfo(username: string, password: string) {
    this.db.validateUser(username, password).then((response) => {
      console.log(response.data);
    });
  }
}

export default UsersController;
