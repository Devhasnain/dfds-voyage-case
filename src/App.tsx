import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface VoyageProgressProps {
    portOfLoading: string;
    portOfDischarge: string;
    departureTime: string | Date;
    arrivalTime: string | Date;
}

interface PinProps {
    style?: React.CSSProperties;
    position: number;
    visible: boolean;
}

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

const App: React.FC<VoyageProgressProps> = ({
    portOfLoading,
    portOfDischarge,
    departureTime,
    arrivalTime,
}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);
    const progress =
        (currentTime.getTime() - departure.getTime()) /
        (arrival.getTime() - departure.getTime());

    const pinPosition = progress < 0 ? 0 : progress > 1 ? 100 : progress * 100;

    const dots = [];
    for (let i = 0; i < 10; i++) {
        const dotPosition = i * 10;
        const dotActive = pinPosition >= dotPosition + 5;
        dots.push(<Dot key={i} active={dotActive} />);
    }

    const pinVisible = progress < 0 || progress > 1 ? false : true;
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
