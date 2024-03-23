const ProgressBar = ({ progress }: { progress: number }) => (
  <div tw="flex bg-blue-800 h-full rounded items-center">
    <div tw={`bg-blue-600 h-full w-${progress}/12 rounded`}></div>
    <div tw="ml-4">10%</div>
  </div>
);
const TrainInterface = () => {
  // Dummy data for the grid - assuming 10x10 grid
  const gridData = new Array(100).fill(false).map((_, i) => i % 10 === 3); // example pattern

  // Convert array into grid rows
  const rows = new Array(10)
    .fill(null)
    .map((_, i) => gridData.slice(i * 10, (i + 1) * 10));

  const progress = 80;

  return (
    <div tw="flex w-full h-full relative">
      <div tw="flex ml-5 absolute top-4 right-4">
        <div tw="flex mb-6">
          <div tw="flex mb-2">
            <div tw="flex text-sm">DATASET</div>
            <div tw="flex text-lg font-bold">b8...7d9772</div>
          </div>
          <div tw="flex mb-2">
            <div tw="flex text-sm">INTEGRITY</div>
            <div tw="flex text-lg font-bold">Pristine-100%</div>
          </div>
          <div tw="flex mb-2">
            <div tw="flex text-sm">FRESH DATASET</div>
            <div tw="flex text-lg font-bold">09:05:02</div>
          </div>
        </div>

        <div tw="flex">
          <div tw="flex mb-2">
            <div tw="flex text-sm">BYTE</div>
            <div tw="flex text-lg font-bold">0x01</div>
          </div>
          <div tw="flex mb-2">
            <div tw="flex text-sm">TYPE</div>
            <div tw="flex text-lg font-bold">Perception</div>
          </div>
          <div tw="flex mb-2">
            <div tw="flex text-sm">RARITY</div>
            <div tw="flex text-lg font-bold">Common-30%</div>
          </div>
          <div tw="flex mb-2">
            <div tw="flex text-sm">INTEGRITY</div>
            <div tw="flex text-lg font-bold">Pristine-100%</div>
          </div>
        </div>
      </div>
      <div tw="flex w-full absolute bottom-0 justify-center">
        <img
          src={
            "https://wrpcd.net/cdn-cgi/image/fit=contain,f=auto,w=168/https%3A%2F%2Fi.imgur.com%2FhvaOPrU.jpg"
          }
          alt="train"
          tw="h-20 w-20 mr-4 rounded"
        />
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default TrainInterface;
