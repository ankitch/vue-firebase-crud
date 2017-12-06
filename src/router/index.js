import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Data from '@/components/Data'
import Form from '@/components/Form'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'Form',
      component: Form
    },
    {
      path: '/data',
      name: 'Data',
      component: Data,
    },
    {
      path: '/edit/:id',
      name:'Form',
      component:Form
    }
    
    // mode:'history'
  ],
  mode:'history'
})
