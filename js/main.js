const wrapper = document.querySelector(".wrapper")
inputPart = wrapper.querySelector(".input-part")
infoTxt = wrapper.querySelector(".info-txt")
inputField = inputPart.querySelector("input")
locationBtn = inputPart.querySelector("button")
const wIcon = document.querySelector(".weather-part img")
const arrowBack = document.querySelector("header i")

inputField.addEventListener("keyup", function(e){
    //if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener("click", function(){
    //if browser supports geolocation api
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else{
        alert("Your browser does not support geolocation api")
    }
})

const onSuccess = async function(position){
    const {latitude, longitude} = position.coords //getting lat and lon of the user device from coords object
    let api =await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d799d396f76b29ff4a44929c845bfd92`)
    infoTxt.innerText="Getting weather details..."
    infoTxt.classList.add("pending")
    let weatherData = await api.json()
    weatherDetails(weatherData)
}

const onError = function(error){
    infoTxt.innerText= error.message
    infoTxt.classList.add("error")
}

const requestApi =  async function(city){
    let api = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d799d396f76b29ff4a44929c845bfd92`)
    infoTxt.innerText="Getting weather details..."
    infoTxt.classList.add("pending")
    let weatherData = await api.json()
    weatherDetails(weatherData)

}

const weatherDetails = function(weatherData){
    if(weatherData.cod == "404"){
        infoTxt.innerText = `${inputField.value} isn't a valid city name`
        infoTxt.classList.replace("pending", "error")
    }
    else{
        // getting required properties values from the weatherData object
        const city = weatherData.name
        const country = weatherData.sys.country
        const {description, id} = weatherData.weather[0]
        const {feels_like, humidity, temp} = weatherData.main


        // changes weather icon based on id 
        if(id == 800){
            wIcon.src = "img/clear.svg"
        }
        else if (id >= 200 && id <= 232){
            wIcon.src = "img/storm.svg"
        }
        else if (id >= 600 && id <= 632){
            wIcon.src = "img/snow.svg"
        }
        else if (id >= 701 && id <= 781){
            wIcon.src = "img/haze.svg"
        }
        else if (id >= 801 && id <= 804){
            wIcon.src = "img/cloud.svg"
        }
        else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            wIcon.src = "img/storm.svg"
        }

        //passes these values to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerText = humidity

        infoTxt.classList.remove("pending", "error")
        console.log(weatherData)
        wrapper.classList.add("active")
    }
   
}

arrowBack.addEventListener("click", function(){
    wrapper.classList.remove("active")
    inputField.innerText = ""
})