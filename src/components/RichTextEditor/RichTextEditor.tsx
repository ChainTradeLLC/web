'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { $getRoot, $getSelection } from 'lexical';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import ToolbarPlugin from './ToolbarPlugin'; 
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import './RichTextEditor.module.scss';

type Props = {
  initialHTML?: string;
  onChange?: (html: string) => void;
};

export default function RichTextEditor({ initialHTML, onChange }: Props) {
  const editorConfig = {
    namespace: 'MyEditor',
    nodes: [],     
    theme: {
      paragraph: 'my-p',
      heading: { h1: 'my-h1', h2: 'my-h2' },
      link: 'my-link',
      // …
    },
    onError(error: Error) {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={{ ...editorConfig, editorState: initialHTML }}>
      {/* --- Visible editing surface --- */}
      <div className="border rounded-lg">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[200px] p-4 outline-none" />}
          placeholder={<Placeholder /> }
           //   @ts-ignore
          ErrorBoundary={LexicalErrorBoundary} 
        />
      </div>

      {/* --- Core plugins --- */}
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ListPlugin />
      <LinkPlugin />
      <MarkdownShortcutPlugin />

      {/* --- Emit HTML back to parent --- */}
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
             //   @ts-ignore
            const htmlString = $getRoot().getHTML();
            onChange?.(htmlString);
          });
        }}
      />
    </LexicalComposer>
  );
}

function Placeholder() {
  return <span className="text-gray-400">Start typing…</span>;
}
