import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { CbdataService } from '../cbdata.service';
import { RectInfo } from '../model/rect';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent implements OnInit {

  data !: RectInfo[];

  constructor(private dataService: CbdataService) { }


  ngOnInit(): void {
    this.data = this.dataService.getData();
    this.makeSticker();
  }
  log(this:any){
    console.log(this);
    // console.log(this.getComputedTextLength())
  }
  sticker(sel: any, label: string) {                                  //<1>
    sel.append("rect").attr("rx", 5).attr("ry", 5)          //<2>
      .attr("width", 70).attr("height", 30)
      .attr("x", -35).attr("y", -15)
      .attr("fill", "none").attr("stroke", "blue")
      .classed("frame", true);                                //<3>

    sel.append("text").attr("x", 0).attr("y", 5)            //<4>
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif").attr("font-size", 14)
      .classed("label", true)
      .text(label ? label : (d:any) => d)
      .style('font-size', function(this:any,d:any){
        // console.log(this);
        console.log(this.getComputedTextLength)
      })
      // .call(function(test:any){
      //   console.log(test);
      // })                          //<5>
  }



  makeSticker(): void {
    var labels = ["Hello", "World", "How", "Are", "You?"];
    var scX = d3.scaleLinear()
      .domain([0, labels.length - 1]).range([100, 500]);
    var scY = d3.scaleLinear()
      .domain([0, labels.length - 1]).range([50, 150]);

    d3.select("#sticker")                                       //<6>
      .selectAll("g").data(labels).enter().append("g")
      .attr("transform",
        (d, i) => "translate(" + scX(i) + "," + scY(i) + ")")
      .call(this.sticker);

    d3.select("#sticker").append("g")                         //<7>
      .attr("transform", "translate(75,150)")
      .call(this.sticker, "I'm fine!")
      .selectAll(".label").attr("fill", "red");             //<8>
  }

}
