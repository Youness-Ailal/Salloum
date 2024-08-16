import { createPortal } from 'react-dom';

export type DivProps = React.ComponentProps<'div'>;

function BackDrop({ ...props }: DivProps) {
  return createPortal(
    <div {...props} className='h-screen w-screen fixed top-0 left-0 z-[99] bg-[rgba(0,0,0,0.5)]'></div>,
    document.body
  );
}

export default BackDrop;
