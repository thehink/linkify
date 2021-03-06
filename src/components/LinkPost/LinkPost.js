import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { getLocation } from 'linkify/utils';
import { Row, Col } from 'reactstrap';

import EditLinkForm from '../../components/Forms/EditLinkForm';

import './linkPost.scss';

export default class LinkPost extends Component {

  static propTypes = {
    onUpvote: PropTypes.func,
    onDownvote: PropTypes.func,
    onUnvote: PropTypes.func,
    onEditSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    owner: PropTypes.bool,
    link: PropTypes.object,
    author: PropTypes.object
  }

  state = {
    isEditMode: false
  }

  toggleEditMode(){
    this.setState({
      isEditMode: !this.state.isEditMode,
    });
  }

  render() {

    const {
      onUpvote,
      onDownvote,
      onUnvote,
      onEditSubmit,
      onDelete,
      owner
    } = this.props;

    const {
      id,
      title,
      directory,
      url,
      description,
      image,
      created_at,
      updated_at,
      votes,
      upvoted,
      downvoted,
      comment_count,
      deleted
    } = this.props.link;

    const {
      username,
      avatar
    } = this.props.author;

    const {
      isEditMode
    } = this.state;

    return (
      <Row className="linkpost">
        <Col xs="12" sm="3" lg="2" className="side">
          {!deleted && ( <img src={ '/' + avatar } className="avatar" /> )}
          <ul className="sidemenu">
            <li><Link to={`/u/${this.props.author.id}/${username}`}>{ username }</Link></li>
            <li><button className={upvoted ? 'voted' : ''} onClick={ !upvoted ? onUpvote : onUnvote } disabled={ deleted }><FontAwesome name="arrow-up" /></button></li>
            <li>{ votes }</li>
            <li><button className={downvoted ? 'voted' : ''} onClick={ !downvoted ? onDownvote : onUnvote } disabled={ deleted }><FontAwesome name="arrow-down" /></button></li>
            <li className="dropdown-divider"></li>
            {!deleted && owner && ( <li><button onClick={ this.toggleEditMode.bind(this) }>Edit</button></li> )}
            {!deleted && owner && ( <li><button onClick={ onDelete }>Remove</button></li> )}
          </ul>
        </Col>
        <Col xs="12" sm="9" lg="10">
          <div className="arrow-left"></div>
          <div className="post">
            <h3><a href={ url } target="_blank">{ title }</a></h3>
            <span className="post-time">{ created_at }</span>
            <div className="content">
              {deleted && (<span>Deleted...</span>)}
              { !deleted && isEditMode && (
                <EditLinkForm
                  onSubmit={ values => onEditSubmit(values).then(response => this.toggleEditMode())}
                  initialValues={{ description }}
                  showCancel={ true }
                  onCancelClick={ this.toggleEditMode.bind(this) }
                />
              ) || description}

            </div>
          </div>
          <ul className="footer">
            <li>Comments: { comment_count }</li>
            <li><b>{ getLocation(url).hostname }</b></li>
          </ul>
        </Col>
      </Row>
    );
  }
}
