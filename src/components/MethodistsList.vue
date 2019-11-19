<template>
    <div class="table">
        <el-table
            :data="filteredMethodists"
            style="width: 100%;"
            max-height="250"
            :default-sort="{prop: 'displayedName'}"
        >
            <el-table-column prop="displayedName" label="ФИО" sortable width="140"></el-table-column>
            <el-table-column prop="weekDays" label="Дни недели" sortable width="140">
                <template slot-scope="scope">
                    {{scope.row.weekDays.join(', ')}}
                    <!-- <el-input v-model="scope.row.rating" size="small" type="number"></el-input> -->
                </template>
            </el-table-column>
            <!-- <el-table-column prop="rating" label="Рейтинг" sortable width="100">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.rating" size="small" type="number"></el-input>
                </template>
            </el-table-column>-->
            <!-- <el-table-column prop="priority" label="Приоритет" sortable width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.priority" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="autoPriority" label="Приоритет (авт)" sortable width="180"></el-table-column>
                <el-table-column prop="lastVisit" label="Последнее посещение" sortable>
                    <template slot-scope="scope">
                        <span>{{scope.row.lastVisit}}</span>
                    </template>
            </el-table-column>-->
            <!-- <el-table-column label="Действия">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="Посетить" placement="top">
                        <el-button
                            size="mini"
                            icon="el-icon-check"
                            @click="handleVisit(scope.$index, scope.row)"
                        ></el-button>
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
            </el-table-column>-->
            <!-- <el-table-column align="right"> -->
            <!-- eslint-disable-next-line -->
            <!-- <template slot="header" slot-scope="slot">
                        <el-input v-model="searchMethodists" size="mini" placeholder="Поиск"/>
                    </template>
            </el-table-column>-->
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'MethodistsList',
  props: {
    methodists: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      searchMethodists: '',
    };
  },

  computed: {
    filteredMethodists() {
      return this.methodists;
    },
  },

  methods: {
    handleVisit() {},
    handleDisvisit() {},
  },
};
</script>

<style>
</style>
