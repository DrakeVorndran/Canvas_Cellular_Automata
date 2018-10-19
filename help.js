const l = [document.getElementById("111"),document.getElementById("112"),document.getElementById("121"),document.getElementById("122"),document.getElementById("211"),document.getElementById("212"),document.getElementById("221"),document.getElementById("222")];

for(let i in l){
    checks = l[i].getElementsByClassName("checkbox");
    for(let c in checks){
        if(Number(c)!=NaN){
            checks[c].onchange = (e) => {
                updateHTML();
            }
        }
    }
}

updateHTML = () =>{
    const strs = []
    for(let i in l){
        let count = tally(l[i]);
        let span = document.getElementById(i);
        if(i === "0"){
            if(count === ""){
                span.innerHTML = "A white cell will never change to a white cell";
            }
            else{
                span.innerHTML = "A white cell will change to a white cell if it has "+count+" white neighbors";

            }
        }
        else if(i === "1"){
            if(count === ""){
                span.innerHTML = "";
            }
            else{
                span.innerHTML = "or if it has "+count+" black neighbors";

            }
        }

        else if(i === "2"){
            if(count === ""){
                span.innerHTML = "A white cell will never change to a black cell";
            }
            else{
                span.innerHTML = "A white cell will change to a black cell if it has "+count+" white neighbors";

            }
        }
        else if(i === "3"){
            if(count === ""){
                span.innerHTML = "";
            }
            else{
                span.innerHTML = "or if it has "+count+" black neighbors";

            }
        }

        if(i === "4"){
            if(count === ""){
                span.innerHTML = "A black cell will never change to a white cell";
            }
            else{
                span.innerHTML = "A black cell will change to a white cell if it has "+count+" white neighbors";

            }
        }
        else if(i === "5"){
            if(count === ""){
                span.innerHTML = "";
            }
            else{
                span.innerHTML = "or if it has "+count+" black neighbors";

            }
        }

        else if(i === "6"){
            if(count === ""){
                span.innerHTML = "A black cell will never change to a black cell";
            }
            else{
                span.innerHTML = "A black cell will change to a black cell if it has "+count+" white neighbors";

            }
        }
        else if(i === "7"){
            if(count === ""){
                span.innerHTML = "";
            }
            else{
                span.innerHTML = "or if it has "+count+" black neighbors";

            }
        }
    }

}

tally = (element) => {
    checks = element.getElementsByClassName("checkbox");
    let newString = "";
    for(let c in checks){
        console.log(checks[c].checked);
        if(checks[c].checked){
            newString+=checks[c].value;
            newString+=",";
        }
    }
    return(newString.slice(0,-1));
}