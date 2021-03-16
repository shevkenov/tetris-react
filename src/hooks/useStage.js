import { useState, useEffect } from 'react';

import { createArena } from '../helpers/stage';

const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createArena());
    const [clearedRows, setClearedRows] = useState(0);

    useEffect(() => {
        setClearedRows(0);
        const clearRows = newStage => newStage.reduce((acc, row) => {
            if(row.findIndex(cell => cell[0] === 0) === -1){
                setClearedRows(prevRows => prevRows + 1);
                acc.unshift(new Array(newStage[0].length).fill([0, "clear"]));
                return acc;
            }
            acc.push(row)
            return acc;
        }, []);

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

            if(player.collided){
                resetPlayer();
                return clearRows(newStage);
            }

            return newStage;
        }

        setStage(prevState => updateState(prevState));
    }, [player, resetPlayer])


    return [stage, setStage, clearedRows];
}

export default useStage