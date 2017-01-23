function logMilestone(message) {
    console.log(" ================== " + message + " ================== ")
}

var config = {
    apiKey: "AIzaSyC29nkD0DOlVr9kNxV7T2gc7cG3cBzWpfM",
    authDomain: "gopher-bills.firebaseapp.com",
    databaseURL: "https://gopher-bills.firebaseio.com",
    storageBucket: "gopher-bills.appspot.com",
    messagingSenderId: "749304793144"
};

firebase.initializeApp(config);

var app = angular.module('gopher-bills', [
    'ui.router',
    'ngMaterial',
    'firebase'
]);

// app.config(function($mdThemingProvider) {
//     $mdThemingProvider.theme('default')
//         .primaryPalette('lime')
//         .accentPalette('orange');
// });

app.run(RunBlock);

RunBlock.$inject = ['$state', '$rootScope'];

function RunBlock($state, $rootScope) {
    // $state.go('home');
    $rootScope.$on('$stateChangeError', function $stateChangeError(event, toState,
        toParams, fromState, fromParams, error) {
        console.group();
        console.error('$stateChangeError', error);
        console.error(error.stack);
        console.info('event', event);
        console.info('toState', toState);
        console.info('toParams', toParams);
        console.info('fromState', fromState);
        console.info('fromParams', fromParams);
        console.groupEnd();
    });
}

app.config(ConfigBlock);

ConfigBlock.$inject = ['$stateProvider', '$urlRouterProvider'];

function ConfigBlock($stateProvider, $urlRouterProvider) {

    logMilestone("Config");

    var HomeState = {
        name: 'home',
        url: '/',
        template: '<ui-view></ui-view>'
    };

    $stateProvider.state('home', HomeState);
    $urlRouterProvider.otherwise('/');
}

app.controller('NavbarCtrl', function($scope, $firebaseAuth) {
    $scope.authObj = $firebaseAuth();
    $scope.firebaseUser = $scope.authObj.$getAuth();

    $scope.login = function(authType) {
        switch (authType) {
            case 'google':
            default:
                // login with Google
                $scope.authObj.$signInWithPopup(authType).then(function(firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                    console.log($scope.authObj.$getAuth());
                }).catch(function(error) {
                    console.log("Authentication failed:", error);
                });
        }
    }
});