import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~./pages/SignIn';

import Students from '~/pages/Students';
import StudentsEditCreate from '~/pages/Students/editCreate';

import Plans from '~/pages/Plans';
import PlanEditCreate from '~/pages/Plans/editCreate';

import Enrollments from '~/pages/Enrollments';
// import EnrollmentEditCreate from '~/pages/Enrollments/edit';
import EnrollmentEditCreate from '~/pages/Enrollments/editCreate';

import HelpOrder from '~/pages/HelpOrders';

import Profile from '~./pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/profile" exact component={Profile} isPrivate />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/create" component={StudentsEditCreate} isPrivate />
      <Route
        path="/students/:id/edit"
        component={StudentsEditCreate}
        isPrivate
      />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/create" component={PlanEditCreate} isPrivate />
      <Route path="/plans/:id/edit" component={PlanEditCreate} isPrivate />

      <Route path="/enrollments" exact component={Enrollments} isPrivate />
      <Route
        path="/enrollments/create"
        component={EnrollmentEditCreate}
        isPrivate
      />
      <Route
        path="/enrollments/:id/edit"
        component={EnrollmentEditCreate}
        isPrivate
      />

      <Route path="/help-orders" component={HelpOrder} isPrivate />

      {/* Not Found Path */}
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
