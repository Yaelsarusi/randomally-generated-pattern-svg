
import { generateMatrixFromPattern, matrixToSVG } from "./generate_svg_pattern";
import { expect, test } from 'vitest'

test('generate pattern', () => {
    const n = 150;  // Example size for the matrix.
    const patternSize = 18;  // Size of the pattern.
    const matrix = generateMatrixFromPattern(n, patternSize);
    
    const svgString = matrixToSVG(matrix);
    
    const fs = require('fs');
    fs.writeFileSync('pattern.svg', svgString);
})


