import React from 'react';
import PropTypes from 'prop-types';

const UserSearch = ({
  results,
}) => {
  return (
    <ul>
      {results.map(result => (
        <li key={result.id}>
            {result.login}
        </li>
      ))}
    </ul>
  );
};

UserSearch.propTypes = {
  results: PropTypes.array.isRequired,
}

export default UserSearch;
