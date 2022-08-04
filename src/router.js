import { createWebHistory, createRouter } from "vue-router";
import axios from 'axios';

const routes =  [
  {
    path: "/",
    name: "home",
    component: () => import("./views/SurveysList.vue"),
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue")
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      logout();
    }
  },
  {
    path: '/forgot-password',
    name:"forgotpassword",
    component:() => import("./views/ForgotPassword.vue")

  },
  {
    path: '/verify',
    name:"verify",
    component:() => import("./views/Verify.vue")

  },
  {
    path: '/verify-email',
    name:"verifyemail",
    beforeEnter: [verifyEmail]

  },
  {
    path: '/reset-password',
    name:"resetPassword",
    component:() => import("./views/ResetPassword.vue")

  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register.vue")
  },
  {
    path: "/tutorials",
    name: "tutorials",
    component: () => import("./views/TutorialsList.vue")
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("./views/EditTutorial.vue"),
    props: true
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddTutorial.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewTutorial.vue"),
    props: true
  },
  {
    path: "/addLesson",
    name: "addLesson",
    component: () => import("./views/AddLesson.vue"),
    props: true
  },
  {
    path: "/editLesson",
    name: "editLesson",
    component: () => import("./views/EditLesson.vue"),
    props: true
  },
  {
    path: "/surveys",
    name: "surveys",
    component: () => import("./views/SurveysList.vue"),
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/survey/view/:id",
    name: "surveyview",
    component: () => import("./views/ViewSurvey.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
  {
    path: "/survey/complete/:id",
    name: "completeSurvey",
    component: () => import("./views/Survey.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      guard(to, from, next);
    }
  },
];
const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const guard = function(to, from, next) {  
var sessiontoken = localStorage.getItem('SESSION');
if(!sessiontoken){    
  localStorage.setItem('redirect', to.fullPath);
  window.location.href = "/login";
}
var data = JSON.stringify({
    "token": sessiontoken.replace(/['"]+/g, '')
  }); 
  
  var config = {
    method: 'post',
    url: 'http://localhost:3000/api/users/session',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {    
    var token = response.data.token;
    localStorage.setItem('SESSION', JSON.stringify(token));
    if(response.data.user.email_verified == false){      
  window.location.href = "/verify?email=" + response.data.user.email;
    }
    window.user = response.data.user;
    
    var RedirectUrl = localStorage.getItem('redirect');
    if(RedirectUrl){
      localStorage.removeItem('redirect');
      window.location.href = RedirectUrl;
    } else {
      next();
      return;
    }
  })
  .catch(function (error) {
    console.log(error);
    window.location.href = "/login";
  });
}
const logout = function() {  
  localStorage.setItem('SESSION', '');
  window.location.href = "/login";
  }
  function verifyEmail(to){
    var data = JSON.stringify({
      "email": to.query.email
    }); 
    var config = { 
      method: 'post',
      url: 'http://localhost:3000/api/users/verify-email?code=' + to.query.code,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {        
      window.location.href = "/";
    })
    .catch(function (error) {
      alert('invalid verification code');
    });
  }  
export default router;