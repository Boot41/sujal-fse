import React from 'react';
import './Pricing.css'; // Assuming there's a CSS file for styling

const Pricing = () => {
    return (
        <div className='pricing-container'>
            <h1>Pricing Plans</h1>
            <div className='pricing-cards'>
                <div className='pricing-card free-tier'>
                    <h2>Free Tier</h2>
                    <p>Basic features for individuals and small teams.</p>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                </div>
                <div className='pricing-card standard-tier'>
                    <h2>Standard Tier</h2>
                    <p>Advanced features for growing businesses.</p>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                </div>
                <div className='pricing-card premium-tier'>
                    <h2>Premium Tier</h2>
                    <p>All features for large enterprises.</p>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pricing;