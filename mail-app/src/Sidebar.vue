<template>
  <aside class="sm-side">
    <div class="user-head">
      <img src="src/assets/images/profile.jpg">

      <div class="user-name">
        <h5>Justin Joseph</h5>
        <span class="email-address">justin@thinkrightly.com</span>
      </div>
    </div>

    <div class="compose-wrapper">
      <compose></compose>
    </div>

    <ul class="inbox-nav">
      <li :class="{ active: activeView === 'inbox' }">
        <a href="#" @click.prevent="navigate('inbox', 'Inbox')">
          <i class="fa fa-inbox"></i> Inbox
          <span class="label label-danger pull-right">
            {{ unreadMessages.length }}
          </span>
        </a>
      </li>

      <li :class="{ active: activeView === 'sent' }">
        <a href="#" @click.prevent="navigate('sent', 'Sent')">
          <i class="fa fa-envelope-o"></i> Sent
          <span class="label label-default pull-right">
            {{ sentMessages.length }}
          </span>
        </a>
      </li>

      <li :class="{ active: activeView === 'important' }">
        <a href="#" @click.prevent="navigate('important', 'Important')">
          <i class="fa fa-bookmark-o"></i> Important
          <span class="label label-warning pull-right">
            {{ importantMessages.length }}
          </span>
        </a>
      </li>

      <li :class="{ active: activeView === 'trash' }">
        <a href="#" @click.prevent="navigate('trash', 'Trash')">
          <i class="fa fa-trash-o"></i> Trash
          <span class="label label-default pull-right">
            {{ trashedMessages.length }}
          </span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
  import compose from './Compose.vue';

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
        activeView: 'inbox'
      };
    },
    methods: {
      navigate(tag, name) {
        eventBus.$emit('viewChanged', {
          tag,
          name
        })
      }
    },
    computed: {
      unreadMessages() {
        return this.messages.filter((message) => {
          return message.type === 'incoming' &&
            !message.isRead &&
            !message.isDeleted;
        });
      },
      sentMessages() {
        return this.messages.filter((message) => {
          return message.type === 'outgoing' && !message.isDeleted;
        });
      },
      importantMessages() {
        return this.messages.filter((message) => {
          return message.type === 'incoming' &&
            message.isImportant &&
            !message.isDeleted;
        });
      },
      trashedMessages() {
        return this.messages.filter((message) => {
          return message.isDeleted;
        });
      }
    },
    created() {
      eventBus.$on('viewChanged', ({ tag }) => this.activeView = tag);
    },
    components: {
      compose
    }
  }
</script>
