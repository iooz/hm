import { AnimatePresence, motion } from 'framer-motion';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SuccessiveType from './components/SuccessiveType';
import Nav from './components/Nav';
import Home from './pages/Home';
import Etc from './pages/Etc';
import { ChevronsRight } from './components/Icons';

const shouldPlayIntro = window.location.pathname === '/';

function App() {
  const [introEnded, setIntroEnded] = useState(!shouldPlayIntro);

  const onKeyDown = (e: KeyboardEvent<HTMLDocument> & any) => {
    if ((e.keyCode === 9 || e.which === 9) && !introEnded) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!shouldPlayIntro) return;

    const script = document.createElement('script');

    script.src = '/p-static/js/stars.js';
    script.async = true;

    document.body.appendChild(script);

    document.addEventListener('keydown', onKeyDown);
  }, []);

  const onIntroEnd = useCallback(() => {
    localStorage.setItem('v1:intro-completed', 'true');
    setIntroEnded(true);
  }, []);

  return (
    <Wrapper>
      <Helmet titleTemplate={'%s • Iooz'}>
        <title>Iooz</title>
      </Helmet>
      {shouldPlayIntro ? (
        <SuccessiveTypeContainer
          transition={{ duration: 0.85 }}
          animate={{ y: introEnded ? -window.innerHeight : 0 }}
        >
          <ProgressContainer onClick={onIntroEnd}>
            <h4>
              Skip <ChevronsRight />
            </h4>
          </ProgressContainer>
          <SuccessiveType
            onEnd={onIntroEnd}
            words={
              "Hello There"
            }
            speed={1}
            userSkipped={introEnded}
          />
        </SuccessiveTypeContainer>
      ) : null}

      <motion.canvas
        transition={{ duration: 0.85 }}
        animate={{ opacity: introEnded ? 0 : 0.25 }}
        id="stars"
      />

      <MainContent
        transition={{ duration: 0.85 }}
        initial={false}
        animate={{ y: !introEnded ? window.innerHeight : 0 }}
      >
        <Router>
          <Nav />

          <ContentWrapper>
            <AnimatePresence>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/etc" component={Etc} />
              </Switch>
            </AnimatePresence>
          </ContentWrapper>
        </Router>
      </MainContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
  }
`;

const SuccessiveTypeContainer = styled(motion.div)`
  width: 65ch;
  height: 350px;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const ProgressContainer = styled.div`
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.2s ease;

  svg {
    vertical-align: middle;
    height: 19px;
  }

  &:hover {
    color: #ff65b2;
  }
`;

const MainContent = styled(motion.div)`
  height: 100vh;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  overflow-y: auto;

  @media (max-width: 850px) {
    flex-direction: column;
    /* padding-top: 65px; */
  }
`;

const ContentWrapper = styled.div`
  margin-left: 15rem;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;

  a {
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 850px) {
    margin-left: 0px;
    padding-top: 65px;
  }
`;

export default App;
