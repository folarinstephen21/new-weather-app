import "./styles.css";

const weatherInfo = document.getElementById("weatherInfo")
const weatherUi = document.getElementById("contentBox")

console.log("Hello")
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
    const result =await callApi(searchString);
    // console.log(result)
    const rawIcon = result.info.icon;
    const normalized = normalizeCondition(rawIcon);

    const weatherIcon = await loadWeatherIcon(normalized);

    renderWeather(result, weatherUi, weatherIcon)
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
  const iconMap = {
    rain: "rainy",
    cloudy: "cloudy",
    clear: "sun-line",
  };

  const iconName = iconMap[condition?.toLowerCase()];

  if (!iconName) {
    console.warn("No matching icon for:", condition);
    return null;
  }

  try {
    const icon = await import(`./icons/${iconName}.svg`);
    return icon.default;
  } catch (err) {
    console.error("Icon not found:", err);
    return null;
  }
}



function normalizeCondition(iconString) {
  if (!iconString) return null;

  if (iconString.includes("rain")) return "rain";
  if (iconString.includes("cloud")) return "cloudy";
  if (iconString.includes("clear")) return "clear";

  return null;
}

async function renderWeather(result, weatherPanel, weatherIcon) {
    weatherPanel.innerHTML = ""
  const img = document.createElement("img");

//   document.querySelector("#weather").appendChild(img);
const heading = document.createElement("h3");
const para1 = document.createElement("p")

heading.innerText = result.location;
para1.innerText = result.info.description;

weatherPanel.appendChild(heading);
weatherPanel.appendChild(para1)
if (weatherIcon) {
  img.src = weatherIcon;
  weatherPanel.appendChild(img);
}
}





