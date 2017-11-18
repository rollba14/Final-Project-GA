let db = require('../models');

db.User.remove({}, function(err, users) {
  console.log('removed all users');

  db.Post.remove({},function(err,posts){
    console.log('removed all posts');
    process.exit();
    // Moved db.Post.remove into db.User.remove's callback fcn, bc otherwise it's possible for
    // the process.exit() to run before the Users are all removed
  })
})

// Does this work? If not, add seed code that does, or remove commented out lines altogether
// this.posts.push(
//   {
//     place: {
//       geometry: {
//         location: {
//           lat: 37.7694208,
//           lng: -122.48621379999997,
//         }
//       }
//     },
//     title: "Hello HA",
//     image_url: "https://lh3.googleusercontent.com/ez8pDFoxU2ZqDmyfeIjIba6dWisd8MY_6choHhZNpO0WwLhICu0v0s5eV2WHOhuhKw=w170",
//
//   },
//   {
//     place: {
//       geometry: {
//         location: {
//           lat: 37.7988737,
//           lng: -122.46619370000002,
//         }
//       }
//     },
//     title: "What chu looking at?",
//     image_url: "http://icons.iconarchive.com/icons/martin-berube/flat-animal/256/frog-icon.png",
//   },
//   {
//     place: {
//       geometry: {
//         location: {
//           lat: 37.8060532,
//           lng: -122.41033110000001,
//         }
//       }
//     },
//     title: "A nice day to fish some fishy",
//     image_url: "https://images-na.ssl-images-amazon.com/images/I/41f4HriR3lL.png",
//   }
// )
