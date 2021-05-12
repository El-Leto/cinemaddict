export default class Observer {
  constructor() {
    this._monitorver = [];
  }

  addMonitorver(monitorver) {
    this._monitorver.push(monitorver);
  }

  removeMonitorver(monitorver) {
    this._monitorver = this._monitorver.filter((existedMonitorver) => existedMonitorver !== monitorver);
  }

  _notify(event, payload) {
    this._monitorver.forEach((monitorver) => monitorver(event, payload));
  }
}
