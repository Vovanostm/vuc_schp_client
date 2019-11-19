<template>
  <el-row>
    <el-col :span="24">
      <visits-list v-show="!isEditorOpen" :visits="filteredVisits" @editVisit="editVisit"></visits-list>
      <!-- <el-dialog title="Методическое посещение" :visible.sync="isEditorOpen"> -->
      <div v-if="isEditorOpen">
        <visit-editor :visit="editedVisit"></visit-editor>
        <el-button @click="isEditorOpen = false">Назад</el-button>
      </div>
      <!-- </el-dialog> -->
      <el-button>Добавить</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';
import VisitsList from '@/components/VisitsLists.vue';
import VisitEditor from './VisitEditor.vue';
export default {
  name: 'TheVisits',
  components: { VisitsList, VisitEditor },
  data() {
    return {
      isEditorOpen: false,
      editedVisit: {
        teacher: {},
        lesson: {},
        methodist: {},
      },
    };
  },
  computed: {
    ...mapGetters(['visits']),
    filteredVisits() {
      return this.visits;
    },
  },
  methods: {
    editVisit() {
      this.editedVisit = {
        teacher: {},
        methodist: {},
        lesson: {},
      };
      this.isEditorOpen = true;
    },
  },
};
</script>

<style>
</style>
