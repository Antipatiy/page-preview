<template>
  <div class="urls">
    <div class="urls__item" v-for="urlsItem in urls" :key="urlsItem.id">
      <params-list :urls-item-params="dataList"></params-list>
      <image-item-elem :urcls-src="urlsItem" v-on:list="zzz"></image-item-elem>
      <p class="urls__name">{{ urlsItem.name }}</p>
    </div>
  </div>
</template>

<script>
  import urlData from '../data/url.json';
  import ParamsList from  './ParamsList'
  import ImageItemElem from  './ImageItemElem'

  export default {
    name: 'ScreenItem',
    components: {
      ParamsList,
      ImageItemElem
    },
    data () {
      return {
        urls: urlData,
        dataList: ''
      }
    },
    methods: {
      zzz (payload) {
        this.dataList = payload.list;
      }
    }
  }
</script>

<style>
  .urls {
    margin: 0 auto;
    width: 1200px;
    height: auto;
  }

  .urls__item {
    position: relative;
    float: left;
  }

  .wrapper {
    float: left;
    margin: 20px 45px 80px 45px;
    height: 350px;
    width: 300px;
    border: 1px solid #000;
    overflow: hidden;
  }

  .urls__item img {
    display: block;
    max-width: 100%;
    cursor: pointer;
  }

  .urls__name {
    position: absolute;
    top: 370px;
    left: 45px;
  }
</style>
