const APIBaseURL = '/api';
export function query(request) {
  const url = `${APIBaseURL}${request.path}`;
  return fetch(url, {
    method: request.method,
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
      'X-CSRF-Param': $('meta[name="csrf-param"]').attr('content'),
    },
    body: JSON.stringify(request.body),
  })
  .then(response => {
    $('meta[name="csrf-param"]').attr('content', response.headers.get('Csrf-Param'));
    $('meta[name="csrf-token"]').attr('content', response.headers.get('Csrf-Token'));
    if (response.status === 204) return {};
    return response.json();
  });
}

export function updateServer(request, beforeQuery, afterQuery) {
  return dispatch => {
    beforeQuery();
    return query(request)
      .then(afterQuery);
  };
}
