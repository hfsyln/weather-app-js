const apiKey = "5ed635c2454ab17fa31effbe499af547";
const mainDiv = document.querySelector(".çıktı");
const input = document.querySelector("input")


//datayı çek
const getData =  (şehir) => {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${şehir}&appid=5ed635c2454ab17fa31effbe499af547`

    fetch(apiUrl)
    
    .then((res) =>{
        if(!res.ok){
            renderError(`sorun oluşturan bir durum var: ${res.statu}`)
            throw new Error();
        }
    return res.json();
    })
    
    .then((data)=>renderCity(data))
    .catch((err) => console.log(err));
    
}; 

//hata durumunu tanımla
const renderError = () =>{
    
    mainDiv.innerHTML += `
    <h1>ERROR İN SYSTEM </h1>
    <img src="404.png alt="" /> `;

}

//hata olmazsa durumunu yaz
const renderCity = (data) => {
    console.log(data)
    const { name, weather, main: { temp }, wind: { speed }, main: { humidity } } = data

    mainDiv.innerHTML +=  `
    <div class="card">
      <div class="card-text">
            <p class="name">Weather in ${name}</p>
      </div>
      <div class="card-text">
        <p class="temp">${Math.floor(temp) - 273}°C </p>
      </div>
      <div class="card-text">
        <p class="status">${Object.values(weather)[0].description}</p>
        <p class="status">Humidity:% ${humidity}</p>
        <p class="status">Wind Speed:${speed}</p>
      </div>
    
    </div>`

};

getData("london");