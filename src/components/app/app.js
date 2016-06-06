import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { POST_SIGN_IN_PATH, POST_SIGN_OUT_PATH } from 'src/config';
import { authActions } from 'src/core/auth';


export class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.signOut = ::this.signOut;
  }

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replace(POST_SIGN_OUT_PATH);
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replace(POST_SIGN_IN_PATH);
    }
  }

  signOut() {
    this.props.signOut();
    window.location.replace('/');
  }

  render() {
    const { auth, children } = this.props;

    return (
      <div>
        <header className="header">
          <div className="g-row">
            <div className="g-col">
              <h1 className="header__title">Todo React Redux</h1>

              <ul className="header__links">
                {auth.authenticated ? <li><a className="header__link" onClick={this.signOut} href="#">Sign out</a></li> : null}
                <li><a className="header__link header__link--github" href="https://github.com/r-park/todo-react-redux"></a></li>
              </ul>
            </div>
          </div>
        </header>

        <main className="main">{children}</main>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.auth
}), authActions)(App);
