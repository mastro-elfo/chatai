<template>
  <v-container>
    <v-layout
      wrap
    >
    <v-flex
        xs12
        mb-5
      >
        <v-list v-if="messages.length > 0">
          <v-list-tile
            :key="index"
            v-for="(message, index) in messages">
            <v-list-tile-content>
              <v-list-tile-title
                v-html="message.text"
                :class="message.type == 'user' && 'text-xs-right'">
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-text-field
          type="text"
          v-model="message"
          label="Message"
          placeholder="Placeholder"
          autofocus
          clearable
          append-outer-icon="send"
          @click:clear="clearMessage"
          @click:append-outer="sendMessage"
          @keydown="onKeydown">
        </v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {ai_init, ai_response} from '../ai.js';

  export default {
    data: () => ({
      message: '',
      messages: []
    }),
    mounted(){
      ai_init();
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
    }
  }
</script>

<style>

</style>
