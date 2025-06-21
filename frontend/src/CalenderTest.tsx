import {Component, type JSX} from "react";
import {SignOutButton} from "@clerk/clerk-react";

type DataMap = { [date: string]: string[] } | undefined;

type CalenderTestProps = {
    userID: string | undefined;
    userName: string | null | undefined;
    userFirstName: string | null | undefined;
    userLastName: string | null |undefined;
    data : DataMap;
}



type CalenderTestState = {
    data : DataMap
}


export class CalenderTest extends Component<CalenderTestProps, CalenderTestState> {
    constructor(props: CalenderTestProps) {
        super(props);
        this.state = {data: this.props.data};
    }

    componentDidMount() {
        console.log("Calender componentDidMount");
        console.log(this.props.userFirstName);
    }

    render = () : JSX.Element => {
        return (
            <>
                <h1>TEST</h1>
                <SignOutButton>
                    <button>Sign out!</button>
                </SignOutButton>
            </>
        )
    }
}