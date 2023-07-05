import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export const BarChart = () => {
  const [data] = useState([200, 600, 500, 400, 80, 300]);
  const svgRef = useRef();

  useEffect(() => {
    //setting up svg container
    const w = 350;
    const h = 200;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("overflow", "visible")
      .style("margin-top", "75px")
      .style("margin-left", "75px");

    //setting up scaling
    const xScale = d3
      .scaleBand()
      .domain(data.map((val, i) => i))
      .range([0, w])
      .padding(0.2);

    const yScale = d3.scaleLinear().domain([0,getMaxData(data)]).range([h, 0]);

    //setting up axes
    const xAxis = d3.axisBottom(xScale).ticks(data.length);
    const yAxis = d3.axisLeft(yScale).ticks(10);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    //setting up svg data
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("x", (v, i) => xScale(i))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", (val) => h - yScale(val));
  }, [data]);

  //funciones

  function getMaxData(d) {
    return Math.max(...d) + Math.max(...d) * 0.25;
  }

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};
