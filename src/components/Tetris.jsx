import React from 'react'

import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { createArena } from '../helpers/game';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import StyledDsiplay from './styles/StyledDsiplay';

const Tetris = () => {
    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={createArena()} />
                <aside>
                    <StyledDsiplay>
                        <Display text="Score" />
                    </StyledDsiplay>
                    <StyledDsiplay>
                        <Display text="Rows" />
                    </StyledDsiplay>
                    <StyledDsiplay>
                        <Display text="Level" />
                    </StyledDsiplay>
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris
