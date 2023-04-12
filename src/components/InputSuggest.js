
import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux'
import { onSubmit } from '../Redux/ActionCreator'
export default function InputSuggest({ inputComp, inputCity,onClickCity }) {
    const dispatch = useDispatch()
    const [cities, setCities] = useState([]);
    let url = "https://countriesnow.space/api/v0.1/countries";
    useEffect(() => {
        (async function () {
            const res = await fetch(url);
            const data = await res.json();
            setCities(data.data);
        })();
    }, []);

    const [suggestion, setSuggestion] = useState([]);

    const [selectedCity, setSelectedCity] = useState("");

    const memoizeFilterVal = () => {
        let arr = [];
        let c = cities?.map((item) => {
            return item.cities.filter((item1) => {
                return (
                    item1.includes(inputCity.charAt(0).toUpperCase() + inputCity.slice(1)) &&
                    arr.push(item1)
                );
            });
        });

        return arr;
    }
    useEffect(() => {
        if (inputCity?.length > 0) {
            setSuggestion(memoizeFilterVal());
            setSelectedCity(memoizeFilterVal()[0]);
            dispatch(onSubmit(memoizeFilterVal()[0]))
        }
    }, [inputCity?.length]);

    return (
        <div className="my-3 d-flex flex-wrap justify-content-center">
            {inputComp}
            <select className='border-0 rounded-top'
                onChange={(e) => { setSelectedCity(e.target.value); dispatch(onSubmit(e.target.value)) ; onClickCity() }}
                value={selectedCity}
            >
                {suggestion?.map((city) => {
                    return (
                        <option key={uuidv4()} value={city}>
                            {city}
                        </option>
                    );
                })}
            </select>
            
        </div>
    );
}
