function record() {
    const recognition = this.createSpeechRecognition();
    
    const records = document.querySelector('.records');
    let p = document.createElement('p');

    this.addEventsListeners(recognition, p, records);

    recognition.start();
}

function createSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    return recognition;
}

function addEventsListeners(recognition, p, records) {
    recognition.addEventListener('result', (e) => {
        const text = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        p.innerText = text;
        records.appendChild(p);

        if (e.results[0].isFinal) {
            p = document.createElement('p');
        }

        console.log(text);
    });

    recognition.addEventListener('end', () => {
        recognition.start();
    });
}

