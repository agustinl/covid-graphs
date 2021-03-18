import React, { useState, useEffect } from "react";
import Chart from "chart.js";

let chart;

const DeathCases = () => {

    const [data, setData] = useState({});
    const [values, setValues] = useState("");
    const [keys, setKeys] = useState("");

    useEffect(() => {

        const ctx = document.getElementById("deathsCases");

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: keys,
                datasets: [
                    {
                        label: 'Fallecidos por día',
                        data: values,
                        lineTension: 0,
                        fill: false,
                        borderColor: '#f00100'
                    },
                ],
            },
        });
    }, [values, keys])

    useEffect(() => {
        var tmpValues = Object.values(data);
        var tmpKeys = Object.keys(data).slice(1, 30);        

        tmpValues = diff(tmpValues).slice(1, 30);
        setValues(tmpValues);
        setKeys(tmpKeys);

    }, [data]);

    useEffect(() => {
        fetch(
            `https://corona.lmao.ninja/v3/covid-19/historical/argentina`
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data.timeline.deaths);
            });
    }, []);

    function diff(ary) {
        var newA = [];
        for (var i = 0; i < ary.length; i++) newA.push(ary[i] - ary[i - 1]);
        return newA;
    }

    return (
        <canvas id="deathsCases"></canvas>
    );
};

export default DeathCases;
