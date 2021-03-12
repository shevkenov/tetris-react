import { useState, useEffect } from 'react';

import { createArena } from '../helpers/stage';

const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createArena());

    useEffect(() => {
        const updateState = prevState => {
            const newStage = prevState.map((row => {
                return row.map((val => {
                    return (val[1] === 'clear' ? [0, 'clear'] : val)
                }))
            }));

            player.shape.forEach((row, y) => {            
                row.forEach((val, x) => {
                    if (val !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] =
                            [val, `${player.collided ? 'merged' : 'clear'}`]
                    }
                })
            });

            return newStage;
        }

        if(player.collided){
            resetPlayer();
        }

        setStage(prevState => updateState(prevState));
    }, [player, resetPlayer])


    return [stage, setStage];
}

export default useStage