import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageWrapper from './PageWrapper';

const Etc = () => (
  <PageWrapper forceReadableWidth>
    <Helmet>
      <title>Contact</title>
    </Helmet>
    <h1>Contact</h1>
    <h2>Thanks</h2>
    <p>
      Thanks for visiting and thanks for phineas for making this website, dont sue me. I hope you enjoyed your stay. The source code for this website is
      available at <a href={'https://github.com/phineas/phineas.io'}>phineas/phineas.io</a>
    </p>
    <h2>Contact</h2>
    <p>
      I'm most responsive through Instagram DMs, you can{' '}
      <a href={'https://www.instagram.com/powerlessss_/'}>click here</a> to DM
      me.
    </p>
  </PageWrapper>
);

export default Etc;
