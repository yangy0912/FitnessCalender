import {LandingPage} from "./LandingPage.tsx";

function App() {

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
        <LandingPage onSignInClick={doSignIn} onCreateClick={doCreateAcc} />
    </>
  )


}


export default App
