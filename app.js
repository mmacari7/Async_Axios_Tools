// Michael Macari
// Asynchronus programming

// Require the modules
const people = require("./people.js")
const weather = require("./weather.js")
const work = require("./work.js")

// Main async function
async function main(){
    // getPersonById test
    try{
        let res = await people.getPersonById(43)
        console.log(res)
    }
    catch(e){
        console.log(e)
    }

    // lexIndex Test
    try{
        let res = await people.lexIndex(2)
        console.log(res)
    }
    catch(e){
        console.log(e)
    }

    // firstNameMetrics Test
    try{
        let res = await people.firstNameMetrics()
        console.log(res)
    }
    catch(e){
        console.log(e)
    }

    // shouldTheyGoOutside Test
    try{
        let res = await weather.shouldTheyGoOutside('Vachel','Learoid')
        console.log(res)
    }
    catch(e){
        console.log(e)
    }

    // whereDoTheyWork Test
    try{
        let res = await work.whereDoTheyWork('Demetra', 'Durrand')
        console.log(res)
    }
    catch(e){
        console.log(e)
    }

    // findTheHacker Test
    try{
        let res = await work.findTheHacker('47.67.172.215')
        console.log(res)
    }
    catch(e){
        console.log(e)
    }

    return
}

// Call to main
main()

// Added comment