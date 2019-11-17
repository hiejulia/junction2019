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
                        
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SpeechToText from '../lib/components/SpeechToText.vue';

const userId = 4


export default {
    name: 'diary-list',
    components: {
        SpeechToText
    },
    data() {
        return {
            speech: ''
        };
    },
    methods: {
        
        listAllUserDiary(){

            axios.get(`localhost:8080/api/users/${userId}/diaries`)
            .then((response) => {
                console.log(response.data);
            });

        }
    },

    created(){
        listAllUserDiary()
        


    }
};
</script>
