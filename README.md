할 일 목록(To do List)을 만드는 React 애플리케이션입니다. 
사용자에게 날짜와 할 일을 추가하고 관리할 수 있는 기능을 제공합니다. 
각 컴포넌트는 작은 부분의 UI를 담당하며, 전체적으로 하나의 앱을 이루는 구조입니다.

---

# **1. Header 컴포넌트**

### **`Header.js`**

```jsx
import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className='Header'>
      <h3>오늘은📆</h3> {/* 오늘 날짜를 강조하는 텍스트 */}
      <h1>{new Date().toDateString()}</h1> {/* 현재 날짜를 'Day Month Date Year' 형식으로 표시 */}
    </header>
  )
}

export default Header
```

### 설명:

- **헤더 컴포넌트**는 페이지 상단에 오늘 날짜를 표시하는 역할을 합니다.
- `new Date().toDateString()`을 사용하여 **오늘 날짜**를 문자열로 포맷팅합니다. 예를 들어 "Wed Mar 27 2025"와 같은 형식으로 출력됩니다.
- `h3` 태그에는 "오늘은📆"라는 문구를 넣어 날짜와 관련된 부분임을 시각적으로 표현합니다.
- `h1` 태그에는 `new Date().toDateString()`으로 현재 날짜를 표시합니다.

---

### `Header.css`

```css
.Header h1 {
  color: rgb(37, 147, 255);  /* h1 태그에 파란색 텍스트 색상 적용 */
}

```

- `.Header h1 { color: rgb(37, 147, 255); }`
    
    `Header` 클래스 내의 `h1` 태그에 텍스트 색상을 파란색으로 지정합니다. 이 스타일은 날짜를 강조하기 위해 사용됩니다.
    

---

# **2. TodoEditor 컴포넌트**

### **`TodoEditor.js`** (새로운 할 일 추가 컴포넌트)

```jsx
jsx
복사
import React, { useState, useRef } from 'react'
import './TodoEditor.css'

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState('')  // 텍스트 입력 필드의 값을 저장
  const inputRef = useRef()  // input 태그에 대한 참조

  // 입력 필드의 값이 변경될 때마다 content 상태를 업데이트
  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  // 할 일 추가 버튼을 클릭할 때 호출
  const onSubmit = () => {
    if (content === '') {  // 내용이 비어 있으면 입력 필드에 포커스를 맞추고 리턴
      inputRef.current.focus()
      return
    }

    onCreate(content)  // 부모 컴포넌트(App)로 새 할 일을 전달
    setContent('')  // 입력 필드를 비운다
  }

  // Enter 키를 누를 때도 할 일을 추가할 수 있도록 설정
  const onKeydown = (e) => {
    if (e.keyCode === 13) {  // Enter 키를 눌렀을 때
      onSubmit()  // 할 일 추가
    }
  }

  return (
    <div className='Editor'>
      <inputref={inputRef}  // 입력 필드에 참조 설정
        value={content}  // 입력 필드에 현재 상태의 값 표시
        onKeyDown={onKeydown}  // 키 입력을 처리
        onChange={onChangeContent}  // 입력 값 변경 처리
        type="text"
        placeholder='새로운 todo..' />  {/* placeholder는 기본 안내 텍스트 */}
      <button onClick={onSubmit}>추가</button>  {/* 추가 버튼 클릭 시 할 일 추가 */}
    </div>
  )
}

export default TodoEditor

```

### 설명:

- **TodoEditor**는 사용자가 새로운 할 일을 입력하는 컴포넌트입니다.
- `useState`를 사용하여 입력된 텍스트를 `content`라는 상태에 저장합니다.
- `useRef`는 **입력 필드**에 포커스를 맞추는 데 사용됩니다. 할 일을 입력하지 않고 "추가" 버튼을 클릭할 경우, 입력 필드에 포커스를 다시 맞춰주어 사용자가 쉽게 입력할 수 있도록 돕습니다.
- 사용자가 입력하고 "추가" 버튼을 클릭하면 `onCreate`라는 함수를 부모 컴포넌트(App)로 전달하고, 입력값을 비웁니다.
- `onKeydown`은 사용자가 **Enter 키**를 눌렀을 때도 할 일이 추가되도록 처리합니다.

---

### `TodoEditor.css`

```css
.Editor {
  display: flex;
  gap: 10px;  /* input과 버튼 사이에 간격을 둡니다 */
}

.Editor input {
  flex: 1;  /* input이 가능한 공간을 모두 차지하도록 설정 */
  padding: 15px;  /* 입력창의 패딩을 조정 */
  border: 1px solid #eee;  /* 입력창에 연한 회색 테두리 */
}

.Editor button {
  cursor: pointer;  /* 버튼 위에 마우스를 올리면 포인터 모양으로 변경 */
  width: 80px;  /* 버튼의 너비를 80px로 고정 */
  border: none;  /* 버튼 테두리 없애기 */
  color: #fff;  /* 버튼 글자 색상을 흰색으로 */
  border-radius: 5px;  /* 버튼의 모서리를 둥글게 */
  background-color: rgb(37, 147, 255);  /* 버튼 배경색을 파란색으로 */
}

```

---

# **3. TodoItem 컴포넌트**

### **`TodoItem.js`** (개별 할 일 항목 컴포넌트)

```jsx
jsx
복사
import React from 'react'
import './TodoItem.css'

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  // 체크박스를 클릭하면 완료 상태를 토글
  const onChangeCheckbox = () => {
    onUpdate(id)  // 부모 컴포넌트에게 상태 업데이트를 요청
  }

  // 삭제 버튼을 클릭하면 해당 할 일을 삭제
  const onClickDeleteButton = () => {
    onDelete(id)  // 부모 컴포넌트에게 삭제 요청
  }

  return (
    <div className={`TodoItem ${isDone ? "done" : ""}`}>
      <inputonChange={onChangeCheckbox}
        type="checkbox"
        readOnly
        checked={isDone}  // 완료된 할 일은 체크박스가 체크됨
      />
      <div className="content">
        {content}  {/* 할 일의 내용 표시 */}
      </div>
      <div className="date">
        {new Date(date).toLocaleDateString()}  {/* 할 일의 생성 날짜 */}
      </div>
      <button onClick={onClickDeleteButton}>삭제</button>  {/* 삭제 버튼 */}
    </div>
  )
}

export default TodoItem

```

### 설명:

- **TodoItem**은 각 할 일 항목을 표시하는 컴포넌트입니다.
- `isDone` 상태에 따라 체크박스가 체크되거나 해제됩니다. 체크박스를 클릭하면 `onUpdate`가 호출되어 할 일의 완료 상태를 변경합니다.
- 할 일 항목에는 **내용(content)**과 **날짜(date)**가 표시되며, 날짜는 `new Date(date).toLocaleDateString()`을 사용하여 **로컬 날짜 형식**으로 표시됩니다.
- `삭제` 버튼을 클릭하면 해당 항목이 삭제됩니다.

---

### `TodoItem.css`

```css
.TodoItem {
  display: flex;
  align-items: center;  /* 각 요소를 수평으로 배치 */
  gap: 20px;  /* 요소들 사이에 간격을 20px 둡니다 */
  padding-bottom: 20px;  /* 아래쪽에 여백 추가 */
  border-bottom: 1px solid #eee;  /* 각 항목에 하단 테두리 추가 */
}

.TodoItem input {
  width: 20px;  /* 체크박스 크기 설정 */
}

.content {
  flex: 1;  /* content가 남는 공간을 채우도록 설정 */
}

.TodoItem .date {
  font-size: 14px;  /* 날짜 글꼴 크기 */
  color: gray;  /* 날짜 색상은 회색 */
}

.TodoItem button {
  cursor: pointer;  /* 버튼에 마우스 올리면 포인터 모양으로 변경 */
  border: none;  /* 버튼 테두리 없애기 */
  font-size: 14px;  /* 버튼 글꼴 크기 설정 */
  padding: 5px;  /* 버튼 안에 여백 추가 */
}

.TodoItem.done .content{
    text-decoration: line-through;
    color: gray;
}
```

---

# **4. TodoList 컴포넌트**

### **`TodoList.js`** (할 일 목록 컴포넌트)

```jsx
jsx
복사
import React, { useState } from 'react'
import TodoItem from './TodoItem'
import './TodoList.css'

const TodoList = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('')  // 검색어 상태

  // 검색어 변경 시 상태 업데이트
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  // 검색어에 맞는 할 일만 필터링하는 함수
  const getFilteredData = () => {
    if (search === '') {  // 검색어가 없으면 모든 할 일 반환
      return todos
    }
    return todos.filter((todo) =>  // 할 일 내용에 검색어가 포함되면 필터링
      todo.content.toLowerCase().includes(search.toLowerCase())
    )
  }

  const filteredTodos = getFilteredData()  // 필터링된 할 일 목록

  return (
    <div className='TodoList'>
      <h4>Todo List🌱</h4>
      <inputonChange={onChangeSearch}  // 검색어 입력 처리
        value={search}  // 검색어 상태
        type="text"
        placeholder='검색어를 입력하세요' />
      <div className="todos-wrapper">
        {filteredTodos.map((todo) => {  // 필터링된 할 일 목록을 순회하여 TodoItem으로 렌더링
          return (
            <TodoItemonUpdate={onUpdate}
              onDelete={onDelete}
              {...todo}  // 각 todo 객체를 TodoItem에 전달
              key={todo.id}  // key로 고유한 id를 전달
            />
          )
        })}
      </div>
    </div>
  )
}

export default TodoList

```

### 설명:

- **TodoList**는 모든 할 일 목록을 표시하는 컴포넌트입니다.
- 사용자가 입력한 **검색어**를 기반으로 할 일 목록을 필터링하여 보여줍니다. `getFilteredData` 함수는 `content`에 검색어가 포함된 할 일만 반환합니다.
- `map()` 함수를 사용하여 **TodoItem**을 여러 번 렌더링하고, 각 `todo` 항목에 대해 `onUpdate`와 `onDelete`를 전달합니다.

---

### `TodoList.css`

```css
.TodoList {
  display: flex;
  flex-direction: column;  /* 세로 방향으로 요소들 배치 */
  gap: 20px;  /* 요소들 간격을 20px로 설정 */
}

.TodoList > input {
  width: 100%;  /* 입력창 너비를 100%로 설정 */
  border: none;  /* 입력창 테두리 없애기 */
  border-bottom: 1px solid #eee;  /* 아래쪽에 회색 테두리 추가 */
  padding: 15px 0;  /* 위아래 여백 추가 */
}

.TodoList > input:focus {
  outline: none;  /* 입력창 포커스 시 외곽선 없애기 */
  border-bottom: 1px solid rgb(37, 147, 255);  /* 파란색 테두리로 강조 */
}

.todos-wrapper {
  display: flex;
  flex-direction: column;  /* 세로 방향으로 할 일 목록 배치 */
  gap: 20px;  /* 각 할 일 사이에 간격을 20px로 설정 */
}

```

---

# **5. App 컴포넌트**

### **`App.js`** (메인 컴포넌트)

```jsx
jsx
복사
import './App.css'
import Header from './components/Header'
import TodoEditor from './components/TodoEditor'
import TodoList from './components/TodoList'
import { useState, useRef } from 'react'

const mockData = [
  { id: 0, isDone: false, content: 'React 공부하기', date: new Date().getTime() },
  { id: 1, isDone: false, content: '산책하기', date: new Date().getTime() },
  { id: 2, isDone: false, content: '노래연습하기', date: new Date().getTime() },
]

function App() {
  const [todos, setTodos] = useState(mockData)  // 할 일 목록 상태
  const idRef = useRef(3)  // 새로운 할 일이 추가될 때마다 고유한 id 생성

  // 새로운 할 일 추가
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,  // 새로운 id 부여
      isDone: false,
      content: content,
      date: new Date().getTime()
    }
    setTodos([newTodo, ...todos])  // 새로운 할 일을 목록 앞에 추가
  }

  // 할 일의 완료 상태를 업데이트
  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId
          ? { ...todo, isDone: !todo.isDone }  // 완료 상태 토글
          : todo
      )
    )
  }

  // 할 일 삭제
  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId))  // 해당 id의 할 일 삭제
  }

  return (
    <div className='App'>
      <Header />  {/* 날짜 표시 헤더 */}
      <TodoEditor onCreate={onCreate} />  {/* 할 일 추가 컴포넌트 */}
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />  {/* 할 일 목록 */}
    </div>
  )
}

export default App

```

### 설명:

- **App** 컴포넌트는 애플리케이션의 전체 구조를 구성합니다.
- `useState`를 사용하여 할 일 목록(`todos`)을 상태로 관리하고, `useRef`는 새로운 할 일이 추가될 때 고유한 `id`를 생성하는 데 사용됩니다.
- `onCreate`는 새로운 할 일을 추가하는 함수이고, `onUpdate`는 할 일의 완료 상태를 변경하는 함수입니다. `onDelete`는 할 일을 삭제하는 함수입니다.
- `Header`, `TodoEditor`, `TodoList` 컴포넌트를 포함하고 있으며, 이들 컴포넌트에서 데이터를 주고받으며 상호작용합니다.

---

### `App.css`

```css
.App {
  width: 500px;  /* 앱의 너비를 500px로 설정 */
  margin: 0 auto;  /* 페이지 중앙에 배치 */
  display: flex;
  flex-direction: column;  /* 세로 방향으로 배치 */
  gap: 10px;  /* 각 컴포넌트 간격을 10px로 설정 */
}

```

---

### 요약

이 애플리케이션은 각 컴포넌트가 역할을 분담하여 `할 일 목록`을 관리하는 구조입니다. `TodoEditor`는 새로운 할 일을 추가하고, `TodoList`는 목록을 보여주며, `Header`는 오늘 날짜를 표시합니다. `App` 컴포넌트가 최상위에서 이들을 묶어주고, 상태를 관리합니다.

### components

- header.jsx
    
    ```jsx
    import React from 'react'
    import './Header.css'
    const Header = () => {
      return (
      <header className='Header'>
        <h3>오늘은📆</h3>
        <h1>{new Date().toDateString()}</h1>
      </header>
      )
    }
    
    export default Header
    ```
    
- header.css
    
    ```css
    .Header h1{
        color: rgb(37, 147, 255);
    }
    ```
    
- TodoEditor.jsx
    
    ```jsx
    import React ,{useState,useRef} from 'react'
    import './TodoEditor.css'
    const TodoEditor = ({onCreate}) => {
    
      const [content, setContent]=useState('')
      const inputRef = useRef(3)
    
      const onChangeContent=(e)=>{
        setContent(e.target.value)
      }
      const onSubmit=()=>{
        if(content===''){
          inputRef.current.focus()
    
          return
        }
    
        onCreate(content)
        setContent('')
    
      }
    
      const onKeydown=(e)=>{
        if(e.keyCode===13){
          onSubmit()
        }
      }
      return (
        <div className='Editor'>
            <input
            ref={inputRef}
            value={content}
            onKeyDown={onKeydown}
            onChange={onChangeContent}
            type="text" 
            placeholder='새로운 todo..' />
            <button onClick={onSubmit}>추가</button>
        </div>
      )
    }
    
    export default TodoEditor
    ```
    
- TodoEditor.css
    
    ```css
    .Editor {
        display: flex;
        gap: 10px;
    }
    .Editor input {
        flex: 1;
        padding: 15px;
        border: 1px solid #eee;
    }
    .Editor button {
        cursor: pointer;
        width: 80px;
        border: none;
        color: #fff;
        border-radius: 5px;
        background-color: rgb(37, 147, 255);;
    }
    ```
    
- TodoItem.jsx
    
    ```jsx
    import React from 'react'
    import './TodoItem.css'
    
    const TodoItem = ({id,isDone,content,date,onUpdate,onDelete}) => {
    
      const onChangeCheckbox=()=>{
        onUpdate(id)
      }
      const onClickDeleteButton=()=>{
        onDelete(id)
      }
      return (
        <div className={`TodoItem ${isDone? "done":""}`}>
            <input 
            onChange={onChangeCheckbox}
            type="checkbox" 
            readOnly 
            checked={isDone}  />
            <div className="content">
                {content}
            </div>
            <div className="date">
              {new Date(date).toLocaleDateString()}
            </div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
      )
    }
    
    export default TodoItem
    ```
    
- TodoItem.css
    
    ```css
    .TodoItem {
        display: flex;
        align-items: center;
        gap: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .TodoItem input{
        width: 20px;
    }
    .content {
        flex: 1;
    }
    .TodoItem .date {
        font-size: 14px;
        color: gray;
    }
    .TodoItem button {
        cursor: pointer;
        border: none;
        font-size: 14px;
        padding: 5px;
    }
    .TodoItem.done .content{
        text-decoration: line-through;
        color: gray;
    }
    ```
    
- TodoList.jsx
    
    ```jsx
    import React, { useState } from 'react'
    import TodoItem from './TodoItem'
    import './TodoList.css'
    
    const TodoList = ({ todos, onUpdate,onDelete }) => {
    
        const [search, setSearch] = useState('')
    
        const onChangeSearch = (e) => {
            setSearch(e.target.value)
        }
    
        const getFilteredData = () => {
            if (search === '') {
                return todos;
            }
            return todos.filter((todo) =>
                todo.content
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        }
    
        const filteredTodos = getFilteredData()
        return (
            <div className='TodoList'>
                <h4>Todo List🌱</h4>
                <input
                    onChange={onChangeSearch}
                    value={search}
                    type="text"
                    placeholder='검색어를 입력하세요' />
                <div className="todos-wrapper">
                    {filteredTodos.map((todo) => {
                        return (
                            <TodoItem
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            {...todo} 
                            key={todo.id} />
                        )
                    })}
                </div>
            </div>
        )
    }
    
    export default TodoList
    ```
    
- TodoList.css
    
    ```css
    .TodoList {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .TodoList >input{
        width: 100%;
        border: none;
        border-bottom: 1px solid #eee;
        padding: 15px 0;
    }
    .TodoList >input:focus{
        outline: none;
        border-bottom: 1px solid rgb(37, 147, 255);
    }
    .todos-wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    ```
    
- App.jsx
    
    ```jsx
    import './App.css'
    import Header from './components/Header'
    import TodoEditor from './components/TodoEditor'
    import TodoList from './components/TodoList'
    import { useState, useRef } from 'react'
    
    const mockData = [
      {
        id: 0,
        isDone: false,
        content: 'React 공부하기',
        date: new Date().getTime()
      },
      {
        id: 1,
        isDone: false,
        content: '산책하기',
        date: new Date().getTime()
      },
      {
        id: 2,
        isDone: false,
        content: '노래연습하기',
        date: new Date().getTime()
      },
    ]
    
    function App() {
    
      const [todos, setTodos] = useState(mockData)
      const idRef = useRef(3)
    
      const onCreate = (content) => {
        const newTodo = {
          id: idRef.current++,
          isDone: false,
          content: content,
          date: new Date().getTime()
        }
    
        setTodos([newTodo, ...todos])
      }
      const onUpdate = (targetId) => {
        setTodos(
          todos.map((todo) =>
            todo.id === targetId
              ? { ...todo, isDone: !todo.isDone } : todo
          )
        )
      }
    
      const onDelete=(targetId)=>{
        setTodos(
          todos.filter((todo)=>todo.id!==targetId)
        )
      }
      return (
        <div className='App'>
          <Header />
          <TodoEditor onCreate={onCreate} />
          <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    
        </div>
      )
    }
    
    export default App
    
    ```
    
- App.css
    
    ```css
    .App {
      width: 500px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    ```
