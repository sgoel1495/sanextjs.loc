import statesAndCities from "../store/statesAndCities.json";
import React, {Fragment, useState} from "react";


function StatesAndCitiesOptions({state,cities}){
    const sncList = () => {
        const states = [];
        const cities = [];
        statesAndCities.forEach(snc => {
            if (states.includes(snc.state) == false)
                states.push(snc.state);
            if (state == snc.state)
                cities.push(snc.city);
        });
        states.sort();
        cities.sort();
        return { states, cities };
    }

    const statesOptions = () => {
        let returnValue = null;
        const { states } = sncList();
        states.forEach(state => {
            returnValue = <Fragment>
                {returnValue}
                <option value={state}>{state}</option>
            </Fragment>;
        });
        return returnValue;
    }

    const citiesOptions = () => {
        let returnValue = null;
        const { cities } = sncList();
        cities.forEach(city => {
            returnValue = <Fragment>
                {returnValue}
                <option value={city}>{city}</option>
            </Fragment>;
        });
        return returnValue;
    }

    const selectStateFirst = <option value="">Please Select State First</option>

    return (state && cities)?citiesOptions():(cities && !state)?selectStateFirst:statesOptions()
}




export default StatesAndCitiesOptions