const user = JSON.parse(localStorage.getItem('userDate'));

console.log(user)

const userInfo = document.querySelector('#user_info')
const modalBody = document.querySelector('.modal-body')
const task = document.querySelector('#task');

if (userInfo) {
  for (const [key, value] of Object.entries(user)) {
    const span = document.createElement('span');
    const br = document.createElement('br');

    span.innerHTML = `
    <strong style="color: #00B7FF">${key}:</strong>
    <strong>${value}</strong>
    `;

    userInfo.append(span);
    userInfo.append(br);
  }
}

if (modalBody) {
  (async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/users/list?page=1', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        alert('Invalid token!');
        window.location.href = '/users/login';
      }

      modalBody.textContent = JSON.stringify(result);
    } catch (error) {
      alert('Invalid token!');
    }
  })();
}


task.addEventListener('click', () => {
  (async () => {
    console.log('agahahah');
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('/tasks/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        alert('Invalid token!');
      } else {
        window.location.href = '/tasks/tasks';
        localStorage.setItem('task', JSON.stringify(json));
      }


    } catch (e) {

    }
  })();
});