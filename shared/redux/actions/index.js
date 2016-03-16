
import * as ActionTypes from '../constants';
import baseURL from '../../baseURL';

import socket from '../../../client/socket';

export * from './userActions';
export * from './accountActions';
export * from './compilationActions';

export function setFilteredAccountEmails(emails) {
  return {
    type: ActionTypes.SET_FILTERED_ACCOUNT_EMAILS,
    emails,
  };
}

export function addFilteredAccountEmail(email) {
  return {
    type: ActionTypes.ADD_FILTERED_ACCOUNT_EMAIL,
    email,
  };
}

export function setFetchingFilteredAccountEmailsCount(val) {
  return {
    type: ActionTypes.SET_FETCHING_FILTERED_ACCOUNT_EMAILS_COUNT,
    val,
  };
}

export function setFetchingFilteredAccountEmails(val) {
  return {
    type: ActionTypes.SET_FETCHING_FILTERED_ACCOUNT_EMAILS,
    val,
  };
}

export function setFilteredAccountEmailsCount(count) {
  return {
    type: ActionTypes.SET_FILTERED_ACCOUNT_EMAILS_COUNT,
    count,
  };
}

export function getFilteredAccountEmailsCount(account, filter) {
  return (dispatch) => {
    socket.emit('GET_FILTERED_ACCOUNT_EMAILS_COUNT', { account, filter });
    dispatch(setFetchingFilteredAccountEmailsCount(true));
  };
}

export function getFilteredAccountEmails(account, filter) {
  return (dispatch) => {
    socket.emit('GET_FILTERED_ACCOUNT_EMAILS', { account, filter });
    dispatch(setFetchingFilteredAccountEmails(true));
  };
}

// // POST EXAMPLES
// import fetch from 'isomorphic-fetch';

export function addPost(post) {
  return {
    type: ActionTypes.ADD_POST,
    name: post.name,
    title: post.title,
    content: post.content,
    slug: post.slug,
    cuid: post.cuid,
    _id: post._id,
  };
}

export function changeSelectedPost(slug) {
  return {
    type: ActionTypes.CHANGE_SELECTED_POST,
    slug,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/addPost`, {
      method: 'post',
      body: JSON.stringify({
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
  };
}

export function addSelectedPost(post) {
  return {
    type: ActionTypes.ADD_SELECTED_POST,
    post,
  };
}

export function getPostRequest(post) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPost?slug=${post}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => dispatch(addSelectedPost(res.post)));
  };
}

export function deletePost(post) {
  return {
    type: ActionTypes.DELETE_POST,
    post,
  };
}

export function addPosts(posts) {
  return {
    type: ActionTypes.ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPosts`).
      then((response) => response.json()).
      then((response) => dispatch(addPosts(response.posts)));
  };
}

export function deletePostRequest(post) {
  return (dispatch) => {
    fetch(`${baseURL}/api/deletePost`, {
      method: 'post',
      body: JSON.stringify({
        postId: post._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deletePost(post)));
  };
}
