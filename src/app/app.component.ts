import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'd3';
  data: number[] = [];
  width = 420;
  ngOnInit(): void {
      this.randomData();
      this.svgBindData();
  }

  svgBindData(): void {
    let x = d3.scaleLinear()
              .domain([0, d3.max(this.data) as number])
              .range([0,this.width]);
    let y = d3.scaleBand()
              .domain(d3.range(this.data.length) as any)
              .range([0, 20 * this.data.length])
    const svg = d3.select("svg")
          .attr("width", this.width)
          .attr("height", y.range()[1])
          .attr("font-family", "sans-serif")
          .attr("font-size", "10")
          .attr("text-anchor", "end");

      const bar = svg.selectAll("g")
        .data(this.data)
        .join("g")
          .attr("transform", (d, i: any) => `translate(0,${y(i)})`);

      bar.append("rect")
          .attr("fill", "steelblue")
          .attr("width", x)
          .attr("height", y.bandwidth() - 1);

      bar.append("text")
          .attr("fill", "white")
          .attr("x", d => x(d) - 3)
          .attr("y", (y.bandwidth() - 1) / 2)
          .attr("dy", "0.35em")
          .text(d => d);
  }

  randomData():void {
    let newData: number[] = [];
    let length = Math.floor(Math.random() * 10);
    for (let i =0; i <length; i++ ){
      newData.push(Math.floor(Math.random()*100));
    }
    this.data = newData;
  }
}
