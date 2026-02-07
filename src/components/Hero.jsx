import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroBg from '../assets/hero_bg.png';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-background">
                <img src={heroBg} alt="Couple connecting" />
                <div className="hero-overlay"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-text">
                    <h1 className="hero-headline">
                        Find Someone Who <br />
                        <span className="highlight">Truly Gets You.</span>
                    </h1>
                    <p className="hero-subhead">
                        Experience a connection that goes beyond the surface.
                        Real people, genuine emotions, and meaningful dates.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="cta-primary"
                            onClick={() => navigate('/signup')}
                        >
                            Start Free Today
                        </button>
                    </div>

                    <div className="micro-interaction">
                        <p className="micro-label">Have you tried online dating before?</p>
                        <div className="micro-options">
                            <button className="option-btn">Yes</button>
                            <button className="option-btn">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
