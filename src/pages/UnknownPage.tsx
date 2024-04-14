import { Link } from 'react-router-dom';

export default function UnknownPage() {
  return (
    <div className='container'>
      <h3 className='text-3xl'>
        Puslapis kurio ieškote nėra, prašome patikrinti įvestą url arba grįškite į
        <span className='font-semibold'>
          <Link to={'/'}> pagrindinį puslapį</Link>
        </span>
      </h3>
    </div>
  );
}
