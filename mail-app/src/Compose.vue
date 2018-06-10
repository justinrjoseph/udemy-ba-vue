<template>
  <div>
    <a href="#composeModal" data-toggle="modal" class="btn btn-compose">
      Compose
    </a>

    <div
      aria-hidden="true"
      role="dialog"
      tabindex="-1"
      id="composeModal"
      class="modal fade"
      style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              aria-hidden="true"
              data-dismiss="modal"
              class="close"
              type="button">
              &times;
            </button>

            <h4 class="modal-title">New Message</h4>
          </div>

          <div class="modal-body">
            <form
              role="form"
              class="form-horizontal"
              @submit.prevent="sendMessage()">
              <div class="form-group">
                <label
                  class="col-lg-2 control-label"
                  for="subject">
                  Subject
                </label>

                <div class="col-lg-10">
                  <input
                    type="text"
                    id="subject"
                    class="form-control"
                    v-model="message.subject">
                </div>
              </div>

              <div class="form-group">
                <label
                  class="col-lg-2 control-label"
                  for="message">
                  Message
                </label>

                <div class="col-lg-10">
                  <textarea
                    rows="10"
                    cols="30"
                    class="form-control"
                    id="message"
                    v-model="message.content">
                  </textarea>
                </div>
              </div>

              <div class="form-group">
                <div class="col-lg-offset-2 col-lg-10">
                  <button class="btn btn-send" type="submit">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventBus } from './main';

  import moment from 'moment';

  export default {
    data() {
      return {
        message: {
          subject: '',
          content: ''
        }
      };
    },
    methods: {
      sendMessage() {
        eventBus.$emit('messageSent', {
          message: {
            subject: this.message.subject,
            content: this.message.content,
            isDeleted: false,
            type: 'outgoing',
            date: moment(),
            from: {
              name: 'Justin Joseph',
              email: 'justin@thinkrightly.com'
            },
            attachments: []
          }
        })
      }
    }
  }
</script>
