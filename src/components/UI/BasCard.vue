<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col sm="6" md="4" class="text-center">
        <!-- <div class="mx-4 text-center">my-drive</div> -->
        <v-img
          src="../../assets/my-drive-logo.png"
          lazy-src="../../assets/my-drive-logo.png"
          contain
          aspect-ratio="1.8"
          class="pb-0 mb-0"
        ></v-img>
        <span class="text-h3 font-weight-bold">my-drive</span>
      </v-col>
      <v-col sm="6" md="4">
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>