const buttonIng = document.getElementById("newIng");
const formRecipe = document.getElementById("form-recipe");
const ingList = document.getElementById("ingredient-temp-list");
const recipeList = document.getElementById("view");
const keyIng = "ingList";
const keyRecipe = "recipesList";
let listIng = [];

document.addEventListener("DOMContentLoaded", function() {
    buttonIng.addEventListener("click", submitIng);
    formRecipe.addEventListener("submit", sumitRecipe);
    //paintIngredient();
    paintRecipes();
});

function submitIng(e) {
    e.preventDefault();
    e.stopPropagation();

    let ingrediente = {
        id: Date.now(),
        name: formRecipe["ingredient"].value
    };

    listIng.push(ingrediente);

    paintIngredient();
}


function getIngredient() {
    let list = JSON.parse(localStorage.getItem(keyIng));

    if (list === null) {
        return [];
    } else {
        return list;
    }
}

function paintIngredient() {
    let html = '';
    for (var i = 0; i < listIng.length; i++) {
        html +=
            `<li class="[ bg-white color-gray ]" id="${listIng[i].id}">
                ${listIng[i].name} ${i+1}
                <button class="close" type="button" onclick="deleteIngredients(${listIng[i].id})">X</button>
            </li>`;
    }

    ingList.innerHTML = html;
}

function deleteIngredients(id) {

    listIng = listIng.filter(i => i.id !== id);

    let ing = document.getElementById(id);

    ing.className += ' hide';

    setTimeout(() => {
        ing.remove();
    }, 300);
}

function sumitRecipe(e) {
    e.preventDefault();
    e.stopPropagation();

    let recipe = {
        id: Date.now(),
        title: formRecipe["title"].value,
        img_url: formRecipe["img_url"].value,
        description: formRecipe["description"].value
    };

    list = getRecipes();
    list.push(recipe);
    localStorage.setItem(keyRecipe, JSON.stringify(list));
    paintRecipes();
}

function getRecipes() {
    let list = JSON.parse(localStorage.getItem(keyRecipe));
    if (list === null) {
        return [];
    } else {
        return list;
    }
}

function paintRecipes() {
    let recipe = getRecipes();

    let html = `<h1 class="[ color-primary ] [ text-center ]">Listado de recetas</h1>`;

    for (var i = 0; i < recipe.length; i++) {
        html +=
            `<div class="[ row ] [ flex ]" data-state="wrap" id="${recipe[i].id}">
                <div class="[ col ]">
                    <div class="[ card ] [ bg-secondary color-white ] [ radius shadow ]" card-id="${recipe[i].id}">
                        <img src="${recipe[i].img_url}" alt="">
                        <div class="[ flow ]">
                            <h5>${recipe[i].title}</h5>
                            <div class="[ flex ]" data-state="justify-between">
                                <button class="[ btn ]" data-state="white" onclick="getRecipe(${recipe[i].id})">Ver</button>
                                <button class="[ btn ]" data-state="warning" onclick="deleteRecipe(${recipe[i].id})">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    recipeList.innerHTML = html;
}

function getRecipe(id) {

    let recipe = getRecipes();

    showRecipe = recipe.filter(i => i.id === id);

    console.log(recipe);

    let html = `<h1 class="[ color-primary ] [ text-center ]">Receta</h1>`;

    for (var i = 0; i < showRecipe.length; i++) {

        html += `<div class="[ recipe ] [ flex ] [ shadow ]">
            <div class="recipe-img">
                <img src="${showRecipe[0].img_url}" alt="">
            </div>
            <div class="[ recipe-info ] [ flow ]">
                <h2>${showRecipe[0].title}</h2>
                <div class="[ text-justify ]">${showRecipe[0].description}</div>
                <h5>Ingredientes</h5>
                <ul class="[ recipe-ing ] [ flex ]" data-state="wrap">
                    <li>${listIng[i].name}</li>
                </ul>
            </div>
        </div>

        <div class="text-right">
            <button class="[ btn ]" data-state="primary" onclick="paintRecipes()">Volver al listado</button>
        </div>`;
    }

    recipeList.innerHTML = html;
}

function deleteRecipe(id) {
    let list = getRecipes();

    list = list.filter(i => i.id !== id);

    localStorage.setItem(keyRecipe, JSON.stringify(list));

    let recipe = document.getElementById(id);

    recipe.className += ' hide';

    setTimeout(() => {
        recipe.remove();
    }, 300);
}