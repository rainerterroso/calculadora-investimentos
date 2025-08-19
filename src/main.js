import { generateReturnsArray } from "./calculateFee.js"

//Coletando as variáveis do formulário
let form = document.getElementById('mainForm')
let buttonClean = document.getElementById('buttonClean')

function renderProgression(event) {
    event.preventDefault()
    const initialAmount = Number(document.getElementById('initialAmount').value.replace(',', '.'))
    const aditionalAmount = Number(document.getElementById('aditionalAmount').value.replace(',', '.'))
    const timeHorizon = Number(document.getElementById('timeHorizon').value)
    const returnRate = Number(document.getElementById('returnRate').value.replace(',', '.'))
    const timeHorizonOption = document.getElementById('timeHorizonOption').value
    const returnRateOption = document.getElementById('returnRateOption').value
    const returnsArray = generateReturnsArray(
    initialAmount, 
    aditionalAmount, 
    timeHorizon, 
    timeHorizonOption,
    returnRate, 
    returnRateOption
    )
    console.log(returnsArray)
}

function validateInputs(event){
    let target = event.target
    let valueTarget = event.target.value.replace(',', '.')
    let targetParent = target.parentElement
    let targetGrandParent = targetParent.parentElement

    if(valueTarget === ''){
        return
    }
    
    if(isNaN(valueTarget) || Number(valueTarget) <=0){
        let queryError = targetParent.querySelector('.error')
        if(!queryError){
            let errorMessage = document.createElement('p')
            errorMessage.textContent = 'Este campo precisa ser um número maior que 0'
            errorMessage.classList.add('errorMessage')

            targetParent.classList.add('error')
            targetGrandParent.appendChild(errorMessage)
        }
    }

    else{
        targetParent.classList.remove('error')
        targetGrandParent.querySelector('.errorMessage').remove()
    }
    
}

function applyErrorMessage(){
    for(let formElement of form){
        if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')){
            formElement.addEventListener('blur', validateInputs)
        }
    }
}

function cleanInputs(){
    for(let formElement of form){
        if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')){
            formElement.value = ''
            formElement.parentElement.classList.remove('error')
            const errorMessage = formElement.parentElement.parentElement.querySelector('.errorMessage')
            if(errorMessage){
                errorMessage.remove()
            }
        }
        
    }
}

document.addEventListener("DOMContentLoaded", () => {
  applyErrorMessage();
  form.addEventListener('submit', renderProgression);
  buttonClean.addEventListener('click', cleanInputs);
});
