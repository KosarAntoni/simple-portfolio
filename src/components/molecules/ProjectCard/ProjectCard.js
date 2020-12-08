import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';
import Image from './Image';
import Content from './Content';
import { animation } from './animation';
import CardHeading from './Heading';

const Wrapper = styled.div`
  position: relative;
  height: 16rem;
  width: 16rem;
  margin: 0.5rem;
  
  @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport7} { 
    height: 20rem;
    width: 20rem;
  }  
  
  @media screen and ${({ theme: { viewPorts } }) => viewPorts.viewport12} { 
    height: 25rem;
    width: 25rem;
    margin: 1rem;
  }
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 100vw;
	background: rgba(0,0,0, 0.4);
	z-index: 1;
`;

const Redirect = styled.a`
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: auto;
  
  ${({ isSelected }) => isSelected && css`
    padding: 2rem 1rem;
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  `}
`;

const ContentContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
  max-width: 40rem;
  max-height: 100%;
  background: white;
  margin: auto;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 0.75rem rgba(0, 0, 0, .2);
  
  ${({ isSelected }) => isSelected && css`
    overflow-y: scroll;
    pointer-events: auto;
    cursor: initial;
    
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; 
    ::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const ProjectCard = () => {
  const [isSelected, setIsSelected] = useState(false);
  const zIndex = useMotionValue(isSelected ? 2 : 0);

  const checkZIndex = (latest) => {
    if (isSelected) {
      zIndex.set(2);
    } else if (!isSelected && latest.borderRadius === '100%') {
      zIndex.set(0);
    }
  };

  return (
    <Wrapper>
      <Overlay
        initial={false}
        isSelected={isSelected}
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
      >
        <Redirect onClick={() => setIsSelected(false)} />
      </Overlay>
      <ContentWrapper
        layout
        isSelected={isSelected}
      >
        <ContentContainer
          initial={false}
          onClick={() => !isSelected && setIsSelected(true)}
          isSelected={isSelected}
          layout
          style={{ zIndex }}
          animate={isSelected ? {
            borderRadius: '2rem',
          } : {
            borderRadius: '100%',
          }}
          transition={animation}
          onUpdate={checkZIndex}
        >
          <Image isSelected={isSelected} />
          <CardHeading isSelected={isSelected} setIsSelected={setIsSelected} />
          <Content />
        </ContentContainer>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ProjectCard;