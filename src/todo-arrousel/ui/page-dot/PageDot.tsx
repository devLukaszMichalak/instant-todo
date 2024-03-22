import './PageDot.css';

type Props = { isActive: boolean; }

const PageDot = ({isActive}: Props) => {
  return <div className={`dot ${isActive ? '' : 'dot-inactive'}`}></div>;
};

export default PageDot;
