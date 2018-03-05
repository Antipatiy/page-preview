<template>
  <div class="urls">
    <div class="urls__item" v-for="urlsItem in urls" :key="urlsItem.id">
      <image-item-elem :urls-src="urlsItem" v-on:list="persistParams"></image-item-elem>
      <p class="urls__name">{{ urlsItem.name }}</p>
      <params-list :urls-item-params="dataList" :current-item="urlsItem"></params-list>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
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
        dataList: {}
      }
    },
    methods: {
      persistParams (payload) {
        Vue.set(this.dataList, payload.list.name, payload.list)
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
