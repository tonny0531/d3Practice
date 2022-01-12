import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { zoom } from 'd3';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {
  w = 800;
  h = 600;
  data!: { x: number, y: number, r: number }[];
  constructor() { }

  ngOnInit(): void {
    this.createData();
    const svg = d3.select('body')
      .append('svg')
      .attr('viewBox', [0, 0, this.w, this.h])
      // .attr('width', 400)
      // .attr('height', 300)
      .style('border', '1px solid #000');
    var zoom = d3.zoom()
      .extent([[0, 0], [this.w, this.h]])
      .scaleExtent([1, 8])
      .on('zoom', zoomed)
      .on('start', click);

    function zoomed(trans: any) {
      svg.attr('transform', trans.transform);
    }
    function click(trans: any) {
      console.log('click');
    }

    svg.call(zoom as any);
    const g = svg.append('g')
    .attr('width',this.w)
    .attr('height',this.h);

    g.selectAll("circle")
      .data(this.data)
      .join('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r);
  }

  createData(): void {
    const length = this.getRandom(1000, 10000);
    console.log(length);
    this.data = [];
    for (let i = 0; i < length; i++) {
      this.data.push(this.makeFakeData());
    }
  }

  makeFakeData(): { x: number, y: number, r: number } {
    return { x: this.getRandom(0, this.w), y: this.getRandom(0, this.h), r: this.getRandom(1, 10) }
  }

  getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
