import { RectInfo } from './../model/rect';
import { CbdataService } from './../cbdata.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BaseType } from 'd3';

@Component({
  selector: 'app-cbmap',
  templateUrl: './cbmap.component.html',
  styleUrls: ['./cbmap.component.scss']
})
export class CBMapComponent implements OnInit {

  data !: RectInfo[];
  svg!: d3.Selection<BaseType, unknown, HTMLElement, any>;
  constructor(private dataService: CbdataService) { }

  ngOnInit(): void {
    this.data = this.dataService.getData();
    const adaptLabelFontSize = this.adaptLabelFontSize;

    this.svg = d3.select('svg')
      .attr('width', 1623)
      .attr('height', 609);
    this.svg.append('g')
      .attr('id','bg')
      .append('image')
      .attr('xlink:href','assets/4F SAW.bmp')
      .attr('width',1623)
      .attr('height',609)
      .attr('preserveAspectRatio','none');
    this.svg
      .selectAll('g')
      .data(this.data)
      .enter()
      .call(this.itemGenerator,adaptLabelFontSize)

  }

  itemGenerator(sel: d3.Selection<d3.EnterElement, RectInfo, d3.BaseType, any>,adapter: () => null|string): void {
    const group = sel.append('g')
      .attr('id', d => d.ItemId)
      .attr('width', d => +d.Width)
      .attr('height', d => +d.Height)
      .attr('transform', d => { return 'translate(' + d.X + ',' + d.Y + ')'; });
    group.append('rect')
      .attr('width', d => +d.Width)
      .attr('height', d => +d.Height)
      .attr('fill', 'pink');
    group.append('text')
      .text(d => d.ItemId)
      .attr('text-anchor', 'middle')
      .attr('font-size', adapter)
      .attr('dx', d => +d.Width / 2)
      .attr('dy', d => +d.Height / 2);
  }

  adaptLabelFontSize(d: RectInfo) {
    var xPadding, diameter, labelAvailableWidth, labelWidth;
    xPadding = 8;
    diameter = +d.Width;
    labelAvailableWidth = diameter - xPadding;

    labelWidth = (this as any).getComputedTextLength();
    if (labelWidth < labelAvailableWidth) {
      return null;
    }
    return (labelAvailableWidth / labelWidth) + 'em';
  }
}
