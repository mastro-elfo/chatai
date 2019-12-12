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
      <v-container>
        <v-layout row wrap>
          <v-flex xs9
            v-for="(message, index) in messages" :key="index"
            :offset-xs3="message.type == 'user'"
            mb-5>
            <v-card
              :color="message.type == 'user' ? 'primary' : 'default'"
              :dark="message.type == 'user'"
              :class="message.type == 'user' ? 'text-xs-right' : ''">
              <v-avatar
                v-if="message.type == 'ai'">
                <v-icon>android</v-icon>
              </v-avatar>

              <v-avatar
                v-if="message.type == 'user'">
                <v-icon>face</v-icon>
              </v-avatar>

              <v-card-text>
                {{message.text}}
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer
      fixed
      :bottom="0"
      :height="64">
      <v-container pa-0>
        <v-layout>
          <v-flex xs12>
            <v-text-field
              solo
              hide-details
              type="text"
              v-model="message"
              label="Message"
              placeholder="Type a message"
              autofocus
              :append-icon="message != '' ? 'send' : ''"
              @click:append="sendMessage"
              @keydown="onKeydown">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import {ai_init, ai_response} from './ai.js';
import Vue from 'vue'

export default {
  name: 'App',
  components: {},
  mounted(){
    ai_init();
  },
  updated(){
    // Called after re-render
    Vue.prototype.$vuetify.goTo('footer', {
      duration: 400,
      offset: 0,
      easing: 'easeInOutCubic'
    })
  },
  methods: {
    clearMessage () {
      console.info('Clear');
      this.message = '';
    },
    sendMessage () {
      let message = this.message.trim();
      if(message != '') {
        console.info('Send "' + message + '"');
        this.messages.push({
          type: 'user',
          text: this.message
        });
        this.message = '';
        this.messages.push({
          type: 'ai',
          text: ai_response(message)
        });
      }
    },
    onKeydown(ev){
      if (ev.key == 'Enter') {
        // Send message
        this.sendMessage()
      }
    }
  },
  data () {
    return {
      message: '',
      messages: []
    }
  }
}
</script>

<style lang="sass">
.v-footer
  background: inherit !important
</style>
