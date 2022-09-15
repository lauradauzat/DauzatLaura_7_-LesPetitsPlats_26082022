
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

//je n'arrive pas a catch all els  pour eviter de me repéter

// for ( let el of allEls) {
//     el.addEventListener('click', function(e) {
//         console.log('clickedallels');
//        add_elements(e);
//     });
// }

 



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

loadEventListenerToAddTagsOnClick();





function global_search() {
    const x = document.querySelectorAll('.card-txt');

    // let allEls = document.querySelectorAll('els');
    // let ingEls = document.querySelectorAll('.elIng'); 
    // let apEls = document.querySelectorAll('.elAp');
    // let ustEls = document.querySelectorAll('.elUst'); 



    console.log('x, ' + x.length);
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


    
    for (i = 0; i < x.length; i++) {  // montableau.foreach 
        //grab meta data of the card
        let metaApp = document.querySelectorAll(`#card${i+1} .appMeta`); 
        let metaAppArr = [...metaApp].map( app => app.textContent.toLowerCase().trimStart().trimEnd());
        let metaUst = document.querySelectorAll(`#card${i+1} .ustMeta`); 
        let metaUstArr = [...metaUst].map( ust => ust.textContent.toLowerCase().trimStart().trimEnd());
        let metaIng = document.querySelectorAll(`#card${i+1} .ingMeta`);
        let metaIngArr = [...metaIng].map( ing => ing.textContent.toLowerCase().trimStart().trimEnd());

      
          
        //console.log(metaIngArr);

        let bigsearch = false; 
        let tagsbigsearch = false; 

        //console.log('card: ', x[i].parentElement);
        

        if ( x[i].textContent.toLowerCase().includes(inputVal) ) {
            bigsearch = true;
           
        }
        else {
            bigsearch = false;               
        }

       

       // console.log('bigsearch' + bigsearch);


        // const containsTag =  (currentTag) =>  x[i].textContent.toLowerCase().includes(currentTag);

        // if (textTags.every(containsTag)) {
        //     tagsbigsearch = true; 
        //     //console.log('tagsbigsearch' + x[i].textContent );
            
        // }

         
        //   const containsIngTag =  (currentTag) =>  metaIngArr.includes(currentTag);

        // if (textTagsIng.every(containsIngTag)) {
        //     console.log('ingBool' + ingBool );
        //     //tagsbigsearch = true; 
        //     //console.log('tagsbigsearch' + x[i].textContent );
            
        // }
        //console.log(metaIngArr, metaAppArr, metaUstArr); 
    
        // let containsAllIngTags = metaIngArr.every(function() {
        //     return metaIngArr.includes(textTagsIng);
        // });

        //  let containsAllAppTags = metaAppArr.every(function() {
        //     return textTagsApp.includes(metaAppArr);
        // });

        //  let containsAllUstTags = metaUstArr.every(function() {
        //     return textTagsUst.includes(metaUstArr);
        // });
  

        let checker = (arr, target) => target.every(v => arr.includes(v));

        //console.log(x[i].textContent);
        // console.log(checker(metaIngArr, textTagsIng));
        // console.log(checker(metaAppArr, textTagsApp));
        // console.log(checker(metaUstArr, textTagsUst));

        if (checker(metaIngArr, textTagsIng) && checker(metaAppArr, textTagsApp) &&checker(metaUstArr, textTagsUst) ) {
            tagsbigsearch = true; 
            console.log(tagsbigsearch);
        }


   
       console.log(bigsearch + '&&' + tagsbigsearch) ;
       if (bigsearch && tagsbigsearch) {
        x[i].parentElement.classList.remove("hidden");
       } else {
        x[i].parentElement.classList.add("hidden");
       }

    





    }

    reloadCurrentTagsAvailable();
    grabCurrentTagsAndListenForDelete();
    

}

function filter_select(cat, thisInput) {

   console.log(cat);
    const x = document.querySelectorAll(cat);
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

    for (i = 0; i < x.length; i++) { 
        //console.log('card: ', x[i].parentElement);
   
        if (!x[i].textContent.toLowerCase().includes(inputVal)) {
            //console.log(x[i].textContent + 'non');
            x[i].style.display="none";
        }
        else {
            //console.log(x[i].textContent + 'oui');
            x[i].style.display="block";                 
        }
    }

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
    //reloadCurrentTagsAvailable();
    loadEventListenerToAddTagsOnClick();
    
}



function reloadCurrentTagsAvailable() {
    
    console.log('reload coucou');

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
    // je boucle sur les li 
    for( li of ingEls) {
        let liEl = li.textContent.toLowerCase()
            // si la li est PAS  dans la liste des éléments sur la page
        if (!readyToUseIngMetaOnPage.includes(liEl) ) {
              //display none
            li.classList.add("hidden");
        } else if (readyToUseIngMetaOnPage.includes(liEl) && li.classList.contains("hidden")) {
            li.classList.remove("hidden");
        }
    }

    for( li of apEls) {
        let liEl = li.textContent.toLowerCase()
            // si la li est PAS  dans la liste des éléments sur la page
        if (!readyToUseAppMetaOnPage.includes(liEl) ) {
              //display none
            li.classList.add("hidden");
        } else if (readyToUseAppMetaOnPage.includes(liEl) && li.classList.contains("hidden")) {
            li.classList.remove("hidden");
        }
    }

    for( li of ustEls) {
        let liEl = li.textContent.toLowerCase()
            // si la li est PAS  dans la liste des éléments sur la page
        if (!readyToUseUstMetaOnPage.includes(liEl) ) {
              //display none
            li.classList.add("hidden");
        }  else if (readyToUseUstMetaOnPage.includes(liEl) && li.classList.contains("hidden")) {
            li.classList.remove("hidden");
        }
    }
    
}
  