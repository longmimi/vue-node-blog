<template lang="html">
  <div id="my-register">
      <el-card class="box-card">
       <el-row type="flex" justify="center">
         <el-col :span="12">
           <el-form
            label-position="left"
            label-width="80px"
            :model="formRegister"
            :rules="rules"
            ref="formRegister">
             <el-form-item label="账号" prop="name">
               <el-input v-model="formRegister.name"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop="password">
               <el-input v-model="formRegister.password" type="password"></el-input>
             </el-form-item>
             <el-form-item label="确认密码" prop="checkPassword">
               <el-input v-model="formRegister.checkPassword" type="password"></el-input>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="addUser">立即注册</el-button>
                 <el-button type="primary"><router-link :to="{ name: 'login'}">去登录</router-link></el-button>
             </el-form-item>
           </el-form>
         </el-col>
       </el-row>
     </el-card>
</div>
</template>

<script>
export default {
   data(){
     let checkUserName = (rule,value,cb)=>{
       if(!value){
         return cb(new Error('账户不能为空!'))
       }else{
         cb(); // 将判断传递给后面
       }
     }
     let checkPassword = (rule,value,cb)=>{
       if(!value){
         return cb(new Error('密码不能为空!'))
        }else{
         cb();
        }
     }
     let checkPasswordAgain = (rule,value,cb)=>{
       if(!value){
         return cb(new Error('再次输入密码不能为空!'))
        }else if(value !== this.formRegister.password){
         return cb(new Error('两次输入密码不一致!'));
        }else{
         cb();
        }
     }

     return{
       formRegister:{
         name: '',
         password: '',
         checkPassword: ''
       },
       rules:{
         name:[
           {validator:checkUserName,trigger: 'blur'}
         ],
         password:[
           {validator:checkPassword,trigger: 'blur'}
         ],
         checkPassword:[
           {validator:checkPasswordAgain,trigger: 'blur'}
         ]
       }
     }
   },
   methods:{
    // 用户注册
    addUser(){
      let user = this.formRegister;
      //发送的数据
      let formData = {
        name:user.name,
        password:user.password,
        registertime:new Date()
      }
      //表单验证
      this.$refs['formRegister'].validate((valid) => {
        if(valid){
          // console.log(valid)  // true
          this.$http.post('/api/register',formData)
          .then( res => {
            // console.log(res.data)
            if(res.data.status == 1){
              // console.log('返回的错误信息',res.data.error)
              // this.$message.error(res.data.msg);
              this.$notify({
                    title: '注册失败',
                    message:`${res.data.msg}`,
                    type: 'error',
                    offset:100
              });
              return false;
            }
            else{
              // this.$message.success('恭喜您注册成功！')
              this.$notify({
                      title: '成功',
                      message: '恭喜您注册成功！',
                      type: 'success',
                      offset:130
              });
              console.log('跳转到登录页')
              this.$router.push('/login')
            }
          })
          .catch(err => {
            // this.$message.error(`${err.message}`)
             this.$notify({
                      title: '注册失败',
                      message:`${err.message}`,
                      type: 'error',
                      offset:130
              });
            
          })
        }
        else {
            // this.$message.error('表单验证失败!')
             this.$notify({
                      title: '失败',
                      message: '表单验证失败',
                      type: 'error',
                      offset:130
              });
            return false;
          }
      })
   }
 }




}
</script>

<style lang="less" scoped>
#my-register{
  padding-top:120px;
  .box-card{
    width:70%;
    margin: 0 auto;
  }
}

a {
    text-decoration: none;
    color:#fff;
}
.router-link-active {
    text-decoration: none;
}
</style>
