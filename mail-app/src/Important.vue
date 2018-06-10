<template>
  <div class="inbox-body">
    <messages :messages="importantMessages"></messages>
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
      importantMessages() {
        return this.data.messages.filter((message) => {
          return message.type === 'incoming' &&
            message.isImportant &&
            !message.isDeleted;
        });
      }
    },
    components: {
      messages
    }
  }
</script>
