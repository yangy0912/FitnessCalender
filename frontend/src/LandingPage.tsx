import {Component, type JSX} from 'react';
import './LandingPage.css'

const redirectSignIn = () => window.location.href = "https://merry-puma-98.accounts.dev/sign-in"
const redirectSignUp = () => window.location.href = "https://merry-puma-98.accounts.dev/sign-up"

type LandingPageProps = {
    onSignInClick: () => void;
    onCreateClick: () => void;
};

type LandingPageState = {

};

export class LandingPage extends Component<LandingPageProps, LandingPageState> {
    constructor(props: LandingPageProps) {
        super(props);
        this.state = {};
    }

    render = () : JSX.Element => {
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
                        <button onClick={() => {this.props.onCreateClick(); redirectSignUp();}} className="auth-button">Create an Account</button>
                        <button onClick={() => {this.props.onSignInClick(); redirectSignIn();}} className="auth-button">Sign in</button>
                    </div>
                        <p className="motto">Plan your workouts more efficiently<br/>and never skip days!</p>
                </div>
            </>
        )
    }
}