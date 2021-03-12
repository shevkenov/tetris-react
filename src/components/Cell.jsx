import React from 'react'

import { shapes } from '../helpers/shapes'; 
import StyledCell from './styles/StyledCell';

const Cell = ({type}) => {
    return (
        <StyledCell type={type} color={shapes[type].color} />
    )
}

export default Cell
