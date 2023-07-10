import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function Tutorial() {

  const data = [10, 20, 57, 23];
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  const gx = useRef();
  const gy = useRef();

  const x = d3.scaleLinear(
    [0, data.length - 1],
    [marginLeft, width - marginRight]
  );

  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);

  useEffect(() => 
    void d3.select(gx.current).call(d3.axisBottom(x))
  , [gx, x]);

  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
