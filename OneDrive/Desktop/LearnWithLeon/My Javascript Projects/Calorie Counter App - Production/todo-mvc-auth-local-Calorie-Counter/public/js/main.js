const searchFoodBtn = document.querySelector('#searchFoodBtn')
const addFoodItemBtn = document.querySelector('#addFoodItem')

searchFoodBtn.addEventListener('click',getCalories)
addFoodItemBtn.addEventListener('click',addFoodItem)

async function updateTarget(){
    const targetId = this.parentNode.dataset.id
    try{
        const response = await fetch('tracker/updateTarget', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'targetIdFromJSFile': targetId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
// We may want to seperate the get food list functionality and the get calorie functionality: Cy
async function getCalories(){
    const foodSearch = document.querySelector('#inputFood').value
    //get request to search nutritionix for the item's name in the API
    try{
        const res = await fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${foodSearch}`,{
           
            headers: {
                'x-app-id' : '97f66bd0',
                'x-app-key' : '404548aade2822f45583e849df78c7d7'
            },
        })
        const data = await res.json()
        //console.log(data)
        
        document.querySelector('#outputFood').innerText = data.common[0].food_name
        //post request to get Calories,etc
        const res2 = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`,{
            method:'post',
                    
            headers:{
                'Content-Type': 'application/json',
                'x-app-id' : '97f66bd0',
                'x-app-key' : '404548aade2822f45583e849df78c7d7',
                //'x-remote-user-id' : 0, //not needed
            },
            body: JSON.stringify( {
                'query': data.common[0].food_name //pull first food name from object
            })
        })
        const data2 = await res2.json()
        //console.log(data2)
        document.querySelector('#outputCalorie').innerText = data2.foods[0].nf_calories
        //access the photo
        document.querySelector('#foodThumb').setAttribute('src',data2.foods[0].photo.thumb)

    }catch(err){
        console.log(err)
    }

}
// by Cy: this is a quick and dirty method currently, needs cleaned up and made functional with a better UI: Cy
async function addFoodItem(){
    let calories = document.querySelector('#outputCalorie').innerText
    const foodItem = document.querySelector('#outputFood').innerText

    let data = await fetch('/tracker/addFoodItem',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            calories:calories,
            foodItem:foodItem,
        })
    })
    console.log(data)
    location.reload()
}