import React from 'react';

interface PageDescriptionHeaderProps {
  title: string;
  description?: string;
}

export default function PageDescriptionHeader({
  title,
  description,
}: PageDescriptionHeaderProps) {
  return (
    <div className='grid gap-2'>
      <h1 className='text-3xl font-bold md:text-4xl'>{title}</h1>
      {description ? (
        <p className='text-lg text-muted-foreground'>{description}</p>
      ) : null}
    </div>
  );
}
