<template>
  <div>
    <h2 id="h2">订单列表</h2>
    <el-button type="success" id="btn" size="small" @click="goto('OrderAdd')"
      >添加订单</el-button
    >
    <el-table :data="tableData" stripe style="width: 100%" height="630">
      <el-table-column type="index" label="序号" width="55"> </el-table-column>

      <el-table-column prop="username" label="用户姓名">
        <template v-slot="{ row }">
          <strong>{{ row.username }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="corporation" label="航空公司">
        <template v-slot="{ row }">
          <strong>{{ row.corporation }}</strong>
        </template>
      </el-table-column>

      <el-table-column
        prop="regtime"
        label="起飞时间"
        v-slot="{ row }"
        width="170"
      >
        {{ formatDate(row.regtime) }}
      </el-table-column>

      <el-table-column
        prop="regtime"
        label="到达时间"
        v-slot="{ row }"
        width="170"
      >
        {{ formatDate(row.regtime) }}
      </el-table-column>

      <el-table-column prop="gocity" label="出发城市">
        <template v-slot="{ row }">
          <strong>{{ row.gocity }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="tocity" label="到达城市">
        <template v-slot="{ row }">
          <strong>{{ row.tocity }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="price" label="航班票价">
        <template v-slot="{ row }">
          <strong>{{ row.price }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="buytime" label="购票时间">
        <template v-slot="{ row }">
          <strong>{{ row.buytime }}</strong>
        </template>
      </el-table-column>

      <el-table-column label="操作" v-slot="{ row }" width="150">
        <el-button
          type="warning"
          plain
          size="small"
          @click="editItem(row._id)"
          v-pomission:edit
          >编辑</el-button
        >
        <el-popconfirm
          title="确定删除吗？"
          style="marginleft: 5px"
          @confirm="removeItem(row._id)"
        >
          <el-button
            slot="reference"
            type="danger"
            size="small"
            plain
            v-pomission:delete
            style="margin-left: 5px"
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
  name: "OrderList",
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
      const { data } = await this.$request.get("/user", {
        params: {
          page: this.page,
          size: this.size,
        },
      });
      this.tableData = data.data.result;
      this.total = data.data.total;
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async removeItem(id) {
      await this.$request.delete("/user/" + id);
      this.getData();
    },
    editItem(id) {
      // this.$router.push('/manage/user/edit/'+id)
      this.$router.push({
        name: "OrderEdit",
        params: { id },
      });
    },
    pageChange(pageNum) {
      this.page = pageNum;

      this.getData();
    },
    sizeChange(size) {
      this.size = size;

      this.getData();
    },
  },
};
</script>
<style scoped>
#h2 {
  position: absolute;
  left: 50%;
  top: 60px;
}
#btn {
  position: absolute;
  top: 80px;
  right: 80px;
}
</style>