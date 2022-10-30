import {Card, CardBody, CardHeader} from "reactstrap";
import {Bar} from "react-chartjs-2";
import React from "react";


export function BarChart(props) {

    const chartOptions = {
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                backgroundColor: "#f5f5f5",
                titleFontColor: "#333",
                bodyFontColor: "#666",
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest",
            },
            responsive: true,
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(225,78,202,0.1)",
                            zeroLineColor: "transparent",
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: props.maxCategoryValue,
                            padding: 20,
                            fontColor: "#9e9e9e",
                        },
                    },
                ],
                xAxes: [
                    {
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(255,255,255,0.1)",
                            zeroLineColor: "transparent",
                        },
                        ticks: {
                            padding: 20,
                            fontColor: "#9e9e9e",
                        },
                    },
                ],
            },
        },
    }
    const data = (canvas) => {

        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

        return {

            labels: props.categoryArray,
            datasets: [
                {
                    label: "Kategori",
                    fill: true,
                    backgroundColor: gradientStroke,
                    hoverBackgroundColor: gradientStroke,
                    borderColor: "#ff00e3",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: props.categoryData,
                },
            ],
        };
    }

    return (

        <div id="graph">
            <Card>
                <CardHeader>
                    <h3 className="card-category" id="label" style={{marginLeft: 20, marginBottom: 50}}>Kategori
                        Verileri</h3>
                </CardHeader>
                <CardBody>
                    <div className="chart-area" style={{
                        width: "380px",
                        height: "350px"
                    }}>
                        <Bar
                            data={data}
                            options={chartOptions.options}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}