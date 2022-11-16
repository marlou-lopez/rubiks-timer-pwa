import { Session } from '../../../lib/db';
import AppDropdown from '../AppDropdown';

type SessionDropdownProps = {
  value?: Session | null;
  onChange: (session: Session) => void;
  options: Session[];
};

const SessionDropdown: React.FC<SessionDropdownProps> = ({ value, onChange, options }) => {
  return (
    <AppDropdown
      displayFormatter={(value) => value?.name}
      value={value}
      onChange={onChange}
      options={options}
      className="w-60"
    />
  );
};

export default SessionDropdown;
