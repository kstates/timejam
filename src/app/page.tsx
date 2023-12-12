'use client'
import styles from './page.module.css'
import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Clock from "@/app/clock/clock";
import {coworker} from "@/app/interfaces";
import CoworkerForm from "@/app/coworkerform/coworkerForm";
import Cookies from 'universal-cookie';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
    const cookies = new Cookies(null, {path: '/'});
    const userTimezone = dayjs.tz.guess()
    const firstUpdate = useRef(true);
    const [coworkers, setCoworkers] = useState<coworker[]>([]);

    useEffect(() => {
        if (firstUpdate.current) {
            const existingCoworkers = cookies.get('coworkers');
            if (existingCoworkers) {
                setCoworkers(existingCoworkers);
            }
            firstUpdate.current = false;
        } else {
            cookies.set('coworkers', JSON.stringify(coworkers));
        }
    }, [cookies, coworkers]);

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <div>
                    <h1>TimeJam</h1>
                    <CoworkerForm coworkers={coworkers} setCoworkers={setCoworkers} cookies={cookies}/>
                </div>
                <div className="clock__wrapper">
                    <Clock timezone={userTimezone} coworkers={coworkers} setCoworkers={setCoworkers} name="your"/>
                    {coworkers.map((coworker) =>
                        <Clock key={coworker.name} coworkers={coworkers} setCoworkers={setCoworkers}
                               name={coworker.name}
                               timezone={coworker.timezone}/>)}
                </div>
            </div>
        </main>
    )
}
