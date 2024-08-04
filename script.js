const menuItems = document.querySelectorAll(".event")
const btnRight = document.querySelector(".right")
const btnLeft = document.querySelector(".left")
let move = 0;
const verticalLeft = document.querySelectorAll(".vertical-left")
const fromPoint = document.querySelector(".from-point")
//const spanPoint =fromPoint.querySelector(".small-i")
//console.log(spanPoint)
const titleRun = document.querySelector(".title-running");
const runningBar = document.querySelector(".run-in-input")
const sidebar =document.querySelector(".sidebar");
const inputContainer = document.querySelector(".input-container")
const inputBar = document.querySelectorAll(".input-bar")
const inputsContainer =document.querySelector(".inputs-container")
const inputsForms = document.querySelectorAll(".inputs")
const inputFormPoint = document.querySelector(".form__input-start-point")
const title_2 = document.querySelectorAll(".title-2")
const openBtn =document.querySelector(".open");
const closeBtn =document.querySelector(".close")
const addMoreData = document.querySelector(".form-to-add-more-data");


openBtn.addEventListener("click", function(){
   
    addMoreData.classList.toggle("hidden")
    if (closeBtn.classList.contains("hidden")){
        closeBtn.classList.remove("hidden")
        openBtn.classList.add("hidden")
    }
    else
    return;
 
})

closeBtn.addEventListener("click", function(){
    
     addMoreData.classList.toggle("hidden")
   
    if (openBtn.classList.contains("hidden")){
        openBtn.classList.remove("hidden")
        closeBtn.classList.add("hidden")
    }
    else
    return;
 
})


let formForStartPoint;


let lat;
let lng;
let coordX;
let coordY;
navigator.geolocation.getCurrentPosition(function(position){
lat = position.coords.latitude;
lng = position.coords.longitude;
resultsFromGeoNames();
console.log("MOJATA POZICIJA E SO KOORDINATI:",lat,lng)
console.log(typeof(lat), typeof(lng))
}, function(){
    alert("ERROR YOUR POSITION IS CURRENTLY I NOT AVAILABLE")
} )


////////////////////////////////////////////////////////////////////////////////////////
fetch('http://api.geonames.org/searchJSON?username=ksuhiyp&country=mk&maxRows=1000')
.then(response=>response.json())
.then(data=>{
    coordX=data.geonames[0].lat
    console.log(data.geonames)
    
})
.catch(error=>console.error("Error fetching JSON:", error));

console.log("Podatoci od GeoJSON", coordX)

////////////////////////////////////////////////////////////////////////////////////////

   async function reverseGeoNames(lat,lng){
    let data =null;
    try{
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        data=await response.json();
        //console.log("Reverse GEO Names From Lat lng:", data)  
        

    }catch(e){
        data = {address:{country:"Unknown"}}

    }
    return data.display_name??"Unknown";
}

const resultsFromGeoNames = async function(){

    const a = await reverseGeoNames(lat,lng)
    inputFormPoint.value=a;
    title_2.forEach(ele=>{
      ele.textContent=a;
    }) 
    //console.log("OVA E REZULTAT OD POVIKUVANJE NA ASYN F-JA",a)
}








//POSTAVUVANJE NA NAPA// TRI RAZLICNI VIDOVI NA MAPI //DA SE NAPRAVI DA MOZE DA SE SLEKTIRAAAT OD NIV
var map =L.map("map").setView([41.4311492,22.0132538],12)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{
    maxZoom:19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

//https://www.google.com/maps/@41.4311492,22.0132538,15.48z/data=!5m1!1e4?entry=ttu
var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 25,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
})

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
})

//CLIK NA MAP
map.on("click", fillForm)

function fillForm(e){
    console.log(e.latlng)
    lat=e.latlng.lat.toFixed(7)
    lng= e.latlng.lng.toFixed(7)
    title_2.textContent="";
    resultsFromGeoNames();
}
//F-JA SEARCH
var control = L.control.geonames({
    username: 'cbi.test',
    zoomLevel: 13
});
console.log(control)

map.addControl(control);
//control.on('select', function(e){console.log(e)})                                                                                                                                 )});
control.on("select",function(e){
    console.log("PODATOCI ZA MAPATA ",e)
    console.log(e.geoname.name)
})


//  LIST MAIN MENU // 
btnLeft.addEventListener("click", ()=>{
    if (move>menuItems.length*100){
        move=0;
        menuItems.forEach(ele=>{
            ele.style.transform = `translateX(-${move}%)`;  

    })
    return
} 
    else{
        move=move+101;
        menuItems.forEach(ele=>{
        ele.style.transform = `translateX(-${move}%)`;  
        }) 
    }
})


btnRight.addEventListener("click", ()=>{
   console.log(move)
    if (move===0)
    {
        move=0;
        menuItems.forEach(ele=>{
            ele.style.transform = `translateX(-${move}%)`;  
         })
       
        return
    }
    else{
        move=move-101;
        menuItems.forEach(ele=>{
           ele.style.transform = `translateX(-${move}%)`;  
        })
    } 
})
//  DISPLAY INPUT MENU // 
menuItems.forEach(ele=>{
    ele.addEventListener("click", (e)=>{
        console.log(e.target.closest(".event").dataset.data)
        
        inputBar.forEach(ele=>{
            ele.style.opacity="0";
            ele.style.transform= 'translateX(-101%)';
            if (ele.classList.contains(`${e.target.closest(".event").dataset.data}-in-input`)){
                ele.style.opacity="1";
                ele.style.transform= 'translateX(0%)';
            }

        })
        
    })
})

// DISPLAY INPUT DATA MENU ///
verticalLeft.forEach(ele=>{
    ele.addEventListener("click", function(e) {
        
        const addText = e.target.closest(".input-menu").dataset.data;
        console.log(e.target.closest(".input-menu").dataset.data)
        const x = e.target.closest(".input-menu").dataset.data;
        const titleWorkout = ele.closest(".input-bar").querySelector(".workout-container").querySelector(".title-1");
        console.log(titleWorkout)
        titleWorkout.textContent = "";
        const text = ele.closest(".input-bar").querySelector(".workout-container").querySelector(".title-1").textContent
        //console.log(text);
        titleWorkout.textContent = text+ ' ' +addText;
        let type = x.slice(x.indexOf(" ")).toLowerCase().trim();  // White space remove
        console.log(type)
        
        //resultsFromGeoNames();
        
        
        inputsForms.forEach(ele=>{
             console.log("Type:",type)
              console.log(ele.classList[1])
               ele.classList.remove("active")
                console.log(ele.classList[1].includes(type))

            if(ele.classList[1].includes(type)){
                console.log("LAT I LNG:",lat,lng)
                 const formForStartPoint = ele.querySelector(".form__input-start-point")
                  console.log(formForStartPoint)
                  setTimeout(function(){
                    formForStartPoint.value=inputFormPoint.value;
                  },2000)
                    
                      ele.classList.add("active")
                       console.log(ele)

            }
        })

})


})



