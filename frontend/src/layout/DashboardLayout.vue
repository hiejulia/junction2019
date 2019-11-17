<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title=""
      title=""
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />

        <sidebar-item :link="{name: 'Diary', icon: 'ni ni-planet text-blue', path: '/icons'}"/>
        <sidebar-item :link="{name: 'Shopping', icon: 'ni ni-pin-3 text-orange', path: '/shopping'}"/>
        <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Mental Buddy', icon: 'ni ni-bullet-list-67 text-red', path: '/chatbot'}"/>
        <sidebar-item :link="{name: 'Diary', icon: 'ni ni-bullet-list-67 text-red', path: '/diary'}"/>
        <sidebar-item :link="{name: 'Suggestion', icon: 'ni ni-key-25 text-info', path: '/cameraview'}"/>
        <sidebar-item :link="{name: 'Activities', icon: 'ni ni-circle-08 text-pink', path: '/connection'}"/>
        <sidebar-item :link="{name: 'History', icon: 'ni ni-circle-08 text-pink', path: '/history'}"/>
        <sidebar-item :link="{name: 'Cyber bully', icon: 'ni ni-circle-08 text-pink', path: '/children'}"/>
        <sidebar-item :link="{name: 'Security Information', icon: 'ni ni-circle-08 text-pink', path: '/security'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
