const mockData = [
  {
    id: "001",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "002",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "003",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "004",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "005",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "006",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "007",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "008",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "009",
    handle: "@microchipgnu",
    progress: "100%",
  },
  {
    id: "010",
    handle: "@microchipgnu",
    progress: "100%",
  },
];

const mockUserData = {
  id: "189",
  handle: "@microchipgnu",
  progress: "100%",
};

const Benchmark = () => {
  return (
    <div tw="flex flex-col w-full h-full bg-[#020C17] p-20">
      <div tw="flex justify-between items-center w-full h-12 px-4">
        <div tw="flex text-[#6D88C7]">MODEL</div>
        <div tw="flex text-[#6D88C7]">PROGRESS</div>
      </div>
      <div tw="flex border border-[#09376C] my-4" />
      <div tw="flex flex-col w-full h-full">
        {mockData.map((data, index) => (
          <div
            key={`data-${index}`}
            tw="flex justify-between items-center w-full h-12 my-2"
          >
            <div tw="flex">
              <div tw="flex text-[#6D88C7]">{data.id}</div>
              <div tw="flex text-[#D7BB8E] ml-8">{data.handle}</div>
            </div>
            <div tw="flex text-[#D6FA58]">{data.progress}</div>
          </div>
        ))}
        <div tw="flex border border-[#09376C] my-4" />
        <div tw="flex justify-between items-center w-full h-12 my-2">
          <div tw="flex">
            <div tw="flex text-[#6D88C7]">{mockUserData.id}</div>
            <div tw="flex text-white font-bold ml-8">{mockUserData.handle}</div>
          </div>
          <div tw="flex text-[#D6FA58]">{mockUserData.progress}</div>
        </div>
      </div>
    </div>
  );
};

export default Benchmark;
