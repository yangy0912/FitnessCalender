import {Component, type JSX} from 'react';


type CalendarTestProps = {

}

type CalendarTestState = {

}

export class CalendarTest extends Component<CalendarTestProps, CalendarTestState>{
    constructor(props: CalendarTestProps) {
        super(props);
        this.state = {};
    }

    render = () : JSX.Element => {
        return (
            <>
                <div>
                    <h1>Calendar Page!</h1>
                </div>
            </>
        )
    }
}