export const state = () => ({
  id: null,
  token: null
})

export const actions = {
  async loginAct({ commit, dispatch }, payload) {
    try {
      const { data: lData } = await this.$axios.post('/users/login', payload)
      const authData = { ...lData }
      await commit('setAuthData', authData)
      return Promise.resolve(authData)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  doLogout({ commit }) {
    commit('doLogout')
  }
}

export const mutations = {
  setAuthData(state, authData) {
    state.id = authData.userId
    state.token = authData.id
    this.$axios.setToken(state.token)
  },
  doLogout(state) {
    state.id = null
    state.token = null
    this.$axios.setToken(false)
  }
}
