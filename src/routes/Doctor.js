import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule'
import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Doctor/ManagePatient';





class Doctor extends Component {
    render() {

        const { systemMenuPath, isLoggedIn, systemMenuPathDoctor } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}

                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />

                            <Route component={() => { return (<Redirect to={systemMenuPathDoctor} />) }} />

                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPathDoctor: state.app.systemMenuPathDoctor,
        // systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
