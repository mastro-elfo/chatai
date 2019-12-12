<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <v-list v-if="messages.length > 0">
          <v-list-tile
            :key="index"
            v-for="(message, index) in messages"
            avatar
            :color="message.type == 'user' ? 'white' : 'default'"
            :background="message.type == 'user' ? 'purple' : 'white'">
            <v-list-tile-avatar>
              <v-icon
                color="purple">
                send
              </v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content
              >

              <v-list-tile-title
                v-html="message.text"
                :class="message.type"

                >
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>


      </v-flex>
    </v-layout>

    <v-footer app
      fixed
      :bottom="0">
      <v-text-field
        id="input"
        solo
        sticky
        type="text"
        v-model="message"
        label="Message"
        placeholder="Type a message"
        autofocus
        :append-icon="message != '' ? 'send' : ''"
        @click:append="sendMessage"
        @keydown="onKeydown">
      </v-text-field>
    </v-footer>
  </v-container>
</template>

<script>
  import {ai_init, ai_response} from '../ai.js';

  export default {
    data: () => ({
      message: '',
      messages: [{type: 'user',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'user',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'ai',text: 'lorem ipsum dolor sit'},{type: 'user',text: 'lorem ipsum dolor sit'}]
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

<style lang="sass">

</style>
