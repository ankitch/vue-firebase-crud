<template>
  <div id="app">
    <v-app dark>
    <nav-bar></nav-bar>
    <v-container>
      <vue-form> </vue-form>
    </v-container> 
    
    <router-view/>
    </v-app>
  </div>

</template>

<script>
import Form from './components/Form.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    'nav-bar':NavBar,
    'vue-form':Form
  },
  data(){
    return{

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
