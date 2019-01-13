
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDT7VueXc1Y1bq83w5uoy4t0ztBojJy1hQ",
  authDomain: "first-6d5f3.firebaseapp.com",
  databaseURL: "https://first-6d5f3.firebaseio.com",
  projectId: "first-6d5f3",
  storageBucket: "first-6d5f3.appspot.com",
  messagingSenderId: "711818228140"
};
firebase.initializeApp(config);

var database = firebase.database();

//  Button for adding Train information
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestiny = $("#destination-input").val().trim();
  var trainTime = $("#first-time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrainData = {
    name: trainName,
    destination: trainDestiny,
    time: trainTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrainData);

  // Logs everything to console
  console.log(newTrainData.name);
  console.log(newTrainData.destination);
  console.log(newTrainData.time);
  console.log(newTrainData.frequency);

  alert("New Train information successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train infomation to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestiny = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestiny);
  console.log(trainTime);
  console.log(trainFrequency);

   // First Time (pushed back 1 year to make sure it comes before current time)
  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(trainTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestiny),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
    
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  
});

$("#clear-train-btn").on("click", function(event) {
  event.preventDefault();

  $("#train-table > tbody").empty(newRow);
});
