import {LandingPage} from "./LandingPage.tsx";
import {CalendarTest} from "./CalendarTest.tsx";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import {useEffect, useState} from "react";

type DataMap = { [date: string]: string[] } | undefined;

function App() {

    const { user, isSignedIn, isLoaded } = useUser();
    const [userData, setUserData] = useState<DataMap | undefined>(undefined);

    const fetchUserData = async () : Promise<DataMap> => {
        try {
            if (user === null || user === undefined) {
                throw new Error("No user found");
            } else {
                const res = await fetch(`http://localhost:8088/api/getUserData?id=${user.id}`);
                const userData = await res.json();
                console.log('Received:', userData);
                return userData;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return undefined;
        }
    };

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            (async () => {
                const data = await fetchUserData();
                setUserData(data);
            })();
        }
    }, [isLoaded, isSignedIn, user])



    const doCreateAcc = () : void => {
        console.log("onclick DCA");
        fetch("http://localhost:8088/api/createAcc")
            .then (res => res.json())
            .then(json => console.log(json))
            .catch(error => console.log(error));
    }

    const doSignIn = () : void => {
        console.log("onclick DSI");
        fetch("http://localhost:8088/api/signIn")
            .then (res => res.json())
            .then(json => console.log(json.status))
            .catch(error => console.log(error));
    }

    return (
    <>
        <SignedOut>
            <LandingPage onSignInClick={doSignIn} onCreateClick={doCreateAcc} />
        </SignedOut>
        <SignedIn>
            <CalendarTest userID={user?.id} userName={user?.username} data={userData}
                          userFirstName={user?.firstName} userLastName={user?.lastName} />
        </SignedIn>

    </>
  )


}


export default App