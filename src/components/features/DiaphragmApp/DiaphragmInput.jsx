import React, { useState } from 'react';

const DiaphragmInput = () => {
    const [inputs, setInputs] = useState({
        length: '',
        width: '',
        uniformWallForce: '',
    });

    const [activeWall, setActiveWall] = useState('A');
    const [walls, setWalls] = useState({
        A: [{type: 'wall segment', value: ''}],
        B: [{type: 'wall segment', value: ''}],
    });

    const labels = {
        length: 'Length',
        width: 'Width',
        uniformWallForce: 'Uniform Wall Force (w)'
    };

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'length') {
            setWalls((prev) => {
                const updated = { ...prev };
                ['A', 'B']. forEach((wallKey) => {
                    if (
                        updated[wallKey].length > 0 && updated[wallKey][0].type === 'wall segment'
                    ) {
                        updated[wallKey][0].value = value;
                    }
                });
                return updated;
            });
        }
    };

    const handleWallSegmentChange = (e, index) => {
        const newWalls = { ...walls };
        newWalls[activeWall][index].value = e.target.value;
        setWalls(newWalls);
    };

    const addWallItem = (type) => {
        const wall = walls[activeWall];

        const isValidAddition = () => {
            if (wall.length === 0) return type === 'wall segment';
            if (wall.length === 1) return wall[0].type === 'wall segment' && type === 'wall opening';
            if (wall.length === 2) return wall[1].type === 'wall opening' && type === 'wall segment';
            return false;
        };

        if (!isValidAddition()) return;

        setWalls((prev) => ({
            ...prev,
            [activeWall]: [...prev[activeWall], { type, value: '' }],
        }));
    };

    const wall = walls[activeWall];

    const canAddSegment = () => {
        if (wall.length === 0) return true;
        if (wall.length === 2 && wall[1].type === 'wall opening') return true;
        return false;
    };

    const canAddGap = () => {
        if (wall.length === 1 && wall[0].type === 'wall segment') return true;
        return false;
    };

    const removeSegment = (index) => {
        if (index === 0) return;
        setWalls((prev) => ({
            ...prev,
            [activeWall]: prev[activeWall].filter((_, i) => i !== index),
        }));
    };

    const isWallItemOverLimit = (wallKey, index) => {
        const total = walls[wallKey].reduce((sum, item, i) => {
            const value = parseFloat(item.value);
            if (!isNaN(value)) {
                return sum + value;
            }
            return sum;
        }, 0);

        const max = parseFloat(inputs.length);
        return !isNaN(max) && total > max;
    }

    return (
        <div className="flex h-fit w-full">
            <div className="w-full bg-gray-100 p-6 flex flex-col gap-6 overflow-y-auto">
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">Diaphragm Input</h1>
                <div className="bg-white px-20 py-4 rounded shadow">
                    <h2 className="text-lg font-medium mb-4">Inputs</h2>
                    <div className="space-y-4">
                        {['length', 'width', 'uniformWallForce'].map((key) => (
                            <div key={key} className="flex items-center justify-between">
                                <label className="w-40 text-left">{labels[key]}:</label>
                                <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name={key}
                                    value={inputs[key]}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded w-32 text-right"
                                />
                                <span className="text-sm text-gray-600">
                                    {key === 'uniformWallForce' ? 'plf' : 'ft'}
                                </span>
                                </div>
                            </div>
                            ))}
                    </div>
                </div>
                <div className="bg-white px-6 py-4 rounded shadow">
                    <h2 className="text-lg font-medium mb-4">Shear Wall</h2>
                    <div className="flex gap-4 mb-4">
                        {['A', 'B'].map((wall) => (
                            <button
                                key={wall}
                                onClick={() => setActiveWall(wall)}
                                className={`px-4 py-2 border rounded ${
                                    activeWall === wall ? 'bg-gray-300' : 'bg-gray-100'
                                }`}
                            >
                                Wall Line {wall}
                            </button>
                        ))}
                        <button
                            onClick={() => addWallItem('wall segment')}
                            disabled={!canAddSegment()}
                            className={`ml-auto px-3 py-1 border rounded text-sm ${
                                !canAddSegment() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
                            }`}>
                                + Wall Segment
                        </button>
                        <button
                            onClick={() => addWallItem('wall opening')}
                            disabled={!canAddGap()}
                            className={`px-3 py-1 border rounded text-sm ${
                                !canAddGap() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
                            }`}>
                                + Wall Opening
                        </button>
                    </div>
                    <div className="space-y-3">
                        {walls[activeWall].map((item, index) => {
                            const overLimit = isWallItemOverLimit(activeWall, index);
                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={item.value}
                                        onChange={(e) => handleWallSegmentChange(e, index)}
                                        className={`p-2 border rounded w-32 text-right ${
                                        isWallItemOverLimit(activeWall, index) ? 'border-red-500 text-red-600' : 'border-gray-300'
                                        }`}
                                    />
                                    <span className="text-sm">ft</span>
                                    {index !== 0 && (
                                        <button
                                        onClick={() => removeSegment(index)}
                                        className="text-red-500 px-2 py-1 text-sm"
                                        >
                                        - Remove
                                        </button>
                                    )}
                                    </div>

                            );
                        })}
                    </div>
                </div>
           </div>
        </div>
    );
};

export default DiaphragmInput;