<template>
  <div class="sss">
    <div class="note-form">
      <input type="text" placeholder="Notes Title"
             required
             class="inp" v-model="title" />
      <textarea placeholder="Notes Content"
                required
                class="inptext" v-model="content" />
      <input type="hidden" v-model="user_id"/>
      <button class="btn" @click="addNote">Add Note</button>
      <p class="err" v-if="errem">Please enter Required fields</p>
    </div>

    <h1>Notes Data from DB</h1>
    <p v-if="da">Loading</p>
    <h2></h2>
      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Content</th>
          <th>Create Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="post in posts" :key="post._id">
          <td>{{ post._id }}</td>
          <td>{{post.title}}</td>
          <td>{{post.content}}</td>
          <td>{{post.Created_date}}</td>
        </tr>
        </tbody>
      </table>
  </div>

</template>



<script>
export default {
   data(){
     return{
       posts:'',
       title:'',
       content:'',
       user_id: localStorage.getItem('token'),
       errem:false,
       err:false,
       da:false
     }
   },

   methods:{
     getData(){
       this.da=true
       var token = localStorage.getItem('token')
       if(token){
         this.$http.get('http://localhost:3000/notes',{
           /*headers:{
            authorization:localStorage.getItem('token')
           }*/
         }).then(res=>{
           this.da=false
           console.log('notes data');
           console.log(res.data.allNotes);
           this.posts=res.data.allNotes;
         }).catch(err=>console.log(err))
       }
     },

     addNote(){
       this.err=false;

       if(!this.title || !this.content){
         this.errem=true;
         this.err= true;
         return
       }else{
         this.errem=false;
         this.err= false;
       }

       const pay ={
         title:this.title,
         content:this.content,
         user_id:localStorage.getItem('token')
       }
       this.$http.post('http://localhost:3000/notes',pay)
         .then((note)=>{
           console.log(note);
           this.title='';
           this.content='';
           this.$router.push('/home')
         }).catch((err)=>{
         this.err=true
         console.log(err)
       })
     },

     updateChange(){
       let token = localStorage.getItem('token')
     if(!token){
      this.$router.push('/signin')
     }else{
       this.$router.push('/home')
     }
     }
   },
   created(){
     this.getData()
   },


}
</script>



<style scoped>
.sss{

 margin-top: 2rem;
 text-align: center;

}

.inp{
  width: 90%;
  margin-top: 1rem;
  padding: .6rem;
  outline: none;
  height: 1.8rem;
  font-size: 1rem;
  border-radius: 50px;
  border: .1rem solid  rgba(165, 159, 159, 0.377);
  transition: all .2s;
}
.inptext{
  width: 90%;
  margin-top: 1rem;
  padding: .6rem;
  outline: none;
  font-size: 1rem;
  border-radius: 50px;
  border: .1rem solid  rgba(165, 159, 159, 0.377);
  transition: all .2s;
}
.inp:focus{
  transform: scale(1);
  transform: scale(1.02);
  border: .1rem solid   rgba(146, 143, 143, 0.486);
}
.inp::placeholder{
  color: rgb(139, 122, 122);
  font-size: 1rem;
  letter-spacing: .1rem;
}

.btn{
  margin-top: 1.7rem;
  padding: 1rem;
  color: rgb(129, 106, 106);
  outline: none;
  font-size: .9rem;
  letter-spacing: .2rem;
  background-color:  inherit;
  box-shadow: 0 .3rem .4rem rgb(190, 179, 169);
  border-radius: .5rem;
  opacity: .9;
  width: 10rem;
  align-self: center;
  border: .6rem double  inherit;
  transition: all .2s;
  cursor: pointer;


}

.btn:hover{
  box-shadow:none;
  border: 1px solid rgb(189, 185, 185);

}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
table {
  background-color: transparent;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
.table-bordered {
  border: 1px solid #ddd;
}
.table-bordered>thead>tr>th {
  border: 1px solid #ddd;
}
.table-bordered>thead>tr>th {
  border-bottom-width: 2px;
}
.table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
  border: 1px solid #ddd;
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
}

.err{
  text-align: center;
  border: 1px solid red;
  padding: 1rem;
  box-shadow: 0 1px 1px red;
  border-radius: 1rem;
  color: rgb(15, 10, 10);
}
</style>
