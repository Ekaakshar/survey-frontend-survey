<template>
    <v-row >
        
        <v-col col="12" sm="9">
    <h1>Welcome</h1>
    <h4>{{ message }}</h4>

        </v-col>
        <v-col col="12" sm="3" align="right">
          <a href="\logout" class="btn btn-primary">Logout</a>
          </v-col>
        </v-row>
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
      <h1>Pending Surveys</h1>
      <SurveyDisplay
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"
        @completeSurvey="completeSurvey(survey)"
    />
    <h1>Completed Surveys</h1>
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
      allsurveys:[],
      completedsurveys:[],
      currentSurvey: null,
      currentIndex: -1,
      email: "",
      message : "Create, Search, Edit or Delete Surveys"
    };
  },
  components: {
        SurveyDisplay,
        CompletedSurveyDisplay
    },
  methods: {
    goDashboard() {
      this.$router.push({ name: 'home'});
    },
    goEdit(survey) {
      this.$router.push({ name: 'surveyedit', params: { id: survey.id } });
    },
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
    refreshList() {
      this.retrieveSurveys();
      this.currentSurvey = null;
      this.currentIndex = -1;
    },
    setActiveSurvey(survey, index) {
      this.currentSurvey = survey;
      this.currentIndex = survey ? index : -1;
    },
    removeAllSurveys() {
      SurveyDataService.deleteAll()
        .then(response => {
          //console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchEmail() {
      SurveyDataService.findByEmail(this.email)
        .then(response => {
          this.surveys = response.data;
          this.setActiveSurvey(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveSurveys();
  }
};
</script>
<style>

</style>