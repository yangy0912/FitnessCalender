import {Component, type JSX} from 'react';
import { SignOutButton } from '@clerk/clerk-react';
import './CalendarTest.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

type DataMap = { [date: string]: string[] } | undefined;

type CalendarTestProps = {
    userID: string | undefined;
    userName: string | null | undefined;
    userFirstName: string | null | undefined;
    userLastName: string | null |undefined;
    data : DataMap;
}

type CalendarTestState = {
    data : DataMap;
}

export class CalendarTest extends Component<CalendarTestProps, CalendarTestState>{
    constructor(props: CalendarTestProps) {
        super(props);
        this.state = {data : this.props.data};
    }

    render = () : JSX.Element => {
        return (
            <>
                <div>
                    <h1 className = "calendar-page-title">Welcome, {this.props.userFirstName}!</h1>
                </div>
                <SignOutButton>
                    <button className = "signout-button">Sign out!</button>
                </SignOutButton>
                <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={[
                    { title: 'event 1', date: '2025-07-01' },
                    { title: 'event 2', date: '2025-07-02' }
                ]}
                dateClick={(info) => {
                    console.log('clicked ' + info.dateStr);
                }}
                />
            </>
        )
    }
}