import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';
import Spinner from '../Spinner';

import { required, email, minLength } from './validate';
import renderField from './renderField';

class AccountSettings extends Component {
  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting,
            submitFailed,
            submitSucceeded,
            error,
            hideSubmit
      } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="app-form">
        <Field
          icon="user"
          name="username"
          type="text"
          label="Username"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="user"
          name="email"
          type="text"
          label="Email"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="user"
          name="first_name"
          type="text"
          label="First Name"
          component={renderField}
          validate={[ required ]}
        />
        <Field
          icon="user"
          name="last_name"
          type="text"
          label="Last Name"
          component={renderField}
          validate={[ required ]}
        />

        {submitting && (
          <Spinner />
        )}

        {!submitting && submitFailed && error && (
          <Alert color="danger">
            <strong>Error</strong> { error }
          </Alert>
        )}

        {!submitting && submitSucceeded && (
          <Alert color="success">
            <strong>Info Updated!</strong>
          </Alert>
        )}

        <ButtonGroup className={hideSubmit ? 'hidden' : ''}>
          <Button type="submit" color="primary" disabled={submitting}>Save</Button>
        </ButtonGroup>

      </Form>
    );
  }
}

export default reduxForm({
  form: 'accountSettings'
})(AccountSettings);
