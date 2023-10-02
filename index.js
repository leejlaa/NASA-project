import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3002;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res) =>{
    res.render("index.ejs");
    });

app.get("/get-image", async (req,res) =>{
  try {
    const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=KusAdLe5vXIpssDnmzUwZbaNo79yHTHunfaq7wF9");
    console.log(response);
    const  result  = response.data;
    res.render("index.ejs", { data: result });
    
    console.log(result);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });