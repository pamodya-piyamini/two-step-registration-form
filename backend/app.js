const express = require('express');
const cors = require('cors');

const app = express ();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.post('/api/register', async (request, response) => {
    const data = request.body;

    console.log("Name: ", data.fullName);
    console.log("Email: ", data.email);
    console.log("Phone : ", data.phone);
    console.log("Password : ", data.password);

    await sleep(2000);

    response.send({message: "Success"});
});

app.get('/', (request, response) => {
    const status = {
        'Status': 'Running'
    };

    response.send(status);
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});