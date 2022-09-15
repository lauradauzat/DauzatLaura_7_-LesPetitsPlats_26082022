
//fonction à implémenter le jour ou il y aura un vrai back et non une liste .js 
// async function getRecipes() {

//     let recipes = [];  

//     await fetch("./backend/recipes.js")
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(function(error) {
//         console.log(error);
//       });  
//     return {
//       recipes,
//     };
// }

// getRecipes(); 

let IngredientsList = [];
let cleanIngList = [];
let applianceList = []; 
let cleanApplianceList = []; 
let cleanApplianceListArray  = [];
let UstensilList = []; 
let cleanUstensilList = []; 

const cardContainer = document.getElementById('card-container'); 
const ingSelectContainer = document.getElementById('ingSelectContainer'); 
const apSelectContainer = document.getElementById('apSelectContainer');
const ustSelectContainer = document.getElementById('ustSelectContainer'); 
const igArrow = document.getElementById("arrow-up");
const igSelect = document.getElementById("ig-select"); 
const apArrow = document.getElementById('arrow-ap');
const apSelect = document.getElementById('ap-select');
const ustArrow = document.getElementById('arrow-ust'); 
const ustSelect = document.getElementById('ust-select'); 






async function displayData(recipes) {

  const recipesArr = [...recipes]
  for ( let recipe of recipesArr) {
    for (ingredient of recipe.ingredients) {
      IngredientsList.push(ingredient.ingredient); 
    }

    applianceList.push(recipe.appliance); 
    UstensilList.push(...recipe.ustensils);
   
    const recipeModel = recipesFactory(recipe); 
    const recipeCardDOM = recipeModel.getRecipeCardDOM(); 
    cardContainer.appendChild(recipeCardDOM); 
  }
}



function init() {
  displayData(recipes); 
  createIngredientList();
  createApplianceList();
  createUstensilList();
}

init(); 


function createIngredientList() {
  cleanIngList = [...new Set(IngredientsList)];
  cleanIngListArray = Array.from(cleanIngList)

}

//print divs for Ingredients Select

for (const ing of cleanIngListArray) {
  const ingSelectCardDOM = recipesFactory(ing).getingSelectCardDOM();
  ingSelectContainer.appendChild(ingSelectCardDOM); 
}


function createApplianceList() {
 cleanApplianceList = [...new Set(applianceList)];
 cleanApplianceListArray = Array.from(cleanApplianceList); 
}

for (const app of cleanApplianceListArray) {
  const appSelectCardDOM = recipesFactory(app).getAppSelectCardDOM();
  apSelectContainer.appendChild(appSelectCardDOM); 
}


function createUstensilList()  {
  cleanUstensilList = [new Set(UstensilList)]; 
  cleanUstensilList = cleanUstensilList[0];
  //console.log(cleanUstensilList);
}

for (const ust of cleanUstensilList) {
  const ustSelectDOM = recipesFactory(ust).getUstSelectCardDOM(); 
  ustSelectContainer.appendChild(ustSelectDOM)
}




//ing select - handle click on arrow
igArrow.addEventListener('click', function() {
  handleOpenCloseIng();
});

//ap select - handle click on arrow
apArrow.addEventListener('click', function() {
  handleOpenCloseAp();
});

ustArrow.addEventListener('click', function() {
  handleOpenCloseUst();
})

function handleOpenCloseIng() {
  const state = igSelect.getAttribute('data-state');
  if (state == 'collapsed') {
    igSelect.setAttribute("data-state", "open");
  } else {
    igSelect.setAttribute("data-state", "collapsed");
  }
  console.log(state);
}

function handleOpenCloseAp() {
  const state = apSelect.getAttribute('data-state');
  if (state == 'collapsed') {
    apSelect.setAttribute("data-state", "open");
  } else {
    apSelect.setAttribute("data-state", "collapsed");
  }
  console.log(state);
}

function handleOpenCloseUst() {
  const state = ustSelect.getAttribute('data-state');
  if (state == 'collapsed') {
    ustSelect.setAttribute("data-state", "open");
  } else {
    ustSelect.setAttribute("data-state", "collapsed");
  }
  console.log(state);
}





function grabCurrentTagsAndListenForDelete(){
  let currentTags = document.querySelectorAll("div.tag"); 

  for (const tag of currentTags) {
      tag.addEventListener('click', function(e) {
        //logic to act depeding on if the click is made on the x img or directly on the div
        if (e.target.className != '') {
          console.log('1');
            e.target.remove();
         } else if (e.target.className == '') {
            console.log('2');
            e.target.parentElement.remove();
         }
         global_search();
         reloadCurrentTagsAvailable();

      } )
  }
}




