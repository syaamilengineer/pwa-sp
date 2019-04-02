export default function({ app, redirect }) {
  app.$axios.onRequest(config => {
    config.headers.Authorization = app.store.state.user.token
  })

  app.$axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
