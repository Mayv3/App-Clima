    const result = document.querySelector('.result');
    const form = document.querySelector('#get-weather');
    const nameCity = document.querySelector('#city');
    const nameCountry = document.querySelector('#country');
    const body = document.querySelector('body')
    console.log(body)


  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    
    if(nameCity.value === '' || nameCountry === ''){
        showError('Ambos campos son obligatorios')
    }
    

    callAPI(nameCity.value, nameCountry.value);


  });

   function callAPI(city, country){
    const apiId = '03399412494f373081f46fca6e8d7e9f'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
    

    fetch(url)
    .then(data =>{
        return data.json();
    })
    .then(dataJSON =>{
        if (dataJSON.cod === '404'){
            showError('Ciudad no encontrada')
        }else{
            clearHTML();
            showWeather(dataJSON);
        };
    })
  }
  
  function showWeather(data){
    const {name, main:{temp, temp_min, temp_max},weather:[arr]} = data;

    const grados = kelviToCentigrade(temp);
    const min= kelviToCentigrade(temp_min);
    const max = kelviToCentigrade(temp_max);

    
    const content = document.createElement('div');
    content.innerHTML = `
        <p>Clima en ${name} </p2>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
        <h2>${grados}°C</h2>
        <p>Max: ${max}°C</p>
        <p>Min:  ${min}°C</p>
    `;
    result.appendChild(content);
    
    cambiarFondo(grados);
    
}

  function showError(message){
    const alerta = document.createElement('p');
    alerta.classList.add('alert-message');
    alerta.innerHTML = message;

    form.appendChild(alerta);
    setTimeout(() =>{
        alerta.remove();

    },1500)
  }

  function kelviToCentigrade(temp){
    return parseInt(temp - 273.15);
  }
  function clearHTML(){
    result.innerHTML = '';
    }

function cambiarFondo(grados){
    if (grados>=20 && grados<26){
        body.classList.remove('caluroso');
        body.classList.remove('frio');
        body.classList.add('templado', 'active');
    }else if (grados > 26){
        body.classList.remove('templado');
        body.classList.remove('frio');
        body.classList.add('caluroso' , 'active');
        
    }else{
        body.classList.remove('templado');
        body.classList.remove('caluroso');
        body.classList.add('frio');
        
      
    }

}