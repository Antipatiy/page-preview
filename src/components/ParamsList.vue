<template>
  <div>
    <ul class="urls__params">
      <li v-for="item in showParams">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ParamsList',
    props: {
      urlsItemParams: {
        type: Object,
        required: true
      },
      currentItem: {
        type: Object,
        required: true
      }
    },
    computed: {
      showParams () {
        return this.urlsItemParams[this.currentItem.name]
      }
    }
  }
</script>

<style>
  .urls__params {
    position: absolute;
    top: 390px;
    left: 45px;
  }
</style>
