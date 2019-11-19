<template>
  <el-card class="card">
    <div slot="header">
      <el-button icon="el-icon-arrow-left" circle @click="handleVisitsBackClick()"></el-button>
      <span style="margin:20px">{{branch.name}}</span>
      <span style="margin:20px">{{visit.priority}}</span>
      <span style="margin:20px">{{methodist.displayedName}}</span>
      <span style="margin:20px">{{visitId + 1}} / {{filteredVisits.length}}</span>
      <el-button icon="el-icon-arrow-right" circle @click="handleVisitsForwardClick(branch)"></el-button>
    </div>
    <day-block :priority="visit.priority" :lessons="visit.lessons"></day-block>
    <el-dialog title="Экспорт в расписание" :visible.sync="dialogExportVisible">
      <table>
        <tbody>
          <tr v-for="(lesson, key) in visit.lessons" :key="key">
            <td>{{lesson.teacher.displayedName}}</td>
            <td>{{branch.name}}</td>
            <td>{{lesson.timeStart | moment('HH:mm')}}</td>
            <td>{{lesson.title}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
    <el-button @click="btnExportClick">Экспорт</el-button>
    <el-dialog title="Создание посещения" :visible.sync="dialogCreateVisible">
      <visit :lessons="visit.lessons" :branch="branch" @save="dialogCreateVisible=false"></visit>
    </el-dialog>
    <el-button type="primary" @click="btnCreateClick">Создать</el-button>
  </el-card>
</template>

<script>
import DayBlock from '@/components/DayBlock.vue';
import Visit from '@/components/VisitCreator.vue';
export default {
  name: 'BranchVisits',
  components: { DayBlock, Visit },
  props: {
    visits: {
      type: Array,
      default() {
        return [];
      },
    },
    methodist: {
      type: Object,
      default() {
        return {};
      },
    },
    branch: {
      type: Object,
      default() {
        return {};
      },
    },
    filters: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      visitId: 0,
      dialogExportVisible: false,
      dialogCreateVisible: false,
      dialogBranch: {},
    };
  },

  computed: {
    filteredVisits() {
      let visits = this.visits;
      if (
        this.filters['includedTeachers'] &&
        this.filters['includedTeachers'].length
      ) {
        visits = visits.filter(({ lessons }) => {
          let teachers = lessons.map((lesson) => lesson.teacher._id);
          let includes = true;
          this.filters['includedTeachers'].forEach((_id) => {
            if (!teachers.includes(_id)) includes = false;
          });
          return includes;
        });
      }
      return visits;
    },
    visit() {
      if (this.visitId < this.filteredVisits.length - 1)
        return this.filteredVisits[this.visitId];
      return {};
    },
  },

  methods: {
    handleVisitsBackClick() {
      if (this.visitId > 0) this.visitId--;
    },
    handleVisitsForwardClick() {
      if (this.visitId < this.filteredVisits.length - 1) this.visitId++;
    },

    btnExportClick() {
      this.dialogExportVisible = true;
    },
    btnCreateClick() {
      this.dialogCreateVisible = true;
    },
  },
};
</script>

<style>
</style>
