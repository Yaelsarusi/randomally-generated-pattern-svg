function generatePattern(n) {
    const pattern = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(getRandomInt(1, 2));
        }
        pattern.push(row);
    }
    return pattern;
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMatrixFromPattern(totalSize, patternSize) {
    const matrix = [];
    const pattern = generatePattern(patternSize);
    const flipped = flipPattern(pattern);
    const upsideDown = flipUpsideDown(pattern);

    for (let i = 0; i < totalSize; i++) {
        const row = [];
        for (let j = 0; j < totalSize; j++) {
            let currentPattern;
            const horizontalSegment = Math.floor(j/patternSize);
            const verticalSegment = Math.floor(i/patternSize);
            
            if (horizontalSegment % 2 === 1 && verticalSegment % 2 === 1) {
                currentPattern = flipped;
            } else if (horizontalSegment % 3 === 2 && verticalSegment % 3 === 2) {
                currentPattern = upsideDown;
            } else {
                currentPattern = pattern;
            }
            
            row.push(currentPattern[i % patternSize][j % patternSize]);
        }
        matrix.push(row);
    }

    return matrix;
}


function flipUpsideDown(pattern) {
    return pattern.slice().reverse();
}

function flipPattern(pattern) {
    return pattern.map(row => row.map(cell => (cell === 1 ? 2 : 1)));
}

export function matrixToSVG(matrix, squareSize = 20) {
    const n = matrix.length;
    const svgWidth = n * squareSize;
    const svgHeight = n * squareSize;

    let svgContent = '';

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const color = matrix[i][j] === 1 ? 'white' : 'red';
            svgContent += `<rect x="${j * squareSize}" y="${i * squareSize}" width="${squareSize}" height="${squareSize}" fill="${color}" />`;
        }
    }

    return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
}
