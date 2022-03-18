<template>
  <div>
    <el-button
      type="success"
      id="btn"
      size="small"
      @click="goto('CorporationAdd')"
      >添加公司</el-button
    >
    <h2 id="h2">航空公司列表</h2>
    <el-table border :data="tableData" stripe style="width: 100%" height="630">
      <el-table-column type="index" label="序号" width="200"> </el-table-column>
      <el-table-column prop="name" label="公司名称" width="400">
        <template v-slot="{ row }">
          <strong>{{ row.aName }}</strong>
        </template>
      </el-table-column>

      <el-table-column label="操作" v-slot="{ row }">
        <el-button
          type="warning"
          plain
          size="small"
          @click="editItem(row.id)"
          v-pomission:edit
          >编辑</el-button
        >
        <el-popconfirm
          title="确定删除吗？"
          style="marginleft: 5px"
          @confirm="removeItem(row.aid)"
        >
          <el-button
            slot="reference"
            type="danger"
            size="small"
            plain
            v-pomission:delete
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
import LoginVue from "../../Login.vue";
export default {
  name: "CorporationList",
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
    goto(url) {
      console.log(url);
      this.$router.push({
        name: url,
      });
    },
    async getData() {
      const { data } = await this.$axios({
        method: "get",
        url: "/g/airlines",
      });
      console.log("data", data);
      this.tableData = data.data;
    },
    async removeItem(id) {
      console.log(id);
      const data = await this.$axios({
        method: "delete",
        url: "/g/airlines/" + id,
      });
      console.log('delete',data);
      this.getData();

    },
    editItem(id) {
      // this.$router.push('/manage/user/edit/'+id)
      this.$router.push({
        name: "CorporationEdit",
        params: { id },
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

<style>
#btn {
  position: absolute;
  top: 80px;
  right: 80px;
}
#h2 {
  position: absolute;
  left: 50%;
  top: 60px;
}
</style>