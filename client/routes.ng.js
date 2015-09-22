angular.module('socially').run(function($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function(event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === 'AUTH_REQUIRED') {
      $state.go('/parties');
    }
  })
});

angular.module("socially").config(function($urlRouterProvider, $stateProvider, $locationProvider) {
  console.log('config');
  // Sets the URL to look like a regular one
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('parties', {
      url: '/parties',
      templateUrl: 'client/parties/views/parties-list.ng.html',
      controller: 'PartiesListCtrl'
    })
    .state('partyDetails', {
      url: '/parties/:partyId',
      templateUrl: 'client/parties/views/party-details.ng.html',
      controller: 'PartyDetailsCtrl',
      resolve: {
        'currentUser': function($meteor) {
          return $meteor.requireUser();
        }
      }
    });

  $urlRouterProvider.otherwise('/parties');
});