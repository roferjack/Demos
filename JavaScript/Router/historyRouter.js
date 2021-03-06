class Router {
  constructor() {
    this.routers = {};
    this._bindPopState();
  }

  init(path) {
    history.replaceState({ path }, null, path);
    this.routers[path] && this.routers[path]();
  }
  route(path, callback) {
    this.routers[path] = callback || function() {};
  }
  go(path) {
    history.pushState({ path }, null, path);
    this.routers[path] && this.routers[path]();
  }
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routers[path] && this.routers[path]();
    })
  }
}