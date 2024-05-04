type FilterBoxProps = {
  onclick: (price: string) => void;
  value: string;
};

export default function PriceSorter({ onclick, value }: FilterBoxProps) {
  return (
    <div>
      <ul className='border border-black rounded-md overflow-hidden mb-3'>
        <li className='bg-[#37514D] pl-2 text-[#EEE6DE]'>Rikiuoti pagal kainą</li>
        <li
          onClick={() => {
            onclick('min-max');
          }}
          className={`pl-2 border-b cursor-pointer ${value === 'min-max' && 'bg-[#a8b5c0]'} `}
        >
          Nuo mažiausios iki didžiausios
        </li>
        <li
          onClick={() => {
            onclick('max-min');
          }}
          className={`pl-2 border-b cursor-pointer ${value === 'max-min' && 'bg-[#a8b5c0]'}`}
        >
          Nuo didžiausios iki mažiausios
        </li>
      </ul>
    </div>
  );
}
