<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  middleware: 'isUnauthenticated'
}
</script>
