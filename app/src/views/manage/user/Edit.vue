<template>
  <div id="form-box">
    <h2>用户信息</h2>
      <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px">
  <el-form-item label="用户名" prop="username" >
    <el-input type="text" v-model="ruleForm.username" ></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  data() {
    return {
      ruleForm: {
        uid: "",
        username: "",
        password: "",
      },
      value1: null,
      options: [
        {
          value: "选项1",
          label: "女",
        },
        {
          value: "选项2",
          label: "男",
        },
      ],
      value: "",
    };
  },
  created(){
    this.getData();
  },
  methods: {
    async getData(usersid){
      // console.log(this.$route.params.uid);
      const id = usersid || this.$route.params.uid
      console.log(id);

      // this.$request.get(`/g/user/${id}`).then(({data})=>{
      //   console.log(data);
      // })
      const {data} = await this.$axios({
        method: "get",
        url: `/g/user/${id}`,
      })
      console.log(data);
      this.ruleForm.uid = data.data.uid;
      this.ruleForm.username = data.data.username;
      this.ruleForm.password = data.data.password;
      
    },
    submitForm() {
      // console.log("formName",formName);

      this.$refs["ruleForm"].validate( async (valid) => {
        // console.log(valid);
        // console.log(this.ruleForm);
        if (valid) {
          const {data} = await this.$axios({
            method: "put",
            url: `/g/user`,
            data:this.ruleForm
        })
        console.log(data);
        if(data.code === 200 ){
            this.$message({
              message: '修改成功',
              type: 'success'
          });
        }
        } else {
            if (data.code === 400 ){
              this.$message({
              message: '修改失败',
              type: 'error'
          });
            }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
#form-box {
  width: 500px;
  height: 200px;
  margin: auto;
}
h2 {
  text-align: center;
}
</style>