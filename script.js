const baseUrl= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const button = document.querySelector("form button");
const dropdown =document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

const msg = document.querySelector(".msg");

for (let select of dropdown){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value= currcode;
        if(select.name === "from" && currcode === "USD" ){
            newoption.selected= "selected"
        }
        else if(select.name === "to" && currcode === "INR" ){
            newoption.selected= "selected"
        }

        select.append(newoption);
    }
    select.addEventListener("change" , (e)=>{
        updateFlag(e.target)
    })
}
const updateExchangeRate= async ()=>{
    let amount = document.querySelector(" .amount input");
    let amountValue = amount.value;
    if(amountValue=== "" || amountValue<1){
        amountValue = 1;
        amount.value ="1"
    }

    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmount = amountValue * rate;

    msg.innerText =` ${amountValue} ${fromCurr.value} =  ${finalAmount} ${toCurr.value}`
}

const  updateFlag =(element)=>{
    let currCode= element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


button.addEventListener("click",async (e)=>{
    e.preventDefault();
    updateExchangeRate();
} )
window.addEventListener("load", ()=>{
    updateExchangeRate();
})