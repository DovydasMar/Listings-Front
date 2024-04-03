import { useEffect, useState } from 'react';

export default function HomePage() {
  const [adArr, setAdArr] = useState([]);

  useEffect(() => {}, []);
  function getAds() {
    fetch('http://localhost:5000/ads')
      .then((res) => res.json())
      .then((data) => {
        setAdArr(data);
      });
  }

  return <div>HomePage</div>;
}
