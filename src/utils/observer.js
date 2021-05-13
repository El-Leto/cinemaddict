export default class Observer {
  constructor() {
    this._listeners = [];
  }

  subscribe(listeners) {
    this._listeners.push(listeners);
  }

  unsubscribe(listeners) {
    this._listeners = this._listeners.filter((existedListeners) => existedListeners !== listeners);
  }

  _notify(action, payload) {
    this._listeners.forEach((listeners) => listeners(action, payload));
  }
}
