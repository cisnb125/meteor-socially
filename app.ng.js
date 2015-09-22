// Will run on boh on the client and the server (mongo & minimongo)
Parties = new Mongo.Collection("parties");

// Everything inside this if statement will
// only run on the client side.
if (Meteor.isClient) {
  var app = angular.module('socially', ['angular-meteor', 'ui.router']);

  app.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    // Sets the URL to look like a regular one
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('parties', {
        url: '/parties',
        templateUrl: 'parties-list.ng.html',
        controller: 'PartiesListCtrl'
      })
      .state('partyDetails', {
        url: '/parties/:partyId',
        templateUrl: 'party-details.ng.html',
        controller: 'PartyDetailsCtrl'
      });

    $urlRouterProvider.otherwise('/parties');
  });

  app.controller('PartiesListCtrl',
    function($scope, $meteor) {
      // Bind parties to the Parties Mongo collection
      $scope.parties = $meteor.collection(Parties);

      $scope.remove = function(party) {
        $scope.parties.remove(party);
      };

      $scope.removeAll = function() {
        $scope.parties.remove();
      }
  });

  app.controller('PartyDetailsCtrl', function($scope, $stateParams) {
    $scope.partyId = $stateParams.partyId;
  });
}


if (Meteor.isServer) {
  Meteor.startup(function() {
    if (Parties.find().count() === 0) {
      var parties = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i  < parties.length; i++)
        Parties.insert(parties[i]);
    }
  });
}