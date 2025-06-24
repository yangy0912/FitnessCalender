import {Component, createRef, type JSX} from 'react';
import { SignOutButton } from '@clerk/clerk-react';
import './CalendarTest.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'

type DataMap = { [date: string]: string[] } | undefined;

type CalendarProps = {
    userID: string | undefined;
    userName: string | null | undefined;
    userFirstName: string | null | undefined;
    userLastName: string | null |undefined;
    data : DataMap;
    onAddClick: (exercise : string | undefined, date : string | undefined) => void;
    onModifyClick: (exercise : string | undefined, newExercise : string | undefined, date : string | undefined) => void;
    onDeleteClick: (exercise : string | undefined, date : string | undefined) => void;
}

type CalendarState = {
    data : DataMap;
    selectedDate?: string;
    clickPosition?: {top : number, left: number}
    selectedEvent?: string;
    selectedEventDate?: string;
}

export class Calender extends Component<CalendarProps, CalendarState>{
    constructor(props: CalendarProps) {
        super(props);
        this.state = {
            data : this.props.data, 
            selectedDate : undefined, 
            clickPosition : undefined,
            selectedEvent : undefined,
            selectedEventDate : undefined
        };
    }

    calendarRef = createRef<FullCalendar>();
    inputRef = createRef<HTMLInputElement>();
    
    getEvents = () : {title: string, start: string}[] => {
        const events: {title: string, start: string}[] = []
        if (!this.state.data) {
            return []
        } else if (!this.state.data['data']){
            return []
        } else {
            for (const [date, exercises] of Object.entries(this.state.data['data'])) {
                for (const exercise of exercises) {
                    events.push ({
                        title: exercise,
                        start: date
                     });
                } 
            }
            return events
        }
    }
    
    
    render = () : JSX.Element => {
        console.log("Generated events:", this.getEvents());
        return (
            <>
                <div>
                    <h1 className = "calendar-page-title">Welcome, {this.props.userFirstName}!</h1>
                </div>
                <SignOutButton>
                    <button className = "signout-button">Sign out!</button>
                </SignOutButton>
                <FullCalendar
                ref={this.calendarRef}
                plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={this.getEvents()}
                dateClick={(info) => {
                    console.log("clicked", info.dateStr)
                    this.setState({
                        selectedDate : info.dateStr,
                        clickPosition: {
                            top: info.jsEvent.pageY,
                            left: info.jsEvent.pageX
                          },
                        selectedEvent : undefined,
                        selectedEventDate : undefined
                    });
                }}
                eventClick={(info) => {
                    console.log(info.event.title)
                    this.setState({
                        selectedEvent : info.event.title,
                        selectedEventDate : info.event.startStr,
                        clickPosition: {
                            top: info.jsEvent.pageY,
                            left: info.jsEvent.pageX
                          },
                          selectedDate : undefined
                    });
                }} 
                />
                {this.state.clickPosition && this.state.selectedDate && (<div
                style={{
                    position: "absolute",
                    top: this.state.clickPosition.top,
                    left: this.state.clickPosition.left,
                    zIndex: 9999
                    }}>
                    <input className = "input-text" ref={this.inputRef} type="text" placeholder={
                        this.state.selectedDate ?
                        'Add Exercise to ' + this.state.selectedDate
                        : "Select a date to Add Exercise To"
                    } />
                    <button onClick={() => {
                        this.props.onAddClick(this.inputRef.current?.value, this.state.selectedDate);
                        this.setState({
                            selectedDate : undefined,
                            clickPosition: undefined
                        });
                    }} className="add-button"> Add! </button>
                    <button onClick={() => {
                        this.setState({
                            selectedDate : undefined,
                            clickPosition: undefined
                        });
                    }} className="cancel-button">
                        Cancel!
                    </button>
                </div>)}
                {this.state.selectedEvent && this.state.selectedEventDate && this.state.clickPosition && (<div
                style={{
                    position: "absolute",
                    top: this.state.clickPosition.top,
                    left: this.state.clickPosition.left,
                    zIndex: 9999
                    }
                }>
                    <input ref = {this.inputRef} placeholder="Modify this event"/>
                    <button onClick={() => {
                        this.props.onModifyClick(this.state.selectedEvent, this.inputRef.current?.value, this.state.selectedEventDate);
                        this.setState({
                            selectedEvent : undefined,
                            clickPosition : undefined,
                            selectedEventDate : undefined
                        })
                    }}> Modify Event!</button>
                    <button onClick={() => {
                        this.props.onDeleteClick(this.state.selectedEvent, this.state.selectedEventDate)
                        this.setState({
                            selectedEvent : undefined,
                            clickPosition : undefined,
                            selectedEventDate : undefined
                        })
                    }}> Delete Event! </button>
                    <button onClick={() => {
                        this.setState({
                            selectedEvent : undefined,
                            clickPosition : undefined,
                            selectedEventDate : undefined
                        })
                    }}> Cancel! </button>
                </div>

                )}
            </>
        )
    }
}