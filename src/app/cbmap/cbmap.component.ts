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

  colors = {
    'RUN': '#28a745',
    'CHK': '#e169b4',
    'IDLE': '#ffc107',
    'ALARM': '#ff0000',
    'MBD': '#ff0000',
    'READY': '#ffff00',
    'PAUSE': '#c6e0b4',
    'RPM': '#800080',
    'WAIT': '#c0c0c0',
  };

  itemMap: Map<string, any> = new Map<string, any>();
  itemPoint !: RectInfo[];
  itemDatas !: any[];
  svg!: d3.Selection<BaseType, unknown, HTMLElement, any>;
  selectData?: any;
  constructor(private dataService: CbdataService) { }

  ngOnInit(): void {
    this.initItemMap();
    this.initItemDetail();
    this.svg = d3.select('svg')
      .attr('width', 1623)
      .attr('height', 609);
    this.svg.append('g')
      .append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'gray');
    const adaptLabelFontSize = this.adaptLabelFontSize;
    const clickEvent = this.displayData;
    const sourceData = this.itemDatas;
    const container: d3.Selection<SVGGElement, unknown, HTMLElement, any> = this.svg.append('g').attr('id', 'container');
    var zoomed = (event: d3.D3ZoomEvent<SVGGElement, any>) => {
      container.attr('transform', event.transform.toString());
    };
    var zoom = d3.zoom()
      .extent([[0, 0], [1623, 609]])
      .scaleExtent([1, 4])
      .on('zoom', zoomed);
    this.svg.call(zoom as any);

    container.append('g')
      .attr('id', 'bg')
      .append('image')
      .attr('xlink:href', 'assets/4F SAW.bmp')
      .attr('width', 1623)
      .attr('height', 609)
      .attr('preserveAspectRatio', 'none');

    container.append('g')
      .attr('id', 'itemGroup')
      .selectAll('g')
      .data(Array.from(this.itemMap.values()), (d: any) => d.point.ItemId)
      .enter()
      .call(this.itemGenerator.bind(this), adaptLabelFontSize, clickEvent, sourceData, this.updateSelectData.bind(this))
  }

  initItemMap(): void {
    this.itemPoint = this.dataService.getData();
    this.itemPoint.forEach(item => {
      this.itemMap.set(item.ItemId, { point: item, detail: null });
    });
  }

  initItemDetail(): void {
    this.itemDatas = this.dataService.getItemData();
    this.itemDatas.forEach(item => {
      this.itemMap.get(item.EQPMainInfo.EQPId).detail = item;
    });
    (globalThis as any).data = this.itemMap;
  }

  itemGenerator(
    sel: d3.Selection<d3.EnterElement, any, d3.BaseType, any>,
    adapter: () => null | string,
    clickEvent: (eqpId: string, sourceData: any[], updateSelectData: Function) => null,
    sourceData: any[], selectData: any): void {
    const itemGroup = sel.append('g')
      .attr('class', 'item');
    const group = itemGroup.append('g')
      .attr('id', d => d.point.ItemId)
      .attr('width', d => +d.point.Width)
      .attr('height', d => +d.point.Height)
      .attr('cursor', 'pointer')
      .on('click', (event: any, d: any) => clickEvent(d.point.ItemId, sourceData, selectData))
      .attr('transform', d => { return 'translate(' + d.point.X + ',' + d.point.Y + ')'; });
    group.append('rect')
      .attr('width', d => +d.point.Width)
      .attr('height', d => +d.point.Height)
      .attr('rx', 5)
      .attr('fill', d => {
        return this.colors[d.detail.MergedStatus as 'RUN' | 'CHK' | 'IDLE' | 'ALARM' | 'MBD' | 'READY' | 'PAUSE' | 'RPM' | 'WAIT'];
      });
    group.append('text')
      .text(d => d.point.ItemId)
      .attr('text-anchor', 'middle')
      .attr('font-size', adapter)
      .attr('dx', d => +d.point.Width / 2)
      .attr('dy', d => +d.point.Height / 2);
  }
  adaptLabelFontSize(d: any) {
    var xPadding, diameter, labelAvailableWidth, labelWidth;
    xPadding = 8;
    diameter = +d.point.Width;
    labelAvailableWidth = diameter - xPadding;

    labelWidth = (this as any).getComputedTextLength();
    if (labelWidth < labelAvailableWidth) {
      return null;
    }
    return (labelAvailableWidth / labelWidth) + 'em';
  }

  displayData(eqpId: string, sourceData: any[], updateSelectData: Function) {
    let selectData = sourceData.find(item => item.EQPMainInfo.EQPId == eqpId);
    updateSelectData(selectData);
  }

  updateSelectData(newData: any) {
    this.selectData = newData;
  }
  onUpdateDataClick(): void {
    let newData = this.itemMap.get('DI3012J');
    newData = { ...newData };
    newData.detail = { ...newData.detail, MergedStatus: 'RUN' };
    newData.detail.MergedStatus = 'RUN';
    this.itemMap.set('DI3012J', newData);
    const itemGroups = this.svg.select('#container')
      .selectAll('#itemGroup')
      .selectAll('.item');
    itemGroups.selectAll('rect')
      .data(Array.from(this.itemMap.values()), (d: any) => d.point.ItemId)
      .attr('width', d => +d.point.Width)
      .attr('height', d => +d.point.Height)
      .attr('rx', 5)
      .attr('class', d => d.point.ItemId)
      .attr('fill', d => {
        return this.colors[d.detail.MergedStatus as 'RUN' | 'CHK' | 'IDLE' | 'ALARM' | 'MBD' | 'READY' | 'PAUSE' | 'RPM' | 'WAIT'];
      });
  }

  onSearchRunStatusClick(): void {
    const adaptLabelFontSize = this.adaptLabelFontSize;
    let searchData = Array.from(this.itemMap.values()).filter(item => item.detail.MergedStatus == 'RUN');
    const itemGroups = this.svg.select('#container')
      .selectAll('#itemGroup')
      .selectAll('.item');
    const rects = itemGroups.selectAll('rect')
      .data(searchData, (d: any) => d.point.ItemId);
    rects
      .attr('width', d => +d.point.Width)
      .attr('height', d => +d.point.Height)
      .attr('rx', 5)
      .attr('class', d => d.point.ItemId)
      .attr('fill', d => {
        return this.colors[d.detail.MergedStatus as 'RUN' | 'CHK' | 'IDLE' | 'ALARM' | 'MBD' | 'READY' | 'PAUSE' | 'RPM' | 'WAIT'];
      });
    rects.exit().remove();

    const texts = itemGroups.selectAll('text')
      .data(searchData, (d: any) => d.point.ItemId);
    texts
      .text(d => d.point.ItemId)
      .attr('text-anchor', 'middle')
      .attr('dx', d => +d.point.Width / 2)
      .attr('dy', d => +d.point.Height / 2);
    texts.exit().remove();
  }

  onResetClick(): void {
    const itemGroups = this.svg.select('#container')
      .selectAll('#itemGroup')
      .selectAll('.item');
    itemGroups.selectAll('rect')
      .data(Array.from(this.itemMap.values()), (d: any) => d.point.ItemId)
      .attr('width', d => +d.point.Width)
      .attr('height', d => +d.point.Height)
      .attr('rx', 5)
      .attr('class', d => d.point.ItemId)
      .attr('fill', d => {
        return this.colors[d.detail.MergedStatus as 'RUN' | 'CHK' | 'IDLE' | 'ALARM' | 'MBD' | 'READY' | 'PAUSE' | 'RPM' | 'WAIT'];
      });
  }
}
