const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';

function handleSubmit(event) {
    event.preventDefault();


    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    if (Client.checkForName(formText)) {
        const postInfo = async (url, data = {}) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify(data),
            });
            try {
                const newInfo = await res.json();
                return newInfo;
            } catch (error) {
                console.log(error);
            }
        };
        postInfo('/theUrl', { url: formText, apiUrl: baseUrl })
            .then(() => {
                fetch('/nlpData')
                    .then(res => res.json())
                    .then(res => {
                        const container = document.createDocumentFragment();
                        const ui = document.createElement('div');
                        ui.innerHTML = `agreement:${res.agreement},<br>
                model:${res.model},<br>
                confidence:${res.confidence},<br>
                irony:${res.irony},<br>
                text:${res.articleText}`;
                        container.appendChild(ui);
                        const result = document.querySelector('#results');
                        result.appendChild(container);
                        console.log(container.firstChild);
                    });
            });
    }

    else if (formText !== '') {

        alert('the link is invalid, please check the syntax and try again. ');
        document.getElementById('results').innerHTML = '';
    }
    else {
        alert('the input is empty');
        document.getElementById('results').innerHTML = '';
    }

}

export { handleSubmit };

