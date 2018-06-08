var app = angular.module("data-exporter", ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.tpls', 'angular-loading-bar', 'gettext', 'duScroll', 'tmh.dynamicLocale']);

app.config(function ($httpProvider, $routeProvider, $locationProvider, $provide, cfpLoadingBarProvider, tmhDynamicLocaleProvider) {

    // Configure the app routes
    $routeProvider.when("/", { templateUrl: "app/pages/root.html", controller: "RootController" });

    // Loading bar https://github.com/chieffancypants/angular-loading-bar A global loading bar when HTTP requests are being made so you don't have to manually trigger spinners on each ajax call.
    cfpLoadingBarProvider.latencyThreshold = 300;
    cfpLoadingBarProvider.includeSpinner = false;

    // Dynamically load locale files
    tmhDynamicLocaleProvider.localeLocationPattern("https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.4.8/angular-locale_{{locale}}.js");

});

app.run(function ($rootScope) {

    // There is another app.run function in run.js. This app.run is here for settings that apply to kit's direct implementation and wouldn't necessarily be done the same way by apps that consume kit.js.
    // Only things that are not desirable to port into other apps should be here. Otherise you should use run.js.

    // This defines the languages supported by the app. Each supported language must have an associated translation file in the languages folder. It ain't magic.
    $rootScope.languages = [
        {
            code: "en",
            name: "English"
        },        
        {
            code: "cs",
            name: "čeština"
        },
        {
            code: "de",
            name: "Deutsche"
        },
        {
            code: "el",
            name: "Ελληνικά"
        },
        {
            code: "es",
            name: "Español"
        },                
        {
            code: "fi",
            name: "Suomalainen"
        },
        {
            code: "fr",
            name: "français"
        },            
        {
            code: "it",
            name: "italiano"
        },
        {
            code: "ja",
            name: "日本語"
        },
        {
            code: "ko",
            name: "한국어"
        },
        {
            code: "nl",
            name: "Nederlands"
        },
        {
            code: "pl",
            name: "Polskie"
        },
        {
            code: "pt",
            name: "Português"
        },
        {
            code: "ru",
            name: "русский"
        },            
        {
            code: "sv",
            name: "svenska"
        }
    ]

    // Analytics. Watch for route changes and load analytics accordingly.
    $rootScope.$on('$locationChangeSuccess', function () {
        if (window.__pageview && window.__pageview.recordPageLoad) {
            window.__pageview.recordPageLoad();
        }
    });

});
