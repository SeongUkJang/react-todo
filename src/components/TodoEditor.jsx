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