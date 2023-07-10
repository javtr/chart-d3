import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      createBarChart();
    }
  }, [data]);

  const createBarChart = () => {
    const chartContainer = d3.select(chartRef.current);
    const chartWidth = 400;
    const chartHeight = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = chartWidth - margin.left - margin.right;
    const height = chartHeight - margin.top - margin.bottom;

    chartContainer.selectAll('*').remove();

    const svg = chartContainer
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .style('overflow', 'scroll');

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.slice(0, 5).map(d => d.label));

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, d => d.value)]);

    chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))

      

    chart
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y).ticks(5));

    chart
      .selectAll('.bar')
      .data(data.slice(0, 5))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))

      ;
  };

  return <div ref={chartRef}></div>;
};

export default BarChart;
