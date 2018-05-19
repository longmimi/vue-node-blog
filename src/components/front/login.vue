<template lang="html">
  <div class="my-login">
    <el-card class="box-card">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form
              label-position="left"
              label-width="80px"
              :model="formLogin"
              :rules="rules"
              ref="formLogin">
              <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
              <el-form-item label="账号" prop="name">
                <el-input v-model="formLogin.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formLogin.password" type="password"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="login">登录</el-button>
                  <el-button @click="resetForm">取消</el-button>
              </el-form-item>
              <el-form-item>
                <router-link to="/register">
                  <el-button type="">没有账号，立即注册<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </router-link>
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
         }else if(value !== this.formLogin.password){
          return cb(new Error('两次输入密码不一致!'));
         }else{
          cb();
         }
      }
      return{
        formLogin:{
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
      // 向登录接口发起请求
      login(){
        let user = this.formLogin;
        let formData = {
          name: user.name,
          password: user.password,
          lastlogintime: new Date()
        };
        // 表单验证
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            // 通过验证之后才请求登录接口
            this.$http.post('/api/login',formData)
                .then(res => {
                    console.dir(res.data+'登录返回数据')
                    if (res.data.success) {
                      if(res.data.isAdmin){
                          this.$notify({
                          title: '成功',
                          message: `${res.data.message}`,
                          type: 'success',
                          offset:100
                        });
                        this.$router.push({name:'backmanage'})
                      }else{
                          // this.$message.success(`${res.data.message}`)
                          this.$notify({
                            title: '成功',
                            message: `${res.data.message}`,
                            type: 'success',
                            offset:130
                          });
                          // 登录成功 跳转至首页
                          this.$router.push('/');
                      }
                     
                      sessionStorage.setItem('userName_session', res.data.name);
                      this.$store.dispatch('showUserName',{
                        userName:res.data.name,
                        hasLogin:true
                      })            
                    }else{
                      // this.$message.error(`${res.data.message}`);
                      this.$notify({
                      title: '失败',
                      message: `${res.data.message}`,
                      type: 'error',
                      offset:130
                    });
                      return false;
                    }
                })
                .catch(err => {
                    // this.$message.error(`${err.message}`, 'ERROR!')
                    this.$notify({
                    title: '失败',
                    message: `${err.message}`,
                    type: 'error',
                    offset:130
                  });
                    
                })
          } else {
            // this.$message.error('表单验证失败!')
            this.$notify({
                  title: '失败',
                  message: '表单验证失败',
                  type: 'error',
                  offset:130
            });
            return false;
          }
        });
      },
      // 表单重置
      resetForm(){
        console.log('session')
        this.$refs['formLogin'].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
.my-login{
  padding-top: 120px;
   .box-card{
    width:70%;
    margin: 0 auto;
  }
}
</style>
