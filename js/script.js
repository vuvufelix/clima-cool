const getSend = document.querySelector('#send')
const inputName = document.querySelector('#getName')
const textForm = document.querySelector('#textForm')
const city = document.querySelector('#city')
const code = document.querySelector('#code')
const tempInfo = document.querySelector('#clima-info')
const desc = document.querySelector('#descricion')
const wind = document.querySelector('#vento')
const umidity = document.querySelector('#umidade')
const clima = document.querySelector('#clima')
const contentContainer = document.querySelector('#content-container')
const errorMensage = document.querySelector('#error')

const api_key = 'd3114f350a913fe6ee2e0e67bfc42f57'

async function getCity(cidade) {
    
   try {

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${api_key}&units=metric&lang=pt_br`

        const response = await fetch(url)

        const data = await response.json()

        if(data.cod !== '404') {

          errorMensage.innerText = ''

          city.innerText = data.name
          code.innerText = data.sys.country
          tempInfo.innerText = data.main.temp
          desc.innerText = data.weather[0].description
          wind.innerText = `${data.wind.speed} Km/h`
          umidity.innerText = `${data.main.humidity} humidade`
          clima.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)

          contentContainer.style.display = 'block'

        } else {
          contentContainer.style.display = 'none'
          errorMensage.style.display = 'block'
          errorMensage.innerText = 'A cidade que procuras não existe!'
        }

   } catch (error) {
        console.log('Houve um erro em: ' + error)
   }

}

textForm.addEventListener('submit', function(e) {

    e.preventDefault()

    getCity(inputName.value)

})

textForm.addEventListener('keydown', function(event) {

     if(event.key === 'Enter') {

          getCity(inputName.value)

     }
 
 })