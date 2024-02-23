import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
    chartInitialized = false;

    @Input() divName = "";
    @Input() categoryName = "";
    @Input() data = [];

    private root!: am5.Root;
    private series!: any;
    private chart!: any;
    private xAxis!: any;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {

        if(changes['data'].previousValue != changes['data'].currentValue && this.chartInitialized){
            this.series.data.setAll(this.data);
            this.xAxis.data.setAll(this.data);
        }
    }

    initChart() {

        let root = am5.Root.new(this.divName);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        this.chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft: 0,
            paddingRight: 1
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = this.chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            minorGridEnabled: true
        });

        xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        xRenderer.grid.template.setAll({
            location: 1
        })

        this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: this.categoryName,
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        let yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1
        })

        let yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: yRenderer
        }));

        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        this.series = this.chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: this.xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: this.categoryName,
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        this.series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        this.series.columns.template.adapters.add("fill",  (fill: any, target: any) => {
            return this.chart?.get("colors")?.getIndex(this.series.columns.indexOf(target));
        });

        this.series.columns.template.adapters.add("stroke",  (stroke: any, target: any) => {
            return this.chart?.get("colors")?.getIndex(this.series.columns.indexOf(target));
        });

        this.xAxis.data.setAll(this.data);
        this.series.data.setAll(this.data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        this.series.appear(1000);
        this.chart.appear(1000, 100);

        this.chartInitialized = true;
    }

    ngAfterViewInit() {
        this.initChart();
    }

    ngOnDestroy() {
        if (this.root) {
            this.root.dispose();
        }
    }
}
