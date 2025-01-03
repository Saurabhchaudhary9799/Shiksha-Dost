// import CourseSection from "@/features/courses/components/CourseSection";
import React from "react";


import { Helmet, HelmetProvider } from "react-helmet-async";
import MbbsAbroadSection from "./MbbsAbroadSection";
import FeatureSection from "./FeatureSection";
import MentorsSection from "./MentorsSection";
import FeaturedArticles from "./FeaturedArticles";
import FeaturedDailyPractice from "./FeaturedDailyPractice";
import FaqSection from "./FaqSection";
import HeroSection from "./HeroSection";



const Home = () => {
  return (
    <HelmetProvider>
     
       
        <Helmet>
          <meta charSet="utf-8" />
          <title>Shiksha-Dost | Online Learning Platform</title>
          <meta
            name="description"
            content="Shiksha-Dost is an online learning platform that connects learners with experienced mentors and a variety of courses to help you excel."
          />
          <meta
            name="keywords"
            content="online learning, mentors, courses, education, e-learning platform, skill development"
          />
          <meta name="author" content="Shiksha-Dost Team" />
          <link rel="canonical" href="http://localhost:5173/" />

          {/* Open Graph for Social Sharing */}
          <meta property="og:title" content="Shiksha-Dost | Online Learning Platform" />
          <meta
            property="og:description"
            content="Access expert mentors and a wide range of courses to enhance your skills with Shiksha-Dost."
          />
          

         
        </Helmet>

       
        {/* <CourseSection /> */}
        <HeroSection/>
        <FeatureSection/>
        <MbbsAbroadSection/>
      
        <MentorsSection />
        <FeaturedArticles/>
        <FeaturedDailyPractice/>
        <FaqSection/>

      
    </HelmetProvider>
  );
};

export default Home;
