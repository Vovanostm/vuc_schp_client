import { axios, url } from '../../api';

const state = {
  methodists: [],
};

// getters
const getters = {
  methodists: ({ methodists }) =>
    methodists.map((m) => ({
      ...m,
      remainingVisits: 10,
    })),
};

const actions = {
  async getMethodists({ commit }) {
    const answer = await axios.get(url.methodists.base);
    let { data } = answer;
    commit('UPDATE_METHODISTS', data);
    return answer.data;
  },

  async setMethodists({ dispatch }, methodists) {
    const answer = await axios.post(url.methodists.base, methodists);
    dispatch('network', answer.status);
    return answer.data;
  },

  async deleteMethodists({ dispatch }, methodists) {
    const answer = await axios.delete(url.methodists.base, methodists);
    dispatch('network', answer.status);
    return answer.data;
  },
};

const mutations = {
  UPDATE_METHODISTS(state, data) {
    state.methodists = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
