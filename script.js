document.addEventListener('DOMContentLoaded', function() {
  loadTodos()   // 페이지가 로드될 때 저장된 리스트를 불러오는 함수 호출
})

document.getElementById('addTodo').addEventListener('click', function () {
  var value = document.getElementById('todoInput').value
  if (value) {
      addTodo(value)  // 입력된 텍스트를 리스트에 추가하는 함수 호출
      document.getElementById('todoInput').value = ''  // 텍스트 입력창 초기화
      storeTodos()    // 변경된 리스트를 로컬 스토리지에 저장하는 함수 호출
  }
})

// 입력 필드에서 Enter 키 눌렀을 때 이벤트 감지
document.getElementById('todoInput').addEventListener('keypress', function(event) {
  // Enter 키의 keyCode === 13 이지만 현재 지원하지 않아 key === 'Enter' 로 대체함
  if (event.key === 'Enter') {
      var value = this.value.trim()
      if (value) {
          addTodo(value) // 입력된 텍스트로 할 일을 추가하는 함수 호출
          this.value = '' // 입력 필드 초기화
          storeTodos() // 변경된 리스트 저장
      }
  }
})

// 삭제 함수
function removeTodo() {
  var item = this.parentNode
  item.remove()  // 클릭된 리스트 항목을 삭제
  storeTodos()   // 변경된 리스트를 로컬 스토리지에 저장하는 함수 호출
}

// 수정 함수
function editTodo() {
  var item = this.parentNode
  var textSpan = item.querySelector('.text-span')
  var newText = prompt('수정할 내용을 입력하세요', textSpan.innerText.trim())  // 사용자에게 수정할 내용을 입력 받음
  if (newText !== null) {  // 사용자가 취소를 누르지 않았을 때
    textSpan.innerText = newText  // 텍스트 업데이트
    storeTodos()  // 변경된 리스트를 로컬 스토리지에 저장하는 함수 호출
  }
}

function addTodo(text) {
  var list = document.getElementById('todoList')
  var item = document.createElement('li')
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

  // Checkbox 생성
  var checkBox = document.createElement('input')
  checkBox.setAttribute('type', 'checkbox')
  checkBox.classList.add('checkbox-custom') // checkbox에 클래스 추가

  // Checkbox 이벤트 리스너
  checkBox.addEventListener('change', function() {
      if (checkBox.checked) {   // 체크박스가 체크되어있을때
          textSpan.style.textDecoration = 'line-through'
      } else {
          textSpan.style.textDecoration = 'none'
      }
      storeTodos()  // 변경된 리스트를 로컬 스토리지에 저장하는 함수 호출
  })

  // Text 생성
  var textSpan = document.createElement('span')
  textSpan.innerText = text
  textSpan.classList.add('text-span', 'flex-grow-1') // text에 클래스 추가

  // 수정 버튼 생성
  var editButton = document.createElement('button')
  editButton.innerText = '수정'
  editButton.classList.add('btn', 'btn-success', 'btn-sm') // 수정 버튼에 클래스 추가
  editButton.style.marginRight = '5px' // 수정 버튼에 오른쪽 마진 값을 추가하여 간격을 늘림

  editButton.addEventListener('click', editTodo)

  // 삭제 버튼 생성
  var deleteButton = document.createElement('button')
  deleteButton.innerText = '삭제'
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm')
  deleteButton.addEventListener('click', removeTodo)

  // Checkbox, Text, 수정 버튼, 삭제 버튼을 리스트 항목에 추가
  item.appendChild(checkBox);
  item.appendChild(textSpan);
  item.appendChild(editButton);
  item.appendChild(deleteButton);

  // 리스트 항목을 리스트에 추가
  list.appendChild(item);
}


// 저장함수
function storeTodos() {
  var todos = []
  var todoList = document.getElementById('todoList')
  for (var i = 0; i < todoList.children.length; i++) {    // todoList.children.length 는 todoList 리스트 항목의 개수
      todos.push(todoList.children[i].querySelector('.text-span').innerText.trim())    // 리스트의 텍스트만 추출하여 저장
  }
  localStorage.setItem('todos', JSON.stringify(todos))    // 로컬 스토리지에 저장된 리스트 갱신
}

// 로드함수
function loadTodos() {
  var todos = JSON.parse(localStorage.getItem('todos'))   // 로컬 스토리지에서 저장된 리스트 불러오기
  if (todos) {
      todos.forEach(function(todo) {
          addTodo(todo)   // 불러온 리스트를 화면에 표시하는 함수 호출
      })
  }
}
