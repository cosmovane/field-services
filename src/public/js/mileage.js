const calculate = () => {
    const oneWayMiles = parseFloat(document.getElementById('one-way-miles').value)
    const roundTripLabel = document.getElementById('round-trip')
    const mileCost = parseFloat(document.getElementById('mile-cost').value)
    const travelCostLabel = document.getElementById('travel-cost')

    if (!isNaN(oneWayMiles)) {
        const totalMiles = oneWayMiles * 2
        roundTripLabel.textContent = `${totalMiles} mi`
        if (!isNaN(mileCost)) {
            travelCostLabel.textContent = `$ ${(totalMiles * mileCost).toFixed(2)}`
        }
    }
}