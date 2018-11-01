// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  BACKEND_URL: 'http://localhost:8080',
  WS_BACKEND_URL : 'ws://localhost:8080',
  DOCUMENT_VALUES: {'BACKEND_URL': 'http://localhost:8080'},
  GIT_DOCUMENTS_URL: 'https://github.com/marco76/java-demo/tree/master/server/src/main/resources/pages/',
  DOCUMENTS_URL: 'http://spring-conferences.scapp.io',
  SPRNG_DATA: 'http://spring-conferences.scapp.io',
  CLOUD_DOCS: 'https://storage.cloud.google.com/javademo-166015.appspot.com/docs/'
};
