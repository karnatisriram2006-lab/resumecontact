"use client";

import React from 'react';
import { Input } from './input';
import { Button } from './button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';

export interface Tag {
  id: string;
  text: string;
}

interface TagInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  className?: string;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>((props, ref) => {
  const { placeholder, tags, setTags, className } = props;

  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTagText = inputValue.trim();
      if (newTagText && !tags.some(tag => tag.text === newTagText)) {
        setTags([...tags, { id: crypto.randomUUID(), text: newTagText }]);
      }
      setInputValue('');
    }
  };

  const removeTag = (idToRemove: string) => {
    setTags(tags.filter(tag => tag.id !== idToRemove));
  };

  return (
    <div>
      <div className={cn('flex flex-wrap gap-2 rounded-md border border-input bg-background p-2', className)}>
        {tags.map(tag => (
          <Badge key={tag.id} variant="secondary">
            {tag.text}
            <button
              type="button"
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeTag(tag.id)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border-0 h-auto p-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
});

TagInput.displayName = 'TagInput';

export { TagInput };
