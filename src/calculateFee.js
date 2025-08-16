
function convertToMonthlyReturnRate(returnRate){
    return returnRate ** (1/12)
}

export function generateReturnsArray(
    initialAmount = 0,
    aditionalAmount = 0,
    timeHorizon = 0,
    timeHorizonOption = 'monthly',
    returnRate = 0,
    returnRateOption = 'monthly',
) {

    if(initialAmount <=0 || timeHorizon <=0 ){
        throw new Error('A quantia inicial e o tempo devem ser positivos')
    }
    
    returnRate = 1 + (0.01 *returnRate)

    if(returnRateOption == 'yearly'){
        returnRate = convertToMonthlyReturnRate(returnRate)
    }

    const months = timeHorizonOption === 'yearly' ? timeHorizon * 12: timeHorizon


    const storeApplicationNumbers = {
        investedAmount: initialAmount,
        totalAmount: initialAmount,
        interestReturns: 0,
        totalInterestReturns: 0,
        month: 0
    }

    
    const returnArray = [storeApplicationNumbers]

    for(let i = 1; i <= months; i++){
        let investedAmount = returnArray[i-1].investedAmount + aditionalAmount
        let totalAmount = (returnArray[i-1].totalAmount * returnRate) + aditionalAmount
        let interestReturns = returnArray[i-1].totalAmount * (returnRate - 1)
        let totalInterestReturns = totalAmount - investedAmount
        const newMonthNumber = {
            investedAmount,
            totalAmount, 
            interestReturns, 
            totalInterestReturns,
            month: i
        }
        returnArray.push(newMonthNumber)
    }
    return returnArray
}

function subtractTaxFinalAmount(initialAmount, finalAmount, tax){
    let profit = finalAmount - initialAmount
    tax *= 0.01
    let valueTax = profit * tax
    return finalAmount - valueTax
}


