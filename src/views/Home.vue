<template>
  <div class="home" v-if="$auth.user.modules">
    Select a module
    <select id="modules">
      <option>------</option>
      <option v-for="module in $auth.user.modules"
      v-bind:value="module.id_ble_encode"
      v-bind:key="module.id">{{module.arduino_name}}</option>
    </select>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  },
};
</script>
