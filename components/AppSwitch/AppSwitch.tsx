import { Switch } from '@headlessui/react';

type AppSwitchProps = {
  checked: boolean;
  onChange: (flag: boolean) => void;
  label?: React.ReactNode;
  size?: 'small' | 'large';
};

const AppSwitch: React.FC<AppSwitchProps> = ({ checked, onChange, label, size = 'large' }) => {
  return (
    <Switch.Group>
      {label && <Switch.Label>{label}</Switch.Label>}
      <Switch
        checked={checked}
        onChange={onChange}
        className={`
        ${checked ? 'bg-black' : 'bg-gray-400'}
          ${size === 'large' ? 'h-5 w-10' : 'h-3 w-8'}
          relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span
          aria-hidden="true"
          className={`${checked ? 'translate-x-5' : 'translate-x-0'}
          ${size === 'large' ? 'h-4 w-4' : 'h-2 w-2'}
            pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </Switch.Group>
  );
};

export default AppSwitch;
