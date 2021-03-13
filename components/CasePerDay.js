import React, { useState, useEffect } from "react";
import { Row, Col, Select } from "antd";
import Chart from "chart.js";

const { Option } = Select;

let chart;

const ProgressStats = () => {
    const [data, setData] = useState({});
    const [select, setSelect] = useState("Confirmed");
    const [values, setValues] = useState("");
    const [keys, setKeys] = useState("");
    const [label, setLabel] = useState("confirmados");

    useEffect(() => {
        
        if (chart != undefined) { chart.destroy(); }

        const ctx = document.getElementById("progressStats");

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: keys,
                datasets: [
                    {
                        label: `Numero de ${label}`,
                        data: values,
                        lineTension: 0,
                        fill: false,
                        borderColor: "#1890ff",
                    },
                ],
            },
        });
    }, [values, keys])

    useEffect(() => {
        var tmpValues = Object.values(data).slice(0, 30).reverse();
        var tmpKeys = Object.keys(data).slice(0, 29).reverse();
        

        tmpValues = diff(tmpValues);
        setValues(tmpValues);
        setKeys(tmpKeys);

    }, [data]);

    useEffect(() => {
        fetch(
            `https://covid-api.mmediagroup.fr/v1/history?country=Argentina&status=${select}`
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data.All.dates);
            });
    }, [select]);

    function diff(ary) {
        var newA = [];
        for (var i = 1; i < ary.length; i++) newA.push(ary[i] - ary[i - 1]);
        return newA;
    }

    function handleChange(value) {
        if (value == "Confirmed") {
            setLabel("confirmados");
        } else {
            setLabel("fallecidos");
        }
        setSelect(value);
    }

    return (
        <>
            <Row justify="left">
                <Col span={4}>
                    <Select
                        defaultValue={select}
                        style={{ width: 180 }}
                        onChange={handleChange}
                    >
                        <Option value="Confirmed">Confirmados</Option>
                        <Option value="Deaths">Fallecidos</Option>
                    </Select>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={18}>
                    <canvas id="progressStats" width="1280"></canvas>
                </Col>
            </Row>
        </>
    );
};

export default ProgressStats;
