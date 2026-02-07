import React from 'react';
import '../index.css';

const Tour = () => {
    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container">
                <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '20px', color: 'var(--color-primary)' }}>
                    Experience the Difference.
                </h1>
                <p className="page-intro" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '60px', maxWidth: '600px' }}>
                    We’ve reimagined online dating to focus on what matters: depth, intention, and real connection.
                </p>

                <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    <div className="step-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>01. Curate</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            Create a profile that reflects your true self. Our guided prompts help you share your story, values, and what you’re truly looking for.
                        </p>
                    </div>
                    <div className="step-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>02. Connect</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            No mindless swiping. Receive a daily selection of compatible matches curated by our intelligent algorithm and human insights.
                        </p>
                    </div>
                    <div className="step-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '15px', color: '#fff' }}>03. Experience</h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                            Move from chat to real life with our concierge date planning service. We handle the reservations; you bring the spark.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tour;
