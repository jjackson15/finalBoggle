// SelectGridSize.js
import React, { useState } from 'react';
import './Board.css';

function SelectGridSize({ onGridSizeChange }) {
    const [gridSize, setGridSize] = useState("4x4");

    const handleChange = (event) => {
        const newSize = event.target.value;
        setGridSize(newSize);
        onGridSizeChange(newSize);
    };

    return (
        <div className="select-grid-size">
            <label htmlFor="grid-size">Select Grid Size:</label>
            <select id="grid-size" value={gridSize} onChange={handleChange}>
                <option value="4x4">4x4</option>
                <option value="5x5">5x5</option>
                <option value="6x6">6x6</option>
            </select>
        </div>
    );
}

export default SelectGridSize;
