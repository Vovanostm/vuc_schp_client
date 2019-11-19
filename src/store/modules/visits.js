import { axios, url } from './../../api';

const state = {
  visits: [],
};

// getters
const getters = {
  visits: ({ visits }) => visits,
};

const actions = {
  async getVisits({ commit }) {
    const answer = await axios.get(url.visits.base);
    let { data } = answer;
    Object.keys(data).forEach((key) => {
      data[key].timeStart = new Date(data[key].timeStart);
      data[key].timeEnd = new Date(data[key].timeEnd);
    });
    commit('UPDATE_VISITS', answer.data);
    return answer.data;
  },

  async setVisits({ commit, dispatch }, data) {
    commit('UPDATE_VISITS', data);
    const answer = await axios.post(url.visits.base, data);
    dispatch('network', answer.status);
    return answer.data;
  },

  async deleteVisits({ dispatch }, teachers) {
    dispatch('network', answer.status);
    const answer = await axios.delete(url.visits.base, teachers);
    return answer.data;
  },
};

const mutations = {
  UPDATE_VISITS(state, data) {
    state.visits = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
