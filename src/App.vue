<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>ChatAI</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/mastro-elfo/chatai"
        target="_blank"
      >
        <span class="mr-2">Github</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <ChatAI/>
    </v-content>
  </v-app>
</template>

<script>
import ChatAI from './components/ChatAI'

export default {
  name: 'App',
  components: {
    ChatAI
  },
  data () {
    return {
      //
    }
  }
}
</script>
