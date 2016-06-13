const APIBaseURL = '/api';
export function query(request) {
  const url = `${APIBaseURL}${request.path}`;
  return fetch(url, {
    method: request.method,
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
      'X-CSRF-Param': $('meta[name="csrf-param"]').attr('content'),
    },
    body: JSON.stringify(request.body),
  })
  .then(response => response.json())
  .then(json => {
    $('meta[name="csrf-param"]').attr('content', json['CSRF-Param']);
    $('meta[name="csrf-token"]').attr('content', json['CSRF-Token']);
    return json;
  });
}
