<template>
  <div class="wrapper">
    <img :src="setImgSrc(urlsSrc.name)" @click="emitParams(urlsSrc)">
  </div>
</template>

<script>
  export default {
    name: 'ImageItemElem',
    props: ['urlsSrc'],
    methods: {
      setImgSrc (name) {
        return require('../screens/' + name + '.png');
      },
      emitParams (params) {
        this.$emit('list', { list: params })
      }
    }
  }
</script>
