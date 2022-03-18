<template>
  <div class="outbox">
    <video
      src="../../public/video/0adbb1dd28b5b7cc5bfd5f1917f015f2.mp4"
      autoplay
      muted
      loop
      id="video"
    ></video>
    <div class="login-page">
      <h1>飞机航班信息管理系统</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="用户名"
          prop="username"
          :error="errorMsg"
          style="color: #000"
        >
          <el-input type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :error="errorMsg">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox label="下次免登陆" v-model="ruleForm.mdl"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click.prevent="submitForm"
            native-type="submit"
            >登录</el-button
          >
          <el-button type="text" @click="goto('/forgotpassword')"
            >忘记密码?</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import authRoutes from "../router/authRoutes";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        // vcode: "",
        mdl: true,
      },
      vcodeSvg: "",
      errorMsg: "",
      rules: {
        password: [
          {
            required: true,
            message: "密码必填",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "用户名必填",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions({
      login(dispatch, payload) {
        return dispatch("login", payload);
      },
    }),
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          //   const {data} = await this.$request.post('/login',this.ruleForm);
          //     console.log('data=',data)

          // this.$store.dispatch('login',this.ruleForm)
          const data = await this.login(this.ruleForm);
          if (data.code === 200) {
            this.$message({
              message: "登录成功",
              type: "success",
            });

            // 登录成功后，动态添加路由
            // this.$router.addRoute(authRoutes)
            // this.$store.commit('addRoute')

            // const { redirectTo = "/manage/home" } = this.$route.query;

            this.$router.push("/manage/home");
          } else {
            if (data.code === 400) {
              this.$message({
                message: "验证码错误",
                type: "error",
              });
            } else if (data.code === 401) {
              this.errorMsg = "用户名或密码错误";
            }
            // this.getVcode();
          }
        }
      });
    },
    async getVcode() {
      const { data } = await this.$request.get("/vcode/picture");
      this.vcodeSvg = data.data;
    },
  },
  created() {
    // if (this.isLogin) {
    //   this.$router.replace({ name: "Home" });
    //   return;
    // }
    // this.getVcode();
  },
};
</script>
<style >
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<style scoped lang="scss">
.outbox {
  background: #040e1c;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  z-index: -10;
}
#video {
  position: absolute;
  right: 10%;
  top: 0;
  min-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  z-index: 1;
  background-size: cover;
}
.login-page {
    z-index: 100;
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 30px 50px 30px 30px;
  border-radius: 1em;
  background-color: rgba(37, 69, 101, 0.1);
  border: 1px solid rgb(145, 139, 139);
  color: #fff;
  h1 {
    text-align: center;
  }
}
.el-input ::v-deep .el-input-group__append {
  padding: 0;
}

.vcode {
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 38px;
  /* padding: 0 10px; */
  /* background-color: #58bc58; */
}
// css选择器可以用  /deep/ 或 >>>，但sass不支持，需要用::v-deep
.vcode ::v-deep svg {
  position: absolute;
  top: -3px;
  left: -15px;
  height: 43px;
}
</style>