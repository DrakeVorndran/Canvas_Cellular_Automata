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

add_element = function(){
    globalRules[globalRules.length] = []

    for(let i = 0; i<globalRules.length; i++){
        globalRules[i].push({changeto: globalRules.length, conditions:{}});
        globalRules[globalRules.length].push({change_to:i, conditions:{}});
    }
    globalRules[globalRules.length].push({change_to:globalRules.length, conditions:{}});

    globalRules.length++;
}