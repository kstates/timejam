import {useState, useEffect, FormEvent, Dispatch, SetStateAction} from 'react'
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {coworker, dateOptionsInterface} from "../interfaces";
import CloseButton from "@/app/buttons/buttons";
import './clock.scss';

dayjs.extend(advancedFormat);

/**
 * React Clock component
 * Guesses user timezone with dayjs and creates a clock that updates every second
 *
 * @constructor
 */
export default function Clock(params: {
    timezone: string,
    name: string,
    coworkers: coworker[],
    setCoworkers: Dispatch<SetStateAction<coworker[]>>
}) {
    const {timezone, name, coworkers, setCoworkers} = params;
    let userDateOptions: { timezone: string; format: string };
    userDateOptions = {
        timezone: timezone,
        format: 'MMMM D h:mm A z'
    };

    const getClockName = (name: string) => {
        switch (name) {
            case 'your':
                return "Your";
            default:
                return `${name}'s`;
        }
    }

    const getLocalizedTime = (dateOptions: dateOptionsInterface) => {
        return dayjs().tz(dateOptions.timezone).format(dateOptions.format);
    }

    const removeCoworker = (event: FormEvent) => {
        const newCoworkers = coworkers.filter(coworker =>  {
            return coworker.name !== name;
        })
        setCoworkers(newCoworkers);
        return;
    }

    const [currentTime, setCurrentTime] = useState(getLocalizedTime(userDateOptions));
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
        const clockInterval = setInterval(() => {
            setCurrentTime(getLocalizedTime(userDateOptions));
        }, 1000);

        return () => clearInterval(clockInterval);
    }, [userDateOptions]);

    return (
        <div className={`clock ${name}-clock`}>
            {hydrated && (<p className="clock__description">{getClockName(name)} current time is {currentTime}</p>)}
            {name !== 'your' && <CloseButton clickHandler={removeCoworker.bind(name)}/> }
        </div>
    )
}