import './home.css';
import LeftSection from '../leftSection/LeftSection';
import MiddleSection from '../middleSection/MiddleSection';
import RightSection from '../rightSection/RightSection';

export default function Home() {
  return (
    <div className="home">
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
}
