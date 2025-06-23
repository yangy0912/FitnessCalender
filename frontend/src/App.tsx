import {LandingPage} from "./LandingPage.tsx";
import {Calender} from "./Calender.tsx";
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

    const doAddClick = (exercise: string | undefined, date: string | undefined) : void => {
        if (exercise && user) {
            console.log("Adding exercise " + exercise + " on date " + date)
            const obj = {
                userID:user?.id,
                addDate:date,
                addExercise:exercise
            }
            fetch("http://localhost:8088/api/updateData", {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(obj)
            })
                .then (res => res.json())
                .then(json => console.log(json.status))
                .catch(error => console.log(error));
        }
        
    }

    return (
    <>
        <SignedOut>
            <LandingPage onSignInClick={doSignIn} onCreateClick={doCreateAcc} />
        </SignedOut>
        <SignedIn>
            {userData ? (
                <Calender
                    userID={user?.id}
                    userName={user?.username}
                    userFirstName={user?.firstName}
                    userLastName={user?.lastName}
                    data={userData}
                    onAddClick={doAddClick}
                />
            ) : (
                <p>Loading user data...</p>
            )}
        </SignedIn>

    </>
  )


}


export default App


// fetch(`http://localhost:8088/api/getUserData?id=${user.id}`)
//     .then(res => res.json())
//     .then(json => userData = json)
//     .catch(error => console.log(error));