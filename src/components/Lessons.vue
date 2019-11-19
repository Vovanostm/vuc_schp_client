<template>
  <div>
    <h4>Предметы</h4>
    <el-tabs type="card" v-model="branchTab" @tab-click="handleTabBranchClick">
      <el-tab-pane v-for="(branch, key) in branchesNames" :key="key" :label="branch"></el-tab-pane>
    </el-tabs>
    <el-tabs type="card" v-model="weekDayTab" @tab-click="handleTabWeekDayClick">
      <el-tab-pane v-for="(weekDay, key) in fiteredWeekDays" :key="key" :label="weekDay"></el-tab-pane>
    </el-tabs>
    <div class="table">
      <el-table
        :data="filteredLessons"
        style="width: 100%;"
        height="400px"
        :default-sort="{prop: 'branch'}"
      >
        <el-table-column v-if="branchTab === '0'" prop="branch" label="Филиал" sortable width="100"></el-table-column>
        <el-table-column
          v-if="weekDayTab === '0'"
          prop="timeStart"
          label="День нед."
          sortable
          width="120"
        >
          <template slot-scope="scope">
            <div>{{scope.row.timeStart | moment('dd')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Предмет" sortable width="180"></el-table-column>
        <el-table-column prop="timeStart" label="Начало" sortable width="180">
          <template slot-scope="scope">
            <div>{{scope.row.timeStart | moment('HH:mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="timeEnd" label="Конец" sortable width="180">
          <template slot-scope="scope">
            <div>{{scope.row.timeEnd | moment('HH:mm')}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teacherId" label="Преподаватель" sortable>
          <template slot-scope="scope">
            <div>{{teachers.find(({_id}) => _id === scope.row.teacherId).displayedName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="teacherId" label="Важность" sortable>
          <template slot-scope="scope">
            <div>{{teachers.find(({_id}) => _id === scope.row.teacherId).autoPriority}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Действия">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="Редактировать" placement="top">
              <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <!-- eslint-disable-next-line -->
          <template slot="header" slot-scope="slot">
            <el-input v-model="searchLesson" size="mini" placeholder="Поиск"/>
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
      v-model="rawLessons"
    ></el-input>
    <el-button @click="btnImportLessonsHandler">Импортировать</el-button>
    <lesson-edit-dialog
      :isOpen.sync="isLessonEditorOpen"
      :lesson="currentLesson"
      @save="saveLesson"
    ></lesson-edit-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LessonEditDialog from './LessonEditDialog';
export default {
  name: 'Lessons',

  components: { LessonEditDialog },

  data() {
    return {
      rawLessons: '',
      searchTeacher: '',
      myTeachers: [],
      myLessons: [],
      searchLesson: '',
      branchTab: '0',
      weekDayTab: '0',
      isLessonEditorOpen: false,
      currentLesson: {},
    };
  },

  computed: {
    ...mapGetters(['teachers', 'lessons', 'branches', 'weekDays']),

    branchesNames() {
      return ['Все'].concat(this.branches);
    },

    fiteredWeekDays() {
      return ['Все'].concat(this.weekDays);
    },

    filteredLessons() {
      return this.myLessons.filter((lesson) => {
        return (
          (this.branchTab === '0' ||
            lesson.branch === this.branchesNames[this.branchTab]) &&
          (this.weekDayTab === '0' ||
            lesson.timeStart.getDay() === parseInt(this.weekDayTab) % 7) &&
          (!this.searchLesson ||
            this.teachers.find(
              ({ _id, displayedName }) =>
                _id === lesson.teacherId &&
                displayedName.includes(this.searchLesson)
            ))
        );
      });
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
    ...mapActions(['getTeachers', 'getLessons', 'setLessons']),

    btnImportLessonsHandler() {
      let lines = this.rawLessons.split('\n');
      let data = {
        lessons: [],
      };
      lines.forEach((line) => {
        let tokens = line.split(/[\t]/g);
        let branch = tokens[0];
        let words = tokens[2].split(/[\s]/);
        let timeStart = this.$moment(
          tokens[1] + ' ' + words[0].split('-')[0],
          'DD.MM.YYYY HH:mm'
        ).toDate();
        let timeEnd = this.$moment(
          tokens[1] + ' ' + words[0].split('-')[1],
          'DD.MM.YYYY HH:mm'
        ).toDate();
        let pair = words[1];
        let title = words[4];
        let teacherId = this.teachers.find(
          ({ displayedName }) =>
            displayedName.includes(words[6]) || displayedName.includes(words[7])
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
      console.log(data);
      this.setLessons(data);
    },

    btnsSaveHandler() {
      this.setTeachers({ teachers: this.myTeachers });
    },

    handleEdit(row) {
      this.currentLesson = row;
      this.isLessonEditorOpen = true;
    },

    cL() {
      let ans = [];
      this.filteredLessons.forEach((lesson) => {
        if (lesson.teacherId === '5bd8b775414446505614bdc3')
          ans.push(
            JSON.parse(
              JSON.stringify(lesson).replace(
                /(5bd8b775414446505614bdc3)|(5bd8b775414446505614bd99)/g,
                '5bd8b775414446505614bd8f'
              )
            )
          );
      });
      console.log(JSON.stringify(ans));
      return null;
    },

    handleTabBranchClick() {},
    handleTabWeekDayClick() {
      this.cL();
    },

    saveLesson(lesson) {
      this.setLessons({ lessons: [lesson] }).then(() => {
        this.getLessons();
      });
    },
  },
};
</script>

<style>
</style>
