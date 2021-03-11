export const STAGE_WIDTH = 12;
export const STAGE_HIGHT = 20;

export const createArena = () => {
    const col = new Array(STAGE_WIDTH).fill([0, 'clear']);
    const matrix = new Array(STAGE_HIGHT).fill(col);

    return matrix
}