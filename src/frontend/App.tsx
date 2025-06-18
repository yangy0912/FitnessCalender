import './App.css'

function App() {

  return (
    <>
        <div>
            <video
                autoPlay muted loop playsInline className="background-video">
                <source src="/bgVideo.mp4" type="video/mp4"/>
                Your browser doesn’t support the video tag.
            </video>
            <div>
                <h1>Title</h1>
            </div>
            <button className="auth-Button">Create an Account</button>
            <button className="auth-Button">Sign in</button>
        </div>
    </>
  )
}




export default App
