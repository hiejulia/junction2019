<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     >
            <!-- Mask -->
            
        </base-header>

        <div class="container-fluid mt--7">
                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Your diary</h3>
                                    <h3 class="mb-0">How was your day? Tell us?..</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                </div>


                                 <div class="app__speech-to-text">
      <div class="app__title">
          <img alt="Vue logo" src="../assets/robot.png" width="24">Your diary...
      </div>
      <div class="app__try-button">
          <SpeechToText class="app__stt-button" @speech="onSpeechReceived($event)"/>
          <textarea class="app__stt-input" placeholder="Prova" v-model="speech"></textarea>
      </div>
    </div>
    <br> 
                            </div>
                        </div>
                        <button type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
              @click="saveToDiary">
              Save to diary
      </button>
                        
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SpeechToText from '../lib/components/SpeechToText.vue';



export default {
    name: 'diary',
    components: {
        SpeechToText
    },
    data() {
        return {
            speech: ''
        };
    },
    methods: {
        onSpeechReceived(speech) {
            this.speech = speech;
        },

        saveToDiary(){
            this.$toasted.show('Save to diary')
            console.log('save')
            let body = {
                "content":this.speech,
                "user_id": 4,
                "created_at":"19.12.2019"
            }
            axios.post(`localhost:8080/api/diaries`, {
                body: body
            })
            .then(response => {
                // Toast 
                this.$toasted.show('Successfully saved to the diary')
                // Route to list diary 
            })
            .catch(e => {
                console.log('Something going wrong')    
            })

        }
    }
};
</script>

<style lang='sass'>
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
.app
  &__title
    display: flex
    flex-direction: row
    height: 30px
    align-items: center
  &__speech-to-text
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
  &__try-button
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
  &__stt-button
    padding: 10px 0
  &__stt-input
      border: 1px solid #DDDDDD
      border-radius: 5px
      box-shadow: 1px 1px 6px #AAAAAA
      height: 100px
      width: 500px
      outline: none
      padding: 10px
</style>