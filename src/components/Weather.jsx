import './Weather.css'
import { useState, useEffect, useRef } from 'react'

const Weather = () => {
  const apiKey = process.env.REACT_APP_API_KEY
  //Substitui a utilização do querySelector com o hook useRef"
  const inputRef = useRef();
  const buttonRef = useRef();
  const formRef = useRef();
    const [weatherLocation, setWeatherLocation] = useState('Amora')
    const [weatherIcon, setWeatherIcon] = useState('')
    const [weatherTemp, setWeatherTemp] = useState('')
    const [weatherHum, setWeatherHum] = useState('')

    const fetchweatherData = async () => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation},pt&units=metric&APPID=${apiKey}`)
        const data = await res.json()
        setWeatherIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        setWeatherTemp(data.main.temp)
        setWeatherHum(data.main.humidity)
      }
  // O useEffect neste caso só executa a função acima caso a localização se altere.
      useEffect(() => {
        fetchweatherData()
      }, [weatherLocation])
// Este useEffect chama o fetchweatherData de 1 em 1 minuto.
      useEffect(() => {
        const intervalId = setInterval(() => {
          fetchweatherData();
      }, 1 * 60 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

// Esta função evita que a página tenha o comportamento comum do browser de dar refresh depois de um submit ser feito numa form com o metodo event.preventDefault();
      const handleSubmit = event => {
        event.preventDefault();
      };
// Este useEffect facilita o re-uso do código, performance e o debugging, deve-se usar um useEffect para os eventos e pra substituir o querySelector, em vez de estar nos botões diretamente e outros elementos
//O segundo argumento array está em vazio porque este useEffect só precisa de ser executado uma vez, porque os event listeners só precisam de ser executados uma vez.
      useEffect(() => {
        buttonRef.current.addEventListener('click', () => setWeatherLocation(inputRef.current.value));
        formRef.current.addEventListener('submit', handleSubmit);
      }, []);

  return (
    <div className="container-lg cm">
      <div className="row text-center">
        <div className="col-lg-12">
            <h1 className='title'>Weather APP Portugal</h1>
        </div>
      </div>
      <div className="row text-center cm">
        <div className="col-lg-12">
            <h1 className>{weatherLocation}</h1>
            <img src={weatherIcon} />
            <h2>Temperature: {weatherTemp} ºC</h2>
            <h2>Humidity: {weatherHum} %</h2>
        </div>
        <div className="row text-center justify-content-center">
          <div className="col-lg-3 col-md-5 col-sm-5 col-8">
            <form ref={formRef} onSubmit={handleSubmit}>
            <input className='form-control form-style' type="text" ref={inputRef} />
            </form>
            <button className='btn-change' ref={buttonRef}>Change Location</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
