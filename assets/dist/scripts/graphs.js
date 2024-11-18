function barGraph(t, a) {
    Highcharts.chart(a, {
        chart: {
            type: "column"
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            type: "category",
            labels: {
                style: {
                    color: "black",
                    fontSize: "12px",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif"
                }
            }
        },
        yAxis: {
            gridLineWidth: 0,
            title: {
                text: null
            },
            labels: {
                enabled: !1
            }
        },
        legend: {
            enabled: !1
        },
        plotOptions: {
            series: {
                color: "#008c44",
                pointWidth: 30,
                borderWidth: 0,
                dataLabels: {
                    enabled: !0,
                    format: "{point.y:.0f}",
                    style: {
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif"
                    }
                }
            }
        },
        credits: {
            enabled: !1
        },
        tooltip: {
            pointFormat: "<b>{point.y:.0f}</b> <br/>"
        },
        series: [{
            data: t
        }]
    })
}
function splineChart(t, a, e) {
    Highcharts.chart(e, {
        chart: {
            type: "spline"
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: t,
            labels: {
                style: {
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif"
                }
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                enabled: !1
            }
        },
        credits: {
            enabled: !1
        },
        legend: {
            enabled: !1
        },
        plotOptions: {
            spline: {
                dataLabels: {
                    enabled: !0,
                    backgroundColor: "black",
                    color: "white",
                    y: -25,
                    style: {
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif"
                    }
                },
                enableMouseTracking: !0
            }
        },
        series: [{
            tooltip: {
                pointFormat: "<b>{point.y:.1f}</b><br/>"
            },
            dataLabels: [{
                format: "{y} Cr"
            }],
            data: a,
            lineWidth: 5,
            color: "#44ab76"
        }]
    })
}
function profitTaxchart(t, a, e, l) {
    Highcharts.chart(l, {
        chart: {
            type: "column",
            marginBottom: 90
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: t,
            type: "category",
            labels: {
                style: {
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif"
                }
            }
        },
        yAxis: {
            gridLineWidth: 0,
            title: {
                text: null
            },
            labels: {
                enabled: !1
            }
        },
        legend: {
            enabled: !0,
            align: "left",
            y: 10,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 15,
            itemStyle: {
                fontSize: "15px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0
            },
            series: {
                borderWidth: 0,
                column: {
                    pointPadding: 0,
                    borderWidth: 0
                },
                dataLabels: {
                    enabled: !0,
                    format: "{point.y:.2f}",
                    style: {
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif"
                    }
                }
            }
        },
        credits: {
            enabled: !1
        },
        tooltip: {
            pointFormat: "<b>{point.y:.1f}</b><br/>"
        },
        series: [{
            name: e[0],
            color: "#ffff00",
            data: a[0].PBTData
        }, {
            name: e[1],
            color: "#008c44",
            data: a[1].PATData
        }]
    })
}
function prodPerformGraph(t, a, e, l) {
    Highcharts.chart(l, {
        chart: {
            type: "column"
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: t,
            type: "category",
            labels: {
                style: {
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif"
                }
            }
        },
        yAxis: {
            gridLineWidth: 0,
            title: {
                text: null
            },
            labels: {
                enabled: !1
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            y: 10,
            symbolRadius: 0,
            symbolHeight: 16,
            symbolWidth: 16,
            itemStyle: {
                fontSize: "16px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0
            },
            series: {
                borderWidth: 0,
                column: {
                    pointPadding: 0,
                    borderWidth: 0
                },
                dataLabels: {
                    enabled: !1,
                    format: "{point.y:.2f}",
                    style: {
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif"
                    }
                }
            }
        },
        credits: {
            enabled: !1
        },
        tooltip: {
            pointFormat: "<b>{point.y:.1f}</b> <br/>"
        },
        series: [{
            name: e[0],
            color: "#ffff00",
            data: a[0].prodPerformPBTData
        }, {
            name: e[1],
            color: "#008c44",
            data: a[1].prodPerformPATData
        }, {
            name: e[2],
            color: "#e1e1e1",
            data: a[2].prodPerformPCTData
        }]
    })
}
function prodPerformPieChart(t, a) {
    Highcharts.chart(a, {
        chart: {
            plotBackgroundColor: !0,
            plotBorderWidth: 0,
            plotShadow: !1,
            type: "pie",
            style: {
                fontFamily: "Montserrat, sans-serif"
            }
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        credits: {
            enabled: !1
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                dataLabels: {
                    enabled: !0,
                    distance: -80,
                    style: {
                        fontWeight: "300",
                        fontSize: "20px",
                        textOutline: !1
                    }
                },
                showInLegend: !0
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            y: 10,
            symbolRadius: 0,
            symbolHeight: 16,
            symbolWidth: 16,
            itemStyle: {
                fontSize: "16px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        series: [{
            tooltip: {
                pointFormat: "<b>{point.y:.1f}</b><br/>"
            },
            data: t
        }]
    })
}
function salesBarGraph(t, a, e, l) {
    Highcharts.chart(l, {
        chart: {
            type: "column"
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: t,
            type: "category",
            labels: {
                style: {
                    color: "black",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif"
                }
            }
        },
        yAxis: {
            gridLineWidth: 0,
            title: {
                text: null
            },
            labels: {
                enabled: !1
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            y: 10,
            symbolRadius: 0,
            symbolHeight: 16,
            symbolWidth: 16,
            itemStyle: {
                fontSize: "16px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0
            },
            series: {
                borderWidth: 0,
                column: {
                    pointPadding: 0,
                    borderWidth: 0
                },
                dataLabels: {
                    enabled: !1,
                    format: "{point.y:.2f}",
                    style: {
                        color: "black",
                        fontSize: "14px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif"
                    }
                }
            }
        },
        credits: {
            enabled: !1
        },
        tooltip: {
            pointFormat: "<b>{point.y:.1f}</b> <br/>"
        },
        series: [{
            name: e[0],
            color: "#ffff00",
            data: a[0].SBGBarPBTData
        }, {
            name: e[1],
            color: "#008c44",
            data: a[1].SBGBarPATData
        }, {
            name: e[2],
            color: "#e1e1e1",
            data: a[2].SBGBarPCTData
        }]
    })
}
function salesPieChart(t, a) {
    Highcharts.chart(a, {
        chart: {
            plotBackgroundColor: !0,
            plotBorderWidth: 0,
            plotShadow: !1,
            type: "pie",
            style: {
                fontFamily: "Montserrat, sans-serif"
            }
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        credits: {
            enabled: !1
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                dataLabels: {
                    enabled: !0,
                    distance: -80,
                    style: {
                        fontWeight: "300",
                        fontSize: "20px",
                        textOutline: !1
                    }
                },
                showInLegend: !0
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            y: 10,
            symbolRadius: 0,
            symbolHeight: 16,
            symbolWidth: 16,
            itemStyle: {
                fontSize: "16px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        series: [{
            tooltip: {
                pointFormat: "<b>{point.y:.1f}</b><br/>"
            },
            data: t
        }]
    })
}
function sales_bar_graph(t, a, e) {
    Highcharts.chart(e, {
        chart: {
            zoomType: "xy",
            marginBottom: 72,
            spacingBottom: 30
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: [{
            categories: t[0].yearData,
            crosshair: !0
        }],
        yAxis: [{
            labels: {
                format: "{value}%"
            },
            title: {
                text: null
            }
        }, {
            title: {
                text: null
            },
            labels: {
                format: "{value} "
            },
            opposite: !0
        }],
        tooltip: {
            shared: !0
        },
        legend: {
            enabled: !0,
            itemMarginBottom: 7,
            align: "center",
            verticalAlign: "top",
            itemStyle: {
                fontSize: "15px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        credits: {
            enabled: !1
        },
        series: [{
            name: a[0],
            type: "column",
            yAxis: 1,
            color: "#008c44",
            data: t[0].Production_Lakh_T,
            tooltip: {
                valueSuffix: " L"
            },
            animation: {
                duration: 3e3
            }
        }, {
            name: a[1],
            type: "spline",
            color: "#000000",
            data: t[0].Cap_Uti,
            tooltip: {
                valueSuffix: "%"
            }
        }]
    })
}
function spline_chartsPU(t, a, e, l) {
    Highcharts.chart(l, {
        chart: {
            type: "spline"
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: t,
            labels: {
                style: {
                    color: "black",
                    fontSize: "9px",
                    fontWeight: "bold",
                    fontFamily: "Montserrat, sans-serif"
                }
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                enabled: !1
            }
        },
        credits: {
            enabled: !1
        },
        legend: {
            enabled: !0,
            align: "center",
            y: 10,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolWidth: 15,
            itemStyle: {
                fontSize: "15px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        plotOptions: {
            spline: {
                dataLabels: {
                    enabled: !0,
                    backgroundColor: "black",
                    color: "white",
                    y: -25,
                    style: {
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                        fontFamily: "Montserrat, sans-serif"
                    }
                },
                enableMouseTracking: !0
            }
        },
        series: [{
            name: e[0],
            color: "#ffff00",
            fontWeight: "normal",
            dataLabels: [{
                format: "{y}"
            }],
            data: a,
            lineWidth: 3,
            color: "#44ab76",
            animation: {
                duration: 3e3
            }
        }]
    })
}
function salesBarGraphOnlyProd(t, a, e) {
    Highcharts.chart(e, {
        chart: {
            zoomType: "xy",
            marginBottom: 72
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: [{
            categories: t[0].yearData,
            crosshair: !0,
            labels: {
                style: {
                    color: "black",
                    fontSize: "9px",
                    fontFamily: "Montserrat, sans-serif"
                }
            }
        }],
        yAxis: [{
            labels: {
                format: "{value}%"
            },
            title: {
                text: null
            }
        }, {
            title: {
                text: null
            },
            labels: {
                format: "{value} "
            },
            opposite: !0
        }],
        tooltip: {
            shared: !0
        },
        legend: {
            enabled: !0,
            align: "center",
            y: 10,
            verticalAlign: "bottom",
            itemStyle: {
                fontSize: "15px",
                color: "#000",
                fontWeight: "200",
                fontFamily: "Montserrat, sans-serif"
            }
        },
        credits: {
            enabled: !1
        },
        series: [{
            name: a[0],
            type: "column",
            yAxis: 1,
            color: "#008c44",
            data: t[0].Production_Lakh_T,
            tooltip: {
                valueSuffix: " L"
            },
            animation: {
                duration: 3e3
            }
        }]
    })
}
!function(t) {
    var a = [];
    function e(t) {
        var a = t.getBoundingClientRect();
        return a.top >= 0 && a.left >= 0 && a.bottom <= (window.innerHeight || document.documentElement.clientHeight) && a.right <= (window.innerWidth || document.documentElement.clientWidth)
    }
    function l() {
        a.forEach(function(l) {
            e(l.element) && (l.appear(),
            t.erase(a, l))
        })
    }
    t.wrap(t.Series.prototype, "render", function t(l) {
        var r = this
          , o = this.chart.container.parentNode;
        e(o) || !r.options.animation ? l.call(r) : a.push({
            element: o,
            appear: function() {
                l.call(r)
            }
        })
    }),
    window.addEventListener && ["DOMContentLoaded", "load", "scroll", "resize"].forEach(function(t) {
        addEventListener(t, l, !1)
    })
}(Highcharts),
$(window).on("load", function() {
    console.log("Test");
    try {
        if (window.location.href.indexOf("/statistics-and-financial-reports") >= 0)
            try {
                $.get("/api/getSFRChartNew?url=/financial-statics-report-chart", function(t, a) {
                    if (a) {
                        let e = t.content.field_chart_data
                          , l = [];
                        e[0] && e[0].evolution_of_cooperative_chart.data.forEach( (t, a) => {
                            l.push({
                                name: t.year,
                                y: parseInt(t.value)
                            })
                        }
                        ),
                        barGraph(l, "evolution-graph");
                        let r = []
                          , o = [];
                        e[1] && e[1].spline_charts.data.forEach( (t, a) => {
                            r.push(t.year),
                            o.push(parseInt(t.value))
                        }
                        ),
                        splineChart(r, o, "market-cap-graph");
                        let i = []
                          , n = []
                          , s = []
                          , c = [];
                        e[2] && e[2].bar_graph_chart.data.forEach( (t, a) => {
                            t.year && i.push(t.year),
                            t.category && t.category.forEach(t => {
                                n.push(parseFloat(t.PBT)),
                                s.push(parseFloat(t.PAT))
                            }
                            ),
                            t.labels && t.labels.field_value.forEach(t => {
                                c.push(t)
                            }
                            )
                        }
                        ),
                        profitTaxchart(i, [{
                            PBTData: n
                        }, {
                            PATData: s
                        }], c, "profit-taxchart");
                        let h = []
                          , p = []
                          , d = []
                          , f = []
                          , u = [];
                        e[3] && e[3].production_performance_chart.data.forEach( (t, a) => {
                            t.year && h.push(t.year),
                            t.category && t.category.forEach(t => {
                                p.push(parseFloat(t.PBT)),
                                d.push(parseFloat(t.PAT)),
                                f.push(parseFloat(t.PCT))
                            }
                            ),
                            t.labels && t.labels.field_value.forEach(t => {
                                u.push(t)
                            }
                            )
                        }
                        ),
                        prodPerformGraph(h, [{
                            prodPerformPBTData: p
                        }, {
                            prodPerformPATData: d
                        }, {
                            prodPerformPCTData: f
                        }], u, "production-performance-chart");
                        let b = [];
                        e[4] && e[4].pie_chart_main.data.forEach( (t, a) => {
                            t.labels || b.push({
                                name: t.name,
                                color: t.color,
                                y: parseFloat(t.value),
                                sliced: t.selected
                            })
                        }
                        ),
                        prodPerformPieChart(b, "prod-performance-pie");
                        let y = []
                          , g = []
                          , m = []
                          , _ = []
                          , x = [];
                        e[5] && e[5].sales_bar_graph_data.data.forEach( (t, a) => {
                            t.year && y.push(t.year),
                            t.category && t.category.forEach(t => {
                                g.push(parseInt(t.PBT)),
                                m.push(parseInt(t.PAT)),
                                _.push(parseInt(t.PCT))
                            }
                            ),
                            t.labels && t.labels.field_value.forEach(t => {
                                x.push(t)
                            }
                            )
                        }
                        ),
                        salesBarGraph(y, [{
                            SBGBarPBTData: g
                        }, {
                            SBGBarPATData: m
                        }, {
                            SBGBarPCTData: _
                        }], x, "sales-performance-chart");
                        let S = [];
                        e[6] && e[6].sales_pie_chart.data.forEach( (t, a) => {
                            t.labels || S.push({
                                name: t.name,
                                color: t.color,
                                y: parseFloat(t.value),
                                sliced: t.selected
                            })
                        }
                        ),
                        salesPieChart(S, "sales-performance-pie")
                    }
                })
            } catch (t) {
                console.log(t)
            }
        if ($("#kalol-chart-left").length || $("#kalol-chart-right").length)
            try {
                $.get("/api/getSFRChartNew?url=/production_units-kalol-chart", function(t, a) {
                    if (a) {
                        let e = t.content.field_chart_data
                          , l = []
                          , r = []
                          , o = []
                          , i = []
                          , n = [];
                        l.push({
                            yearData: r,
                            Production_Lakh_T: o,
                            Cap_Uti: i
                        }),
                        e[0] && e[0].sales_bar_graph_data.data.forEach( (t, a) => {
                            t.category && (r.push(t.year),
                            o.push(parseFloat(t.category[0].Production_Lakh_T)),
                            i.push(parseFloat(t.category[0].Cap_Uti))),
                            t.labels && t.labels.field_value.forEach(t => {
                                n.push(t)
                            }
                            )
                        }
                        ),
                        sales_bar_graph(l, n, "kalol-chart-left");
                        let s = []
                          , c = []
                          , h = [];
                        e[1] && e[1].spline_charts.data.forEach( (t, a) => {
                            t.labels || (s.push(t.year),
                            c.push(parseFloat(t.Sp_Energy_Gcall_MT))),
                            t.labels && t.labels.field_value.forEach(t => {
                                h.push(t)
                            }
                            )
                        }
                        ),
                        spline_chartsPU(s, c, h, "kalol-chart-right")
                    }
                })
            } catch (a) {
                console.log(a)
            }
        if ($("#aonla-chart-left1").length || $("#aonla-chart-left1").length)
            try {
                $.get("/api/getSFRChartNew?url=/production_units-aonla-chart", function(t, a) {
                    if (a) {
                        let e = t.content.field_chart_data
                          , l = []
                          , r = []
                          , o = []
                          , i = []
                          , n = [];
                        l.push({
                            yearData: r,
                            Production_Lakh_T: o,
                            Cap_Uti: i
                        }),
                        e[0] && e[0].sales_bar_graph_data.data.forEach( (t, a) => {
                            t.category && (r.push(t.year),
                            o.push(parseFloat(t.category[0].Production_Lakh_T)),
                            i.push(parseFloat(t.category[0].Cap_Uti))),
                            t.labels && t.labels.field_value.forEach(t => {
                                n.push(t)
                            }
                            )
                        }
                        ),
                        sales_bar_graph(l, n, "aonla-chart-left1");
                        let s = []
                          , c = []
                          , h = [];
                        if (e[1] && e[1].spline_charts.data.forEach( (t, a) => {
                            t.labels || (s.push(t.year),
                            c.push(parseFloat(t.Sp_Energy_Gcall_MT))),
                            t.labels && t.labels.field_value.forEach(t => {
                                h.push(t)
                            }
                            )
                        }
                        ),
                        spline_chartsPU(s, c, h, "aonla-chart-right1"),
                        e[2].sales_bar_graph_data) {
                            let p = []
                              , d = []
                              , f = []
                              , u = []
                              , b = [];
                            p.push({
                                yearData: d,
                                Production_Lakh_T: f,
                                Cap_Uti: u
                            }),
                            e[2] && e[2].sales_bar_graph_data.data.forEach( (t, a) => {
                                t.category && (d.push(t.year),
                                f.push(parseFloat(t.category[0].Production_Lakh_T)),
                                u.push(parseFloat(t.category[0].Cap_Uti))),
                                t.labels && t.labels.field_value.forEach(t => {
                                    b.push(t)
                                }
                                )
                            }
                            ),
                            sales_bar_graph(p, b, "aonla-chart-left2"),
                            console.log(p)
                        }
                        if (e[3].spline_charts) {
                            let y = []
                              , g = []
                              , m = [];
                            e[3] && e[3].spline_charts.data.forEach( (t, a) => {
                                t.labels || (y.push(t.year),
                                g.push(parseFloat(t.Sp_Energy_Gcall_MT))),
                                t.labels && t.labels.field_value.forEach(t => {
                                    m.push(t)
                                }
                                )
                            }
                            ),
                            spline_chartsPU(y, g, m, "aonla-chart-right2")
                        }
                    }
                })
            } catch (e) {
                console.log(e)
            }
        if ($("#kandla-chart-left").length)
            try {
                $.get("/api/getSFRChartNew?url=/production_units-kandla-chart", function(t, a) {
                    if (a) {
                        let e = t.content.field_chart_data
                          , l = []
                          , r = []
                          , o = []
                          , i = [];
                        l.push({
                            yearData: r,
                            Production_Lakh_T: o
                        }),
                        e[0] && e[0].sales_bar_graph_data.data.forEach( (t, a) => {
                            t.category && (r.push(t.year),
                            o.push(parseFloat(t.category[0].Production_Lakh_T))),
                            t.labels && t.labels.field_value.forEach(t => {
                                i.push(t)
                            }
                            )
                        }
                        ),
                        salesBarGraphOnlyProd(l, i, "kandla-chart-left")
                    }
                })
            } catch (l) {
                console.log(l)
            }
    } catch (r) {
        console.log(r)
    }
    if ($("#phulpur-chart-left1").length || $("#phulpur-chart-right1").length)
        try {
            $.get("/api/getSFRChartNew?url=/production_units-phulpur-chart", function(t, a) {
                if (a) {
                    let e = t.content.field_chart_data
                      , l = []
                      , r = []
                      , o = []
                      , i = []
                      , n = [];
                    l.push({
                        yearData: r,
                        Production_Lakh_T: o,
                        Cap_Uti: i
                    }),
                    e[0] && e[0].sales_bar_graph_data.data.forEach( (t, a) => {
                        t.category && (r.push(t.year),
                        o.push(parseFloat(t.category[0].Production_Lakh_T)),
                        i.push(parseFloat(t.category[0].Cap_Uti))),
                        t.labels && t.labels.field_value.forEach(t => {
                            n.push(t)
                        }
                        )
                    }
                    ),
                    console.log("x ", l),
                    sales_bar_graph(l, n, "phulpur-chart-left1");
                    let s = []
                      , c = []
                      , h = [];
                    if (e[1] && e[1].spline_charts.data.forEach( (t, a) => {
                        t.labels || (s.push(t.year),
                        c.push(parseFloat(t.Sp_Energy_Gcall_MT))),
                        t.labels && t.labels.field_value.forEach(t => {
                            h.push(t)
                        }
                        )
                    }
                    ),
                    spline_chartsPU(s, c, h, "phulpur-chart-right1"),
                    e[2].sales_bar_graph_data) {
                        let p = []
                          , d = []
                          , f = []
                          , u = []
                          , b = [];
                        p.push({
                            yearData: d,
                            Production_Lakh_T: f,
                            Cap_Uti: u
                        }),
                        e[2] && e[2].sales_bar_graph_data.data.forEach( (t, a) => {
                            t.category && (d.push(t.year),
                            f.push(parseFloat(t.category[0].Production_Lakh_T)),
                            u.push(parseFloat(t.category[0].Cap_Uti))),
                            t.labels && t.labels.field_value.forEach(t => {
                                b.push(t)
                            }
                            )
                        }
                        ),
                        sales_bar_graph(p, b, "phulpur-chart-left2")
                    }
                    if (e[3].spline_charts) {
                        let y = []
                          , g = []
                          , m = [];
                        e[3] && e[3].spline_charts.data.forEach( (t, a) => {
                            t.labels || (y.push(t.year),
                            g.push(parseFloat(t.Sp_Energy_Gcall_MT))),
                            t.labels && t.labels.field_value.forEach(t => {
                                m.push(t)
                            }
                            )
                        }
                        ),
                        spline_chartsPU(y, g, m, "phulpur-chart-right2")
                    }
                }
            })
        } catch (o) {
            console.log(o)
        }
    if ($("#paradeep-chart-left").length || $("#paradeep-chart-right").length)
        try {
            $.get("/api/getSFRChartNew?url=/production_units-paradeep-chart", function(t, a) {
                if (a) {
                    let e = t.content.field_chart_data
                      , l = []
                      , r = []
                      , o = []
                      , i = []
                      , n = [];
                    l.push({
                        yearData: r,
                        Production_Lakh_T: o,
                        Cap_Uti: i
                    }),
                    e[0] && e[0].sales_bar_graph_data.data.forEach( (t, a) => {
                        t.category && (r.push(t.year),
                        o.push(parseFloat(t.category[0].Production_Lakh_T)),
                        i.push(parseFloat(t.category[0].Cap_Uti))),
                        t.labels && t.labels.field_value.forEach(t => {
                            n.push(t)
                        }
                        )
                    }
                    ),
                    sales_bar_graph(l, n, "paradeep-chart-left");
                    let s = []
                      , c = []
                      , h = [];
                    e[1] && e[1].spline_charts.data.forEach( (t, a) => {
                        t.labels || (s.push(t.year),
                        c.push(parseFloat(t.Sp_Energy_Gcall_MT))),
                        t.labels && t.labels.field_value.forEach(t => {
                            h.push(t)
                        }
                        )
                    }
                    ),
                    spline_chartsPU(s, c, h, "paradeep-chart-right")
                }
            })
        } catch (i) {
            console.log(i)
        }
});
