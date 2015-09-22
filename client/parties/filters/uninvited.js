angular.module('socially').filter('uninvited', function() {
  return function(users, party) {
    if (!party)
      return false;

    // Remove each user that either isn't the party's owner
    // or that is not already _contains in the invited list
    return _.filter(users, function (user) {
      if (user._id == party.owner ||  _.contains(party.invited, user._id))
        return false;
      else
        return true;
    });
  }
});