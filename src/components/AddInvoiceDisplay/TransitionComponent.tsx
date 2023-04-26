import { Transition } from '@tailwindui/react';
import { useState } from 'react';

export default function TransitionComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* Will fade in and out */}
        HELLO TEST?
      </Transition>
    </div>
  );
}
