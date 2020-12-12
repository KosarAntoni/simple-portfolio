import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useViewportScroll } from 'framer-motion';
import axios from 'axios';
import GlobalStyle from '../theme/GlobalStyle';
import { theme } from '../theme/mainTheme';
import ProjectsView from './ProjectsView';
import TestimonialsView from './TestimonialsView';
import CardsContainer from '../components/organisms/CardsContainer/CardsContainer';
import { DummyProjects } from '../components/organisms/CardsContainer/DummyData';

const Root = () => {
  const [currentSection, setCurrentSection] = useState('loading');
  const { scrollYProgress } = useViewportScroll();
  const ref = useRef();

  useEffect(() => {
    scrollYProgress.onChange((v) => {
      setCurrentSection(v >= 0.5 ? 'testimonials' : 'projects');
    });
  });

  useEffect(() => {
    let count = 0;
    const image = new Image(400, 300);

    DummyProjects.forEach((project) => {
      axios
        .get(
          project.image, {
            responseType: 'blob',
          },
        )
        .then((response) => {
          image.src = URL.createObjectURL(response.data);
          count += 1;
          if (DummyProjects.length === count) setCurrentSection('projects');
        });
    });
  }, [ref]);

  return (
    <ThemeProvider theme={theme}>
      <div ref={ref}>
        <ProjectsView currentSection={window.innerWidth <= 768 ? 'projects' : currentSection} />
        <GlobalStyle />
        <CardsContainer currentSection={currentSection} />
        <TestimonialsView isVisible={window.innerWidth <= 768 ? currentSection !== 'loading' : currentSection === 'testimonials'} />
      </div>
    </ThemeProvider>
  );
};

export default Root;
