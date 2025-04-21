import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { zoom } from 'd3-zoom';
import { timeFormat } from 'd3-time-format';

interface CandleData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface UseChartProps {
    data: CandleData[];
    width?: number;
    height?: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

export const useChart = ({
    data,
    width = 800,
    height = 400,
    margin = { top: 20, right: 20, bottom: 30, left: 50 }
}: UseChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [chartInstance, setChartInstance] = useState<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);

    useEffect(() => {
        if (!svgRef.current || !data.length) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll("*").remove();

        // Set up the SVG
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        // Create the chart group
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Calculate the inner dimensions
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create scales
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => d.date) as [Date, Date])
            .range([0, innerWidth]);

        const y = d3.scaleLinear()
            .domain([
                d3.min(data, d => d.low) as number,
                d3.max(data, d => d.high) as number
            ])
            .range([innerHeight, 0]);

        // Add axes
        const xAxis = d3.axisBottom(x)
            .tickFormat(timeFormat("%Y-%m-%d") as any);

        const yAxis = d3.axisLeft(y);

        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis);

        g.append("g")
            .call(yAxis);

        // Create candlesticks
        const candleWidth = innerWidth / data.length * 0.8;

        g.selectAll("line")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", d => x(d.date)!)
            .attr("x2", d => x(d.date)!)
            .attr("y1", d => y(d.low))
            .attr("y2", d => y(d.high))
            .attr("stroke", d => d.close >= d.open ? "green" : "red");

        g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.date)! - candleWidth / 2)
            .attr("y", d => y(Math.max(d.open, d.close)))
            .attr("width", candleWidth)
            .attr("height", d => Math.abs(y(d.close) - y(d.open)))
            .attr("fill", d => d.close >= d.open ? "green" : "red");

        // Add zoom behavior
        const zoomBehavior = zoom()
            .scaleExtent([0.5, 10])
            .translateExtent([[0, 0], [width, height]])
            .extent([[0, 0], [width, height]])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoomBehavior as any);

        setChartInstance(svg);

        return () => {
            if (svg) {
                svg.selectAll("*").remove();
            }
        };
    }, [data, width, height, margin]);

    return { svgRef, chartInstance };
};
