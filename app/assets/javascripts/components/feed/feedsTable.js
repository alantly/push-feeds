import React from 'react';

export default function FeedsTable() {
  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Your Feed Subscriptions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jill</td>
              <td>Smith</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
