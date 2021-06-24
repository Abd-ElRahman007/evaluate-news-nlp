const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
async function handleSubmit(event) {
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
        const data = await postInfo('http://localhost:8000/theUrl', { url: formText, apiUrl: baseUrl });
        const container = document.createDocumentFragment();
        const ui = document.createElement('div');
        ui.innerHTML = `agreement:${data.agreement},<br>
                model:${data.model},<br>
                confidence:${data.confidence},<br>
                irony:${data.irony}`;
        container.appendChild(ui);
        const result = document.querySelector('#results');
        result.appendChild(container);
        console.log(container.firstChild);
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
