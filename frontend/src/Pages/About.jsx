import React from 'react';
import AboutLanding from '../About/AboutLanding';
import TechStack from '../Components/Techstack';
import Newsletter from '../Components/Newsletter';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';

const About = () => {
    return (
        <div className='about-container'>
            <AboutLanding />
            <TechStack/>
            <Newsletter/>
            <FAQ/>
            <Footer/>
        </div>
    );
};

export default About;