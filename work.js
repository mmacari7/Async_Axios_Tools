// Michael Macari
// Work module

const axios = require("axios")

// Function to see where they work and what the status is
exports.whereDoTheyWork = async function(firstName, lastName){
    // Check that both parameters exist
    if(firstName === undefined || lastName === undefined){
        throw("Error whereDoTheyWork: One of the parameters was not passed")
    }
    // Check that the parameters passed are string type
    if(typeof(firstName) !== 'string' || !firstName instanceof String || typeof(lastName) !== 'string' || !lastName instanceof String){
        throw("Error whereDoTheyWork: One of the parameters was not of type string")
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

    // Check that the person was in the data base
    if(target === undefined){
        throw("Error whereDoTheyWork: The person being searched does not exist in the people data base")
    }

    let work = await getWork()
    let job = undefined
    // Get their job from ssn
    for(let i=0; i < work.length; i++){
        if(work[i].ssn === target.ssn){
            job = work[i]
            break
        }
    }
    // Return string based on will be fired
    if(job.willBeFired === true){
        return(firstName + ' ' + lastName + ' - ' + job.jobTitle + ' at ' + job.company + '. They will be fired.')
    }
    else{
        return(firstName + ' ' + lastName + ' - ' + job.jobTitle + ' at ' + job.company + '. They will not be fired.')
    }
};

// Function to find the company record hacker
exports.findTheHacker = async function(ip){
    // Check if IP address was passed
    if(ip === undefined){
        throw("Error findTheHacker: ip address was not passed or undefined")
    }
    // Check ip is of correct type
    if(typeof(ip) !== 'string' || !ip instanceof String){
        throw("Error findTheHacker: ip address was not of type string")
    }
    
    let work = await getWork()
    targetJob = undefined
    // Get the job given the IP so we can collect the SSN
    for(let i=0; i < work.length; i++){
        if(work[i].ip === ip){
            targetJob = work[i]
            break
        }
    }

    if(targetJob === undefined){
        throw("Error findTheHacker: IP address passed was not found in the work data base")
    }

    let people = await getPeople()
    let suspect = undefined

    // Find the suspect based on the SSN
    for(let i=0; i < people.length; i++){
        if(people[i].ssn === targetJob.ssn){
            suspect = people[i]
        }
    }

    if(suspect === undefined){
        throw("Error findTheHacker: The SSN was not found in the people data base")
    }

    return(suspect.firstName + ' ' + suspect.lastName + " is the hacker!")
};

// Function to get people data 
async function getPeople(){
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json")
    return(data)
};

// Function to get work data
async function getWork(){
    const {data} = await axios.get("https://gist.githubusercontent.com/robherley/61d560338443ba2a01cde3ad0cac6492/raw/8ea1be9d6adebd4bfd6cf4cc6b02ad8c5b1ca751/work.json")
    return(data)
}