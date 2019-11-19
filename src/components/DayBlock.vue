<template>
  <!-- <el-card class="card">
    <div slot="header">
      <span>{{branch}} {{title}} {{priority}}</span>
      <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
  </div>-->
  <el-table :data="lessons" style="width: 100%" :border="true">
    <!-- <el-table-column prop="branch" label="Филиал" width="120"></el-table-column> -->
    <el-table-column prop="timeStart" label="Время" width="120">
      <template slot-scope="scope">
        <span>{{scope.row.timeStart | moment('HH:mm')}} - {{scope.row.timeEnd | moment('HH:mm')}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="Предмет" width="160"></el-table-column>
    <el-table-column prop="teacher.displayedName" label="Преподаватель"></el-table-column>
    <el-table-column prop="teacher.autoPriority" label="Важность"></el-table-column>
  </el-table>
  <!-- </el-card> -->
</template>

<script>
export default {
  name: 'DayBlock',
  props: {
    title: {
      type: String,
      default: '',
    },
    branch: {
      type: String,
      default: '',
    },
    priority: {
      type: Number,
      default: 0,
    },
    lessons: {
      type: Array,
      default() {
        return [
          {
            branch: 'Мытищи',
            time: '15:35 - 17:05',
            title: 'Delphi',
            teacher: {},
          },
        ];
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  margin-bottom: 14px;
}
</style>
