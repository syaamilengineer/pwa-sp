<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card flat color="transparent">
              <v-card-title>
                <v-spacer></v-spacer>
                <span class="syaamil">syaamil</span>
                <span class="pay">pay</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <v-form id="loginForm" @submit.prevent="validateBeforeSubmit()">
                  <v-text-field
                    key="username-input"
                    v-model="formData.email"
                    v-validate="'required'"
                    prepend-icon="phone_android"
                    label="Nomer HP"
                    type="text"
                    data-vv-name="username"
                    :error-messages="errors.collect('username')"
                    required
                    color="info"
                  />
                  <v-text-field
                    id="password"
                    key="password-input"
                    v-model="formData.password"
                    v-validate="'required'"
                    prepend-icon="lock"
                    label="Password"
                    type="password"
                    data-vv-name="password"
                    :error-messages="errors.collect('password')"
                    required
                    color="info"
                  />
                </v-form>
                <div align="right">
                  <nuxt-link to="/forgotPassword" align="right">
                    Lupa password ?
                  </nuxt-link>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="info" type="submit" form="loginForm">
                  Login
                </v-btn>
              </v-card-actions>
              <v-alert v-if="pesan !== null" :value="true" type="error">
                {{ pesan }}
              </v-alert>
              <div align="center">
                Belum punya akun?
                <nuxt-link to="/forgotPassword" align="right">
                  daftar disini
                </nuxt-link>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  $_veeValidate: {
    validator: 'new'
  },
  layout: 'login',
  data: () => ({
    formData: {
      email: null,
      password: null
    },
    pesan: null,
    dictionary: {
      custom: {
        username: {
          required: () => 'Username tidak boleh kosong'
        },
        password: {
          required: () => 'Password tidak boleh kosong'
        }
      }
    }
  }),
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    ...mapActions({
      loginAct: 'user/loginAct'
    }),
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.doLogin()
        }
      })
    },
    async doLogin() {
      try {
        await this.loginAct(this.formData)
        this.$router.push('/')
      } catch (error) {
        if (error.response) {
          this.pesan = 'Mohon cek kembali username dan password anda'
        } else if (error.message) {
          this.pesan = error.message
        } else {
          this.pesan = 'Terjadi kesalahan server'
        }
      }
    }
  }
}
</script>
<style>
.syaamil {
  font-weight: bold;
  font-size: 62px;
  text-transform: capitalize;
  color: #00d8a6;
}
.pay {
  font-weight: bold;
  text-transform: uppercase;
}
</style>
