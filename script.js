import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
const app = express()
const port = 3000

const __dirname = dirname(fileURLToPath(import.meta.url));

app.listen(port, () => {
    console.log(`Server is hosted on port ${port}`)
})

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/getLocation", async (req, res) => {
    try {
        // Fetch data from the API
        const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");

        // Extract latitude and longitude
        const { latitude, longitude } = response.data;

        res.redirect(`https://www.google.com/maps/place/${latitude},${longitude}`);
    } catch (error) {
        console.error("Error fetching ISS location:", error);
        res.status(500).send(`<h1>Error</h1><br><p>Failed to fetch ISS location. Please try again later.</p>`)
    }
});
