<template>
    <v-row >
        <v-col col="12" sm="9">
    <h1>Survey</h1>
    <h4>{{ message }}</h4>

        </v-col>
        <v-col col="12" sm="3" align="right">
          <v-btn color = "black"
            href="\logout"
          >
           Logout
          </v-btn></v-col>
        </v-row>
  <br>
    <br>
  <v-row><h3>Pending Surveys</h3></v-row>
  <br>
      <v-row>
        <v-col  cols="9"
              sm="6">
            <span class="text-h6">Name</span>
        </v-col>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Duration</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        
      </v-row>
      <SurveyDisplay
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"      
        @completeSurvey="completeSurvey(survey)"
    />

    <br><br>
  <v-row><h3>Completed Surveys</h3></v-row>
  <br>
      <v-row>
        <v-col  cols="9"
              sm="6">
            <span class="text-h6">Name</span>
        </v-col>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Duration</span>
        </v-col>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6">Completed on</span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6">View</span>
        </v-col>
        
      </v-row>
      <CompletedSurveyDisplay
        v-for="survey in completedsurveys"
        :key="survey.id"
        :survey="survey"     
        @viewSurvey="viewSurvey(survey)"
    />
</template>
<script>
import SurveyDataService from "../services/SurveyDataService";
import SurveyDisplay from '@/components/SurveyDisplay.vue';
import CompletedSurveyDisplay from '@/components/CompletedSurveyDisplay.vue';
export default {
  name: "surveys-list",
  data() {
    return {
      surveys: [],
      completedsurveys:[],
      currentSurvey: null,
      currentIndex: -1,
      email: "",
      message : ""
    };
  },
  components: {
        SurveyDisplay,CompletedSurveyDisplay
    },
  methods: {
    completeSurvey(survey) {
      this.$router.push({ name: 'completeSurvey', params: { id: survey.id } });
    },
    viewSurvey(survey) {
      this.$router.push({ name: 'surveyview', params: { id: survey.id } });
    },
    retrieveSurveys() {
      SurveyDataService.getAll()
        .then(response => {
          this.allsurveys = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
        SurveyDataService.getAllCompleted()
        .then(response => {
          this.completedsurveys = response.data;
          this.surveys = this.allsurveys.filter(o1 => !this.completedsurveys.some(o2 => o1.id == o2.surveyId));
       
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
  },
  mounted() {
    this.retrieveSurveys();
  }
};
</script>
<style>

</style>