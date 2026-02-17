import "./styles.css";

console.log("welcome")
const weatherBtn = document.getElementById("action")
const userInput = document.getElementById("location")

let link = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/?location"

weatherBtn.addEventListener("click", () => {
    link = link.split("?location")
    console.log(link)
    const input = userInput.value;
    console.log(input);
    const searchString = `${link[0]}${input}?key=MFBH9JFDBRJHVS69GH4JGKLU5`;
    console.log(searchString)
    userInput.value = "";
    callApi(searchString)
})

async function callApi (searchString){
    const response =  await fetch(searchString)
    const data = await response.json();
    console.log(data);
    return data;
}