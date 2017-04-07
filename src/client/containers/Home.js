import {connect} from 'react-redux';

import Home from '../components/Home';

const mapStateToProps = (state)=> ({
  username: state.user.username
});

export default connect(mapStateToProps)(Home);