// Will run on boh on the client and the server (mongo & minimongo)
Parties = new Mongo.Collection("parties");

// Everything inside this if statement will
// only run on the client side.
if (Meteor.isClient) {
  angular.module('socially', ['angular-meteor']);

  angular.module('socially').controller('PartiesListCtrl',
    function($scope, $meteor) {
      $scope.parties = $meteor.collection(Parties);
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