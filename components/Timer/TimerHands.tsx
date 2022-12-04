import Image from 'next/image';

const TimerHands: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full items-center justify-evenly">
      <Image src={'/images/hand-left.png'} height={150} width={150} alt="Hand left" />
      <div className="flex flex-col items-center justify-center mobile-ls:w-[250px]">
        {children}
      </div>
      <Image src={'/images/hand-right.png'} height={150} width={150} alt="Hand right" />
    </div>
  );
};

export default TimerHands;
