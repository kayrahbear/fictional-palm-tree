<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Photo App
        </q-toolbar-title>
        <div class="absolute-right" v-if="loggedIn">
          {{ this.user }}
          <q-btn @click="logout()" flat label="LogOut" class="right" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
    </q-drawer>

    <amplify-authenticator v-if="!loggedIn" username-alias="email">
      <amplify-sign-up
        slot="sign-up"
        username-alias="email"
        :form-fields.prop="formFields"
      ></amplify-sign-up>
    </amplify-authenticator>

    <q-page-container v-if="loggedIn">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { auth_logout } from "src/services/cloud";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";


export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
      loggedIn: false,
      user: "",
      formFields: [{ type: "email" }, { type: "password" }],
    };
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      if (authState == "signedin") {
        this.loggedIn = true;
        this.user = authData.username;
      } else {
        this.loggedIn = false;
        this.user = "";
      }
    });
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
  methods: {
    async logout() {
      const stat = await auth_logout();
      if (stat.status == "ok") {
        this.loggedIn = false;
      }
    },
  },
};
</script>
