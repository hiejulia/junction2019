<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     >
            <!-- Mask -->
            
        </base-header>

        <div class="container-fluid mt--7">
                <!--Message part-->
                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Talk to me...</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                </div>




                         
                           

                            </div>
                        </div>
                        
                    </card>
                </div>
                <!--End Message part-->



            </div>
        </div>
    </div>
</template>





<script>

const dialogflow = require('dialogflow');




export default {

  data() {
    return {
      
    }
  },
  methods: {
  
    
  },
  components: { 
    
  },

  created(){
      console.log(dialogflow)
  },
  components: {
    
  }
}
</script>







<style></style>

