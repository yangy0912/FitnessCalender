import './MainPage.css'

function MainPage() {

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
                <h1 className="page-title">Fitness Calendar</h1>
            </div>
            <div className="button-container">
                <button onClick={doCreateAcc} className="auth-Button">Create an Account</button>
                <button onClick={doSignIn} className="auth-Button">Sign in</button>
            </div>
            <p className="motto">Plan your workouts more efficiently<br />and never skip days!</p>

        </div>
    </>
  )
}




export default MainPage
