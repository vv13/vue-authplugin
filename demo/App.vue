<template>
  <div id="app">
    authCodes: {{authCode}}
    <ul>
      <li class="wrap">
        <div class="desc">v-auth="'four'"</div>
        <div class="circle"></div>
      </li>
      <li class="wrap">
        <div class="desc">v-if="$_auth.verify(['one', 'four'])"</div>
        <div class="circle" v-if="$_auth.verify(['one', 'four'])"></div>
      </li>
      <li class="wrap">
        <div class="desc">v-auth="{one: true, five: false}"</div>
        <div class="circle" v-auth="{one: true, five: false}"></div>
      </li>
      <li class="wrap">
        <div class="desc"> v-auth="'oneAlias'"</div>
        <div class="circle"  v-auth="'oneAlias'"></div>
      </li>
      <li class="wrap">
        <div class="desc"> v-auth="'asdfasdfasdf'"</div>
        <div class="circle" v-auth="'asdfasdfasdf'"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      authCode: ["one", "two", "three", "four"]
    };
  }
};
</script>

<style>
  .circle {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: black;
  }

  .wrap {
    display: flex;
    align-items: center;
  }
</style>
