<template>
  <div id="app">
  <header>
      <h3>
        Profile: <strong>{{user.usuario}}</strong> 
      </h3>
    </header>
    <p>
      <strong>Usuário:</strong>
      {{user.user}}
    </p>
    <p>
      <strong>Password:</strong>
      {{user.pass}}
    </p>
    <p>
      <strong>Token:</strong>
      {{user.token}}
    </p>
</div>
</template>
<script>
import Usuario from '../services/auth.service'

export default{
    name: 'Profile',
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
    data: () => ({
        user: {
            user: JSON.parse(localStorage.getItem('user')),
            usuario: JSON.parse(localStorage.getItem('usuario')),
            pass: JSON.parse(localStorage.getItem('pass')),
            token: JSON.parse(localStorage.getItem('token'))
        }
    })
}

</script>
<style scoped>

</style>