<template>
  <div class="inbox-body">
    <messages :messages="sentMessages"></messages>
  </div>
</template>

<script>
  import messages from './Messages.vue';

  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    computed: {
      sentMessages() {
        return this.data.messages.filter((message) => {
          return message.type === 'outgoing' && !message.isDeleted;
        });
      }
    },
    components: {
      messages
    }
  }
</script>
