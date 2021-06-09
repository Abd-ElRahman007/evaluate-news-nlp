const baseUrl = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const application_key = process.env.API_KEY;

function handleSubmit(event) {
    event.preventDefault();


    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    console.log(Client.checkForName(formText));
    if (Client.checkForName(formText)) {
        console.log(Client.checkForName(formText));
        const formData = async (text_link) => {
            const link = await fetch(text_link);
            try {
                const fullLink = await link.json();
                console.log(fullLink);
                let textInfo = '';
                // const container = document.createDocumentFragment();
                const bodyInfo = document.getElementById('results').innerHTML = `agreement:${fullLink.agreement},<br>
            model:${fullLink.model},<br>
            confidence:${fullLink.confidence},<br>
            irony;${fullLink.irony},<br>
            text:${textInfo}`;
                // const body = document.getElementById('results');
                // container.appendChild(bodyInfo);
                // body.appendChild(container);
                return fullLink;
            } catch (error) {
                console.log('error', error);
            }
        };
        fetch('/api_key')
            .then(res => res.json());
        const theLink = `${baseUrl}${application_key}&url=${formText}&lang=en`;
        console.log(theLink);
        formData(theLink);
    }
    else if (!formText == '') {

        alert('the link is invalid, please check the syntax and try again. ');
        document.getElementById('results').innerHTML = '';
    }
    else {
        alert('the input is empty');
        document.getElementById('results').innerHTML = '';
    }

}

export { handleSubmit };

