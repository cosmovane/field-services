    const getLaborCostRates = () => {
        return costRates = [
            parseFloat(document.getElementById('rate1-labor-cost').value),
            parseFloat(document.getElementById('rate2-labor-cost').value),
            parseFloat(document.getElementById('rate3-labor-cost').value)
        ]
    }
    const getLaborCostQty = () => {
        return costQty = [
            parseFloat(document.getElementById('qty1-labor-cost').value),
            parseFloat(document.getElementById('qty2-labor-cost').value),
            parseFloat(document.getElementById('qty3-labor-cost').value)
        ]
    }
    const getOtherCostRates = () => {
        return costRates = [
            parseFloat(document.getElementById('rate1-other-cost').value),
            parseFloat(document.getElementById('rate2-other-cost').value),
            parseFloat(document.getElementById('rate3-other-cost').value)
        ]
    }
    const getOtherCostQty = () => {
        return costQty = [
            parseFloat(document.getElementById('qty1-other-cost').value),
            parseFloat(document.getElementById('qty2-other-cost').value),
            parseFloat(document.getElementById('qty3-other-cost').value)
        ]
    }
    const getLaborRevenueRates = () => {
        return revenues = [
            parseFloat(document.getElementById('rate1-labor-revenue').value),
            parseFloat(document.getElementById('rate2-labor-revenue').value),
            parseFloat(document.getElementById('rate3-labor-revenue').value)
        ]
    }
    const getLaborRevenueQty = () => {
        return revenues = [
            parseFloat(document.getElementById('qty1-labor-revenue').value),
            parseFloat(document.getElementById('qty2-labor-revenue').value),
            parseFloat(document.getElementById('qty3-labor-revenue').value)
        ]
    }
    const getOtherRevenueRates = () => {
        return revenues = [
            parseFloat(document.getElementById('rate1-other-revenue').value),
            parseFloat(document.getElementById('rate2-other-revenue').value),
            parseFloat(document.getElementById('rate3-other-revenue').value)
        ]
    }
    const getOtherRevenueQty = () => {
        return revenues = [
            parseFloat(document.getElementById('qty1-other-revenue').value),
            parseFloat(document.getElementById('qty2-other-revenue').value),
            parseFloat(document.getElementById('qty3-other-revenue').value)
        ]
    }

    const getIncomes = () => {
        return income = [
            parseFloat(document.getElementById('target-income').value),
            parseFloat(document.getElementById('cost-income').value)
        ]
    }

    const getExpenses = () => {
        return expense = [
            parseFloat(document.getElementById('target-expense').value),
            parseFloat(document.getElementById('income-expense').value)
        ]
    }

    const getSum = (rates, qty) => {
        let sum = 0
        for (i = 0; i <= 2; i++) {
            if (!isNaN(rates[i]) && !isNaN(qty[i])) {
                sum += rates[i] * qty[i]
            }
        }
        return sum
    }

    const getIncomePrice = () => {
        let incomePrice = 0
        if (!isNaN(income[0]) && !isNaN(income[1])) {
            incomePrice = (income[1] / (1 - (income[0] / 100)))
        }
        return incomePrice
    }

    const getExpenseCost = () => {
        let expenseCost = 0
        if (!isNaN(expense[0]) && !isNaN(expense[1])) {
            expenseCost = expense[1] * (expense[0] / 100)
        }
        return expenseCost
    }
    const getRevenuePercentage = (costsSum, revenuesSum) => {
        let revenue = 0
        if (costsSum != 0 && revenuesSum != 0) {
            revenue = (revenuesSum - costsSum) / revenuesSum
        }
        return revenue
    }

    const calculate = () => {
        const laborCostRates = getLaborCostRates()
        const laborCostQty = getLaborCostQty()
        const otherCostRates = getOtherCostRates()
        const otherCostQty = getOtherCostQty()
        const laborRevenueRates = getLaborRevenueRates()
        const laborRevenueQty = getLaborRevenueQty()
        const otherRevenueRates = getOtherRevenueRates()
        const otherRevenueQty = getOtherRevenueQty()
        const income = getIncomes()
        const expense = getExpenses()

        const totalLaborCosts = document.getElementById('total-labor-cost')
        const totalLaborRevenues = document.getElementById('total-labor-revenue')
        const totalOtherCosts = document.getElementById('total-other-cost')
        const totalOtherRevenue = document.getElementById('total-other-revenue')
        const priceIncome = document.getElementById('price-income')
        const costExpense = document.getElementById('cost-expense')
        const totalCosts = document.getElementById('total-cost')
        const totalRevenues = document.getElementById('total-revenue')
        const profit = document.getElementById('profit')
        const percentage = document.getElementById('percentage')

        const laborCostsSum = getSum(laborCostRates, laborCostQty)
        const otherCostsSum = getSum(otherCostRates, otherCostQty)
        const laborRevenueSum = getSum(laborRevenueRates, laborRevenueQty)
        const otherRevenueSum = getSum(otherRevenueRates, otherRevenueQty)

        const costsSum = (laborCostsSum + otherCostsSum)
        const revenuesSum = (laborRevenueSum + otherRevenueSum)

        totalLaborCosts.textContent = `$ ${laborCostsSum.toFixed(2)}`
        totalOtherCosts.textContent = `$ ${otherCostsSum.toFixed(2)}`
        totalLaborRevenues.textContent = `$ ${laborRevenueSum.toFixed(2)}`
        totalOtherRevenue.textContent = `$ ${otherRevenueSum.toFixed(2)}`

        const revenue = getRevenuePercentage(costsSum, revenuesSum)

        const incomePrice = getIncomePrice()
        priceIncome.textContent = `$ ${incomePrice.toFixed(2)}`

        const expenseCost = getExpenseCost()
        costExpense.textContent = `$ ${expenseCost.toFixed(2)}`

        // if (autoEnter.checked) {
        //     const totalAutoEnterCost = costsSum + income[1]
        //     const totalAutoEnterRevenue = revenuesSum + incomePrice
        //     if (!isNaN(totalAutoEnterCost) && !isNaN(totalAutoEnterRevenue)) {
        //         totalCosts.textContent = `$ ${totalAutoEnterCost.toFixed(2)}`
        //         totalRevenues.textContent = `$ ${totalAutoEnterRevenue.toFixed(2)}`
        //         profit.textContent = `$ ${(totalAutoEnterRevenue - totalAutoEnterCost).toFixed(2)}`
        //         const revenueAutoEnter = getRevenuePercentage(totalAutoEnterCost, totalAutoEnterRevenue)
        //         percentage.textContent = `${(revenueAutoEnter * 100).toFixed(1)} %`
        //     }
        // } else {
            totalCosts.textContent = `$ ${costsSum.toFixed(2)}`
            totalRevenues.textContent = `$ ${revenuesSum.toFixed(2)}`
            profit.textContent = `$ ${(revenuesSum - costsSum).toFixed(2)}`
            percentage.textContent = `${(revenue * 100).toFixed(2)} %`
        

    }