import { useState, useCallback } from 'react';

import { randomShape, shapes } from '../helpers/shapes';
import { collisonDetection } from '../helpers/stage';

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
            {
                ...prevState,
                pos: {
                    x: (prevState.pos.x += x),
                    y: (prevState.pos.y += y)
                },
                collided
            }
        )
        )
    }

    const rotate = (matrix) => {
        const rotatedMatrix = matrix.map((_, index) => matrix.map(val => val[index]));
        return rotatedMatrix.map(val => val.reverse());
    }

    const rotatePlayer = (stage) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.shape = rotate(clonedPlayer.shape)

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (collisonDetection(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.shape[0].length) {
                rotate(clonedPlayer.shape);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    }

    return [player, resetPlayer, updatePlayerPos, rotatePlayer]
}

export default usePlayer;