<template>
<div>
  
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Name"
      v-model="name"
      :rules="nameRules"
      :counter="100"
      required
      prepend-icon="face"   
    > 
    </v-text-field>


    <v-text-field
    label="Contact No"
    v-model = "contact"
    :rules="conRules"
    prepend-icon="phone"
    >

    </v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
      required
      prepend-icon="email"
    ></v-text-field>

    <v-select
      label="Gender"
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      required
      prepend-icon="wc"
    ></v-select>

    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form> 

  <notify-sucess v-if="sucess"></notify-sucess>
  <notify-error v-if="errors"></notify-error>
  </div>
</template>


<script>
import axios from 'axios'
import Notify from '../components/Notify'
import NotifyError from '../components/NotifyError'
  export default {
    components:{
      'notify-sucess': Notify,
      'notify-error': NotifyError
    },
    data(){
      return{
        id: $route.params.id,
        
      }
    },
    data: () => ({
      // id: this.$route.params.id,
      // message: 'hello',
      sucess: false,
      errors: false,
      valid: true,
      name: '', 
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v && v.length <= 100 || 'Name must be less than 100 characters'
      ],
      contact:'',
      conRules:[
          (v) => !!v || 'Contact is Required',
          (v) => /^\d{10}$/.test(v) || 'Phone number should be a vaild 10 digit'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      select: "Male",
      items: [
        'Male',
        'Female',
        'Other',
      ],
    }),


    methods: {
      submit () {
        let self = this;
        if (this.$refs.form.validate()) {
          if(!this.$route.params.id){
           // Native form submission is not yet supported
          axios.post('https://contact-1b605.firebaseio.com/contact.json', {
            name: this.name,
            contact: this.contact,
            email: this.email,
            select: this.select,

          }).then(function(response){
            console.log("post sucessful")
            self.sucess = true
            self.errors = false
            self.$refs.form.reset()

          },function(error){
            console.log(error)
            self.sucess = false
            self.errors = true
          })
          }
          if(this.$route.params.id){
          axios.patch('https://contact-1b605.firebaseio.com/contact/'+ this.$route.params.id +'/.json').then(function(response)  {
            console.log(response)
            console.log("kera")
          }, function(error){
            console.log(error)
          })
        }
        }


       


      },
      clear () {
        this.$refs.form.reset()
      }
    },

    created(){
      let self = this;
      if (this.$route.params.id){
        console.log(this.$route.params.id)
        
        axios.get('https://contact-1b605.firebaseio.com/contact/'+ this.$route.params.id +'/.json').then(function(response){
            console.log(response.data)
            return response.data
        }).then(function(data){
            self.name = data.name,
            self.contact = data.contact,
            self.email = data.email,
            self.select = data.select
        })
      }
    }


  }
</script>
