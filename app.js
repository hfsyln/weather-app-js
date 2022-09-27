const apiKey = "5ed635c2454ab17fa31effbe499af547";
const mainDiv = document.querySelector(".çıktı");
const input = document.querySelector("input")
const search = document.querySelector(".search")
const dlt = document.querySelector(".delete")
const card = document.querySelector(".card")
let citys = [];
let content = 0

//datayı çek
const getData =  (şehir) => {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${şehir}&appid=5ed635c2454ab17fa31effbe499af547`

    fetch(apiUrl)
    
    .then((res) =>{
        if(!res.ok){
            
          renderError(` ${res.statu}`)
           throw new Error(); ///ister tanımlanan hataya git 
           //ister direk burda yap
           //alert("hata")
        }
    return res.json();
    })
    
    .then((data)=>renderCity(data))
    .catch((err) => console.log(err));
    
}; 

//hata durumunu tanımla yukardan buraya gel bunu
const renderError = () =>{
    
  alert("Please!! Write a city name")
     
}

//hata olmazsa durumunu yaz
const renderCity = (data) => {
    console.log(data)
    const { name, weather, main: { temp }, wind: { speed }, main: { humidity } } = data
  
    if(citys.includes(name.toLowerCase())){
    mainDiv.innerHTML += ""
    alert ("ikikez aynı girişi yapmayınız");  
  
    }
    if (content <=3 ){
    mainDiv.innerHTML +=  `
    <div class="card" >
      <div class="card-text">
            <p class="name">${name}</p>
      </div>
      <div class="card-text">
        <p class="temp">${Math.floor(temp) - 273}°C </p>
      </div>
      <div class="card-text">
        <i class="fa-solid fa-cloud fa-2x"></i>
        <p class="status">${Object.values(weather)[0].description}</p>
        <p class="status">Humidity:% ${humidity}</p>
      </div>
      <button type="button" class="dlt">X</button>
    </div> `
    content += 1;
  }else if(content > 3){
    alert("3 den fazla giriş yapmayınız")
  }
  
  citys.push(name.toLowerCase())
  console.log(citys)
};

search.addEventListener("click", ()=>{
    //mainDiv.parentElement.previousElementSibling.children[2].remove();
    console.log(input.value)
    getData(input.value) 
    input.value = ""
 })

mainDiv.addEventListener("click", (e) =>{
  if(e.target.className == "dlt"){
    e.target.parentElement.remove()
  }
})

window.onload = function () {
  input.focus()
}

input.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
      search.click()
      input.value=""
  }
});

//hatalar için ayrı bir conteiner oluşturup hataları buraya yazıp setTimeOut ile 
//belli süre sonra koybalması sağlanabilir (hata olursa conteiner.innerhtml = `fesatgrdy`
//setTimeOut kullanımı ile süre ver ve içerisinde container.innerHtml = ""(boşluk))