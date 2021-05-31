<template>
  <div id="app">
    <h1>Hello {{$auth.user.firstname}} !</h1>
    <div id="nav">
      <!--h2>Token : {{$auth.token}}</h2-->
      <router-link to="/">Home</router-link> |
      <router-link to="/books">
      Books</router-link> |
      <router-link to="/about">About</router-link> |
      <a href="javascript:void(0);" @click="$auth.logout">Log out</a>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
