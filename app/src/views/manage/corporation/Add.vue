<template>
  <div id="form-box">
    <h2>公司信息</h2>
    <el-form
      :model="numberValidateForm"
      ref="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="城市名称"
        prop="name"
        style="width: 400px"
        :rules="[
          { required: true, message: '城市不能为空' },
          { type: 'string', message: '城市必须为中文' },
        ]"
      >
        <el-input
          type="name"
          v-model.number="numberValidateForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="submitForm('numberValidateForm')"
          >确认添加</el-button
        >
        <el-button @click="resetForm('numberValidateForm')" type="danger">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CorporationAdd",
  data() {
    return {
      numberValidateForm: {
        name: "",
      },
 
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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