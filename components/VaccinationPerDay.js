import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Chart from "chart.js";

let chart;

const VaccinationStats = () => {

    const [data, setData] = useState({});
    const [values, setValues] = useState("");
    const [keys, setKeys] = useState("");

    useEffect(() => {
        
        if (chart != undefined) { chart.destroy(); }

        const ctx = document.getElementById("vaccinationStats");

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: keys,
                datasets: [
                    {
                        label: `Numero de vacunados`,
                        data: values,
                        borderColor: "#52c41a",
                        backgroundColor: "rgba(246, 255, 237, 0.5)"
                    },
                ],
            },
        });
    }, [values, keys])

    useEffect(() => {
        var tmpValues = Object.values(data);
        var tmpKeys = Object.keys(data);
        
        setValues(tmpValues);
        setKeys(tmpKeys);

    }, [data]);

    useEffect(() => {
        fetch(
            `https://corona.lmao.ninja/v3/covid-19/vaccine/coverage/countries/argentina`
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data.timeline);
            });
    }, []);

    return (
        <>
            <Row justify="left">
            </Row>
            <Row justify="center">
                <Col span={18}>
                    <canvas id="vaccinationStats" width="1280"></canvas>
                </Col>
            </Row>
        </>
    );
};

export default VaccinationStats;
