<template>
  <div>
    <v-alert color="success" icon="new_releases" :value="true">
      This is a success alert with a custom icon. {{message}}
    </v-alert>
    <v-alert>
      This is a success alert with a custom icon.
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