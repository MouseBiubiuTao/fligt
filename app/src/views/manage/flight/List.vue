<template>
  <div>
    <el-table border :data="tableData" stripe style="width: 100%" height="630">
      <el-table-column type="index" label="序号" width="80"> </el-table-column>
      <el-table-column prop="username" label="航空公司" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.username }}</strong>
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

      <el-table-column prop="" label="出发城市" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.goCity }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="" label="到达城市" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.toCity }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="" label="航班票价" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.price }}</strong>
        </template>
      </el-table-column>

      <el-table-column prop="" label="剩余票数" width="120">
        <template v-slot="{ row }">
          <strong>{{ row.count }}</strong>
        </template>
      </el-table-column>

      <el-table-column label="操作" v-slot="{ row }" width="150">
        <el-button
        style="margin-right:5px;"
          plain
          type="warning"
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
  name: "FlightList",
  data() {
    return {
      tableData: [],
      total: 0,
      size: 10,
      page: 1,
    };
  },
  created() {
    console.log("List.create");
    this.getData();
  },
  methods: {
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
      console.log(id);
      await this.$request.delete("/user/" + id);
      this.getData();
    },
    editItem(id) {
      // this.$router.push('/manage/user/edit/'+id)
      this.$router.push({
        name: "FlightEdit",
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