import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const useMoneda = (label, stateInicial, opciones) => {

    const Label = styled.label`
    font-family:'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size:2.4rem;
    margin-top: 2rem;
    display: block;
    `
    const Select = styled.select`
        width: 100%;
        display: block;
        border-radius: 10px;
        padding: 1rem;
        -webkit-appearance: none;
        font-size: 1.2rem;
        border: none;
    `
    //State de nuestro custom Hook
    const [state, setState] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                {opciones.map((opc) => (
                    <option value={opc.codigo}>{opc.nombre}</option>
                ))}
            </Select>
        </Fragment >
    );

    // Retornar state, interfaz y funcion que modifica el state
    return [state, Seleccionar, setState];


}

export default useMoneda;