<template>
  <div>
<header class="nav">
<router-link to="/signout" exact-active-class="s" v-if="find">
  <li class="h">Signout</li></router-link>
  <li class="h name" v-if="find">{{name}}</li>
</header>
    <router-view></router-view>
  </div>
</template>



<script>
export default {
data(){
  return{
     find:false,
     name:''
  }
},

  methods:{
    check(){
      var token = localStorage.getItem('token')
      if(token){
         this.find= true
         this.name = localStorage.getItem('name')
      }else{
        this.find=false
      }

    },

  },

created(){
 this.check()
},
  beforeUpdate(){
    this.check()
  },
  updated(){
    this.check()
  }


}
</script>



<style scoped>

*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}



body{
  padding: 2rem;
text-transform: capitalize;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif

}


.s{
  color:rgb(222, 241, 133);
  text-decoration: none;
}

a{
  color: #fff;
    text-decoration: none;
}

.h:hover{
  box-shadow: 0 .1rem .4rem rgb(168, 159, 159);

}
.name{
  color: whitesmoke;
  background-color: #c27 !important;
}
.nav{
  display: flex;
  justify-content: space-around;
  list-style: none;
  z-index: 100;
  background-color: #dadada;
  margin-top: 0 !important;
  padding: 10px;
}

.nav::before{
  content:"";
  position: absolute;
  background-color: rgb(241, 238, 238);
  z-index: -1;
}

.h{
  letter-spacing: .1rem;
  font-size: .9rem;
  padding: .4rem;
  background-color: rgb(41, 63, 40);
}

</style>



