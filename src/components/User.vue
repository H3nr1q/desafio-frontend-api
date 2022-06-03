<template>
  <div class="user">
    <h1 class="title">Gestão de Usuários</h1>
      <div class="card card-container">
      <form @submit="salvar" action="https://vuejs.org/" method="post" novalidate="true">
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
              <input for="UserPasswordConfirmed" v-model="form.UserPasswordConfirmed" type="password" class="form-control" placeholder="Confirme a senha do usuário">
            </div>
          </div>          
        </div>
        <div class="center">
            <table>
              <label>Tempo de Token:</label>
              <input type="number" v-model="token" class="col-md-4" style="text-align:center;" min="0">
              <td><Toggle v-model="value1"/> Receber Alertas?</td>
              <td><Toggle v-model="value2"/> Tratar Ocorrências?</td>
              <td><Toggle v-model="value3"/> Desabilitar usuário?</td>
            </table>
        </div>
        <br>
         <br>
      </form> 
    </div>
    <p v-if="errors.length">
    <font color="#ff0000"><b>Por favor, corrija o(s) seguinte(s) erro(s):</b></font>
    <ul>
      <li v-for="error in errors" :key="error"><font color="#ff0000">{{ errors }}</font></li>
    </ul>
    </p>
    <button @click="salvar()" class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
    <button @click="limpar()" class="waves-effect red btn-small">Cancelar<i class="material-icons left">cancel</i></button>
    <br><br>
    <div class="card card-container" style="max-height: 400px;overflow-y: scroll;">
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
            <td>Habilitado</td>
            <td>
              <button @click="editar(users)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
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
    }).catch(e => {
          this.errors = e.resposta.data.errors
    }),
    this.listarUsuarios()
  },
  computed: {
    
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
      unitId: '',
      UserPasswordConfirmed: ''
    },
    listUnit: [],
    listUsers: [],
    value1: false,
    value2: false,
    value3: false,
    errors: [],
    token: 0,

  }),

  methods:{
    listarUsuarios(){
      UnitList.userList().then(resposta => {
      this.listUsers = resposta.data
    }).catch(e => {
          this.errors = e.resposta.data.errors
    })
    },
    async salvar(){
      if(this.form.id == 0){
        this.checkForm();
        this.form.UserPassword = (Base64.encode(md5(this.form.UserPassword)));
        await UnitList.salvar(this.form).then(resposta =>{
        alert('Usuário salvo com sucesso.')
        this.listarUsuarios()
        this.limpar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }else{
        this.checkForm();
        this.form.UserPassword = (Base64.encode(md5(this.form.UserPassword)));
        await UnitList.salvar(this.form).then(resposta =>{
        alert('Usuário alterado com sucesso.')
        this.listarUsuarios()
        this.limpar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }          
    },
    limpar(){
      this.form = {},
      this.value1 = false,
      this.value2 = false,
      this.value3 = false,
      this.token = 0
    },
    checkForm: function(e) {
      this.errors = [];
      if(!this.form.userName){
        this.errors.push('O login é obrigatório.');
      }
      if(!this.form.name){
        this.errors.push('Nome é obrigatório.');
      }
      if(!this.form.UserPassword){
        this.errors.push('Senha é obrigatório.');
      }
      if(!this.form.email){
        this.errors.push('E-mail é obrigatório.');
      }
      else if (!this.validEmail(this.form.email)) {
        this.errors.push('Utilize um e-mail válido.');
      }
      if(!this.form.UserPasswordConfirmed){
        this.errors.push('Confirmar senha é obrigatório');
      }else if (this.form.UserPasswordConfirmed != this.form.UserPassword){
        this.errors.push('Senhas não identicas');
      }
      if(!this.errors.length){
        return true;
      }
      e.preventDefault();   
    },
     validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    editar(users){
      this.users = UnitList.userEdit(users).then(resposta =>{
        this.form = resposta.data
        }).catch(e => {
          this.errors = e.resposta.data.errors
        })
    },
    
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
