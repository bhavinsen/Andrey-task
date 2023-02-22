import React from 'react'
  import { Editor } from "react-draft-wysiwyg";
  import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({contentData, setContentData}) => {

  const onEditorStateChange = (e) => {
  setContentData({...contentData, content: e?.blocks[0].text})
  }

  return (
    <Editor
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ height: 500, width: 800, border: "1px solid black" }}
         onChange={onEditorStateChange}
      />
  )
}

export default TextEditor