<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/HeaderComponent.vue';
export default {
    name:'App',
    components: {
        Header
    }
}
</script>
