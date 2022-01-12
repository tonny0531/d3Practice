import { RectInfo } from './../model/rect';
import { CbdataService } from './../cbdata.service';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BaseType, ZoomedElementBaseType } from 'd3';

@Component({
  selector: 'app-cbmap',
  templateUrl: './cbmap.component.html',
  styleUrls: ['./cbmap.component.scss']
})
export class CBMapComponent implements OnInit {

  itemPoint !: RectInfo[];
  itemDatas !: any[];
  svg!: d3.Selection<BaseType, unknown, HTMLElement, any>;
  selectData?: any;
  constructor(private dataService: CbdataService) { }

  ngOnInit(): void {
    this.itemPoint = this.dataService.getData();
    this.itemDatas = this.dataService.getItemData();
    this.svg = d3.select('svg')
      .attr('width', 1623)
      .attr('height', 609);

    const adaptLabelFontSize = this.adaptLabelFontSize;
    const clickEvent = this.displayData;
    const sourceData = this.itemDatas;
    const selectData = this.selectData;
    const container: d3.Selection<SVGGElement, unknown, HTMLElement, any> = this.svg.append('g').attr('id', 'container');
    var zoomed = (event: d3.D3ZoomEvent<SVGGElement, any>) => {
      container.attr('transform', event.transform.toString());
    };
    var zoom = d3.zoom()
      .extent([[0, 0], [1623, 609]])
      .scaleExtent([1, 4])
      .on('zoom', zoomed);
    this.svg.call(zoom as any);
    // container.append('g')
    //   .append('rect')
    //   .attr('width', 1623)
    //   .attr('height', 609)
    //   .attr('fill','gray');
    container.append('g')
      .attr('id', 'bg')
      .append('image')
      .attr('xlink:href', 'assets/4F SAW.bmp')
      .attr('width', 1623)
      .attr('height', 609)
      .attr('preserveAspectRatio', 'none');

    container
      .selectAll('#itemGroup')
      .data(this.itemPoint)
      .enter()
      .call(this.itemGenerator, adaptLabelFontSize, clickEvent,sourceData, this.updateSelectData.bind(this))
  }



  itemGenerator(
    sel: d3.Selection<d3.EnterElement, RectInfo, d3.BaseType, any>,
    adapter: () => null | string,
    clickEvent: (eqpId: string, sourceData: any[], updateSelectData :Function) => null,
    sourceData: any[], selectData:any): void {
    const group = sel.append('g')
      .attr('id', d => d.ItemId)
      .attr('width', d => +d.Width)
      .attr('height', d => +d.Height)
      .attr('cursor','pointer')
      .on('click', (event : any, d : any) => clickEvent(d.ItemId,sourceData, selectData))
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

  displayData(eqpId: string, sourceData: any[], updateSelectData: Function){
    // console.log(eqpId);
    // console.log(sourceData);
    let selectData = sourceData.find(item => item.EQPMainInfo.EQPId == eqpId);
    updateSelectData(selectData);
    console.log(selectData);
  }

  updateSelectData(newData: any){
    this.selectData = newData;
  }
}
