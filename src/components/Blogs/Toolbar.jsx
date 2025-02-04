"use client";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

import PropTypes from "prop-types";

const Toolbar = ({ editor, content }) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-base-300"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Underline className="w-5 h-5" />
        </button> */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={
            editor.isActive("heading", { level: 4 })
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Heading3 className="w-5 h-5" />
        </button>

        {/* <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button> */}
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary p-1"
          }
        >
          <Quote className="w-5 h-5" />
        </button> */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary hover:bg-secondary hover:text-primary-content p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-secondary text-primary-content p-1 rounded-lg"
              : "text-secondary hover:bg-secondary hover:text-primary-content p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  editor: PropTypes.object,
  content: PropTypes.string,
};

export default Toolbar;
