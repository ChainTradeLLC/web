'use client';

import { useCallback, useEffect, useState } from 'react';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const [isLink, setLink] = useState(false);
//   @ts-ignore
  const canUndo = editor.getEditorState().canUndo();
  //   @ts-ignore
  const canRedo = editor.getEditorState().canRedo();

  // Update toolbar state whenever the selection changes
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setBold(selection.hasFormat('bold'));
      setItalic(selection.hasFormat('italic'));
      setUnderline(selection.hasFormat('underline'));
      const node = selection.anchor.getNode().getTopLevelElementOrThrow();
      setLink($isLinkNode(node));
    }
  }, []);

  useEffect(() => {
    // Register a listener that fires on every editor state change
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(updateToolbar);
    });
  }, [editor, updateToolbar]);

  /** Helper to send format commands */
  //   @ts-ignore
  const format = (cmd: typeof FORMAT_TEXT_COMMAND, val: string) => () => editor.dispatchCommand(cmd, val);

  return (
    <div className="flex gap-2 border-b px-3 py-1 text-sm">
      <button onClick={format(FORMAT_TEXT_COMMAND, 'bold')} className={button(isBold)}>
        B
      </button>
      <button onClick={format(FORMAT_TEXT_COMMAND, 'italic')} className={button(isItalic)}>
        i
      </button>
      <button onClick={format(FORMAT_TEXT_COMMAND, 'underline')} className={button(isUnderline)}>
        U
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            isLink ? null : { url: prompt('Enter URL') ?? '' },
          )
        }
        className={button(isLink)}
      >
        🔗
      </button>
      <div className="ml-auto flex gap-2">
        <button disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} className={button(false)}>
          ↺
        </button>
        <button disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} className={button(false)}>
          ↻
        </button>
      </div>
    </div>
  );
}

/** Tailwind helper – highlight active formats */
function button(active: boolean) {
  return `px-2 py-0.5 rounded ${
    active ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200'
  } disabled:opacity-40`;
}
