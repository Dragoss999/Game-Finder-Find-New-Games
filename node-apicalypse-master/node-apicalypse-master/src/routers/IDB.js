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

/*
This is what I tried to do to get the games showing up but I couldn't seem to get it working
router.get('/api/games', async (req,res) => {
    try{
        const response = await apicalypse(requestOptions)
        .fields(['name','url', 'genres'])
        .where('genre'= 31)
        .request('/games');
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

Genre IDs:
Adventure ID = 31
Fighting ID = 4
Music ID = 7
Platform ID = 8
Puzzle ID = 9
Racing ID = 10
Shooter ID = 5
Sport ID = 14
Strategy ID = 15
*/

module.exports = router;