const wrapper = document.querySelector(".wrapper")
inputPart = wrapper.querySelector(".input-part")
infoTxt = wrapper.querySelector(".info-txt")
inputField = inputPart.querySelector("input")
locationBtn = inputPart.querySelector("button")

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
    let api =await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d799d396f76b29ff4a44929c845bfd92`)
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
    let api = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d799d396f76b29ff4a44929c845bfd92`)
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
        infoTxt.classList.remove("pending", "error")
        console.log(weatherData)
        wrapper.classList.add("active")
    }
   
}