<template>
  <div class="user">
    <h1 class="title">Gestão de Usuários</h1>
      <div class="card card-container">
      <form @submit="salvar">
        <div class="form">
          <div class="col-md-5">
            <div class="form-group">
              <label for="userName">Login</label>
              <input for="userName" v-model="form.userName" type="text" class="form-control" placeholder="Informe o nome de usuário">
            </div>
            <div class="form-group">
              <label for="name">Nome Completo</label>
              <input for="name" v-model="form.name" type="text" class="form-control" placeholder="Informe o nome completo do usuário">
            </div>
            <div class="form-group">
              <label for="UserPassword">Senha</label>
              <input for="UserPassword" v-model="form.UserPassword" type="password" class="form-control" placeholder="Informe a senha do usuário">
            </div>
          </div>
          <div class="col-md-5">
            <div class="form-group">
              <label for="unitId">Unidade:</label>
              <select v-model="form.unitId" class="form-control">
               <option v-for="list of listUnit" :value="list.id" :key="list.id">{{list.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input for="email" v-model="form.email" type="email" class="form-control" placeholder="Informe o email do usuário">
            </div>
            <div class="form-group">
              <label for="UserPasswordConfirmed">Confirmação da Senha:</label>
              <input for="UserPasswordConfirmed" type="password" class="form-control" placeholder="Informe a senha do usuário">
            </div>
          </div>          
        </div>
        <div class="center">
            <table>
              <label>Tempo de Token:</label>
              <input type="number" value="0" class="col-md-4" style="text-align:center;">
              <td><Toggle v-model="value1"/> Receber Alertas?</td>
              <td><Toggle v-model="value2"/> Tratar Ocorrências?</td>
              <td><Toggle v-model="value3"/> Desabilitar usuário?</td>
            </table>
        </div>
        <br>
        
        <br>
      </form> 
    </div>
    <button @click="salvar()" class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
    <button @click="limpar()" class="waves-effect red btn-small">Cancelar<i class="material-icons left">cancel</i></button>
    <br><br>
    <div class="card card-container">
      <table>
        <thead>
          <tr>
            <th class="center">Código</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="users of listUsers" :key="users.id">
            <td class="center">{{users.id}}</td>
            <td>{{users.name}}</td>
            <td>{{users.email}}</td>
            <td>Ativo</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
            </td>
          </tr>
        </tbody> 
      </table>      
    </div>  
  </div>
</template>

<script>
import Toggle from '@vueform/toggle';
import UnitList from '../services/user.service'
import {Base64} from 'js-base64';
import md5 from 'js-md5';

export default {
  name: 'User',
  mounted(){
    UnitList.unitList().then(resposta =>{
      this.listUnit = resposta.data.productionUnitList
    }),
    this.listarUsuarios()
  },
  components: { 
    Toggle,
    },
  data: () => ({
    form: {
      id: 0,
      userName: '',
      name: '',
      UserPassword: '',
      email: '',
      improveTeamMember: true,
      supervisor: true,
      receiveAutonomousWarning: false,
      loginExpiration: 4,
      disabled: false,
      system: 'G',
      unitId: ''
    },
    listUnit: [],
    listUsers: [],
    value1: false,
    value2: false,
    value3: false
  }),

  methods:{
    listarUsuarios(){
      UnitList.userList().then(resposta => {
      this.listUsers = resposta.data
    })
    },
    async salvar(){
      this.form.UserPassword = (Base64.encode(md5(this.form.UserPassword)));
      await UnitList.salvar(this.form).then(resposta =>{
        alert('Usuário salvo com sucesso')
        this.listarUsuarios()
        this.limpar()
      })
    },
    limpar(){
      this.form = {}
    }
  }
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style>
  .user {
    background-color: white ;
    height: 100vh;
  }

  .form {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .title {
    margin: 50px 0 50px 200px;
  }

  .buttons {
    display:flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 210px ;
    margin-top: 15px;
  }

.btn-success {
    color: #feffff;
    background-color: #009a9b;
    border-color: #009a9b
}
</style>
