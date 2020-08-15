import React, {useState} from 'react';
import styled from '@emotion/styled';/*Libreria para crear componentes css, se tiene que instalar usando el comando npm i @emotion/styled @emotion/core dentro de la carpeta del proyecto*/
import {obtenerDiferenciaYear,CalcularMarca,obtenerPlan} from '../helper';//Importar un helper {funcion que queremos exportar}
import PropTypes from 'prop-types';

//Creamos los componentes CSS a requerir
const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    --webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight:bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;

    /*En SASS para hacer referencia a un mismo elemento se utiliza el &*/
    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color:white;
    padding: 1rem;
    width: 100%;
    margin-bottom: 2rem;
`; 

const Formulario = ({guardarResumen, guardarCargando}) => {
    //Creamos el State para obtener los datos del formulario
    //const [variable,funcion] = useState(aca dependera si sera un objeto o una variable normal)
    const [datos,guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [error, guardarError] = useState(false);

    //Extraemos los datos del state
    const {marca, year, plan} = datos;

    //Creamos la funcion para obtener los datos del formulacio
    const ObtenerInformacion = e => {
        guardarDatos({
            ...datos, //Se utiliza para crear una copia del state y no se borren los datos anteriormente seleccionados si hay mas de uno
            [e.target.name] : e.target.value //Hace referencia al campo que esta cambiado actualmente para no nombrarlos a todos 
        });
    }

    //Cuando el usuario haga submit
    const cotizarSeguro = e => {
        e.preventDefault();
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //Empezar con una base de 2000 del precio de seguro para aumentar dependiendo las opciones
        let resultado = 2000;

        //Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
        //Por cada año hay que restar 3% al precio base
        resultado -= (( diferencia * 3) * resultado) / 100;
        
        //Americano 15%
        //Asiatico 5%
        //Europeo 30%
        resultado = CalcularMarca(marca) * resultado;

        //Basíco 20%
        //Completo 50%
        let incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat( incrementoPlan * resultado ).toFixed(2);//.toFixed coloca la cantidad de decimales despues del punto
        
        guardarCargando(true);
        setTimeout(() => {
            
            //Elimina el spinner
            guardarCargando(false);

            //Pasa informacion al componente principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })

        }, 3000);

        
        
    }


    return (  
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca:</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={ObtenerInformacion}
                >
                    <option value="">Seleccionar...</option>
                    <option value="americano">americano</option>
                    <option value="europeo">europeo</option>
                    <option value="asiatico">asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año:</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={ObtenerInformacion}
                >
                    <option value="">Seleccionar...</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan:</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === 'basico'}
                    onChange={ObtenerInformacion}
                /> Básico

                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === 'completo'}
                    onChange={ObtenerInformacion}
                /> Completo

            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
    );
}
 
Formulario.prototype = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
export default Formulario;