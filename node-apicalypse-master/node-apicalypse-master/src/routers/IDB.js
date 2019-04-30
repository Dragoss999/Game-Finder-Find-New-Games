const express = require('express');
const apicalypse = require('apicalypse').default;
const router = new express.Router();
const url = 'https://api-v3.igdb.com';
const requestOptions = {
    queryMethod: 'body',
    method: 'POST',
    baseURL: url,
    headers: {
        'user-key' : '670ff0704d2378cfa68684d9fe20882f',
        accept: 'application/json',
    },
    responseType: 'json',
    timeout: 1000,
};

router.get('/api/genres/search/:name', async (req,res) => {
    try{
        const response = await apicalypse(requestOptions)
        .fields(['name','url'])
        .where(`name="${req.params.name}"`)
        .request('/genres');
        if(response.data.length === 0){
            return res.send({'error' : 'Genre not found with that name'});
        }
        res.send(response.data);
    }    
    catch(error) {
        console.log(error);
        res.status(400).send();
    }
});

module.exports = router;