export default function UsersTransform(usersResponse) {
  try {
    const userArray = [
      {
        dataField: 'ssn',
        text: 'SSN',
      },
      {
        dataField: 'firstName',
        text: 'First name',
      },
      {
        dataField: 'lastName',
        text: 'Last name',
      },
      {
        dataField: 'telephoneNumber',
        text: 'Phone',
      },
      {
        dataField: 'fullAddress',
        text: 'Address',
      },
    ];

    const usersData = usersResponse.map((user, index) => {
      return {
        id: user._id,
        ssn: user.ssn,
        firstName: user.firstName,
        lastName: user.lastName,
        telephoneNumber: user.telephoneNumber,
        fullAddress: user.fullAddress,
      };
    });

    const tableData = {
      columns: userArray,
      data: usersData,
    };

    return tableData;
  } catch (e) {
    console.log('Exception: ', e);
  }
}
