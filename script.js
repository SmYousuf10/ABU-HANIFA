
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('studentForm');
  const tableBody = document.querySelector('#studentTable tbody');
  const dataKey = 'students';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const student = {};
      formData.forEach((value, key) => student[key] = value);

      const students = JSON.parse(localStorage.getItem(dataKey)) || [];
      students.push(student);
      localStorage.setItem(dataKey, JSON.stringify(students));

      alert('তথ্য সফলভাবে সংরক্ষণ হয়েছে!');
      form.reset();
    });
  }

  if (tableBody) {
    const students = JSON.parse(localStorage.getItem(dataKey)) || [];
    students.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.name || ''}</td>
        <td>${student.fatherName || ''}</td>
        <td>${student.fatherPesha || ''}</td>
        <td><button onclick="deleteStudent(${index})">ডিলিট</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
});

function deleteStudent(index) {
  const dataKey = 'students';
  const students = JSON.parse(localStorage.getItem(dataKey)) || [];
  students.splice(index, 1);
  localStorage.setItem(dataKey, JSON.stringify(students));
  location.reload();
}
