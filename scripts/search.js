
const input = document.getElementById('search'); 
const inputIng = document.getElementById('ingSearch'); 
const inputAp = document.getElementById('apSearch'); 
const inputUst = document.getElementById('ustSearch');
const allEls = document.querySelectorAll('els');
const ingEls = document.querySelectorAll('.elIng'); 
const apEls = document.querySelectorAll('.elAp');
const ustEls = document.querySelectorAll('.elUst'); 
const tagsCont = document.getElementById('tags-container');

let ingSelected = [];
let cleanIngSelected = [];
let cleanIngSelectedArray = [];
let apSelected = []; 
let cleanApSelected = [];
let cleanApSelectedArray = [];
let ustSelected = []; 
let cleanUstSelected = [];
let cleanUstSelectedArray = [];


input.addEventListener('input', global_search);

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





function global_search() {
    const x = document.querySelectorAll('.card-txt');

    //console.log('in global search func');
    let inputVal = document.getElementById('search').value
    inputVal = inputVal.toLowerCase();
    //console.log(inputVal);

    
    for (i = 0; i < x.length; i++) { 
        //console.log('card: ', x[i].parentElement);
   
        if (!x[i].textContent.toLowerCase().includes(inputVal)) {
            //console.log(x[i].textContent + 'non');
            x[i].parentElement.style.display="none";
        }
        else {
            //console.log(x[i].textContent + 'oui');
            x[i].parentElement.style.display="block";                 
        }
    }
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
                reloadTags();
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
                reloadTags();
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
                reloadTags();
            }
        })
    }



}