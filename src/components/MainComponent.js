import React, { Component } from 'react';
import Staff from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStaffs } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
})

class Main extends Component {
   
  componentDidMount() {
    this.props.fetchStaffs();
  }
  
  
  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/staff" component={() => <Staff staffs={this.props.staffs} />} />
          <Route path="/staff/:staffId" />
          <Route exact path="/department" />
          <Route path="/department/:departId" />
          <Route exact path="/salary" />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));