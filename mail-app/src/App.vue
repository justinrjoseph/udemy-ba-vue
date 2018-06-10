<template>
  <div class="container">
    <div class="mail-box">
      <app-sidebar :messages="messages"></app-sidebar>
      <app-content :messages="messages"></app-content>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar.vue';
  import Content from './Content.vue';

  import messages from './data/messages';
  import randomMessages from './data/random-messages';

  import { eventBus } from './main';

  export default {
    data() {
      return {
        messages
      };
    },
    created() {
      eventBus.$on('messageSent', ({ message }) => {
        let sentMessage = [message];

        this.messages = sentMessage.concat(this.messages.slice(0));
      });

      eventBus.$on('inboxRefreshed', () => {
        let randomIdx = Math.floor(Math.random() * randomMessages.length);
        let newMessage = [randomMessages[randomIdx]];

        this.messages = newMessage.concat(this.messages.slice(0));
      });
    },
    components: {
      appSidebar: Sidebar,
      appContent: Content
    }
  }
</script>
