import { useRouter } from 'next/router';
import PrimaryLayout from '../../../components/layout/layout';
import LearnTabLayout from '../../../components/layout/learn-tab';
import { NextPageWithLayout } from '../../_app';

const steps = ['f2l', 'oll', 'pll'];

const Step: NextPageWithLayout = () => {
  const router = useRouter();
  const step = router.query.step;

  if (typeof step === 'string' && !steps.includes(step)) {
    console.log('alaws');
  }

  return (
    <section>
      <h2>f2l</h2>
      <ul>
        <li>as</li>
        <li>asd</li>
      </ul>
    </section>
  );
};

Step.getLayout = function getLayout(page) {
  return (
    <PrimaryLayout>
      <LearnTabLayout>{page}</LearnTabLayout>
    </PrimaryLayout>
  );
};

export default Step;
