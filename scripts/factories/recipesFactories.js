function recipesFactory(recipe) {
    function getRecipeCardDOM() {
        const card = document.createElement( 'div' );
        card.setAttribute('id',`card${recipe.id}`);
        card.setAttribute('class', "card");
        const cardImg = document.createElement('div'); 
        cardImg.setAttribute('class', 'card-img'); 
        card.appendChild(cardImg); 
        const cardTxt = document.createElement('div'); 
        cardTxt.setAttribute('class', 'card-txt'); 
        card.appendChild(cardTxt); 
        const upCard = document.createElement('div'); 
        upCard.setAttribute('class', 'up-card-txt'); 
        upCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <div  class="timing-card">
                <img src="assets/time.png"></img>
                <p>${recipe.time} min </p>
            </div> 
        `;
        cardTxt.appendChild(upCard); 

        const downCard = document.createElement('div'); 
        downCard.setAttribute('class', 'down-card-txt'); 
        cardTxt.appendChild(downCard); 
        
        const ingDiv = document.createElement('div'); 
        ingDiv.setAttribute('class', 'ingredients-'); 
        downCard.appendChild(ingDiv); 

        const uldiv = document.createElement('ul'); 
        uldiv.setAttribute('id', `ing-ul${recipe.id}`); 
        ingDiv.appendChild(uldiv); 

        
        recipe.ingredients.forEach((i) => {
            if (i.ingredient && i.quantity && i.unit) {
                uldiv.innerHTML += `<li> <b> ${i.ingredient} </b> : ${i.quantity} ${i.unit}</li>`;
                }
            else if (i.ingredient && i.quantity) {
                 uldiv.innerHTML += `<li> <b> ${i.ingredient} </b> : ${i.quantity} </li>`;
            }
            else if (i.ingredient && i.quantity) {
                uldiv.innerHTML += `<li> <b> ${i.ingredient} </b> : ${i.quantity} </li>`;
            }
            else 
            {
                uldiv.innerHTML += `<li> <b> ${i.ingredient} </b> </li>`;
             }
        
        });   

        const descDiv = document.createElement('div'); 
        descDiv.setAttribute('class', 'desc'); 
        descDiv.innerHTML = `   
            <p>
            ${recipe.description}
            </p>
        `; 
        downCard.appendChild(descDiv); 

        const meta = document.createElement('div'); 
        meta.setAttribute('class', 'meta'); 

        const ulmeta = document.createElement('ul'); 
        meta.appendChild(ulmeta); 

        
        recipe.ingredients.forEach((i) => {
            ulmeta.innerHTML += `<li class="ingMeta">   ${i.ingredient} </li>`;
        });   

        
        ulmeta.innerHTML += `<li class="appMeta">  ${recipe.appliance} </li>`;

        recipe.ustensils.forEach((i) => {
            ulmeta.innerHTML += `<li class="ustMeta">  ${i} </li>`;
        });   


        card.appendChild(meta);



        return card; 
  
    }

    function getingSelectCardDOM(){
        const el = document.createElement('div'); 
        el.setAttribute('class', 'elIng');
        el.innerHTML = recipe;
        return el; 
    }

    function getAppSelectCardDOM(){
        const el = document.createElement('div'); 
        el.setAttribute('class', 'elAp');
        el.innerHTML = recipe
        return el; 
    }

    function getUstSelectCardDOM() {
        const el = document.createElement('div'); 
        el.setAttribute('class', 'elUst')
        el.innerHTML = recipe
        return el;
    }

    function getTagsCardDOM(type) {
        let img = document.createElement('img')
        img.src = "assets/x.png"
        const tag = document.createElement('div'); 
        tag.setAttribute('class', `tag ${type}`); 
        tag.textContent = recipe;
        tag.appendChild(img); 
        return tag;
    }

 


    return {getRecipeCardDOM, getingSelectCardDOM, getAppSelectCardDOM, getUstSelectCardDOM, getTagsCardDOM }
}