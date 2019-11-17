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
                                    <h3 class="mb-0">Opening your camera...</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                </div>
                              <!---Start the camera-->

          <main>
    <Camera ref="camera" width="300" height="300" />
    <button @click="getPhoto">What is my emotion?</button>
    <img alt="Your image" :src="src" v-if="src">

    <p>HAPPY - 90%</p>
    <p>Recommendation : You are enjoy life at the bese. Good mental health is a prerequisite for good physical health. </p>
  </main>

                              <!--End the camera--->             
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
import Camera from "vue-html5-camera"
import axios from 'axios';
import fs from 'fs'

const vision = require('@google-cloud/vision')

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Creates a client
const storage = new Storage();
const bucket = storage.bucket("junctionimages")
const base64 = require('node-base64-image'); 
const credentials = require('../auth/creds.json');

export default {
  data() {
    return {
      src: "",
      filesToUpload:[],
      images:[],
      uploadedImagesUrl:[],
      progress:0,
      uploaded:false,
      uploadStart:false
    }
  },
  methods: {
  dataURIToBlob(dataURI) {
    dataURI = dataURI.replace(/^data:/, '');

    const type = dataURI.match(/image\/[^;]+/);
    const base64 = dataURI.replace(/^[^,]+,/, '');
    const arrayBuffer = new ArrayBuffer(base64.length);
    const typedArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < base64.length; i++) {
        typedArray[i] = base64.charCodeAt(i);
    }

    return new Blob([arrayBuffer], {type});
},
    
    blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
},
    getPhoto() {
      this.src = this.$refs.camera.click();


      // Base 64 image 

      this.callAnnotateImage(this.src)

      // End Base 64 image
      
//       fs.writeFile('image.png', this.src, {encoding: 'base64'}, function(err) {
//     console.log('File created');
// });
    
      // Blob type

      var blobImage = this.dataURIToBlob((this.src),'emotion1')

      const imageUrl = URL.createObjectURL(blobImage);

      console.log(imageUrl)
      const srcImage = URL.revokeObjectURL(imageUrl)
    
      var filename = this.blobToFile(blobImage)
      
      // Download image to the local file
      // var a = document.createElement("a"); //Create <a>
      // a.href = this.src
      // a.download = "faceemotion.png"; //File name Here
      // a.click(); //Downloaded file
      // End download image
      

      // Push the download file -> cloud -> get URL

      // Save url to the DB

      //

      // return url 
      
    },

  // Extract the Emotion via photo 

    async callAnnotateImage(base64String) {

      const client = new vision.ImageAnnotatorClient();

    // const request = {
    //     "image": {
    //         "content": base64String
    //     },
    //     "features": [
    //         {
    //             "type": "FACE_DETECTION"
    //         },
    //         {
    //             "type": "LABEL_DETECTION"
    //         },
    //         {
    //             "type": "IMAGE_PROPERTIES"
    //         },
    //         {
    //             "type": "WEB_DETECTION"
    //         }
    //     ],
    // };

    // try {
    //     const call = await client.annotateImage(request);
    //     console.log(call);
    // } catch (error) {
    //     console.error(error);
    // }
    const [result] = await client.faceDetection(base64String);
  const faces = result.faceAnnotations;
  console.log('Faces:');
  faces.forEach((face, i) => {
    console.log(`  Face #${i + 1}:`);
    console.log(`    Joy: ${face.joyLikelihood}`);
    console.log(`    Anger: ${face.angerLikelihood}`);
    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    console.log(`    Surprise: ${face.surpriseLikelihood}`);
  });

},

  // End extract the Emotion via Photo 

    // Main function for upload
    async uploadFile() {
      var bucketName = "junctionimages"
      var filename = this.blobToFile(this.dataURIToBlob(this.src),'emotion1')
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {

    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  });
},


async extractEmotions() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const imageUrl = "https://images.unsplash.com/photo-1467307983825-619715426c70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
  
  const [result] = await client.labelDetection(imageUrl);

  
  const labels = result.labelAnnotations;
  
  labels.forEach(label => console.log(label.description));
}

    // POST - /api/upload images / users 
  },
  components: {
    Camera
  }
}
</script>


<style></style>

