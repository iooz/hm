import { useMemo } from 'react';
import { Tooltip } from 'react-tippy';
import PageWrapper from './PageWrapper';

const BIRTH = new Date('2006-12-20T10:15:00Z');
const YEAR_MILLIS = 31556952000;

const Home = () => {
  const age = useMemo(() => Math.floor((Date.now() - BIRTH.getTime()) / YEAR_MILLIS), []);

  return (
    <PageWrapper forceReadableWidth>
      <h1>Hello</h1>
      <p>
        Iooz. {/* @ts-ignore */}
        <Tooltip arrow title={'20th December 2006'}>
          {age}
        </Tooltip>{' '}
        y/o high school student trying to learn programming by using templates. Thanks Phineas.
        gonna a bunch of anime pics here for sure.
      </p>
    </PageWrapper>
  );
};

export default Home;
