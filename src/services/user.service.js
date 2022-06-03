//serviço de consumo de dados da api
import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://186.237.58.167:65129/api/user/';
class UserService {
  unitList() {
    return axios.get(API_URL + 'getproductionunitlist', { headers: authHeader() });
  }
  userList() {
    return axios.get(API_URL + 'getusers', { headers: authHeader() });
  }
  salvar(usuario){
    return axios
      .post(API_URL + 'saveuser' ,  
      {
        id: usuario.id,
        userName: usuario.userName,
        name : usuario.name,
        UserPassword: usuario.UserPassword,
        email: usuario.email,
        improveTeamMember: usuario.improveTeamMember,
        supervisor : usuario.supervisor,
        receiveAutonomousWarning : usuario.receiveAutonomousWarning,
        loginExpiration : usuario.loginExpiration,
        disabled : usuario.disabled,
        system : usuario.system,
        unitId : usuario.unitId
      },
      {headers: authHeader()},
      );
  }
    userEdit(usuario){
      return axios.get(API_URL + 'getuserbyid/G/'+usuario.id,
      { headers: authHeader() });
  }
}
export default new UserService();