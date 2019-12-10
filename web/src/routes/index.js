import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Student from '../pages/Student/List';
import StudentForm from '../pages/Student/Form';
import Plan from '../pages/Plan/List';
import PlanForm from '../pages/Plan/Form';
import Enrollment from '../pages/Enrollment/List';
import EnrollmentForm from '../pages/Enrollment/Form';
import HelpOrder from '../pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/student/list" component={Student} isPrivate />
      <Route
        path={['/student/form/:id', '/student/form']}
        component={StudentForm}
        isPrivate
      />

      <Route path="/plan/list" component={Plan} isPrivate />
      <Route
        path={['/plan/form/:id', '/plan/form']}
        component={PlanForm}
        isPrivate
      />

      <Route path="/enrollment/list" component={Enrollment} isPrivate />
      <Route
        path={['/enrollment/form/:id', '/enrollment/form']}
        component={EnrollmentForm}
        isPrivate
      />

      <Route path="/helpOrder" component={HelpOrder} isPrivate />
    </Switch>
  );
}
