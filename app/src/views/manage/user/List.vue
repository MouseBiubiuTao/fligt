<template>
  <div>
    <el-button type="success" id="btn" size="small" @click=""
      >添加用户</el-button
    >
    <h2 id="h2">用户列表</h2>
    <el-table border :data="tableData" stripe style="width: 100%" height="630"> 
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.username }}</strong>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.password }}</strong>
        </template>
      </el-table-column>
      <el-table-column
        prop="regtime"
        label="注册时间"
        v-slot="{ row }"
        width="170"
      >
        {{ formatDate(row.regtime) }}
      </el-table-column>

      <el-table-column prop="" label="星级" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.grade }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="" label="电话" width="250">
        <template v-slot="{ row }">
          <strong>{{ row.phone }}</strong>
        </template>
      </el-table-column>

      <el-table-column label="操作" v-slot="{ row }" width="150">
        <el-button
          type="warning"
          plain
          size="small"
          @click="editItem(row.uid)"
          v-pomission:edit
          >编辑</el-button
        >
        <el-popconfirm
          title="确定删除吗？"
          style="marginleft: 5px"
          @confirm="removeItem(row.uid)"
        >
          <el-button
            slot="reference"
            type="danger"
            size="small"
            plain
            v-pomission:delete
            style="margin-left:5px;"
            >删除</el-button
          >
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="size"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="pageChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      tableData: [],
      total: 0,
      size: 10,
      page: 1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    
    async getData() {
      // const { data } = await this.$request.get("/user", {
      //   params: {
      //     page: this.page,
      //     size: this.size,
      //   },
      // });
      // this.tableData = data.data.result;
      // this.total = data.data.total;
      const {data} = await this.$axios({
        method: "get",
        url: "/g/users",
      })
      // console.log(data.data);
      this.tableData = data.data;
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async removeItem(uid) {
      console.log('uid',uid);
      // const {data} = await this.$request.delete(`/user?id=${uid}`);
      const {data} = await this.$axios({
        method: "delete",
        url: `/g/user?id=${uid}`,
      })
       if (data.code=200) {
          this.$message({
              message: '删除成功',
              type: 'success'
          });
          this.getData();
        } else {
          if (data.code === 400 ){
              this.$message({
              message: '添加失败',
              type: 'error'
            });
          }
          return false;
        }
      
    },
    //编辑修改
    editItem(uid) {
      console.log(uid);
      // this.$router.push('/manage/user/edit/'+id)
      this.$router.push({
        name: "UserEdit",
        params: { uid },
      });
    },
    //  当表格页数被修改时，重新设置页数,重新获取数据
    pageChange(pageNum) {
      this.page = pageNum;
      this.getData();
    },
    //  添加手动选择每页多少条数据，当页数修改后，重新后去数据
    sizeChange(size) {
      this.size = size;
      this.getData();
    },
  },
};
</script>