import Link from 'next/link';

const Navbar = () => (
  <nav className='navbar'>
    <Link href='/'>
      <li className='li.active'>Asia Scouting Network</li>
    </Link>
    <Link href='/baseball'>
      <li className='li'>Baseball</li>
    </Link>
    <Link href='/shooting'>
      <li className='li'>Shooting</li>
    </Link>
    <Link href='/shootingSheet'>
      <li className='li'>Shooting List</li>
    </Link> 
  </nav>
);

export default Navbar;
