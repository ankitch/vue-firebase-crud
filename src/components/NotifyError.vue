<template>
  <div>
    <v-alert  color="error" :value="true">
      This is an error alert with no icon.
    </v-alert>
  </div>
</template>

<script>
  export default{
    props:['message'],
    data (){
      return {

      }
    }
  }
</script>