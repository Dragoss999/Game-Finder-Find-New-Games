const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const igdbRouter = require('./routers/IDB');


app.use(express.json());
app.use(igdbRouter);
app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});