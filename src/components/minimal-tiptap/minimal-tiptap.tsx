import * as React from 'react';
import './styles/index.css';

import type { Content, Editor } from '@tiptap/react';
import type { UseMinimalTiptapEditorProps } from './hooks/use-minimal-tiptap';
import { EditorContent } from '@tiptap/react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { SectionOne } from './components/section/one';
import { SectionTwo } from './components/section/two';
import { SectionThree } from './components/section/three';
import { SectionFour } from './components/section/four';
import { SectionFive } from './components/section/five';
import { LinkBubbleMenu } from './components/bubble-menu/link-bubble-menu';
import { useMinimalTiptapEditor } from './hooks/use-minimal-tiptap';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { ImageIcon, Trash2Icon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ImageUploadField from '@/components/cloudinary-upload/ImageUploadField';
import { useForm } from 'react-hook-form';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import type { EditorProps } from '@tiptap/pm/view';

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const ImageToolbar = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm();

  const handleImageUpload = () => {
    const imageUrl = form.getValues('image')?.secure_url;
    if (imageUrl) {
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: 'Uploaded image',
        })
        .run();
      setOpen(false);
      form.reset();
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-8 w-8 p-0"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
          </DialogHeader>
          <ImageUploadField
            form={form}
            name="image"
            label="Image"
            description="Upload an image"
            multiple={false}
            onImageUpload={handleImageUpload}
            allowedFileTypes={[
              'image/jpeg',
              'image/png',
              'image/gif',
              'image/webp',
            ]}
            maxFileSize={5 * 1024 * 1024} // 5MB
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
      <div className="flex items-center gap-px">
        <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />
      </div>

      <Separator orientation="vertical" className="hidden md:block mx-2 h-7" />
      <Separator orientation="horizontal" className="md:hidden w-full my-2" />

      <div className="flex items-center gap-px">
        <SectionTwo
          editor={editor}
          activeActions={[
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            'clearFormatting',
          ]}
          mainActionCount={3}
        />
      </div>

      <Separator orientation="vertical" className="hidden md:block mx-2 h-7" />
      <Separator orientation="horizontal" className="md:hidden w-full my-2" />

      <div className="flex items-center gap-px">
        <SectionThree editor={editor} />
      </div>

      <Separator orientation="vertical" className="hidden md:block mx-2 h-7" />
      <Separator orientation="horizontal" className="md:hidden w-full my-2" />

      <div className="flex items-center gap-px">
        <SectionFour
          editor={editor}
          activeActions={['orderedList', 'bulletList']}
          mainActionCount={0}
        />
      </div>

      <Separator orientation="vertical" className="hidden md:block mx-2 h-7" />
      <Separator orientation="horizontal" className="md:hidden w-full my-2" />

      <div className="flex items-center gap-px">
        <SectionFive
          editor={editor}
          activeActions={['codeBlock', 'blockquote', 'horizontalRule']}
          mainActionCount={0}
        />
      </div>

      <Separator orientation="vertical" className="hidden md:block mx-2 h-7" />
      <Separator orientation="horizontal" className="md:hidden w-full my-2" />

      <div className="flex items-center gap-px">
        <ImageToolbar editor={editor} />
      </div>
    </div>
  </div>
);

const ImageDeleteButton = ({ editor }: { editor: Editor }) => {
  const isImage = editor.isActive('image');

  if (!isImage) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => editor.chain().focus().deleteSelection().run()}
      className="absolute top-2 right-2 h-8 w-8 bg-black/50 p-0 text-white hover:bg-black/70"
    >
      <Trash2Icon className="h-4 w-4" />
    </Button>
  );
};

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        listItem: {
          HTMLAttributes: {
            class: 'list-item',
          },
        },
      }),
      Document,
      Paragraph,
      Text,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            'text-primary underline underline-offset-4 hover:text-primary/80',
        },
        linkOnPaste: true,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'min-w-full border-collapse border border-gray-200',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'border-b border-gray-200',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-200 p-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-200 p-2 bg-gray-50 font-medium',
        },
      }),
    ],
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === 'Tab') {
          const { state } = view;
          const { selection } = state;
          const { $from } = selection;

          if ($from.parent.type.name === 'listItem') {
            if (event.shiftKey) {
              editor?.chain().focus().liftListItem('listItem').run();
            } else {
              editor?.chain().focus().sinkListItem('listItem').run();
            }
            return true;
          }
        }
        return false;
      },
      ...props.editorProps,
      handlePaste: (view, event) => {
        if (!event.clipboardData) return false;

        const pastedHtml = event.clipboardData.getData('text/html');
        if (pastedHtml && /<table/i.test(pastedHtml)) {
          try {
            editor?.commands.insertContent(pastedHtml, {
              parseOptions: {
                preserveWhitespace: 'full',
              },
            });
            return true;
          } catch (err) {
            console.error('Failed to paste table:', err);
          }
        }

        try {
          const pastedContent = event.clipboardData.getData('text/html');
          if (pastedContent) {
            editor?.commands.insertContent(pastedContent, {
              parseOptions: {
                preserveWhitespace: 'full',
              },
            });
            return true;
          }
        } catch (err) {
          console.error('Failed to paste rich content:', err);
        }

        return false;
      },
    } satisfies Partial<EditorProps>,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex h-auto min-h-[300px] w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
        'overflow-hidden',
        className
      )}
    >
      <Toolbar editor={editor} />
      <div className="relative flex-1 overflow-auto">
        <EditorContent
          editor={editor}
          className={cn(
            'minimal-tiptap-editor',
            'h-full min-h-[200px]',
            editorContentClassName
          )}
        />
        <ImageDeleteButton editor={editor} />
      </div>
      <LinkBubbleMenu editor={editor} />
    </div>
  );
});

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor';

export default MinimalTiptapEditor;
