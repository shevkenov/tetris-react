import { useState, useCallback } from 'react';

import { randomShape, shapes } from '../helpers/shapes';

const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {
            x: 0,
            y: 0
        },
        shape: shapes[0].shape,
        collided: false
    })

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {
                x: 0,
                y: 0
            },
            shape: randomShape().shape,
            collided: false
        })
    }, [])

    const updatePlayerPos = ({ x, y, collided }) => {   
        setPlayer(prevState => (
                {...prevState, 
                    pos: {x: (prevState.pos.x += x), 
                        y: (prevState.pos.y += y)}, 
                    collided
                }
            )
        )
    }

    return [player, resetPlayer, updatePlayerPos]
}

export default usePlayer;