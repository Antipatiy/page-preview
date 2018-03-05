<template>
  <div>
    <ul class="urls__params">
      <li v-for="item in urlsItemParams" :key="item.id">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ParamsList',
    props: ['urlsItemParams']
  }
</script>

<style>
  .urls__params {
    position: absolute;
    top: 390px;
    left: 45px;
  }
</style>
