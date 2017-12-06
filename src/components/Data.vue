
<template>
  <v-card>
    <v-card-title>
      Contacts
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>


    <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
      >

      <template slot="items" slot-scope="props">
        <td>
          <v-edit-dialog
            lazy
          > {{ props.item.name }}
            <v-text-field
              slot="input"
              label="Edit"
              v-model="props.item.name"
              single-line
              counter
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-right">{{ props.item.contact }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{props.item.select}}</td>

        <router-link v-bind:to="'/edit/'+ props.item.id">
            <td class="text-xs-right">
                <v-icon>edit</v-icon>
            </td>
        </router-link>
        <td>
       <router-link to="/data" exact>
            <td @click="delte(props.item.id)" class="text-xs-right">
                <v-icon>delete</v-icon>
            </td>
       </router-link>
        


        <td class="text-xs-right">
          <v-edit-dialog
            @open="tmp = props.item.iron"
            @save="props.item.iron = tmp || props.item.iron"
            small
            lazy
          >
            <div>{{ props.item.iron }}</div>
            <div slot="input" class="mt-3 title">Update Iron</div>
            <v-text-field
              slot="input"
              label="Edit"
              v-model="tmp"
              single-line
              counter
              autofocus
              :rules="[max25chars]"
            ></v-text-field>
          </v-edit-dialog>
        </td>
      </template>
    
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    data () {
      return {

        items: [ ],
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          { text: 'Contactno', value: 'contactno' },
          { text: 'Email', value: 'email' },
          { text: 'Sex', value: 'sex' },
        ]
      }
    },
    created(){
        // this.$http.get("https://contact-1b605.firebaseio.com/contact.json").then(function(data){
        //     console.log(data)
        //     return data.json()
        // }).then(function(data){
        //     console.log(data)
        //     const holder = []
        //     for(let key in data){
        //         data[key].id = key
        //         holder.push(data[key])
        //     }
        //     this.contactinfo = holder
        //     console.log(holder)
        // })
        let self = this
        axios.get('https://contact-1b605.firebaseio.com/contact.json').then(function(response){
            console.log(response.data)
            return response.data
        }).then(function(data){
            const holder = []
            console.log(data)
            for(let key in data){
                console.log(key)
                 data[key].id = key,
                 holder.push(data[key])
            }
            console.log(holder)
            self.items = holder
        })

    },
    methods:{
        delte(id){
            axios.delete("https://contact-1b605.firebaseio.com/contact/" + id + "/.json").then(function(data){
                console.log(data)
            }).then(function(){
              ``
            })

            
        }
    }

    }
</script>