import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'sppwa',
    paths: ['user']
  })(store)
}
