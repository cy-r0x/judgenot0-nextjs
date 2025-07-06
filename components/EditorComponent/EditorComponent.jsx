"use client";

import { material } from "@uiw/codemirror-theme-material";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

function CodeEditor({ handleChange, selectedLanguage, initialValue = "" }) {
  let lang;
  let comment = initialValue || `// Write your code here`;

  switch (selectedLanguage) {
    case "cpp":
      lang = cpp();
      break;
    case "python":
      lang = python();
      if (!initialValue) comment = `# Write your code here`;
      break;
    case "java":
      lang = java();
      break;
    default:
      lang = cpp();
      break;
  }

  const changeCode = (value) => {
    handleChange(value);
  };

  return (
    <CodeMirror
      value={comment}
      height="72vh"
      extensions={[lang]}
      onChange={changeCode}
      theme={material}
    />
  );
}

export default CodeEditor;
