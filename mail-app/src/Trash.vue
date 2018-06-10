<template>
  <div class="inbox-body">
    <messages :messages="trashedMessages"></messages>
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
      trashedMessages() {
        return this.data.messages.filter((message) => {
          return message.isDeleted;
        });
      }
    },
    components: {
      messages
    }
  }
</script>
