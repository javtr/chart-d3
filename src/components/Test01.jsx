import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Test01 = ({ tempData }) => {
  const verticalSVGRef = useRef(null);
  const horizontalSVGRef = useRef(null);

  useEffect(() => {
    if (tempData && horizontalSVGRef.current) {
      createBarChart();
    }
  }, [tempData]);

  const createBarChart = () => {
    const verticalChartContainer = d3.select(verticalSVGRef.current);
    const horizontalChartContainer = d3.select(horizontalSVGRef.current);
    const barWidth = 30;
    const paddingFactor = 2.2;
    const padding = 20;
    const responsiveDIVHeight = 300;
    const responsiveDIVWidth = tempData.length * barWidth * paddingFactor;

    verticalChartContainer.selectAll("*").remove();
    horizontalChartContainer.selectAll("*").remove();

    // ejes
    const x = d3
      .scaleBand()
      .rangeRound([0, responsiveDIVWidth])
      .padding(0.5)
      .domain(tempData.map((d) => d.Type));

    const y = d3
      .scaleLinear()
      .rangeRound([responsiveDIVHeight - padding, padding])
      .domain([0, d3.max(tempData, (d) => d.Count + 10)]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    //
    const svgX = horizontalChartContainer
      .append("svg")
      .attr("width", responsiveDIVWidth)
      .attr("height", responsiveDIVHeight)
      .attr("transform", "translate(0, 0)");
    svgX
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${responsiveDIVHeight - padding})`)
      .call(xAxis)
      .selectAll("text")
      .attr("dx", "-0.8em")
      .attr("dy", "-.15em")
      .attr("transform", "rotate(-60)");

    svgX
      .selectAll(".bar")
      .data(tempData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d) => y(d.Count))
      .attr("x", (d) => x(d.Type))
      .attr("width", barWidth)
      .attr("height", (d) => responsiveDIVHeight - y(d.Count) - padding);

    svgX.call(d3.drag().on("drag", dragged));

    const svgY = verticalChartContainer
      .append("svg")
      .attr("height", responsiveDIVHeight)
      .attr("width", 50);

    svgY
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr("dx", "-0.3em")
      .attr("transform", "translate(50, 0)");

    function dragged(event) {
      const dx = event.dx;
      const currentTransform = parseFloat(
        svgX.attr("transform").split("(")[1].split(",")[0]
      );
      const newTransform = currentTransform + dx;

      //obtener el ancho del chart actual
      const chartContainer = d3.select(horizontalSVGRef.current);
      const containerWidth = chartContainer
        .node()
        .getBoundingClientRect().width;

      //restringir drag si se pasan lo limites del chart
      if (
        newTransform < 0 &&
        Math.abs(newTransform) + containerWidth < responsiveDIVWidth
      ) {
        svgX.attr("transform", `translate(${newTransform}, 0)`);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div ref={verticalSVGRef} style={{ float: "left" }}></div>
        <div ref={horizontalSVGRef} style={{ overflowX: "hidden" }}></div>
      </div>
    </div>
  );
};

export default Test01;
