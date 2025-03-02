// Function to scroll the window to the top of the page
function getHome() {
    window.scrollTo(0, 0); // Scrolls the window to the coordinates (0, 0), which is the top-left corner of the page
}

// Array to store recipes
const recipes = [];

// Function to prompt the user for recipe details
function addRecipe() {
    // Prompt user to enter the name of the recipe
    const recipeName = prompt("Please enter the name of your recipe: ");

    // Prompt user to enter the ingredients for the recipe
    const ingredients = prompt("What are all the ingredients of your dish? (Please use a comma to separate them.): ");

    // Prompt user to enter the category of the dish
    const category = prompt("What type of dish is it? (Breakfast, Lunch, Dinner, Bakery): ");

    // Prompt user to enter region of the dish
    const region = prompt("Where is your dish from? (Asia, Americas, Europe, Africa): ");

    // Check if any of the fields are left empty
    if (!recipeName || !ingredients || !category || !region) {
        alert("All fields are required! Please try again.");
        return;
    }

    // Create a new recipe object
    const newRecipe = {
        name: recipeName,
        ingredients: ingredients.split(","),
        type: category,
        region: region // Corrected variable name
    };

    // Push the new recipe to the recipes array
    recipes.push(newRecipe);

    // Add the new recipe to the webpage
    displayRecipes();

    // Alert to confirm the recipe is added (just keeping the alert for user feedback)
    alert("Recipe added: " + recipeName + "\nCategory: " + category + "\nRegion: " + region + "\nIngredients: " + ingredients);
}

// Function to display all recipes on the webpage
function displayRecipes() {
    const recipeList = document.getElementById("recipe-list");

    // Clear the current list (if any)
    recipeList.innerHTML = "<h2>Recipes</h2>"; 

    // Loop through all recipes and add them to the list
    recipes.forEach(recipe => {
        // Create a new div for each recipe
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        // Add the recipe's information to the div
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.type}</p>
            <p><strong>Region:</strong> ${recipe.region}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        `;

        // Append the recipe div to the recipe-list container
        recipeList.appendChild(recipeDiv);
    });
}

// Fetch data from the API
function searchRecipes() {
    let recipe = document.querySelector("#recipe").value;
    console.log(recipe)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`).then((res) => {
       if (!res.ok) {
            // an error has happened, we should do something
            alert("Oops, the recipe you searched doesn't exist, try again!")
            return;
       }
       console.log(res);
       return res.json();
    }).then((data) => {
        console.log(data);
        
        // Check if the data contains results
        if (data.meals && data.meals.length > 0) {
            // Get the instructions for the first recipe
            let instructions = data.meals[0].strInstructions;
            
            // Replace the text content of the #recipe-instructions paragraph
            document.querySelector("#recipe-instructions").textContent = instructions;
        } else {
            // If no recipes are found, show a message
            document.querySelector("#recipe-instructions").textContent = "No recipe found. Please try another search.";
        }
    }).catch((error) => {
        // Handle any other errors
        console.error('Error fetching data:', error);
    });
}