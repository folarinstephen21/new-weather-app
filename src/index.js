import "./styles.css";

const weatherInfo = document.getElementById("weatherInfo")
const weatherUi = document.getElementById("contentBox")

console.log("welcome")
const weatherBtn = document.getElementById("action")
const userInput = document.getElementById("location")

let link = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/?location"

weatherBtn.addEventListener("click", async () => {
    const linkIndex = link.split("?location")
    // console.log(link)
    const input = userInput.value;
    // console.log(input);
    const searchString = `${linkIndex[0]}${input}?key=MFBH9JFDBRJHVS69GH4JGKLU5`;
    console.log(searchString)
    userInput.value = "";
    const result =await callApi(searchString)
    console.log(result)
    renderWeather(result, weatherUi)
})

async function callApi (searchString){
    const response =  await fetch(searchString)
    const data = await response.json();
    console.log(data);
    return {
        location: data.address,
        info: data.days[0]

    };
}

async function loadWeatherIcon(condition) {
  try {
    const icon = await import(`./icons/${condition}.svg`);
    return icon.default;
  } catch (err) {
    console.error("Icon not found:", err);
  }
}

async function renderWeather(result, weatherPanel) {
    weatherPanel.innerHTML = ""
//   const img = document.createElement("img");

//   const iconSrc = await loadWeatherIcon(condition);
//   img.src = iconSrc;

//   document.querySelector("#weather").appendChild(img);
const heading = document.createElement("h3");
const para1 = document.createElement("p")

heading.innerText = result.location;
para1.innerText = result.info.description;

weatherPanel.appendChild(heading);
weatherPanel.appendChild(para1)
}





