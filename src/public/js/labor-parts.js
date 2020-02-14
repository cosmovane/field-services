const calculate = () => {
    const jobCostInput = document.getElementById('job-cost')
    const rateInput = document.getElementById('rate')
    const hoursInput = document.getElementById('hours')
    const totalLabel = document.getElementById('total')
    const materialsLabel = document.getElementById('materials')

    const jobCost = !isNaN(parseFloat(jobCostInput.value)) ? parseFloat(jobCostInput.value) : 0

    const result = parseFloat(rateInput.value) * parseFloat(hoursInput.value)
    const total = !isNaN(result) ? result : 0

    totalLabel.textContent = `$ ${total.toFixed(2)}`
    materialsLabel.textContent = `$ ${(jobCost - total).toFixed(2)}`
}