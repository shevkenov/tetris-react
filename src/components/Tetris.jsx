import React, { useState } from 'react'

import { useInterval } from '../hooks/useInterval';
import { useGameStatus } from '../hooks/useGameStatus';
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
    const [player, resetPlayer, updatePlayerPos, rotatePlayer] = usePlayer();
    const [stage, setStage, clearedRows] = useStage(player, resetPlayer);
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [setLevel, rows, setRows, score, setScore, level] = useGameStatus(clearedRows);

    const move = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === 37){
                movePlayer(-1);
            } else if(keyCode === 39){
                movePlayer(1);
            } else if(keyCode === 40){
                dropPlayer();
            } else if(keyCode === 38){
                rotatePlayer(stage)
            }
        }
    }

    const drop = () => {
        if(rows > (level + 1) * 10){
            setLevel(prevLevel => prevLevel + 1);
            setDropTime(1000 / (level + 1) + 200)
        }
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
        setDropTime(null);
    }

    const keyUp = ({keyCode}) => {
        if(!gameOver){
            if(keyCode === 40){
                setDropTime(1000 / (level + 1) + 200);
            }
        }
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
        setDropTime(1000);
        setLevel(0);
        setRows(0);
        setScore(0);
        setGameOver(false);
    }

    useInterval(() => {
        drop();
    }, dropTime)

    return (
        <StyledTetrisWrapper onKeyDown={(e) => move(e)} onKeyUp={(e) => keyUp(e)}>
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
                                    <Display text={`Score ${score}`} />
                                </StyledDsiplay>
                                <StyledDsiplay>
                                    <Display text={`Rows ${rows}`} />
                                </StyledDsiplay>
                                <StyledDsiplay>
                                    <Display text={`Level ${level}`} />
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
