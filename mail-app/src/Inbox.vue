<template>
  <div class="inbox-body">
    <div class="mail-option">
      <div class="btn-group">
        <a href="#" class="btn" @click.prevent.stop="refresh()">
          <i class="fa fa-refresh"></i>&nbsp; Refresh
        </a>
      </div>
    </div>

    <messages :messages="inboxMessages"></messages>
  </div>
</template>

<script>
  import messages from './Messages.vue';

  import { eventBus } from './main';

  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      refresh() {
        eventBus.$emit('inboxRefreshed');
      }
    },
    computed: {
      inboxMessages() {
        return this.data.messages.filter((message) => {
          return message.type === 'incoming' && !message.isDeleted;
        });
      }
    },
    components: {
      messages
    }
  }
</script>
