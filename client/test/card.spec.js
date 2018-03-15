import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Card from '../js/components/card';

describe('<Card />', () => {
    it('should render empty <Card /> components', () => {
        const wrapper = shallow(<Card city={'Noida'} todayWeather={{}} feeds={[]} />);
        expect(wrapper).to.have.length(1);
    });

    it('should not contain specific city span during intial load', () => {
        const wrapper = shallow(<Card city={'Noida'} todayWeather={{}} feeds={[]} />);
        expect(wrapper.contains(<span className="city">Noida</span>)).to.equal(false);
    });

    it('should not contain specific css class', () => {
        const wrapper = shallow(<Card city={'Noida'} todayWeather={{}} feeds={[]} />);
        expect(wrapper.contains(<div className="sun"></div>)).to.equal(false);
    });

    it('should not contain specific class for empty weather feeds', () => {
        const wrapper = shallow(<Card city={'Noida'} todayWeather={{}} feeds={[]} />);
        expect(wrapper.contains(<span className="sunny"></span>)).to.equal(false);
    });

    it('should contain exact number of highTemp and lowTemp classes for weather feed', () => {
        const weatherFeeds = [
            {
                "dt": 1521136800,
                "main": {
                    "temp": 294.55,
                    "temp_min": 292.703,
                    "temp_max": 294.55,
                    "pressure": 998.44,
                    "sea_level": 1023.41,
                    "grnd_level": 998.44,
                    "humidity": 72,
                    "temp_kf": 1.85
                },
                "dt_txt": "2018-03-15 18:00:00"
            },
            {
                "dt": 1521147600,
                "main": {
                    "temp": 291.5,
                    "temp_min": 290.12,
                    "temp_max": 291.5,
                    "pressure": 997.35,
                    "sea_level": 1022.5,
                    "grnd_level": 997.35,
                    "humidity": 83,
                    "temp_kf": 1.38
                },
                "dt_txt": "2018-03-15 21:00:00"
            }];

        const wrapper = shallow(<Card city={'Noida'} todayWeather={{}} feeds={weatherFeeds} />);
        expect(wrapper.contains(<span className="highTemp">max {Math.round(weatherFeeds[0].main.temp_max - 273.15)}&#176;</span>)).to.equal(true);
        expect(wrapper.contains(<span className="highTemp">max {Math.round(weatherFeeds[1].main.temp_max - 273.15)}&#176;</span>)).to.equal(true);
        expect(wrapper.contains(<span className="lowTemp">min {Math.round(weatherFeeds[0].main.temp_min - 273.15)}&#176;</span>)).to.equal(true);
        expect(wrapper.contains(<span className="lowTemp">min {Math.round(weatherFeeds[0].main.temp_min - 273.15)}&#176;</span>)).to.equal(true);
    });

    it('should have city prop', () => {
        const wrapper = shallow(<Card city={'Noida'} todayWeather={{}} feeds={[]} />);
        expect(wrapper.instance().props.city).to.equal('Noida');
    });

    it('should have todayWeather prop', () => {
        const wrapper = shallow(<Card city={'Noida'} todayWeather={{ main: { temp: 290 } }} feeds={[]} />);
        expect(JSON.stringify(wrapper.instance().props.todayWeather)).to.equal(JSON.stringify({ main: { temp: 290 } }));
    });
});