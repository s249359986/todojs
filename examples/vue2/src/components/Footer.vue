<template>
      <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        Written by
        <a href="http://www.songdonghong.com/about-me.html">宋冬红</a>
      </p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
</template>

<script>
export default {
  name: 'footer',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
