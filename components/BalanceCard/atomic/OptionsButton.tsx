import {
  faEllipsis,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, MouseEventHandler } from 'react';

export interface IOptionsButton {
  editAccount: {
    show: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

  deleteAccount: {
    show: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
}

const OptionsButton: React.FC<IOptionsButton> = ({
  editAccount,
  deleteAccount,
}) => {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center w-full justify-center rounded-md p-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <FontAwesomeIcon
              icon={faEllipsis}
              className="h-5 w-5 dark:text-onPrimaryContainer text-onPrimaryContainerDark hover:text-primary dark:hover:text-primaryDark"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-6 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {editAccount.show && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm gap-4`}
                    onClick={editAccount.onClick}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    Edit
                  </button>
                )}
              </Menu.Item>
            )}
            {deleteAccount.show && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-4 py-2 text-sm gap-4`}
                    onClick={deleteAccount.onClick}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default OptionsButton;
