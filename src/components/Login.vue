<template>
    <div id="login" class="login_container">
        <div class="login_box">
            <!-- 图片区域 -->
            <img src="../assets/登录界面.png">
            <!-- 登陆区域 -->
            <el-form :model="loginForm" ref="loginFormRef" :rules="loginRules" class="login_form">
                <h2 class="login_font">SPYBlog</h2>
                <!-- 用户名(email) -->
                <el-form-item prop="username" required>
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="email"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" placeholder="password"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item>
                    <el-button type="primary" class="width-full marg-bottom-10" @click="login">登录</el-button>
                    <el-button type="info" class="width-full marg-left-0" @click="resetLoginForm">重置</el-button>
                </el-form-item>
                <!-- 链接区域 -->
                <div class="links">
                    <a href="#" class="regist_font" type="primary">若您还没注册，请注册用户</a>
                </div>
            </el-form>
        </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'vip@spy.com',
        password: 'spy123456'
      },

      // 表单验证规则
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
          { max: 50, message: '请输入50以内的字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/, message: '密码为数字、小写字母、大写字母、特殊符号至少包含三种，长度为8-30位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置按钮
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },

    // 登录按钮
    login() {
      // 登录前表单预校验
      this.$refs.loginFormRef.validate(async valid => {
        // 表单校验失败
        if (!valid) return
        // 登录请求
        // const { data: res } = await this.$http.post('/auth', this.loginForm)

        // 登录失败
        // if (res.code !== 0) {
        //   this.$message({
        //     showClose: true,
        //     message: '用户名或密码输入错误，请重新输入',
        //     type: 'error'
        //   })
        //   return this.resetLoginForm()
        // }

        // 登录成功
        // 登录信息记入localStorage中
        // window.localStorage.setItem('token', res.data.token)
        // 头像记入localStorage
        // window.localStorage.setItem('avatar', res.data.avatar)
        // 跳转主页界面
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>

.login_container {
    background-color: #fff;
    height: 100%;
}

.login_box {
    width: 1000px;
    height: 500px;
    margin: 0;
    padding: 0;
    border-radius: 3px;
    border: 1px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
        float: left;
        height: 100%;
    }
}

.login_form {
    float: left;
    width: 50%;
    margin-top: 10%;
    margin-left: 5%;
}

.el-button.el-button {
    margin-left: 0px;
}

.links {
    display: flex;
    justify-content: flex-end;
}

.regist_font {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: small;
    color: #409EFF;
}

h2 {
    position:relative;
    letter-spacing:.07em;
    font-size: 3em;
    font-weight: normal;
    margin: 0 auto;
}

h2:before, h2:after {
    position:absolute;
    top:0;
    left:0;
    right:0;
}

.login_font {
    color:rgb(221, 165, 128);
    margin-bottom: 50px;
    text-shadow:0 0 2px currentColor,
    0 -1px 1px rgb(221, 165, 128),
    -1px -1px 1px rgb(221, 165, 128),
    1px -1px 1px rgb(221, 165, 128),
    1px 0 1px rgb(221, 165, 128),
    0 -1px 1px rgb(221, 165, 128),
    0 1px 1px rgb(221, 165, 128),
    1px 1px 1px rgb(221, 165, 128),
    -1px 1px 1px rgb(221, 165, 128),

    -2px -2px 1px rgb(231, 97, 19),
    -1px -2px 1px rgb(231, 97, 19),
    0 -2px 1px rgb(231, 97, 19),
    1px -2px 1px rgb(231, 97, 19),
    2px -2px 1px rgb(231, 97, 19),
    2px -1px 1px rgb(231, 97, 19),
    2px 0 1px rgb(231, 97, 19),
    2px 1px 1px rgb(231, 97, 19),
    2px 2px 1px rgb(231, 97, 19),
    1px 2px 1px rgb(231, 97, 19),
    0 2px 3px rgb(231, 97, 19),
    -1px 2px 1px rgb(231, 97, 19),
    -2px 2px 1px rgb(231, 97, 19),
    -2px 1px 1px rgb(231, 97, 19),
    -2px 0 1px rgb(231, 97, 19),
    -2px -1px 1px rgb(231, 97, 19);
}

.login_font:after{
    content:'SPYBLog';
    top:.3em;
    color:transparent;
    text-shadow:0 0 6px #eee,0 0 8px rgba(148, 145, 145, 0.8);
    transform:scaleY(.5);
    z-index:-1;
}

</style>
