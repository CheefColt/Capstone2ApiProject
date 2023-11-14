
import express, { response } from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const cwd = process.cwd();
const URL = "https://api.jikan.moe/v4";

app.use(express.static(cwd+"/public/images/finalFolder"));
app.use(express.static(cwd+"/public/images/finalFolder/"));

app.get("/", async (req,res) =>{

    res.render("index.ejs");

});

app.get("/animeSearch", async (req,res) =>{
    var dataFromApi = ""

    var animeId = String(Math.floor(Math.random() * 1000) + 1)
    

    try{
        var response = await axios.get(
            URL+`/anime/${animeId}/full`
        );
        dataFromApi = response.data.data;
        var synop = dataFromApi.synopsis;
        var synopsisData = []
        var genresData = []

        for (var i=0; i<(dataFromApi.genres).length; i++)
        {
            genresData.push(dataFromApi.genres[i].name);
        }
        var tempP = ''
        for (var j=0; j<(synop).length; j++){
            
            if (synop[j] != '.'){
                tempP += synop[j]
            }
            else if(synop[j] == '.')
            {
                tempP += synop[j]
                synopsisData.push(tempP)
                tempP = ''
            }
        }

        console.log(dataFromApi);
        console.log("\n\n"+animeId);
        console.log(genresData)
        console.log(synopsisData)
        res.render("animeSearch.ejs", {animeUrl : dataFromApi.url, 
            imageUrl : dataFromApi.images.jpg.image_url,
            animeEngName : dataFromApi.title_english,
            animeJapName: dataFromApi.title_japanese,
            animeRank : String(dataFromApi.rank),
            animeType: dataFromApi.type,
            animeNoEpisodes: String(dataFromApi.episodes),
            animeScore : String(dataFromApi.score),
            animeScoredBy: String(dataFromApi.scored_by),
            animeSynopsis: synopsisData,
            animeGenres : genresData
        } );
    }
    catch(error){

        console.log(error);
        res.render("error.ejs");
    }
      
    
});

// Getting all the style files
app.get("/public/styles/index.css", (req,res) =>{

    res.sendFile(cwd+"/public/styles/index.css");
});

app.get("/public/styles/animeIndex.css", (req,res) =>{

    res.sendFile(cwd+"/public/styles/animeIndex.css");
});

app.get("/public/styles/movieIndex.css", (req,res) =>{

    res.sendFile(cwd+"/public/styles/movieIndex.css");
});

app.get("/public/styles/seriesIndex.css", (req,res) =>{

    res.sendFile(cwd+"/public/styles/seriesIndex.css");
});

app.get("/public/styles/animeSearch.css", (req,res) =>{

    res.sendFile(cwd+"/public/styles/animeSearch.css");
});

app.get("/public/styles/errorAnimeStyles.css", (req,res) =>{

    res.sendFile(cwd+"/public/styles/errorAnimeStyles.css");
});

// Adding in other JS Files
app.get("/scrolling.js", (req,res) =>{

    res.sendFile(cwd+"/scrolling.js");
});

app.get("/mouseMove.js", (req,res) =>{

    res.sendFile(cwd+"/mouseMove.js");
});

app.listen(port, () =>{
    console.log(`Listenin on port ${port}`);
})

