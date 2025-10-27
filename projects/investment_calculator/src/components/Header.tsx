import calculatorLog from '@/assets/investment-calculator-logo.png';

const Header = () => {
  return (
    <header id="header">
        <img src={calculatorLog} alt="A big green bag with a dollar sign on it." />
        <h1>React Investment Calculator</h1>
    </header>
  )
}

export default Header