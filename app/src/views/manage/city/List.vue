<template>
  <div>
    <el-button type="success" id="btn" size="small" @click="goto('CityAdd')"
      >添加城市</el-button
    >
    <h2 id="h2">城市列表</h2>
    <el-table border :data="tableData" stripe style="width: 100%" height="630">
      <el-table-column type="index" label="序号" width="200"> </el-table-column>
      <el-table-column prop="cityName" label="城市名称" width="400">
        <template v-slot="{ row }">
          <strong>{{ row.cityName }}</strong>
        </template>
      </el-table-column>

      <el-table-column label="操作" v-slot="{ row }">
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
          style="margin-left: 5px"
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
  name: "CityList",
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
      // console.log(url);
      this.$router.push({
        name: url,
      });
    },
    async getData() {
      // const data = await this.$requests('get',"/citys"
      // , {
      //   params: {
      //     page: this.page,
      //     size: this.size,
      //   },
      // }
      // );
      // this.tableData = data.data.result;
      // this.total = data.data.total;
      // console.log("data1", data);
      const {data} = await this.$axios({
        method: "get",
        url: "/g/citys",
      })
      this.tableData = data.data;
        // .then(({data}) => {
        //   //这里使用了ES6的语法
        //   console.log(data); //请求成功返回的数据
        //   return data
        // })
        // .catch((error) => {
        //   console.log(error); //请求失败返回的数据
        // });
    },
    async removeItem(id) {
      console.log(id);
      await this.$request.delete("/user/" + id);
      this.getData();
    },
    editItem(id) {
      // this.$router.push('/manage/user/edit/'+id)
      this.$router.push({
        name: "CityEdit",
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