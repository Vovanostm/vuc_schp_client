<template>
  <div>
    <h4>Преподаватели</h4>
    <div class="table">
      <el-table
        :data="filteredTeachers"
        style="width: 100%;"
        height="400px"
        :default-sort="{prop: 'displayedName'}"
      >
        <el-table-column prop="displayedName" label="ФИО" sortable width="180"></el-table-column>
        <!-- <el-table-column prop="_id" label="id" sortable width="190"></el-table-column> -->
        <el-table-column prop="rating" label="Рейтинг" sortable width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.rating" size="small" type="number"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="priority" label="Приоритет" sortable width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.priority" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="autoPriority" label="Приоритет (авт)" sortable width="180"></el-table-column>
        <el-table-column prop="lastVisit" label="П. посещение" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.lastVisit | moment('DD.MM.YYYY')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Действия">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="Редактировать" placement="top">
              <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Не посещать" placement="top">
              <el-button
                size="mini"
                icon="el-icon-close"
                type="danger"
                @click="handleDisvisit(scope.$index, scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <!-- eslint-disable-next-line -->
          <template slot="header" slot-scope="slot">
            <el-input v-model="searchTeacher" size="mini" placeholder="Поиск"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-bottom:10px">
      <el-button type="primary" icon="el-icon-circle-check" @click="btnsSaveHandler">Сохранить</el-button>
    </div>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="Введите данные о преподавателе в формате Фамилия И.О. рейтинг последнее посещение"
      v-model="rawTeachers"
    ></el-input>
    <el-button @click="btnImportHandler">Импортировать</el-button>
    <!-- Предметы -->
    <lessons></lessons>
    <teacher-edit-dialog
      :isOpen.sync="isTeacherEditorOpen"
      :teacher="currentTeacher"
      @save="saveTeacher"
    ></teacher-edit-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Lessons from '@/components/Lessons.vue';
import TeacherEditDialog from '@/components/TeacherEditDialog.vue';
export default {
  name: 'Preferences',
  components: { Lessons, TeacherEditDialog },

  data() {
    return {
      rawTeachers: '',
      currentTeacher: {},
      searchTeacher: '',
      myTeachers: [],
      myLessons: [],
      isTeacherEditorOpen: false,
    };
  },

  computed: {
    ...mapGetters(['teachers', 'lessons']),

    filteredTeachers() {
      return this.myTeachers.filter((teacher) =>
        teacher.displayedName
          .toUpperCase()
          .includes(this.searchTeacher.toUpperCase())
      );
    },
  },

  watch: {
    teachers(data) {
      this.myTeachers = data;
    },
    lessons(data) {
      this.myLessons = data;
    },
  },

  created() {
    this.getTeachers();
    this.getLessons();
  },

  methods: {
    ...mapActions(['getTeachers', 'setTeachers', 'getLessons', 'setLessons']),

    btnImportHandler() {
      let lines = this.rawTeachers.split('\n');
      let data = {
        teachers: [],
      };
      lines.forEach((line) => {
        data.teachers.push({
          displayedName: line,
        });
      });
      this.setTeachers(data);
    },

    btnImportLessonsHandler() {
      let lines = this.rawTeachers.split('\n');
      let data = {
        lessons: [],
      };
      lines.forEach((line) => {
        let tokens = line.split(/[\t,\s]/g);
        console.log(tokens);
        let branch = tokens[0];
        let timeStart = this.$moment(
          tokens[1] + ' ' + tokens[2].split('-')[0],
          'dd.mm.yyyy HH:mm'
        ).toDate();
        let timeEnd = this.$moment(
          tokens[1] + ' ' + tokens[2].split('-')[1],
          'dd.mm.yyyy HH:mm'
        ).toDate();
        let pair = tokens[4];
        let title = tokens[7] + ',' + tokens[8];
        let teacherId = this.teachers.find(
          ({ displayedName }) =>
            displayedName.includes(tokens[9]) ||
            displayedName.includes(tokens[10])
        )._id;

        let lesson = {
          branch,
          timeStart,
          timeEnd,
          pair,
          title,
          teacherId,
        };

        data.lessons.push(lesson);
      });
      this.setLessons(data);
    },

    btnsSaveHandler() {
      this.setTeachers({ teachers: this.myTeachers });
    },

    saveTeacher(teacher) {
      this.setTeachers({ teachers: [teacher] });
    },

    handleEdit(row) {
      this.currentTeacher = row;
      this.isTeacherEditorOpen = true;
    },
  },
};
</script>

<style scoped>
.table {
  margin-bottom: 10px;
  background: #000;
}
</style>
