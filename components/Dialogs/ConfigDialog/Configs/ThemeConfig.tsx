import { useTheme } from 'next-themes';
import AppDropdown from '../../../Dropdowns/AppDropdown';

const themes = ['system', 'dark', 'light'];
const ThemeConfig = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between">
      <AppDropdown
        className="w-24"
        label="Theme"
        value={theme}
        options={themes}
        onChange={setTheme}
        adaptTheme={false}
      />
    </div>
  );
};

export default ThemeConfig;
