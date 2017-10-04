// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    serverUrl: 'http://192.168.99.100',
    firebase: {
        apiKey: "AIzaSyCoySi7DI5sv5ajB0IWMklWoFIDa8g5U_4",
        authDomain: "localhost",
        databaseURL: "https://oms-haulage.firebaseio.com",
        projectId: "oms-haulage",
        storageBucket: "oms-haulage.appspot.com",
        messagingSenderId: "1040482644360"
    }
};
