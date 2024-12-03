document.addEventListener('DOMContentLoaded', function () {
    // Coefficients for each item
    const coefficients = {
        rugged: 1,
        bandage: 2,
        heavy: 2,
        thick: 1.43
    };

    const items = {
        rugged: {name: 'Rugged Leather', img: 'img/rugged.jpg'},
        bandage: {name: 'Runecloth Bandage', img: 'img/Bandage.jpg'},
        heavy: {name: 'Heavy Leather', img: 'img/heavy.jpg'},
        thick: {name: 'Thick Leather', img: 'img/thick.jpg'}
    };

    // Function to update the cost/commendation values
    function updateValues() {
        const ruggedInput = parseFloat(document.getElementById('ruggedInput').value || 0.93);
        const bandageInput = parseFloat(document.getElementById('bandageInput').value || 0.43);
        const heavyInput = parseFloat(document.getElementById('heavyInput').value || 0.8);
        const thickInput = parseFloat(document.getElementById('thickInput').value || 1.43);

        const ruggedCost = (ruggedInput * coefficients.rugged).toFixed(2);
        const bandageCost = (bandageInput * coefficients.bandage).toFixed(2);
        const heavyCost = (heavyInput * coefficients.heavy).toFixed(2);
        const thickCost = (thickInput * coefficients.thick).toFixed(2);

        document.getElementById('ruggedValue').innerText = ruggedCost + 'g';
        document.getElementById('bandageValue').innerText = bandageCost + 'g';
        document.getElementById('heavyValue').innerText = heavyCost + 'g';
        document.getElementById('thickValue').innerText = thickCost + 'g';

        // Determine the item with the lowest cost per badge
        const costs = {
            rugged: ruggedCost,
            bandage: bandageCost,
            heavy: heavyCost,
            thick: thickCost
        };

        const lowestCostItem = Object.keys(costs).reduce((lowest, current) => {
            return parseFloat(costs[current]) < parseFloat(costs[lowest]) ? current : lowest;
        }, 'rugged');

        // Update the Cheapest Item section
        document.getElementById('itemResult').innerText = items[lowestCostItem].name;
        document.querySelector('.cheapest img').src = items[lowestCostItem].img;

        // Update the Cost per World Buff Token section
        const totalCost = (parseFloat(document.getElementById(lowestCostItem + 'Input').value) * coefficients[lowestCostItem] * 50).toFixed(2);
        document.getElementById('cheapestItemName').innerText = items[lowestCostItem].name;
        document.getElementById('cheapestItemImg').src = items[lowestCostItem].img;
        document.getElementById('totalCost').innerText = totalCost + 'g';
    }

    // Function to handle input focus and blur to manage placeholder italics
    function handleInputFocus(event) {
        event.target.style.fontStyle = 'normal';
    }

    function handleInputBlur(event) {
        if (event.target.value === '') {
            event.target.style.fontStyle = 'italic';
        } else {
            event.target.style.fontStyle = 'normal';
        }
    }

    // Add event listeners to input fields to update values dynamically
    document.getElementById('ruggedInput').addEventListener('input', updateValues);
    document.getElementById('bandageInput').addEventListener('input', updateValues);
    document.getElementById('heavyInput').addEventListener('input', updateValues);
    document.getElementById('thickInput').addEventListener('input', updateValues);

    // Add event listeners to input fields to handle focus and blur for italics
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);

        // Initialize with italic style if input is empty
        input.style.fontStyle = input.value === '' ? 'italic' : 'normal';
    });

    // Initial calculation to set default values
    updateValues();
});
