import './App.css'

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
        <div>
            <video
                autoPlay muted loop playsInline className="background-video">
                <source src="/bgVideo.mp4" type="video/mp4"/>
                Your browser doesn’t support the video tag.
            </video>
            <div>
                <h1 className="landing-title">Title</h1>
            </div>
            <button onClick={doCreateAcc} className="auth-button">Create an Account</button>
            <button onClick={doSignIn} className="auth-button">Sign in</button>
        </div>
    </>
  )


}


export default App
