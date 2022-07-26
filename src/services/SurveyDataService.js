import http from "../http-common";
class SurveyDataService {
  getAll() {
    return http.get("/surveys");
  }
  getAllCompleted(){
    return http.get("/completedsurveys/byuser/" + user.id);
  }
  get(id) {
    return http.get(`/surveys/${id}`);
  }
  getCompleted(id) {
    return http.get(`/completedsurveys/${id}`);
  }
  create(data) {
    return http.post("/completedsurveys", data);
  }
  update(id, data) {
    return http.put(`/surveys/${id}`, data);
  }
  delete(id) {
    return http.delete(`/surveys/${id}`);
  }
  deleteAll() {
    return http.delete(`/surveys`);
  }
  findByName(name) {
    return http.get(`/surveys?name=${name}`);
  }
}
export default new SurveyDataService();