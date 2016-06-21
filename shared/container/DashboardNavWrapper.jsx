import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from '../components/Header';

class DashboardNavWrapper extends Component { // eslint-disable-line
  constructor(props, context) {
    super(props, context);

    this.currentPath = this.props.routes[this.props.routes.length - 1].path;
  }
  componentWillReceiveProps(nextProps) {
    this.currentPath = nextProps.routes[nextProps.routes.length - 1].path;
  }
  renderNavItem(path, text) {
    console.log(this.currentPath);
    return <li className={this.currentPath === path ? 'active' : ''}><Link to={path}>{text}</Link></li>;
  }
  render() {
    return (<div className="dashboard-wrapper">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="dashboard-nav col-sm-3 col-lg-2 navbar-inverse">
            <ul className="nav navbar-nav">
              {this.renderNavItem('/dashboard', 'Summary')}
              {this.renderNavItem('/dashboard/compilations', 'Compilations')}
              {this.renderNavItem('/dashboard/email-accounts', 'Email Accounts')}
              {this.renderNavItem('/dashboard/account', 'Manage Account')}
              {this.renderNavItem('/dashboard/orders', 'Orders')}
            </ul>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2">
            {this.props.children}
          </div>
        </div>
      </div>
    </div>);
  }
}

DashboardNavWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object,
  routes: PropTypes.array,
};

export default connect()(DashboardNavWrapper);
