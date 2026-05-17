const tasks = JSON.parse(localStorage.getItem('task'));

console.log(tasks);

const tasksList = document.querySelector('#tasks_info');

if (tasks) {
  for (const [key, value] of Object.entries(tasks)) {
    const span = document.createElement('span');
    const br = document.createElement('br');

    span.innerHTML = `
    <strong style="color: #00B7FF">${key}:</strong>
    <strong>${value}</strong>
    `;

    tasksList.append(span);
    tasksList.append(br);
  }
}

// if (tasks) {
//   task.forEach((t) => {
//     const span = document.createElement('span');
//     const br = document.createElement('br');
//
//     span.innerHTML = `
//     <strong>${t.value}</strong>
//     `;
//
//     tasksList.append(span);
//     tasksList.append(br);
//   });
// }