export const STAGE_WIDTH = 12;
export const STAGE_HIGHT = 20;

export const createArena = () => {
    const col = new Array(STAGE_WIDTH).fill([0, 'clear']);
    const matrix = new Array(STAGE_HIGHT).fill(col);

    return matrix
}

export const collisonDetection = (player, stage, { x: moveX, y: moveY }) => {
    const shape = player.shape
    for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] !== 0) {
                if (!stage[y + player.pos.y + moveY]
                    || !stage[y + player.pos.y + moveY][x + player.pos.x + moveX]
                    || stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
                    'clear') {
                    return true;
                }
            }

        }

    }

    return false
}