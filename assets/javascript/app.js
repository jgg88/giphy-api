//GLOBAL VARIABLES
//=======================================================
var topics = ["tacos", "pizza", "cheeseburger", "donut", "milkshake", "muffin", "chocolate",  "cupcake", "pie", "kale", "broccoli", "sourdough", "lasagna", "steak", "tofu"];

//FUNCTIONS
//=======================================================
function renderButtons() {
	$("#buttons-view").empty();
	for (var i = 0; i < topics.length; i++) {

	 var button = $("<button>");
	 button.addClass("food-button");
	 button.attr("data-name", topics[i]);
	 button.text(topics[i]);
	 $("#buttons-view").append(button);
	 }

	$(".food-button").on("click", function() {

		var food = $(this).attr("data-name");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=NErKY2MzmExW43j4p2CVQ9b7DoexOmvH&limit=10&offset=0&rating=PG&lang=en";

		$.ajax({
		url: queryURL,
		method: "GET"
		}).done(function(response) {
		console.log(response);
		 			
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			var rating = results[i].rating;
		 	console.log(rating);
		 	var foodDiv = $("<div>");

		 	var p = $("<p>").text("Rating: " + rating);
		 				
		 	var foodImage = $("<img>");
		 		foodImage.addClass("image");
		 		foodImage.attr("src", results[i].images.fixed_height_still.url);
		 		foodImage.attr("data-still", results[i].images.fixed_height_still.url);
		 		foodImage.attr("data-animate", results[i].images.fixed_height.url);

		 	foodDiv.prepend(p);
		 	foodDiv.prepend(foodImage);

		 	$("#images").prepend(foodDiv);

		 	$(".image").on("click", function() {
	 			var state = $(this).attr("data-state");

					if (state === "still") {
					$(this).attr("src", $(this).attr("data-animate"));
					$(this).attr("data-state", "animate");
					} else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr("data-state", "still");
					}
			});

		}



		 			
		});
});

}

//PROCESSES
//=======================================================

$("#add-food").on("click", function(event) {
	event.preventDefault();

	var food = $("#food-input").val().trim();

	topics.push(food);

	renderButtons();

	$("#food-input").val("");
});

renderButtons();
	 	