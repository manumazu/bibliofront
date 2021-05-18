import axios from 'axios';

export default {
  install: (Vue) => {
    Vue.prototype.$auth = new Vue({
      data() {
        return {
          user: null,
          token: null,
          errorMessage: '',
          baseUrl: '',
        };
      },

      methods: {
        init() {
          this.user = this.getConnectedUser();
        },

        login(email, password) {
          // this.user = this.login(email, password);
          this.email = email;
          this.password = password;
          axios.post(this.baseUrl.concat('/api/login'), {
            email: this.email,
            password: this.password,
          })
            .then((response) => {
              // console.log(response.data[0].token);
              // response ok must contain user's token
              if (response.data === 'Bad login') {
                this.errorMessage = 'Error! Bad login';
              } else if ('token' in response.data[0]) {
                localStorage.setItem('user', JSON.stringify(response.data[0].user));
                this.errorMessage = null;
                this.token = response.data[0].token;
                this.init();
              } else {
                this.errorMessage = 'Token error';
              }
            })
            .catch((error) => {
              this.errorMessage = `Error! Could not reach the API. ${error}`;
            });
        },

        getConnectedUser() {
          const user = localStorage.getItem('user');
          return JSON.parse(user); // : null;
        },

        logout() {
          localStorage.removeItem('user');
          this.user = null;
        },

      },

    });
  },
};
