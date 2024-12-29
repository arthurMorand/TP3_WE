<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
const title = ref("WE")
function foo() {
  visible.value = !visible.value
}

</script>

<template>
  <div class="home">
    <h1>hello</h1>
    <p v-if="visible">Maintenant vous me voyez {{ title }}</p>
    <button v-on:click="foo()">ok</button>
    <div v-background>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore
      et dolore magna aliqua</div>
    <div v-background:green>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua</div>
  </div>
</template>
