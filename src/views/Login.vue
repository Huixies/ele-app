<template>
  <div class="login">
    <div class="erweima">
      <div class="erweima-center">
        <div class="picture"></div>
         <div>请扫描二维码登录</div>
      </div>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" alt="logo">
    </div>
    <!-- 手机号 -->
    <InputGroup 
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />
    <!-- 验证码 -->
    <InputGroup 
      type="number"
      v-model="verifyCode"
      placeholder="验证码"
      :error="errors.code"
    />
    <!-- 用户协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>  
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button 
        :disabled="isClick"
        @click="handleLogin"
      >
        登录
      </button>
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup';
export default {
  name:'login',
  data(){
    return {
      phone: '',
      verifyCode: '',
      errors: {},
      btnTitle: '获取验证码',
      disabled: false
    }
  },
  computed: {
    isClick(){
      if(!this.phone || !this.verifyCode){
        return true;
      }else {
        return false
      }
    }
  },
  methods: {
    handleLogin(){
      //取消错误提醒
      this.errors = {};
      //发送请求
      this.$axios.post('/api/posts/sms_back',{
        phone:this.phone,
        code:this.verifyCode
      })
      .then(res => {
        //检验成功 设置登录状态 跳转到登录页面
        localStorage.setItem('ele_login',res.data.user._id);
        this.$router.push('/');
      })
      .catch(err =>{
        //返回错误信息
        this.errors = {
          code: err.response.data.msg
        }
      })
    },
    getVerifyCode(){
      if(this.validatePhone()){
        //发送网络请求
        this.$axios.post('/api/posts/sms_send',{
          sid:"",
          token:"",
          appid:"",
          templateid:"",
          phone:this.phone
        })
        .then(res =>{
          console.log(res);
          this.validateBtn();
        })
        
      }
    },
    validateBtn(){
      //获取验证码按钮
      let time = 60;
      let timer = setInterval(()=>{
        if(time==0){
          clearInterval(timer);
          this.btnTitle = '获取验证码';
          this.disabled = false;
        }else {
          //倒计时
          this.btnTitle = time + '秒后重试';
          this.disabled = true;
          time--;
        }
      },1000)
    },
    validatePhone(){
      //验证手机号码
      if(!this.phone){
        this.errors = {
          phone: '手机号码不能为空'
        };
        return false;
      }else if(!/^1[345678]\d{9}$/.test(this.phone)){
        this.errors = {
          phone: '请填写正确的手机号码'
        };
        return false;
      }else {
        this.errors = {};
        return true;
      }
    }
  },
  components: {
    InputGroup
  }
}
</script>

<style scoped>
.login .erweima{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(17, 17, 17, 0.541);
  overflow: hidden;
}

.login .erweima .erweima-center{
  position: absolute;
  line-height: 2rem;
  font-size: 20px;
  text-align: center;
  top: 50%;
  left: 50%;
  color: white;
  transform: translate(-50%,-50%) ;
}

.login .erweima .picture {
  width: 200px;
  height: 200px;
  background-image: url('../assets/erweima.png');
}
.login {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #fff;
}

.logo {
  text-align: center;
}

.logo img {
  width: 150px;
}

.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}

.login_des {
  color: #aaa;
  line-height: 22px;
}

.login_des span {
  color: #06a088;
}

.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #06a088;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}

.login_btn button[disabled] {
  background-color: #61817c;
}

.login_btn button[disabled]{
  background-color: #61817c;
}

@media screen and (max-width: 700px) {
  .login {
    padding: 30px;
  }
  .login .erweima{
    display: none;
  }
}
</style>
