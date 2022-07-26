<template>
<v-row>
  <v-col  cols="9"
        sm="6">
      <span >{{ survey.name }}</span>
  </v-col>
  <v-col  cols="9"
        sm="2">
      <span> {{ survey.duration }}</span>
  </v-col>
  <v-col  cols="9"
        sm="1">
      <v-btn size="x-small" icon="mdi-eye" @click="completeSurvey"/>
  </v-col>
</v-row>
</template>

<script>
export default {
  props: {
    survey: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    deleteSurvey() {
      this.$emit("deleteSurvey");
    },
    completeSurvey() {
      this.$emit("completeSurvey");
    },
    viewSurvey() {
      this.$emit("viewSurvey");
    }
  }
};
</script>

<style></style>
