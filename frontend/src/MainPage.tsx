import './MainPage.css'

function MainPage() {

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
                <button className="auth-Button">Create an Account</button>
                <button className="auth-Button">Sign in</button>
            </div>
            <p className="motto">Plan your workouts more efficiently<br />and never skip days!</p>

        </div>
    </>
  )
}




export default MainPage
