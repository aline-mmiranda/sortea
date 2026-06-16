const drawNumber = document.getElementById('draw-number');
const diceAnimation = document.getElementById('dice');
const ofInput = document.getElementById('of');
const toInput = document.getElementById('to');
const resultEl = document.getElementById('result-message');

const drawDuration = 3000;
const resultDuration = 3000;

drawNumber.addEventListener('click', () => {
    drawNumber.disabled = true;

    const ofValue = parseInt(ofInput.value);
    const toValue = parseInt(toInput.value);

    if (isNaN(ofValue) || isNaN(toValue)) {
        showAlert('Por favor, insira números válidos nos campos "De" e "Até".');
        return;
    }

    if (ofValue > toValue) {
        showAlert('O valor "De" deve ser menor que "Até".');
        return;
    }

    diceAnimation.play();
    setResultState('result-drawing', 'Sorteando...');

    setTimeout(() => {
        diceAnimation.stop();
        const result = getRandomIntInclusive(ofValue, toValue);
        setResultState('result-number', String(result));

        setTimeout(() => {
            resetState();
        }, resultDuration);

    }, drawDuration);
});

[ofInput, toInput].forEach(input => {
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') drawNumber.click();
    });
});

function showAlert(message) {
    setResultState('result-alert', message);
    setTimeout(resetState, 3000);
}

const messageStates = ['result-wait', 'result-drawing', 'result-number', 'result-alert'];

function setResultState(className, message) {
    resultEl.classList.remove(...messageStates);
    resultEl.classList.add(className);
    resultEl.textContent = message;
}

function resetState() {
    ofInput.value = '';
    toInput.value = '';
    setResultState('result-wait', 'Aguardando sorteio...');
    drawNumber.disabled = false;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}