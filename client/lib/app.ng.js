// Everything inside this if statement will
// only run on the client side.
angular.module('socially', ['angular-meteor', 'ui.router', 'angularUtils.directives.dirPagination']);

function onReady() {
  angular.bootstrap(document, ['socially']);
}

if (Meteor.isCordova)
  angular.element(document).on('deviceready', onReady);
else
  angular.element(document).ready(onReady);