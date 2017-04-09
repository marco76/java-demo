export const environment = {
  production: true,
  BACKEND_URL : window.location.protocol + '//' + window.location.hostname + ':' + window.location.port,
  WS_BACKEND_URL : 'ws://' + window.location.hostname + ':' + window.location.port

};
