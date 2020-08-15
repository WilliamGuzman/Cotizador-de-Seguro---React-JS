import React from 'react';
import styled from '@emotion/styled';//Importamos el emotion para utilizar estilos css con sintaxis React
import PropTypes from 'prop-types';


//Procedemos a darle estilos a las etiquetas de la siguiente forma.
const ContenedorHeader = styled.header`
    background-color: #26C6DA;
    padding: 10px;
    font-weight: bold;
    color: #ffffff;
`;

const TextoHeader = styled.h1`
    font-size: 2rem;
    font-family: 'Slabo 27px', serif;
    text-align: center;
`;

const Header = ({titulo}) => {
    return ( 
    //una ves creado el "componente" con propiedades css reemplazamos la etiqueta con el nombre del componente creado.
    <ContenedorHeader>
        <TextoHeader>
            {titulo}
        </TextoHeader>
    </ContenedorHeader>
     );
}
 
Header.prototype = {
    titulo: PropTypes.func.isRequired
}
export default Header;