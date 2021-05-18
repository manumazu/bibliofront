<template>
  <div id="login" class="container" style="width: 500px;">
    <h1>Welcome on Biblio(bus) cli</h1>
    <form @submit.prevent="submit()" class="form-horizontal">
      <p v-if="errorMessage" class="error">{{errorMessage}}</p>
      <fieldset>
        <div class="form-group">
            <label for="InputEmail">Email address</label>
            <input id="InputEmail" type="email" v-model="email" class="form-control" />
        </div>
        <div class="form-group">
            <label for="InputPwd">Password</label>
            <input id="InputPwd" type="password" v-model="password" class="form-control" />
        </div>
      </fieldset>
      <button type="submit" class="btn btn-primary">Log in</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    submit() {
      this.$emit('submit', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.error { color: red; }

#login {
  margin-top: 60px;
  text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}
</style>
