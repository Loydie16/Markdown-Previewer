import { useState } from "react";
import "./App.css";
import { marked } from "marked";
import { LiaFreeCodeCamp } from "react-icons/lia";
import { FaExpandArrowsAlt, FaCompressAlt } from "react-icons/fa";

const defaultMarkdown = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

function App() {
  const [markdownText, setMarkdownText] = useState<string>(defaultMarkdown);
  const [isEditorExpanded, setIsEditorExpanded] = useState(false);
  const [isPreviewerExpanded, setIsPreviewerExpanded] = useState(false);

  marked.setOptions({
    breaks: true,
  });

  const handleExpandClick = (type: string) => {
    if (type === "editor") {
      setIsEditorExpanded(!isEditorExpanded);
      if (isPreviewerExpanded) setIsPreviewerExpanded(false);
    } else {
      setIsPreviewerExpanded(!isPreviewerExpanded);
      if (isEditorExpanded) setIsEditorExpanded(false);
    }
  };

  return (
    <>
      <main className="flex flex-col bg-[#87b5b5] w-full h-full min-h-screen">
        {!isPreviewerExpanded && (
          <div className="flex flex-col self-center w-1/2 my-10">
            <div className="flex bg-[#4aa3a3] border-black border-2 border-b-0 p-1 justify-between shadow-2xl">
              <div className="flex items-center">
                <LiaFreeCodeCamp size={25} className="self-center mx-2" />
                <h1 className="text-xl text-left font-bold text-black">
                  Editor
                </h1>
              </div>
              <button
                className="flex justify-self-end self-end h-8 w-8 text-black"
                onClick={() => handleExpandClick("editor")}
              >
                {isEditorExpanded ? (
                  <FaCompressAlt size={20} className="self-center" />
                ) : (
                  <FaExpandArrowsAlt size={20} className="self-center" />
                )}
              </button>
            </div>
            <textarea
              className={`w-full border-black border-2 shadow-2xl bg-[#c0d8d8] ${
                isEditorExpanded ? "min-h-screen" : "min-h-[200px]"
              }`}
              name="editor"
              id="editor"
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
            ></textarea>
          </div>
        )}

        {!isEditorExpanded && (
          <div className="flex flex-col self-center w-3/4 my-10 ">
            <div className="flex bg-[#4aa3a3] border-black border-b-0 border-2 p-1 justify-between shadow-2xl">
              <div className="flex items-center">
                <LiaFreeCodeCamp size={25} className="self-center mx-2" />
                <h1 className="text-xl text-left font-bold text-black">
                  Previewer
                </h1>
              </div>
              <button
                className="flex justify-self-end self-end h-8 w-8 text-black"
                onClick={() => handleExpandClick("preview")}
              >
                {isPreviewerExpanded ? (
                  <FaCompressAlt size={20} className="self-center" />
                ) : (
                  <FaExpandArrowsAlt size={20} className="self-center" />
                )}
              </button>
            </div>
            <div
              className={`markdown-body w-full border-black border-2 shadow-2xl bg-[#c0d8d8] ${
                isPreviewerExpanded ? "min-h-screen" : "min-h-[200px]"
              }`}
              id="preview"
              dangerouslySetInnerHTML={{
                __html: marked(markdownText),
              }}
            ></div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
