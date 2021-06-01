<template>
  <div>
    <div v-if="$auth.user">
      <App />
    </div>
    <LoginForm v-else :errorMessage="$auth.errorMessage" @submit="login" />
  </div>
</template>

<script>
// import login from '../authentication';
import App from '../App.vue';
import LoginForm from './LoginForm.vue';

export default {

  data() {
    return {
      baseUrl: 'https://bibliobus.local', // https://bibliob.us',
    };
  },
  methods: {
    login({ email, password }) {
      this.$auth.baseUrl = this.baseUrl;
      this.$auth.login(email, password);
    },

  },

  created() {
    this.$auth.init();
  },

  components: { App, LoginForm },
};
</script>
