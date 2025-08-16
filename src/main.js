import { generateReturnsArray } from "./calculateFee.js"

//Coletando as variáveis do formulário
let form = document.getElementById('mainForm')
//let buttonCalculate = document.getElementById('buttonCalculate')

function renderProgression(event) {
    event.preventDefault()
    const initialAmount = Number(document.getElementById('initialAmount').value)
    const aditionalAmount = Number(document.getElementById('aditionalAmount').value)
    const timeHorizon = Number(document.getElementById('timeHorizon').value)
    const returnRate = Number(document.getElementById('returnRate').value)
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

form.addEventListener('submit', renderProgression)