import Navbar from './Navbar.jsx';
import Proptypes from 'prop-types';

const Layout = ({ children }) => {
  return (
  <>
    <Navbar />
    <main>
        { children }
    </main>
  </>
  
  );
};

Layout.propTypes = {
  children: Proptypes.node.isRequired,
};
 
export default Layout;
