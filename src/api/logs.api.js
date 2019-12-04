import api from './api.js';

class LogsService {

  createLog(request) {
    return api.httpPOST('/api/logs', request);
  }

  getLogByLogId(logId) {
    return api.httpGET(`/api/logs/byId/${logId}`);
  }

  getLogsByDate(date) {
    return api.httpGET(`/api/logs/byDate/${date}`);
  }

  deleteById(logId) {
    return api.httpDELETE(`/api/logs/${logId}`);
  }

  editLog(log) {
    return api.httpPUT('/api/logs/', log);
  }
}

const logsService = new LogsService();
export default logsService;