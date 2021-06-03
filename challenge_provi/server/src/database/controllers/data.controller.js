const axios = require('axios');
const CircularJSON = require('circular-json');

// Get movie from type (movie or tv)
exports.getDataByType = async(req, res) => {
    const { type }  = req.body
    
    try {
        // const resp = await axios.get(`http://www.omdbapi.com/?apikey=d79c8795&s="${title}"&type="${type}"`)
        const resp = await axios.get(`https://api.themoviedb.org/3/discover/${type}?api_key=5032e66a87eb9894605a118b4277dd49&page=1`)

        const circular = CircularJSON.stringify(resp)
        const json = JSON.parse(circular)

        let resultsData = json.data.results
 
        res.status(200).send({ data: resultsData });
    } catch (error) {
        // console.error(error)
    }
};

// Get movie from title params
exports.getSearchData = async(req, res) => {
    const { title, type }  = req.body
    
    try {
        // const resp = await axios.get(`http://www.omdbapi.com/?apikey=d79c8795&s="${title}"&type="${type}"`)
        const resp = await axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=5032e66a87eb9894605a118b4277dd49&page=1&query=${title}`)

        const circular = CircularJSON.stringify(resp)
        const json = JSON.parse(circular)

        let resultsData = json.data.results

        res.status(200).send({ data: resultsData });
    } catch (error) {
        // console.error(error)
    }
};

// Get both movie and tv
exports.getAllData = async(req, res) => {
    
    try {

        let superJson = []
        const types = ["tv", "movie"]
        
        for(t in types){
            let resp = await axios.get(`https://api.themoviedb.org/3/trending/${t}/week?api_key=5032e66a87eb9894605a118b4277dd49`)
            
            let circular = CircularJSON.stringify(resp)
            
            let json = JSON.parse(circular)
            
            let resultsData = json.data.results

            resultsData.forEach( (element) => {
                superJson.push(element)
            })
        }

        res.status(200).send({ data: superJson });
    } catch (error) {
        // console.error(error)
    }
};

// Get info about unique id 
exports.getMovieInformation = async(req, res) => {
    const { id, type }  = req.body
    
    try {
        const resp = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=5032e66a87eb9894605a118b4277dd49`)

        const circular = CircularJSON.stringify(resp)
        const json = JSON.parse(circular)

        let resultsData = json.data

        res.status(200).send({info: resultsData});
    } catch (error) {
        // console.error(error)
    }
};