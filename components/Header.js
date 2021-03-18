import React from 'react';

const Header = ({ update, country, flag, population }) => {

    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ]

    var d = new Date(update);
    var day = d.getDate();
    var monthIndex = d.getMonth();
    var monthName = months[monthIndex];
    var year = d.getFullYear();

    return (
        <header>
            <div>
                <div className="info">
                    <img src={flag} />
                    <h1>{country}</h1>
                </div>
                <p>Población total: {new Intl.NumberFormat('de-DE').format(population)}</p>
            </div>

            <div>
                <p><i>Ultima actualización: {day + '/' + monthName + '/' + year}</i></p>
            </div>
        </header>
    );
}
 
export default Header;