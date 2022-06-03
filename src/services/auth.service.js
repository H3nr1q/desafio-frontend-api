//serviço de autenticação
import axios from 'axios';
import {Base64} from 'js-base64';
import md5 from 'js-md5';


const API_URL = 'http://186.237.58.167:65129/api/user/';
class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        Username: Base64.encode(user.username),
        UserPassword: Base64.encode(md5(user.password))
      })
      .then(response => {
        if (response.data != null) {
          localStorage.setItem('token', JSON.stringify(response.data));
          localStorage.setItem('user', JSON.stringify(Base64.encode(user.username)));
          localStorage.setItem('usuario', JSON.stringify(user.username));
          localStorage.setItem('pass', JSON.stringify(Base64.encode(md5(user.password))));
          return response.data
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('usuario');
    localStorage.removeItem('pass');
  }
  
}
export default new AuthService();
