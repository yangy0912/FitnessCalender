import './App.css'

function App() {

  return (
    <>
        <div>
            <video
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
                autoPlay muted loop playsInline className="background-video">
                <source src="/bgVideo.mp4" type="video/mp4"/>
                Your browser doesn’t support the video tag.
            </video>
        </div>
    </>
  )
}




export default App
