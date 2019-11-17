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
                                    <h3 class="mb-0">Our connection with Therapists and Hospitals</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                </div>

                            </div>
                        </div>


     <li v-for="value in hospitals">
    <b-card
    title="Therapist"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      {{value.name}}
    </b-card-text>
  </b-card>
  </li>
                        
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';




export default {
    // Give a list of therapists / hospital
    name: 'connection',
    components: {
        
    },
    data() {
        return {
            hospitals:[{
                "name":"Helsinki University Hospital, Helsinki."},
                {"name":"Tampere University Hospital, Tampere."},
                {"name":"Kuopio University Hospital, Kuopio."},
                {"name":"Turku University Hospital, Turku."}
        ],
            therapists:[]
        };
    },
    methods: {
        onSpeechReceived(speech) {
            this.speech = speech;
        },

        getHospitals(){

            axios.get(`http://localhost:8080/api/hospitals`)
            .then(res => {
                this.hospitals = res.data
                // Route to list diary 
            })
            .catch(e => {
                console.log('Something going wrong')    
            })

        },
        getTherapists(){

            axios.get(`http://localhost:8080/api/therapists`)
            .then(res => {
                this.therapists = res.data
            })
            .catch(e => {
                console.log('Something going wrong')    
            })

        },
    },

    created(){
        // this.getHospitals()
        // this.getTherapists()
    }
};
</script>
