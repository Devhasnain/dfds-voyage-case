import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

/* 
Defines the TypeScript interface for the `VoyageProgressProps`, which represents
the props expected by the App component, which includes the names of the two ports, 
and the departure and arrival times.
*/
interface VoyageProgressProps {
    portOfLoading: string;
    portOfDischarge: string;
    departureTime: string | Date;
    arrivalTime: string | Date;
}

/* 
Defines the TypeScript interface for the `PinProps` which represents
the props expected by the App component, which describes the props expected by the 
Pin component, which includes the position of the pin on the progress axis
*/
interface PinProps {
    style?: React.CSSProperties;
    position: number;
}

/*
Define some styled components using `styled` from the @emotion/styled library. 
These include ProgressContainer, ProgressAxis, Dot, PortLabel, and Pin.
*/
const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProgressAxis = styled.div`
    display: flex;
    align-items: center;
    height: 30px;
    width: 80%;
    background-color: lightgray;
    border-radius: 15px;
`;

const Dot = styled.div`
    height: 10px;
    width: 10px;
    background-color: ${(props: { active: boolean }) =>
        props.active ? 'darkblue' : 'lightgray'};
    border-radius: 50%;
`;

const PortLabel = styled.span`
    margin-top: 5px;
    font-size: 12px;
`;

const Pin = styled.div`
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    transform: translateX(-50%);
    z-index: 1;
`;

/*
Define the `App` component using a functional approach, 
which accepts the props defined in `VoyageProgressProps`.
*/
const App: React.FC<VoyageProgressProps> = ({
    portOfLoading,
    portOfDischarge,
    departureTime,
    arrivalTime,
}) => {
    /*
    Declare a `currentTime` state variable using `useState`, 
    which stores the current time as a `Date` object.
    */
    const [currentTime, setCurrentTime] = useState(new Date());

    /*
    Use `useEffect` to set up a timer that updates the `currentTime` state variable every second. 
    The `useEffect` function returns a cleanup function that clears the timer to prevent memory leaks.
    */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    /*
    Parse the departureTime and arrivalTime props into Date objects using the Date constructor.
    */
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    /*
    Calculate the progress of the voyage using the formula 
    `(currentTime.getTime() - departure.getTime()) / (arrival.getTime() - departure.getTime())`, 
    which calculates the difference between the current time and departure time, 
    and divides it by the difference between the arrival time and departure time. 
    This results in a progress value between 0 and 1.
    */
    const progress =
        (currentTime.getTime() - departure.getTime()) /
        (arrival.getTime() - departure.getTime());

    /*
    Calculate the position of the pin on the progress axis using the `progress` value calculated in the previous step. 
    If `progress` is less than 0, set the pin position to 0. 
    If `progress` is greater than 1, set the pin position to 100. 
    Otherwise, set the pin position to progress * 100.
    */
    const pinPosition = progress < 0 ? 0 : progress > 1 ? 100 : progress * 100;

    /*
    Create an array of 10 `Dot` components, where each Dot represents a point on the progress axis. 
    Set the `active` prop of each `Dot` to `true`
    */
    const dots = [];
    for (let i = 0; i < 10; i++) {
        const dotPosition = i * 10;
        const dotActive = pinPosition >= dotPosition + 5;
        dots.push(<Dot key={i} active={dotActive} />);
    }

    /*
    Ternary operator that sets the pinLabel variable based on the value of progress.
    */
    const pinLabel =
        progress < 0 ? portOfLoading : progress > 1 ? portOfDischarge : '';

    return (
        <ProgressContainer>
            <ProgressAxis>
                {dots}
                <Pin style={{ left: `${pinPosition}%` }} />
            </ProgressAxis>
            <PortLabel>{pinLabel}</PortLabel>
        </ProgressContainer>
    );
};

export default App;
