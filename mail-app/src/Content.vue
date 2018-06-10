<template>
  <aside class="lg-side">
    <div class="inbox-head">
      <h3>{{ currentView.name }}</h3>
    </div>

    <keep-alive>
      <component
        :is="currentView.tag"
        :data="currentView.data">
      </component>
    </keep-alive>
  </aside>
</template>

<script>
  import inbox from './Inbox.vue';
  import sent from './Sent.vue';
  import important from './Important.vue';
  import trash from './Trash.vue';
  import message from './Message.vue';

  import { eventBus } from './main';

  export default {
    props: {
      messages: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        history: [
          {
            tag: 'inbox',
            name: 'Inbox',
            data: {
              messages: null
            }
          }
        ]
      };
    },
    computed: {
      currentView() {
        let current = this.history[0];
        current.data.messages = this.messages;

        return current;
      },
      previousView() {
        return typeof this.history[1] ? this.history[1] : null;
      }
    },
    created() {
      eventBus.$on('viewChanged', ({ tag, name, data }) => {
        let newNavigation = [{
          tag,
          name,
          data: data || {}
        }];

        this.history = newNavigation.concat(this.history.splice(0));
      });
    },
    components: {
      inbox,
      sent,
      important,
      trash,
      message
    }
  }
</script>
