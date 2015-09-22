// Will run on boh on the client and the server (mongo & minimongo)
Parties = new Mongo.Collection("parties");

Parties.allow({
  insert: function(userId, party) {
    return userId && party.owner === userId;
  },
  update: function(userId, party, fields, modifier) {
    return userId && party.owner === userId;
  },
  remove: function(userId, party) {
    return userId && party.owner === userId;
  }
});