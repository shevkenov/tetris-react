import { useState, useEffect, useCallback, useMemo} from 'react';

export const useGameStatus = clearedRows => {
    const [level, setLevel] = useState(0)
    const [score, setScore] = useState(0)
    const [rows, setRows] = useState(0)

    const linePoints = useMemo(() => [40, 100, 300, 1200], []);
    
    const calcStatus = useCallback(() => {
        if(clearedRows > 0) {
            setScore(prevScore => prevScore + linePoints[clearedRows - 1] * (level + 1));
            setRows(prevRows => prevRows + clearedRows);
        }
    }, [clearedRows, level, linePoints])

    useEffect(() => {
        calcStatus();
    }, [calcStatus, score, linePoints])

    return [setLevel, rows, setRows, score, setScore, level];
}