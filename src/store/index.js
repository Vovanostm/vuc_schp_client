import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import lessons from './modules/lessons';
import methodists from './modules/methodists';
import teachers from './modules/teachers';
import visits from './modules/visits';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    teachers,
    lessons,
    methodists,
    visits,
  },
});
