import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';

const About = () => {
  const router = useRouter();
  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold">About</h1>
      </div>
      <main>
        Getting back into speed solving again and practicing my web app devskills. This web app is
        basically to kill two birds with one stone.
      </main>
      <br />
      <p className="text-sm">(Section to be updated)</p>
    </div>
  );
};

export default About;
