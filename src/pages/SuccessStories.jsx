import React from 'react';

const SuccessStories = () => {
    const stories = [
        {
            names: "Elena & James",
            location: "New York, NY",
            quote: "We were both skeptical about online dating. But this app felt different immediately—less noise, more signal. We've been married for two years now."
        },
        {
            names: "Marcus & David",
            location: "London, UK",
            quote: "Finally, a platform that takes love seriously. The matching felt intuitive, like a friend introducing us. It just clicked."
        },
        {
            names: "Sophia & Michael",
            location: "Toronto, CA",
            quote: "The focus on conversation before meeting made all the difference. By our first date, I felt like I already knew his heart."
        }
    ];

    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container">
                <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '20px', color: 'white' }}>
                    Real Connections. <span style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Real Love.</span>
                </h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '60px', fontSize: '1.1rem' }}>
                    Read about the couples who found their person here.
                </p>

                <div className="stories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    {stories.map((story, index) => (
                        <div key={index} className="story-card" style={{
                            background: '#1a1a1a',
                            padding: '40px',
                            borderRadius: '2px',
                            borderLeft: '4px solid var(--color-primary)'
                        }}>
                            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '20px', color: '#e0e0e0', lineHeight: '1.6' }}>
                                "{story.quote}"
                            </p>
                            <div className="story-meta">
                                <h4 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '500' }}>{story.names}</h4>
                                <span style={{ color: '#666', fontSize: '0.9rem' }}>{story.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
