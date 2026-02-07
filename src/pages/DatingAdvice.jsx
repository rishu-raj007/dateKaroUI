import React from 'react';

const DatingAdvice = () => {
    const articles = [
        {
            category: "Communication",
            title: "The Art of Deep Conversation",
            excerpt: "Move beyond small talk and discover how to ask questions that reveal the soul.",
            date: "Oct 12 • 5 min read"
        },
        {
            category: "First Dates",
            title: "Modern Etiquette for Meaningful Meetings",
            excerpt: "Navigating the first date with confidence, grace, and authenticity.",
            date: "Oct 08 • 4 min read"
        },
        {
            category: "Self Growth",
            title: "Knowing Yourself Before Finding Others",
            excerpt: "Why emotional intelligence is the most attractive quality you can cultivate.",
            date: "Sep 25 • 6 min read"
        }
    ];

    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div className="container">
                <h1 className="page-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '40px', color: 'var(--color-primary)' }}>
                    Expert Insights
                </h1>

                <div className="articles-list" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {articles.map((article, index) => (
                        <article key={index} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            paddingBottom: '30px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--color-primary)' }}>
                                {article.category}
                            </span>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'white', cursor: 'pointer' }}>
                                {article.title}
                            </h2>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '700px' }}>
                                {article.excerpt}
                            </p>
                            <span style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>
                                {article.date}
                            </span>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DatingAdvice;
