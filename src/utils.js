export function getCoords2(leapPoint, frame) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0],
        y : normalizedPoint[1],
        z : normalizedPoint[2]
    };
}