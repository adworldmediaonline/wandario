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
import { MeasuredContainer } from './components/measured-container';
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
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

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

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={['orderedList', 'bulletList']}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={['codeBlock', 'blockquote', 'horizontalRule']}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <ImageToolbar editor={editor} />
    </div>
  </div>
);

const ImageDeleteButton = ({ editor }: { editor: Editor }) => {
  const isImage = editor.isActive('image');

  if (!isImage) return null;

  return (
    <Button
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
      StarterKit,
      Document,
      Paragraph,
      Text,
      Underline,
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
      ...props.editorProps,
      handlePaste: (view, event) => {
        if (!event.clipboardData) return false;

        const html = event.clipboardData.getData('text/html');
        if (!html || !/<table/i.test(html)) return false;

        try {
          editor?.commands.insertContent(html, {
            parseOptions: {
              preserveWhitespace: false,
            },
          });
          return true;
        } catch (error) {
          console.error('Failed to paste table:', error);
          return false;
        }
      },
    },
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
        className
      )}
    >
      <Toolbar editor={editor} />
      <div className="relative">
        <EditorContent
          editor={editor}
          className={cn('minimal-tiptap-editor', editorContentClassName)}
        />
        <ImageDeleteButton editor={editor} />
      </div>
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
});

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor';

export default MinimalTiptapEditor;
