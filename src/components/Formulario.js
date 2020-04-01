import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import Error from './Error';

const Formulario = ({ setMoneda, setCriptomoneda }) => {

    //State del listado de criptomonedas
    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [{
        codigo: '',
        nombre: '-- Seleccionar --',
    }, {
        codigo: 'USD',
        nombre: 'Dolar de estados unidos',
    }, {
        codigo: 'MXN',
        nombre: 'Peso mexicano',
    }, {
        codigo: 'EUR',
        nombre: 'Euro',
    }, {
        codigo: 'ARS',
        nombre: 'Peso argentino',
    }]


    //Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);
    // Utilizar use Criptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto);

    //Llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setListaCripto(resultado.data.Data);
        }


        consultarAPI();

    }, [])

    const Boton = styled.input`
        margin-top: 20px;
        font-weight: bold;
        font-size: 20px;
        padding: 10px;
        background-color: #66a2fe;
        border: none;
        border-radius: 10px;
        color: #FFF;
        transition: background-color .3s ease;

        &:hover {
             background-color: #326AC0;
             cursor: pointer;
        }
    `

    //Submit
    const cotizarMonedas = e => {
        e.preventDefault();

        //Validar si los campos estan llenos
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            setError(true);
            return;
        } else {
            // Pasar datos al componente principal
            setError(false);
            setMoneda(moneda);
            setCriptomoneda(criptomoneda);
        }
    }

    return (

        <form
            onSubmit={cotizarMonedas}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
            <div>
                <SelectMonedas />
                <SelectCripto />
            </div>

            <Boton
                type="submit"
                value="Calcular"
            />

        </form>
    );
}

export default Formulario;