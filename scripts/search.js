
const input = document.getElementById('search'); 
const inputIng = document.getElementById('ingSearch'); 
const inputAp = document.getElementById('apSearch'); 
const inputUst = document.getElementById('ustSearch');
const tagsCont = document.getElementById('tags-container');

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

input.addEventListener('input',  function(){
   if(input.value.length > 2) {
    global_search();
   }
   if(input.value.length == 0) {
    global_search();
   }
  });

inputIng.addEventListener('input', function() {
    filter_select('.elIng', inputIng);
});
inputAp.addEventListener('input', function() {
    console.log('coucouuuuu');
    filter_select('.elAp', inputAp );
});
inputUst.addEventListener('input', function() {
    filter_select('.elUst', inputUst);
});

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

function global_search() {
    const cards = document.querySelectorAll('.card-txt');

    console.log('x, ' + cards.length);
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
    grabCurrentTagsAndListenForDelete();
    

}

function filter_select(cat, thisInput) {

   console.log(cat);
    const tagsSelectable = document.querySelectorAll(cat);
    let inputVal = thisInput.value
    console.log(inputVal.length + cat + thisInput);

    if (inputVal.length != 0 ) {

        switch (cat) {
            case '.elIng' :
                igSelect.setAttribute("data-state", "open");
                break;
            case '.elAp' :
                apSelect.setAttribute("data-state", "open");
                break;
            case '.elUst' :
                ustSelect.setAttribute("data-state", "open");
                break;   
            default:
                console.log(`Sorry, we are out of ${cat}.`);        
        }
    }

    if (inputVal.length == 0 ) {

        switch (cat) {
            case '.elIng' :
                igSelect.setAttribute("data-state", "collapsed");
                break;
            case '.elAp' :
                apSelect.setAttribute("data-state", "collapsed");
                break;
            case '.elUst' :
                ustSelect.setAttribute("data-state", "collapsed");
                break;   
            default:
                console.log(`Sorry, we are out of ${cat}.`);        
        }
    }
    
    inputVal = inputVal.toLowerCase();

    // for (i = 0; i < x.length; i++) { 
    //     //console.log('card: ', x[i].parentElement);
   
    //     if (!x[i].textContent.toLowerCase().includes(inputVal)) {
    //         //console.log(x[i].textContent + 'non');
    //         x[i].style.display="none";
    //     }
    //     else {
    //         //console.log(x[i].textContent + 'oui');
    //         x[i].style.display="block";                 
    //     }
    // }

    tagsSelectable.forEach( tag =>  {
        if (!tag.textContent.toLowerCase().includes(inputVal)) {
            //console.log(x[i].textContent + 'non');
            tag.style.display="none";
        }
        else {
            //console.log(x[i].textContent + 'oui');
            tag.style.display="block";                 
        }
    })

}

function add_elements(e) {
    console.log(e.target.className); 
    if(e.target.className == "elIng" ) {
        ingSelected.push(e.target.textContent);
        console.log('true');
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
        console.log('true');
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
        console.log('true');
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

function reloadCurrentTagsAvailable() {
    
    //grab all elements présent on the page
        const IngMetaOnPage = document.querySelectorAll(".card:not(.hidden) .ingMeta");
        const AppMetaOnPage = document.querySelectorAll(".card:not(.hidden) .appMeta");
        const UstMetaOnPage = document.querySelectorAll(".card:not(.hidden) .ustMeta");

        const IngMetaOnPageArr = [...IngMetaOnPage]; 
        const AppMetaOnPageArr = [...AppMetaOnPage]; 
        const UstMetaOnPageArr = [...UstMetaOnPage]; 

        const IngMetaOnPageArrMapped = IngMetaOnPageArr.map( li => li.textContent.toLowerCase().trimStart().trimEnd()); 
        const AppMetaOnPageArrMapped = AppMetaOnPageArr.map( li => li.textContent.toLowerCase().trimStart().trimEnd()); 
        const UstMetaOnPageArrMapped = UstMetaOnPageArr.map( li => li.textContent.toLowerCase().trimStart().trimEnd()); 


        const readyToUseIngMetaOnPage =  Array.from(new Set(IngMetaOnPageArrMapped));
        const readyToUseAppMetaOnPage =  Array.from(new Set(AppMetaOnPageArrMapped));
        const readyToUseUstMetaOnPage =  Array.from(new Set(UstMetaOnPageArrMapped));


        console.log(readyToUseIngMetaOnPage , readyToUseAppMetaOnPage, readyToUseUstMetaOnPage);

    //prendre la liste des tags dans les selects 
    function displayOnlyTagsExistingInCurrentCards(cat, meta) {
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
  