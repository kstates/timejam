"use client"
import {timeZoneOptions, getTimeZones} from "../helpers";
import {coworker, FormElements} from "@/app/interfaces";
import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import Cookies from "universal-cookie";
import Select from 'react-select'

import './coworkerForm.scss';

export default function CoworkerForm(params: {
    coworkers: coworker[],
    setCoworkers: Dispatch<SetStateAction<coworker[]>>
    cookies: Cookies
}) {
    const {coworkers, setCoworkers, cookies} = params;
    const [nameValidationMessage, setNameValidationMessage] = useState("");
    const [tzValidationMessage, setTzValidationMessage] = useState("");
    const timezones = getTimeZones;

    const addCoworker = (cookies: Cookies) => (event: FormEvent<FormElements>) => {
        event.preventDefault();
        const {cwName, timezone} = event.target as FormElements;
        validateElements(cwName, timezone);
        setCoworkers([...coworkers, {name: cwName.value, timezone: timezone.value}]);
    }

    // TODO: Generalize this
    const validateElements = (cwName: HTMLInputElement, timezone: HTMLInputElement) => {
        setTzValidationMessage("");
        setNameValidationMessage("");
        if (!validateFormElement(cwName)) {
            return false
        }
        if (!validateFormElement(timezone)) {
            return false
        }
    }

    const validateFormElement = (element: HTMLInputElement) => {
        switch (element.name) {
            case "cwName":
                if (!element.value) {
                    setNameValidationMessage("Please enter a name");
                    return false;
                }
                if (coworkers.some(cw => cw.name === element.value)) {
                    setNameValidationMessage("Please enter a unique name")
                    return false;
                }
                break;
            case "timezone":
                if (!timezones.includes(element.value)) {
                    setTzValidationMessage("Please select a timezone from the dropdown");
                    return false;
                }
                break;
        }
        return true;
    }

    return (
        <div className="coworker-form__wrapper">
            <h3>Add coworkers</h3>
            <form method="post" onSubmit={addCoworker(cookies)}>
                <div className="coworker-form__input">
                    <label htmlFor="cwName">Name: </label>
                    <input name="cwName" aria-required={true} required={true}/>
                    <span className="validation-error">{nameValidationMessage}</span>
                </div>
                <div className="coworker-form__input timezone">
                    <label htmlFor="timezone">Timezone: </label>
                    <Select
                        name="timezone"
                        options={timeZoneOptions}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                                ...theme.colors,
                                primary25: '#b2b2b2',
                                primary: 'black',
                            },
                        })}
                    />
                    <span className="validation-error">{tzValidationMessage}</span>
                </div>
                <div className="coworker-form__input">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}