import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className={
        "bg-[#091144] bg-gradient-to-r from-[#04041F] from-10% via-[#091144] via-30% to-[#04041F] to-90% p-4 text-center w-full text-white font-mono"
      }
    >
      <p className="text-base md:text-lg">
        Charts are Powered by{' '}
        <a
          href="https://www.tradingview.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          TradingView
        </a>
      </p>
    </footer>
  );
};

export default Footer;
