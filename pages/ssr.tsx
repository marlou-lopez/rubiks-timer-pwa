import { useQuery } from 'react-query';
import { db } from '../lib/db';

const TestSSR = () => {
  const { data } = useQuery(['test'], () => db.solves.toArray());
  console.log(data);
  return (
    <div>
      <h1>SSR</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default TestSSR;
