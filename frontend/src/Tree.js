import React, { useEffect, useState } from 'react'
import { maindata } from './App';

export default function Tree({ data, tempData, i, setChanger, collapse_upgrade, expand_upgrade, leafCollpase }) {

    const [nodeData, setNodeData] = useState([]);
    const [style, setStyle] = useState("caret");
    useEffect(() => {
        setNodeData(tempData);
    }, [])
    const toggle = (depth, setChanger) => {
        if (tempData.children.length > 0) {
            collapse_upgrade(maindata, tempData.id);
            setStyle("caret")
            return;
        }
        if (tempData.children.length == 0) {
            if (data.children.length > 0) {
                expand_upgrade(maindata, tempData.id);
                setStyle("down")
                return;
            }
            if (data.children.length == 0) {
                leafCollpase(maindata);
            }
        }

        setNodeData(tempData)
    }
    let depth = 10;

    return (
            <div style={{ marginLeft: 30 + depth * i }}>
                <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAxEHAxdDtXmfAAABCElEQVRIx+3QvSsEcBgH8M95SXTiyksUnVIMlIHBYJDBYjIZlMFq9QfcblEWi81ikUHJIIMuBsqRJESUiCQkb5cFeTn3trrv9nyfPv1eyCUX2DKatR0VY0RcJCseETcCg55NCGSEA8a8Gv4YBzyZlJcBH/di6GvV58G0grR4vimP+n/W3W7NKUrJC82415to1eXGvOKkvMisOz1/rdtdWlb6Jy+x6FpnshPaXFhRlnAXtORKR6o3Nju1ruJXH7LqTGvKP0LYgR2137oqm441psOh3p5ddZ9zjW2HGtLlUC3m6P3EsP1fN0ojIWvOtGhyYkNlphzKRZ07F1WeDYegBQuC2fJc/k/eAHCZOZhYMvqPAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTE3VDA3OjAzOjIzKzAwOjAwMBxz1gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0xN1QwNzowMzoyMyswMDowMEFBy2oAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"} style={{ transform: "scaleX(1)", cursor: "pointer" }} onClick={() => toggle(i, setChanger)}></img>
                <span>{tempData.name}</span>
            </div>
    );
}