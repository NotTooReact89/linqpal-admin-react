import React from 'react';
import { Container, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BootstrapTable from 'react-bootstrap-table-next';
import { withRouter } from 'react-router';
import BounceLoader from 'react-spinners/BounceLoader';
import UserActions, { getUsersFetching, getUsers } from '../Redux/UserRedux';
import '../App.scss';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getUsersRequest();
  }

  render() {
    const { fetchingUsers } = this.props;
    return (
      <Container fluid>
        <Modal
          id="loading-modal"
          show={fetchingUsers}
          animation={false}
          size="lg"
          aria-labelledby="loading-modal"
          centered
        >
          <BounceLoader size={150} color={'orange'} loading={fetchingUsers} />
        </Modal>
        <br />
        <h1>CUSTOMERS</h1>
        {this.props.users.data && (
          <BootstrapTable
            keyField="id"
            data={this.props.users.data}
            columns={[...this.props.users.columns]}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
  fetchingUsers: getUsersFetching(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  getUsersRequest: () => dispatch(UserActions.getUsersRequest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard),
);
