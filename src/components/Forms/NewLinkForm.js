import './forms.scss';

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, FormGroup, Col, Label, Button, ButtonGroup, Alert} from 'reactstrap';
import Spinner from '../Spinner';

import { required, email, minLength, url } from './validate';
import renderField from './renderField';

class NewLinkForm extends Component {

  renderError(error) {
    return (
      <Alert color="danger">
        <strong>{ error }</strong>
      </Alert>
    );
  }

  render() {

    const { handleSubmit,
            pristine,
            reset,
            submitting,
            error,
            submitFailed,
            submitSucceeded,
            hideSubmit
        } = this.props;

    return (
      <Form onSubmit={handleSubmit}>
        <Field
          icon="info"
          name="title"
          type="text"
          label="Title"
          component={renderField}
          validate={[ required, minLength(3) ]}
        />
        <Field
          icon="link"
          name="link"
          type="text"
          label="Link"
          component={renderField}
          validate={[ required, url ]}
        />

        {submitting && (
          <Spinner />
        )}

        {!submitting && submitFailed && (
          <Alert color="danger">
            <strong>Error</strong> { this.props.error }
          </Alert>
        )}

        {!submitting && submitSucceeded && (
          <Alert color="success">
            <strong>New Link Posted</strong>
          </Alert>
        )}

        {!hideSubmit && (
          <ButtonGroup>
            <Button type="submit" color="primary" disabled={submitting}>Post</Button>
          </ButtonGroup>
        )}

      </Form>
    );
  }
}

export default reduxForm({
  form: 'newLinkForm'
})(NewLinkForm);
