import React, { Component } from 'react';
import Staff from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStaffs, fetchDepart, fetchSalary } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    depart: state.depart,
    salary: state.salary
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepart: () => {dispatch(fetchDepart())},
  fetchSalary: () => {dispatch(fetchSalary())},
})

class Main extends Component {
   
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepart();
    this.props.fetchSalary();
  }
  
  
  render() {

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/staff" component={() => <Staff staffs={this.props.staffs} />} />
          <Route exact path="/department" component={() => <Department depart={this.props.depart} />} />
          <Route exact path="/salary" component={() => <Salary salary={this.props.salary} />} />
          <Route path="/staff/:staffId" />
          <Route path="/department/:departId" />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));