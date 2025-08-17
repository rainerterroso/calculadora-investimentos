import { generateReturnsArray } from "./calculateFee.js"

//Coletando as variáveis do formulário
let form = document.getElementById('mainForm')

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

// function validateInitialAmount(){
//     const initialAmountValue = Number(document.getElementById('initialAmount').value)
//     const initialAmountDiv = Number(document.getElementById('initialAmountDiv').value)
//     if(initialAmountValue<=0){
//         initialAmountDiv.classList.add('error')
//     }
// }

function validateInputs(event){
    let target = event.target
    let valueTarget = event.target.value.replace(',', '.')
    let targetParent = target.parentElement
    let targetGrandParent = targetParent.parentElement

    if(valueTarget === ''){
        return
    }
    
    if(isNaN(valueTarget) || Number(valueTarget) <=0){
        let queryError = document.querySelector('.error')
        if(!queryError){
            let errorMessage = document.createElement('p')
            errorMessage.textContent = 'Este campo precisa ser um número maior que 0'
            errorMessage.classList.add('text-red-500')

            targetParent.classList.add('error')
            targetGrandParent.appendChild(errorMessage)
        }
    }

    else{
        let queryError = document.querySelector('.error')
        if(queryError){
            queryError.remove()
            targetParent.classList.remove('error')
        }
    }
    
}

function applyErrorMessage(){
    for(let formElement of form){
        if(formElement.tagName === 'INPUT' && formElement.hasAttribute('name')){
            formElement.addEventListener('blur', validateInputs)
        }
    }
}

applyErrorMessage()
form.addEventListener('submit', renderProgression)