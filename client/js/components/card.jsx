import React from 'react';
import moment from 'moment';

export default class Card extends React.Component {

    constructor() {
        super();
    }

    renderDayWeather = function (item) {
        const day = moment(item.dt_txt).format('ddd');

        return (<div key={item.dt} className="day {day}">{day}
            <br /> <span className="sunny"></span> <br />
            <span className="highTemp">max {Math.round(item.main.temp_max - 273.15)}&#176;</span>
            <br />
            <span className="lowTemp">min {Math.round(item.main.temp_min - 273.15)}&#176;</span>
        </div>);
    }

    renderCard = function (city, todayTemp, feeds) {
        const self = this;

        return (
            <div className="card">
                <span className="city">{city}</span>
                <div className="sun"></div>
                <span className="temp">{Math.round(todayTemp - 273.15)}&#176;</span>
                <span>
                    <ul className="variations">
                        <li>CLEAR</li>
                    </ul>
                </span>
                <div className="forecast clear">
                    {feeds.map(function (feed) {
                        return self.renderDayWeather(feed);
                    })}
                </div>
            </div>);
    }

    render() {
        const self = this;
        const { todayWeather } = this.props;
        const todayTemp = todayWeather.main ? todayWeather.main.temp : 0;

        if (this.props.feeds.length == 0) {
            return false;
        }

        return self.renderCard(this.props.city, todayTemp, this.props.feeds);
    }
}