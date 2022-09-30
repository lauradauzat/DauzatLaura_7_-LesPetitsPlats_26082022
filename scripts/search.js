
const input = document.getElementById('search'); 
const inputIng = document.getElementById('ingSearch'); 
const inputAp = document.getElementById('apSearch'); 
const inputUst = document.getElementById('ustSearch');
const tagsCont = document.getElementById('tags-container');
const nothingToDiplay = document.getElementById('nothing-to-display'); 

let allEls = document.querySelectorAll('els');
let ingEls = document.querySelectorAll('.elIng'); 
let apEls = document.querySelectorAll('.elAp');
let ustEls = document.querySelectorAll('.elUst'); 

let ingSelected = [];
let cleanIngSelected = [];
let cleanIngSelectedArray = [];
let apSelected = []; 
let cleanApSelected = [];
let cleanApSelectedArray = [];
let ustSelected = []; 
let cleanUstSelected = [];
let cleanUstSelectedArray = [];

//currently visible ap/ust/ing... Array 
let cvaArr = [];
let cvuArr = [];
let cviArr = []; 

// listen barre de recherche principale et trigger global search si 0 ou +de 2 chars
input.addEventListener('input',  function(){
   if(input.value.length > 2) {
    global_search();
   }
   if(input.value.length == 0) {
    global_search();
   }
});


//listen les inputs des sélects pour filter les tags
inputIng.addEventListener('input', function() {
    filter_select('.elIng:not(.hidden)', inputIng);
});
inputAp.addEventListener('input', function() {
    filter_select('.elAp:not(.hidden)', inputAp );
});
inputUst.addEventListener('input', function() {
    filter_select('.elUst:not(.hidden)', inputUst);
});

//add eventlistenner sur chacun des tags dans les selects
loadEventListenerToAddTagsOnClick();

function loadEventListenerToAddTagsOnClick() {
     ingEls = document.querySelectorAll('.elIng'); 
     apEls = document.querySelectorAll('.elAp');
     ustEls = document.querySelectorAll('.elUst'); 

    for ( let el of ingEls) {
        el.addEventListener('click', function(e) {
           add_elements(e);
        });
    }
    
    for ( let el of apEls ) {
        el.addEventListener('click', function(e) {
            console.log('clicked');
            add_elements(e);
         });
    }
    
    for (let el of ustEls) {
        el.addEventListener('click', function(e) {
            console.log('clicked');
            add_elements(e);
         });
    }

}

//algo de recherche 
function global_search() {
    const cards = document.querySelectorAll('.card-txt');

    //console.log('x, ' + cards.length);
    //console.log('in global search func');
    let inputVal = document.getElementById('search').value;
    inputVal = inputVal.toLowerCase();
    //console.log(inputVal);

    //récupère les tags Ing sélectionné
    let tagsIng = document.querySelectorAll(".tag.ing"); 
    var tagIngArr = [...tagsIng];
    const textTagsIng = tagIngArr.map( tag => tag.textContent.toLowerCase());

    let tagsApp = document.querySelectorAll(".tag.ap"); 
    var tagAppArr = [...tagsApp];
    const textTagsApp = tagAppArr.map( tag => tag.textContent.toLowerCase());

    let tagsUst = document.querySelectorAll(".tag.ust"); 
    var tagUstArr = [...tagsUst];
    const textTagsUst = tagUstArr.map( tag => tag.textContent.toLowerCase());
   console.log(textTagsIng, textTagsApp, textTagsUst);

    cards.forEach(function (card, i) {
            //grab meta data of the card
            let metaApp = document.querySelectorAll(`#card${i+1} .appMeta`); 
            let metaAppArr = [...metaApp].map( app => app.textContent.toLowerCase().trimStart().trimEnd());
            let metaUst = document.querySelectorAll(`#card${i+1} .ustMeta`); 
            let metaUstArr = [...metaUst].map( ust => ust.textContent.toLowerCase().trimStart().trimEnd());
            let metaIng = document.querySelectorAll(`#card${i+1} .ingMeta`);
            let metaIngArr = [...metaIng].map( ing => ing.textContent.toLowerCase().trimStart().trimEnd());

            //set validation value to false
            let bigsearch = false; 
            let tagsbigsearch = false; 


            if ( card.textContent.toLowerCase().includes(inputVal) ) {
                bigsearch = true;
            
            }
            else {
                bigsearch = false;               
            }

            //est ce que tous les tags sélectionné sont présent dans les métadonnées de la carte
            let checker = (arr, target) => target.every(v => arr.includes(v));
    
            if (checker(metaIngArr, textTagsIng) && checker(metaAppArr, textTagsApp) &&checker(metaUstArr, textTagsUst) ) {
                tagsbigsearch = true; 
                console.log(tagsbigsearch);
            }

            console.log(bigsearch + '&&' + tagsbigsearch) ;
            if (bigsearch && tagsbigsearch) {
             card.parentElement.classList.remove("hidden");
            } else {
             card.parentElement.classList.add("hidden");
            }
     


    });
    

    reloadCurrentTagsAvailable();
    //  grabCurrentTagsAndListenForDelete();
    displayMessageIfNoRecipeAvailable();




}


//ouvre et ferme les container des selects en fonction de l'input 
function filter_select(cat, thisInput) {

   //console.log(cat);
    const tagsSelectable = document.querySelectorAll(cat);
    let inputVal = thisInput.value
    //console.log(inputVal.length + cat + thisInput);

    if (inputVal.length != 0 ) {

        switch (cat) {
            case '.elIng:not(.hidden)' :
                igSelect.setAttribute("data-state", "open");
                break;
            case '.elAp:not(.hidden)' :
                apSelect.setAttribute("data-state", "open");
                break;
            case '.elUst:not(.hidden)' :
                ustSelect.setAttribute("data-state", "open");
                break;   
            default:
                console.log(`Sorry, we are out of ${cat}.`);        
        }
    }

    //refermer lorsque l'on efface le texte
    if (inputVal.length == 0 ) {

        switch (cat) {
            case '.elIng:not(.hidden)' :
                igSelect.setAttribute("data-state", "collapsed");

                break;
            case '.elAp:not(.hidden)' :
                apSelect.setAttribute("data-state", "collapsed");

                break;
            case '.elUst:not(.hidden)' :
                ustSelect.setAttribute("data-state", "collapsed");

                break;   
            default:
                console.log(`Sorry, we are out of ${cat}.`);        
        }
    }
    
    inputVal = inputVal.toLowerCase();

    //filtre les tags  présent  dans les selects sur le DOM en fonction du contenu de l'input
    tagsSelectable.forEach( tag =>  {
        if (!tag.textContent.toLowerCase().includes(inputVal)) {
            tag.classList.add("hidden");
        }
        else {

            if (tag.classList.contains('hidden')) {
                tag.classList.remove("hidden");    
            }
                     
        }
    })

}

//ajoute un élément dans la liste des éléments sélectionnés
function add_elements(e) {
    console.log(e.target.className); 
    if(e.target.className == "elIng" ) {
        ingSelected.push(e.target.textContent);
        //console.log('true');
        ingSelected.forEach((element) => {
            if (!cleanIngSelected.includes(element)) {
                cleanIngSelected.push(element);
                cleanIngSelectedArray = Array.from(cleanIngSelected); 
                   //je crée la div a partir du dernier element de l'array
                const ingSelectedCardDOM = recipesFactory((cleanIngSelectedArray.slice(-1))).getTagsCardDOM("ing");
                tagsCont.appendChild(ingSelectedCardDOM); 
                //deleteTags(e.target.className);
                
                global_search();
            }
        })
        //console.log(cleanIngSelectedArray);
    }

    else if (e.target.className == "elAp") {
        apSelected.push(e.target.textContent);
        //console.log('true');
        apSelected.forEach((element) => {

            if (!cleanApSelected.includes(element)) {
                cleanApSelected.push(element);
                cleanApSelectedArray = Array.from(cleanApSelected); 
                   //je crée la div a partir du dernier element de l'array
                const SelectedCardDOM = recipesFactory((cleanApSelectedArray.slice(-1))).getTagsCardDOM("ap");
                tagsCont.appendChild(SelectedCardDOM); 
                //deleteTags(e.target.className);
                global_search();
            }
        })
    }

    else if (e.target.className == "elUst") {
        ustSelected.push(e.target.textContent);
        //console.log('true');
        ustSelected.forEach((element) => {

            if (!cleanUstSelected.includes(element)) {
                cleanUstSelected.push(element);
                cleanUstSelectedArray = Array.from(cleanUstSelected); 
                   //je crée la div a partir du dernier element de l'array
                const SelectedCardDOM = recipesFactory((cleanUstSelectedArray.slice(-1))).getTagsCardDOM("ust");
                tagsCont.appendChild(SelectedCardDOM); 
                //deleteTags(e.target.className);
                global_search();
            }
        })
    }

    grabCurrentTagsAndListenForDelete();
    loadEventListenerToAddTagsOnClick();
    
}

//loop dans les tags et n'affiche que ceux qui existent dans les cartes actuellement visible sur le DOM
function reloadCurrentTagsAvailable() {
    
    //grab all metatag from elements présent on the page
        const IngMetaOnPage = document.querySelectorAll(".card:not(.hidden) .ingMeta");
        const AppMetaOnPage = document.querySelectorAll(".card:not(.hidden) .appMeta");
        const UstMetaOnPage = document.querySelectorAll(".card:not(.hidden) .ustMeta");

        //to array
        const IngMetaOnPageArr = [...IngMetaOnPage]; 
        const AppMetaOnPageArr = [...AppMetaOnPage]; 
        const UstMetaOnPageArr = [...UstMetaOnPage]; 

        //tous au même format (trim et lowercase)
        const IngMetaOnPageArrMapped = IngMetaOnPageArr.map( li => li.textContent.toLowerCase().trimStart().trimEnd()); 
        const AppMetaOnPageArrMapped = AppMetaOnPageArr.map( li => li.textContent.toLowerCase().trimStart().trimEnd()); 
        const UstMetaOnPageArrMapped = UstMetaOnPageArr.map( li => li.textContent.toLowerCase().trimStart().trimEnd()); 


        //supprimer les doublons
        const readyToUseIngMetaOnPage =  Array.from(new Set(IngMetaOnPageArrMapped));
        const readyToUseAppMetaOnPage =  Array.from(new Set(AppMetaOnPageArrMapped));
        const readyToUseUstMetaOnPage =  Array.from(new Set(UstMetaOnPageArrMapped));
        //console.log('===========' + readyToUseIngMetaOnPage); 


        //console.log(readyToUseIngMetaOnPage , readyToUseAppMetaOnPage, readyToUseUstMetaOnPage);

        //cache les li dans les selects si ils ne sont plus dispo dans les méta des cartes présente
        function displayOnlyTagsExistingInCurrentCards(cat, meta) {
            //prendre la liste des tags dans les selects 
            cat.forEach( li => {
                // je boucle sur les li 
                let liEl = li.textContent.toLowerCase()
                // si la li est PAS  dans la liste des éléments sur la page
                if (!meta.includes(liEl) ) {
                    //display none
                    li.classList.add("hidden");
                } else if (meta.includes(liEl) && li.classList.contains("hidden")) {
                    li.classList.remove("hidden");
                }
            })
        }    

        displayOnlyTagsExistingInCurrentCards(ingEls, readyToUseIngMetaOnPage);
        displayOnlyTagsExistingInCurrentCards(apEls, readyToUseAppMetaOnPage); 
        displayOnlyTagsExistingInCurrentCards(ustEls, readyToUseUstMetaOnPage);
    
}
  
//affiche message si pas de recette sur la carte
function displayMessageIfNoRecipeAvailable() {
    if ( document.querySelectorAll(".card:not(.hidden)").length === 0 ) {
        console.log('page vide');
        if (nothingToDiplay.classList.contains('hidden') ) {
            nothingToDiplay.classList.remove('hidden'); 
        }
    } else {
        console.log('Il y a encore des éléments sur la page ');
        if (!nothingToDiplay.classList.contains('hidden')){
            nothingToDiplay.classList.add('hidden');
        }  
    }
}
