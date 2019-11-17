<template>
    <div>
        
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                    </div>
                </div>

                <!--Message part-->
                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Your chat bot buddy</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                </div>
                            </div>
                        </div>
                    </card>

                    <!--Chat bot-->



  <iframe
    allow="microphone;"
    width="730"
    height="530"
    src="https://console.dialogflow.com/api-client/demo/embedded/a2f702f8-ab23-417a-8582-e7a0c1a52d5b">
</iframe>




                    <!--End Chat bot-->





                </div>
                <!--End Message part-->

            </div>
        </div>
    </div>
</template>
<script>

import ChatBox from '../components/ChatBox'
import ChatButton from '../components/ChatButton'
import UnreadMessages from '../components/UnreadMessages'


export default {
    name: 'chat-bot',
    components: {
    ChatBox,
    ChatButton,
    UnreadMessages
  },
    data() {
      return {
        model: {
          username:'',
          message:''
        }
      }
    },
  };
</script>
<style>



</style>
