// Michael Macari
// People module

const axios = require("axios")

// Gets person list and displays name of person with ID 
exports.getPersonById = async function(id){
    // Err check for no parameter passed
    if(id === undefined){
        throw("Error getPersonById: id was not defined")
    }
    // Error check for integer
    if(!Number.isInteger(id)){
        throw("Error getPersonById: id was not of type int")
    }
    // Wait until we get the people
    let personsList = await getPeople()

    // Error check for ID range
    if(id <= 0 || id > personsList.length){
        throw("Error getPersonById: id was not in valid range")
    }

    // Return the first and last name of person at ID-1 because its an array
    return(personsList[id-1].firstName + ' ' + personsList[id-1].lastName)
};

// Get sorted lexographic of all people in the json file by last name
exports.lexIndex = async function(index){
    // Err check for no parameter passed
    if(index === undefined){
        throw("Error lexIndex: index was not defined")
    }
    // Error check for integer
    if(!Number.isInteger(index)){
        throw("Error lexIndex: index was not of type int")
    }

    let personsList = await getPeople()
    // Error check out of range
    if(index < 0 || index >= personsList.length){
        throw("Error lexIndex: index passed was out of range")
    }
    // Sorting mechanism that sorts JSON data by key lastName
    personsList = personsList.sort((a,b)=>{
        let x = a['lastName']
        let y = b['lastName']
        return((x < y) ? -1 : ((x > y) ? 1: 0))
    });
    // Return full name of person at index after lexicographic ordering
    return(personsList[index].firstName + ' ' + personsList[index].lastName)
};

// Get first name metrics
exports.firstNameMetrics = async function(){
    let personsList = await getPeople()
    // Create the object to be returned
    let myObj = {totalLetters:0, totalVowels:0, totalConsonants:0, longestName: undefined, shortestName: undefined}
    
    let vowels = /[aeiouAEIOU]/i
    
    
    // Loop through JSON to acquire metrics
    for(let i=0; i < personsList.length; i++){
        // Check shortest name 
        if(myObj.shortestName === undefined || personsList[i].firstName.length < myObj.shortestName.length){
            myObj.shortestName = personsList[i].firstName
        }

        //Check longest name
        if(myObj.longestName === undefined || personsList[i].firstName.length > myObj.longestName.length){
            myObj.longestName = personsList[i].firstName
        }
        // Iterate through the first name to analyze all the letters
        for(let x=0; x < personsList[i].firstName.length; x++){
            // Count letters in first name
            myObj.totalLetters++
            let curLet = personsList[i].firstName.charAt(x)
            if(curLet.match(vowels)){
                myObj.totalVowels++
            }
            else{
                myObj.totalConsonants++
            }
        }
        
    }

    return(myObj)
};

async function getPeople(){
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json")
    return(data)
}