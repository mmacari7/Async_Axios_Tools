// Michael Macari
// Weather module

const axios = require("axios")

// Function to check if person should go outside
exports.shouldTheyGoOutside = async function(firstName, lastName){
    // Check that both parameters exist
    if(firstName === undefined || lastName === undefined){
        throw("Error shouldTheyGoOutside: One of the parameters was not passed")
    }
    // Check that the parameters passed are string type
    if(typeof(firstName) !== 'string' || !firstName instanceof String || typeof(lastName) !== 'string' || !lastName instanceof String){
        throw("Error shouldTheyGoOutside: One of the parameters was not of type string")
    }
    
    let people = await getPeople()
    let target = undefined
    // Search people data for person
    for(let i=0; i < people.length; i++){
        if(people[i].firstName === firstName && people[i].lastName === lastName){
            target = people[i]
            break
        }
    }
    // Check if the target person was found
    if(target === undefined){
        throw("Error shouldTheyGoOutside: The person being searched does not exist in the people data base")
    }

    let weather = await getWeather()
    let targetTemp = undefined
    // Search weather database for zipcode  
    for(let i=0; i < weather.length; i++){
        if(weather[i].zip === target.zip){
            targetTemp = weather[i].temp
            break
        }
    }

    // Temperature comparison
    if(targetTemp >= 34){
        return("Yes, " + firstName + " should go outside.")
    }
    else{
        return("No, " + firstName + " should not go outside.")
    }
};

// Function to get people data 
async function getPeople(){
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json")
    return(data)
};

// Function to get weather data 
async function getWeather(){
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/1b950dc4fbe9d5209de4a0be7d503801/raw/eee79bf85970b8b2b80771a66182aa488f1d7f29/weather.json")
    return(data)
}