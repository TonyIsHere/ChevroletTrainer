import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis } from "recharts";

function ChartTraining() {
    const [stat, setStat] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/api/trainings');
            const data = await response.json();
            let statFetch = []
            console.log(data.content);
            data.content.forEach(element => {
                let name = element.activity;
                let value = element.duration;

                if (statFetch.find(x => x.name === name)) {
                    statFetch.find(x => x.name === name).value += value;
                }
                else {
                    statFetch.push({ name: name, value: value })
                }
            });

            console.log(statFetch)
            setStat(statFetch)
        }
        catch (error) {
            console.error(error);
        }
    }


    React.useEffect(_ => fetchData(), []);

    return (
        <>
            <h1>Chart stat</h1>
            <BarChart width={1000} height={500} data={stat}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </>
    );
}
export default ChartTraining;