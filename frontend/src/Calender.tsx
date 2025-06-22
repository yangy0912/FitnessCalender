import {Component, type JSX} from "react";
import {SignOutButton} from "@clerk/clerk-react";

type DataMap = { [date: string]: string[] } | undefined;

type CalenderProps = {
    userID: string | undefined;
    userName: string | null | undefined;
    userFirstName: string | null | undefined;
    userLastName: string | null |undefined;
    data : DataMap;
}



type CalenderState = {
    data : DataMap
}


export class Calender extends Component<CalenderProps, CalenderState> {
    constructor(props: CalenderProps) {
        super(props);
        this.state = {data: this.props.data};
    }

    componentDidMount() {
        console.log("Calender componentDidMount: " + this.props.userID);
        console.log("Data: " + this.props.data);
    }

    render = () : JSX.Element => {
        return (
            <>
                <h1>Calender</h1>
                
                <SignOutButton>
                    <button>Sign out!</button>
                </SignOutButton>
            </>
        )
    }
}