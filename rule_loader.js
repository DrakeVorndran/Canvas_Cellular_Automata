var boardO = boardO || {};

set_listeners = function(){
    let elements = document.getElementsByClassName("changes");
    for(let i = 0; i < elements.length; i++){
        let current = elements[i]
        let changes = current.getElementsByClassName("change");
        for(let change_loop = 0; change_loop < changes.length; change_loop++){
            let change = changes[change_loop];
            let conditions = change.getElementsByClassName("condition");
            for(let condition_loop = 0; condition_loop < conditions.length; condition_loop++){
                let condition = conditions[condition_loop];
                let checks = condition.getElementsByClassName("checkbox");
                for(let check_loop = 0; check_loop < checks.length; check_loop++){
                    let check = checks[check_loop];
                    check.onchange = function(e){
                        //                        console.log("hi")
                        update_rules()
                    }
                }
                //            globalRules[i][condition_loop].conditions

            }
        }

    }
}

//inputs = document.getElementsByClassName("rule-input");
////console.log(inputs);
//for(let i = 0; i<inputs.length; i++){
////        console.log(inputs[i].id);
//}


update_rules = function(){
    let elements = document.getElementsByClassName("changes");
    for(let i = 0; i < elements.length; i++){
        let current = elements[i]
        let changes = current.getElementsByClassName("change");
        for(let change_loop = 0; change_loop < changes.length; change_loop++){
            let change = changes[change_loop];
            let conditions = change.getElementsByClassName("condition");
            for(let condition_loop = 0; condition_loop < conditions.length; condition_loop++){
                let condition = conditions[condition_loop];
                let checks = condition.getElementsByClassName("checkbox");
                let my_rule = []
                for(let check_loop = 0; check_loop < checks.length; check_loop++){
                    let check = checks[check_loop];
                    if(check.checked){
                        my_rule.push(Number(check.value));
                    }
                }
                //                console.log(i,change_loop,condition_loop,my_rule);
                globalRules[i][change_loop].conditions[condition_loop] = my_rule;
                //            globalRules[i][condition_loop].conditions

            }
        }

    }
}


updateHTML = function(){
    htmlString = `<ul>
`
    for(let rule_loop = 0; rule_loop<globalRules.length; rule_loop++){
        htmlString += `<li>

`
        htmlString += `
<label>cell color: </label>
<div class="rule-color" style="background: `+globalRules.colors[rule_loop]+`"></div>
<ul id="changes">

`

        rule = globalRules[rule_loop];
        //        console.log(rule);

        for(let change_loop = 0; change_loop<rule.length; change_loop++){
            htmlString += `<li>
<hr>
</li>
`
            htmlString += `<li class="change">
`
            htmlString += `<label class="changeto-label">change to: </label>
`
            htmlString += `<div class="changeto-color" style="background: `+globalRules.colors[change_loop]+`"></div>
<ul class="conditions">
`
            change = rule[change_loop];
            //            console.log(change)
            for(let x = 0; x < globalRules.length; x++){
                htmlString+=`<li class="condition">
<div class="conditions-color" style="background: `+globalRules.colors[x]+`"></div>
<div class="selector">
<p class="selector_text">0 1 2 3 4 5 6 7 8</p>`;
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
    htmlString+=`</ul>
`             
    console.log(htmlString)
    creator = document.getElementById("rule-creator");
    creator.innerHTML = htmlString;

}

add_element = function(){
    globalRules[globalRules.length] = []

    for(let i = 0; i<globalRules.length; i++){
        globalRules[i].push({changeto: globalRules.length, conditions:{}});
        globalRules[globalRules.length].push({change_to:i, conditions:{}});
    }
    globalRules[globalRules.length].push({change_to:globalRules.length, conditions:{}});

    globalRules.length++;
    updateHTML();
    set_listeners()
}