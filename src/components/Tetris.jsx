import React, { useState } from 'react'

import { createArena } from '../helpers/stage';
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import useStage from '../hooks/useStage';
import usePlayer from '../hooks/usePlayer';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import StyledDsiplay from './styles/StyledDsiplay';
import { collisonDetection } from '../helpers/stage';

const Tetris = () => {
    const [player, resetPlayer, updatePlayerPos] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const move = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === 37){
                movePlayer(-1);
            } else if(keyCode === 39){
                movePlayer(1);
            } else if(keyCode === 40){
                dropPlayer();
            }
        }
    }

    const drop = () => {
        if(!collisonDetection(player, stage, {x: 0, y: 1})){
            updatePlayerPos({x: 0,y: 1,collided: false})
        }else{
            if(player.pos.y < 1){
                setGameOver(true);
            }
            updatePlayerPos({x: 0, y: 0, collided: true})
        }
    }

    const dropPlayer = () => {
        drop();
    }

    const movePlayer = (dir) => {
            const newPos = {
                x: dir,
                y: 0,
                collided: player.collided
            }
            if(!collisonDetection(player, stage, {x: newPos.x, y: newPos.y})){
                updatePlayerPos(newPos)
            }
    }

    const startGame = () => {
        setStage(createArena());
        resetPlayer();

        setGameOver(false);
    }

    return (
        <StyledTetrisWrapper onKeyDown={(e) => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {
                        gameOver ? (
                            <StyledDsiplay gameOver={gameOver}>
                                <Display text="Game over" gameOver={gameOver} />
                            </StyledDsiplay>
                        ) : (
                            <div>
                                <StyledDsiplay>
                                    <Display text="Score" />
                                </StyledDsiplay>
                                <StyledDsiplay>
                                    <Display text="Rows" />
                                </StyledDsiplay>
                                <StyledDsiplay>
                                    <Display text="Level" />
                                </StyledDsiplay>
                                <StartButton callback={startGame}/>
                            </div>
                        )
                    }

                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris
