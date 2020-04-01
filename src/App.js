import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';


function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    //Cotizar criptomoneda
    const cotizarCriptomoneda = async () => {
      // Evitar la primer ejecucion
      if (moneda === '') return;

      // Consultar api para obtener cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
      setCargando(true);
      const resultado = await axios.get(url);
      setCargando(false);
      setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
    }

    cotizarCriptomoneda();


  }, [moneda, criptomoneda])


  const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    @media(min-width:992px){
      display:grid;
      grid-template-columns: repeat(2,1fr);
      column-gap: 2rem;
    }
  `
  const Imagen = styled.img`
    max-width: 100%;
    margin-top: 5rem;

  `
  const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-align: left;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 50px;
    margin-top: 80px;

    &::after {
      content: '';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display:block;
    }
  `

  // Mostrar spinner o resultado
  const componente = cargando ? <Spinner /> : <Cotizacion resultado={resultado} />


  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen cripto" />
      </div>

      <div>
        <Heading>
          Cotizador de criptomonedas
        </Heading>
        <Formulario
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />

        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
