import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import ConfirmCases from "../components/ConfirmCases";
import DeathCases from "../components/DeathsCases";
import RecoveredCases from "../components/RecoveredCases";
import Header from "../components/Header";

const Home = ({ data }) => {
    const [date, setDate] = useState("");

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    useEffect(() => {
        var d = new Date(data.updated);
        const year = d.getFullYear();
        const day = d.getDate();
        const monthIndex = d.getMonth();
        const monthName = months[monthIndex];

        setDate(day + " de " + monthName + " del " + year);
    }, []);

	const percentageOfPopulation = ((data.cases * 100) / data.population).toFixed(2);
    const recoveredCasePercentage = ((data.recovered * 100) / data.cases).toFixed(2);
    const deathsCasePercentage = ((data.deaths * 100) / data.cases).toFixed(2);

    return (
        <Layout>

			<Header
				update={data.updated}
				country={data.country}
				flag={data.countryInfo.flag}
				population={data.population}
			/>
			
			<section>
				<div className="leftSide">
					<h3>Casos Confirmados</h3>
					<h2>{new Intl.NumberFormat('de-DE').format(data.cases)}</h2>
					<h3>Activos</h3>
					<h2>{new Intl.NumberFormat('de-DE').format(data.active)}</h2>

					<div className="new-cases blue">
						<p>
							{
							data.todayCases == 0 ? "Casos de hoy sin reportar" : `+${new Intl.NumberFormat('de-DE').format(data.todayCases)} casos hoy`
						}
						</p>
					</div>

					<div className="per-millon">
						<h4>{new Intl.NumberFormat('de-DE').format(data.casesPerOneMillion)} <sup>por millon de hab.</sup></h4>
					</div>

					<div className="status">
						<p>{percentageOfPopulation}% de la población</p>
						<div className="progress">
							<div className="progress-bar" style={{ width: percentageOfPopulation + '%', backgroundColor: '#007bff' }}></div>
						</div>
					</div>					
				</div>

				<div className="rightSide">
					<ConfirmCases />
				</div>

			</section>
			
			<section>
				<div className="leftSide">
					<h3>Fallecidos</h3>
					<h2>{new Intl.NumberFormat('de-DE').format(data.deaths)}</h2>

					<div className="new-cases red">
						<p>
							{
							data.todayDeaths == 0 ? "Fallecidos de hoy sin reportar" : `+${new Intl.NumberFormat('de-DE').format(data.todayDeaths)} fallecidos hoy`
						}
						</p>
						<p>{new Intl.NumberFormat('de-DE').format(data.critical)} casos criticos</p>
					</div>

					<div className="per-millon">
						<h4>{new Intl.NumberFormat('de-DE').format(data.deathsPerOneMillion)} <sup>por millon de hab.</sup></h4>
					</div>

					<div className="status">
						<p>{deathsCasePercentage}% de los casos confirmados</p>
						<div className="progress">
							<div className="progress-bar" style={{ width: deathsCasePercentage + '%', backgroundColor: '#f00100' }}></div>
						</div>
					</div>					
				</div>

				<div className="rightSide">
					<DeathCases />
				</div>

			</section>
			
			<section>
				<div className="leftSide">
					<h3>Recuperados</h3>
					<h2>{new Intl.NumberFormat('de-DE').format(data.recovered)}</h2>

					<div className="new-cases green">
						<p>
							{
							data.todayRecovered == 0 ? "Recuperados de hoy sin reportar" : `+${new Intl.NumberFormat('de-DE').format(data.todayRecovered)} recuperados hoy`
						}
						</p>
					</div>

					<div className="status">
						<p>{recoveredCasePercentage}% de los casos confirmados</p>
						<div className="progress">
							<div className="progress-bar" style={{ width: recoveredCasePercentage + '%', backgroundColor: '#41e28f' }}></div>
						</div>
					</div>					
				</div>

				<div className="rightSide">
					<RecoveredCases />
				</div>

			</section>


        </Layout>
    );
};

export async function getStaticProps(context) {
    const res = await fetch(
        `https://corona.lmao.ninja/v3/covid-19/countries/argentina`
    );
    const data = await res.json();

    /* const results = await data.All */

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data,
        }, // will be passed to the page component as props
    };
}

export default Home;
