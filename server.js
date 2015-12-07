// require express and other modules
var express = require('express'),
    app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

var day = new Date("January 3, 1982");
var bday = day.getTime();

var heather = [
  { name: "Heather Stenson",
    github_link: "https://github.com/heystenson",
    github_profile_image: "https://avatars0.githubusercontent.com/u/8186438?v=3&s=460",
    current_city: "Oakland, CA",
    days_old: Math.floor((Date.now() - bday)/86400000),
    family_members: [ {name: "Jenny", relationship: "mother"},
                      {name: "Rollie", relationship: "father"},
                      {name: "Trevor", relationship: "brother"},
                      {name: "Joel", relationship: "brother"},
                      {name: "Samuel", relationship: "brother"},
                      {name: "Mackenzie", relationship: "sister"
                    }]                 
  } 
];

var favorite_things = [
  {_id: 1, thing: "kittens", description: " small, furry, whiskers"},
  {_id: 2, thing: "chai tea", description: "spicy, sweet, delicious"},
  {_id: 3, thing: "the Dune novels", description: "it's actually more of a love/hate thing"}
]; 

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to my personal api!",
    documentation_url: "https://github.com/sf-wdi-25/express_self_api/README.md", 
    base_url: "http://YOUR-APP-NAME.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/profile', function(req, res){
  res.json({heather: heather});
});

app.get('/api/favs', function(req, res){
  res.json({favorite_things: favorite_things});
});

app.get('/api/favs/:id', function(req, res){
  var favId = parseInt(req.params.id);
  favorite_things.forEach(function(fav){
    if(favId === fav._id){
      res.send(fav);
    }
  });
});

app.post('/api/favs', function(req, res){
  var newFav = req.body;
  if (favorite_things.length > 0){
    newFav._id = favorite_things[favorite_things.length - 1] + 1;
  } else {
    newFav._id = 1;
  }
});

app.put('/api/favs/:id', function(req, res){
  var thisFav = req.body;
  var thisId = parseInt(req.params.id);
  favorite_things.forEach(function(favs, index){
    if(thisId === fav._id){
      favorite_things.splice(index, 1, {_id: fav._id, thing: thisFav.thing, description: thisFav.description});
      res.json(favorite_things[index]);
    }
  });
});

app.delete('/api/favs/:id', function(req, res){
  var thisId = parseInt(req.params.id);
  var deleted;
  favorite_things.forEach(function(fav, index){
    if(thisId === fav._id){
      deleted = favorite_things.indexOf(fav);
    }
  });
  var newList = favorite_things.splice(deleted, 1);
  res.json(newList);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('check out localhost:3000, bro');
});
