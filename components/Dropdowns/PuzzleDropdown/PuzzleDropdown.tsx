import { Puzzle, PUZZLES } from '../../../lib/db';
import AppDropdown from '../AppDropdown';

type PuzzleDropdownProps = {
  value: Puzzle;
  onChange: (puzzle: Puzzle) => void;
};
const PuzzleDropdown: React.FC<PuzzleDropdownProps> = ({ value, onChange }) => {
  return (
    <AppDropdown
      displayFormatter={(value) => value?.name || ''}
      value={value}
      onChange={onChange}
      options={PUZZLES}
    />
  );
};

export default PuzzleDropdown;
