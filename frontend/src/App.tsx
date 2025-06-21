import { LandingPage } from "./LandingPage.tsx";
import { useUser } from '@clerk/clerk-react';
import { useEffect } from "react";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import { CalendarTest } from "./CalendarTest.tsx";



function App() {
    const { user, isSignedIn, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            console.log("User ID")
            console.log(user.id)
        }
    }, [isLoaded, isSignedIn, user])

    const doCreateAcc = () : void => {
        console.log("onclick DCA");
        console.log("Before useEffect")

    }

    const doSignIn = () : void => {
        console.log("onclick DSI");
        console.log("Before useEffect")
    }

    return (
    <>
        <SignedOut>
            <LandingPage onSignInClick={doSignIn} onCreateClick={doCreateAcc} />
        </SignedOut>
        <SignedIn>
            
            <CalendarTest />
        </SignedIn>
        
    </>
  )


}


export default App
