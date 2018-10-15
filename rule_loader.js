var boardO = boardO || {};



//inputs = document.getElementsByClassName("rule-input");
////console.log(inputs);
//for(let i = 0; i<inputs.length; i++){
////        console.log(inputs[i].id);
//}


update_rules = function(){
    let elements = document.getElementsByClassName("changes");
    for(let i = 0; i < elements.length; i++){
        let current = elements[i]
        let conditions = current.getElementsByClassName("condition");
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
            console.log(i,condition_loop,my_rule);
        }
        
    }
}

add_element = function(){
    console.log("I still need to actually make this");
}