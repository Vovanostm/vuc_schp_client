<template>
  <el-table :data="visits">
    <el-table-column prop="date" label="Дата" width="85"></el-table-column>
    <el-table-column prop="methodist.displayedName" label="Методист" width="120"></el-table-column>
    <el-table-column prop="branch.name" label="Филиал" width="120"></el-table-column>
    <el-table-column prop="lessons" label="Занятия и преподаватели" width="200">
      <template slot-scope="scope">
        <div v-for="(lesson, key) in scope.row.lessons" :key="key" class="lesson">
          <div class="time">{{lesson.timeStart | moment('HH:mm')}}</div>
          <div class="title" :title="lesson.title">{{lesson.title}}</div>
          <div class="teacher">{{lesson.teacher.displayedName}}</div>
          <span class="options">
            <div>
              <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
              <el-tooltip class="item" effect="dark" content="Не посещать" placement="top">
                <el-button
                  size="mini"
                  icon="el-icon-close"
                  type="danger"
                  @click="handleDisvisit(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </div>
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'VisitsList',
  props: {
    visits: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleEdit(row) {
      this.$emit('editVisit', row);
    },
  },
};
</script>

<style scoped>
.time {
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
}
.title {
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  overflow: hidden;
  position: relative;
  height: 24px;
  width: 100px;
}
.teacher {
  display: block;
  position: relative;
  margin-right: 10px;
  overflow: hidden;
  height: 24px;
  width: 120px;
}
.options {
  display: inline-block;
  vertical-align: top;
  margin-bottom: 5px;
}
.lesson {
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
