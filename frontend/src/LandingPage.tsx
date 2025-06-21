import {Component, type JSX} from 'react';
import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import './LandingPage.css'

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
                        <SignUpButton>
                            <button onClick={() => {this.props.onCreateClick()}} className="auth-button">Create an Account</button>
                        </SignUpButton>
                        <SignInButton>
                            <button onClick={() => {this.props.onSignInClick()}} className="auth-button">Sign in</button>
                        </SignInButton>
                        
                    </div>
                        <p className="motto">Plan your workouts more efficiently<br/>and never skip days!</p>
                </div>
            </>
        )
    }
}