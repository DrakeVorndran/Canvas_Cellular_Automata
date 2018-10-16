var boardO = boardO || {};

setListeners = function(){
    let elements = document.getElementsByClassName("changes");
    for(let i = 0; i < elements.length; i++){
        //        console.log(elements[i])
        let current = elements[i]
        let changes = current.getElementsByClassName("change");
        for(let changeLoop = 0; changeLoop < changes.length; changeLoop++){
            let change = changes[changeLoop];
            let conditions = change.getElementsByClassName("condition");
            for(let conditionLoop = 0; conditionLoop < conditions.length; conditionLoop++){
                let condition = conditions[conditionLoop];
                let checks = condition.getElementsByClassName("checkbox");
                for(let checkLoop = 0; checkLoop < checks.length; checkLoop++){
                    let check = checks[checkLoop];
                    check.onchange = function(e){
                        //                        console.log("hi")
                        updateRules()
                    }
                }
                //            globalRules[i][conditionLoop].conditions

            }
        }

    }
}

//inputs = document.getElementsByClassName("rule-input");
////console.log(inputs);
//for(let i = 0; i<inputs.length; i++){
////        console.log(inputs[i].id);
//}


updateRules = function(){
    let elements = document.getElementsByClassName("changes");
    //    console.log(elements);
    for(let i = 0; i < elements.length; i++){
        let current = elements[i]
        let changes = current.getElementsByClassName("change");
        for(let changeLoop = 0; changeLoop < changes.length; changeLoop++){
            let change = changes[changeLoop];
            let conditions = change.getElementsByClassName("condition");
            for(let conditionLoop = 0; conditionLoop < conditions.length; conditionLoop++){
                let condition = conditions[conditionLoop];
                let checks = condition.getElementsByClassName("checkbox");
                let myRule = []
                for(let checkLoop = 0; checkLoop < checks.length; checkLoop++){
                    let check = checks[checkLoop];
                    if(check.checked){
                        myRule.push(Number(check.value));
                        //                        console.log(i, changeLoop, checkLoop, myRule)
                    }
                }
                //                console.log(i,changeLoop,conditionLoop,myRule);
                //                console.log(i,changeLoop,conditionLoop,myRule)
                globalRules[i][changeLoop].conditions[conditionLoop] = myRule;
                //            globalRules[i][conditionLoop].conditions

            }
        }

    }
}


updateHTML = function(){
    htmlString = `<ul>
`
    for(let ruleLoop = 0; ruleLoop<globalRules.length; ruleLoop++){
        htmlString += `<li>

`
        htmlString += `
<label>cell color: </label>
<div class="rule-color" style="background: `+globalRules.colors[ruleLoop]+`"></div>
<ul class="changes">

`

        rule = globalRules[ruleLoop];
        //        console.log(rule);

        for(let changeLoop = 0; changeLoop<rule.length; changeLoop++){
            htmlString += `<li>
<hr>
</li>
`
            htmlString += `<li class="change">
`
            htmlString += `<label class="changeto-label">change to: </label>
`
            htmlString += `<div class="changeto-color" style="background: `+globalRules.colors[changeLoop]+`"></div>
<ul class="conditions">
`
            change = rule[changeLoop];
            //            console.log(change)
            for(let x = 0; x < globalRules.length; x++){
                htmlString+=`<li class="condition">
<div class="conditions-color" style="background: `+globalRules.colors[x]+`"></div>
<div class="selector">
<p class="selector-text">0 1 2 3 4 5 6 7 8</p>`;
                for(let y = 0; y < 9; y++){
                    htmlString+=`<input type="checkbox" value="`+y+`" class="checkbox"`
                    if(x in change.conditions){
                        if(change.conditions[x].includes(y)){
                            htmlString+=` checked `
                        }

                    }
                    htmlString+=`>`

                }
                htmlString+=`</div>`;
            }
            //            console.log(change);

            htmlString+=`</ul></li>`
        }
        htmlString += `</ul>
</li>
`

    }
    htmlString+=`<li>
<button id="add-element" onclick="addElement()" >+</button>
</li>`
    htmlString+=`</ul>
`             
    //    console.log(htmlString)
    creator = document.getElementById("rule-creator");
    creator.innerHTML = htmlString;
    setListeners();

}

randomColor = function(){
    str = "#";
    l = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f"];
    for(let x = 0; x < 6; x++){
        str+=l[parseInt(Math.random()*l.length)];
    }
    return str;
}

addElement = function(){
    globalRules[globalRules.length] = []
    for(let i = 0; i<globalRules.length; i++){
        globalRules[i].push({changeTo: globalRules.length, conditions:{}});
        globalRules[globalRules.length].push({changeTo:i, conditions:{}});
    }
    globalRules[globalRules.length].push({changeTo:globalRules.length, conditions:{}});
    globalRules.length++;
    if(globalRules.length > globalRules.colors.length){
        globalRules.colors.push(randomColor());
    }

    updateHTML();
}


removeElement = function(element){
    for(let ruleLoop = element; ruleLoop<globalRules.length-1; ruleLoop++){
        globalRules[ruleLoop] = globalRules[ruleLoop+1];
    }
    globalRules.length--;
    globalRules.colors.splice(element,1);
    delete globalRules[globalRules.length];
}


