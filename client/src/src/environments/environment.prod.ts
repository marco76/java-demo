export const environment = {
  production: true,
  BACKEND_URL : window.location.protocol + '//' + window.location.hostname + ':' + window.location.port,
  WS_BACKEND_URL : 'ws://' + window.location.hostname + ':' + window.location.port,
  DOCUMENT_VALUES: {'BACKEND_URL': window.location.protocol + '//' + window.location.hostname + ':' + 8080},
  GIT_DOCUMENTS_URL: 'https://github.com/marco76/spriNGdemo/tree/master/server/src/main/resources/documents/'

};
