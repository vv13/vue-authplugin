<template>
  <div id="app">
    authCodes: {{authCode}}
    <div>
      <h1 v-auth="'four'">'four', need auth four</h1>
      <h1 v-if="$auth(['one', 'four'])">['one', 'four'], need auth one or four</h1>
      <h1 v-auth="{one: true, five: false}">{one: true, five: false}, need auth one and don't need five</h1>
      <h1 v-auth="'AUTH_LIST'">
        [
          ['one', 'four'],
          'five',
          {
            three: true,
            four: false,
          },
        ],
      need one or four, or need five, or need three and don't need four</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      authCode: ['one', 'two', 'three', 'four'],
    }
  },
}
</script>
