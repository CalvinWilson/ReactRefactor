var Post = require('../models/post');
var faker = require('faker');

var counter = 0;

console.log("Generating Fake Data...");

function generateItem(howMany) {
  
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data){
      var user = data.results[0].user;
      counter += 1;
      var Item = new Post({
        title: user.name.first + ' ' + user.name.last,
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente excepturi itaque perspiciatis, ullam expedita, consequuntur quis alias dolorum optio tempora dignissimos sit ipsam odio, voluptatum velit doloremque voluptates vitae iste.',
        url: user.picture.large
      });
      Item.save({}, {
        success: function (rsp) {
          console.log(counter + ": %O", rsp);
          if (counter < howMany) {
            generateItem(howMany);
          }
        },
        error: function (obj, err) {
          console.log("Error: %s", err);
        }
      });
    }
  });
  
 
  // new hotness
  /*
  var Item = new Post({
    title: faker.lorem.words().reduce(function(word1, word2){
      var words = word1.charAt(0).toUpperCase() + word1.slice(1) +
                  " " +
                  word2.charAt(0).toUpperCase() + word2.slice(1)
      return words;
    }),
    description: faker.lorem.paragraphs(),
    url: faker.image.nightlife()
  });

  Item.save({}, {
    success: function (rsp) {
      console.log(counter + ": %O", rsp);
      if (counter < howMany) {
        counter += 1;
        generateItem(howMany);
      }
    },
    error: function (obj, err) {
      console.error("Error: %O", err);
    }
  });
  */
}

module.exports.generate = function (howMany) {
  generateItem(howMany);
}