"use client";
import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";

function CodeEditor({ onChange }) {
  const [lang, setLang] = useState("cpp");
  const [defaultCode, setDefaultCode] = useState(
    `#include <bits/stdc++.h>
using namespace std;

int main() {
  // Write your code here;
  return 0;
}`
  );

  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    // Initialize with default code
    if (onChange) {
      onChange(defaultCode);
    }
  }

  function handleEditorChange(value) {
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <Editor
      height="72vh"
      defaultLanguage={lang}
      defaultValue={defaultCode}
      theme="vs-dark"
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
    />
  );
}

export default CodeEditor;
