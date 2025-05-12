
import xion from "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png";
import { polygon } from "viem/chains";

export const TOKEN_ADDRESSES = [
  "inj1n73yuus64z0yrda9hvn77twkspc4uste9j9ydd",
  "inj1fu5u29slsg2xtsj7v5la22vl4mr4ywl7wlqeck",
  "inj1l49685vnk88zfw2egf6v65se7trw2497wsqk65",
  "factory-inj1etz0laas6h7vemg3qtd67jpr6lh8v7xz7gfzqw-hdro",
  "inj14rgkkvwar36drhuajheu3u84jh9gdk27acfphy",
  "inj18luqttqyckgpddndh8hvaq25d5nfwjc78m56lc",
  "factory-inj172ccd0gddgz203e4pf86ype7zjx573tn8g0df9-GINGER",
  "peggy0x943Af2ece93118B973c95c2F698EE9D15002e604",
  "inj1fy4hd7gqtdzp6j84v9phacm3f998382yz37rjd",
  "inj1s4srnj2cdjf3cgun57swe2je8u7n3tkm6kz257",
  "inj1z647rvv0cfv5xx3tgsdx77qclkwu2ng7tg2zq5",
  "ibc-4971C5E4786D5995EC7EF894FCFA9CF2E127E95D5D53A982F6A062F3F410EDB8",
  "ibc-27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
  "ibc-2E3784772E70F7B3A638BA88F65C8BE125D3CDB6E28C6AABC51098C94F5E16A5",
  "uosmo",
  "factory-inj10gcvfpnn4932kzk56h5kp77mrfdqas8z63qr7n-bits",
  "factory-inj1q4z7jjxdk7whwmkt39x7krc49xaqapuswhjhkn-boys",
  "factory-inj1s9smy53dtqq087usaf02sz984uddndwuj2f0wt-injussy",
  "factory-inj18flmwwaxxqj8m8l5zl8xhjrnah98fcjp3gcy3e-XIII",
  "factory-inj127l5a2wmkyvucxdlupqyac3y0v6wqfhq03ka64-qunt",
  "factory-inj13ze65lwstqrz4qy6vvxx3lglnkkuan436aw45e-HACHI",
  "ibc-27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2", // ATOM
"ibc-D79E7D83AB399BFFF93433E54FAA480C191248FC556924A2A8351AE2638B3877", // CELESTIA
"uosmo", // OSMOSIS
"ibc-1480B8FD20AD5FCAE81EA87584D269547DD4D436843C1D20F15E00EB64743EF4", // AKASH
"0x95CeF13441Be50d20cA4558CC0a27B601aC544E5", // MANTA
"0xB6Bad00525221EB28Eb911a0B1162a0709b4CE57", // HARD
"ibc-57AA1A70A4BC9769C525EBF6386F7A21536E04A79D62E1981EFCEF9428EBB205", // KAVA
"ibc-46B44899322F3CD854D2D46DEEF881958467CDD4B3B10086DA49296BBED94BED", // JUNO
"0x2CFB81239BACA2717Ec0CEf5caf3D9F0518259A3", // PULSE
"ibc-8A2D3F6E4F6F0B4B9B8A3B4D5C6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E", // STRIDE
"ibc-9B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1A2B3C", // SEI
"ibc-0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B", // KUJIRA
"ibc-1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C", // SCRT
"ibc-2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D", // OM
"ibc-3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E", // DYM
"ibc-4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F", // STARS
"ibc-5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A", // IXO
"ibc-6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B", // PICA
"ibc-7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2C3D4E5F6A7B8C", // XKI

];


export const exchangeProxy = "0xDef1C0ded9bec7F1a1670819833240f027b25EfF";

/* type Token = {
  address: Address;
}; */

interface Token {
  name: string;
  address: string;
  symbol: string;
  type: "factory" | "cw20";
  decimals: number;
  chainId: number;
  logoURI: string;
}

export const POLYGON_TOKEN_PAIRS = [
    {
      pairAddress: "xion1jp486c4ncvnwzakxq8fkdhedhe7r3dzyjdhy0hdl5cuvpdtkx0ssgw0azj",
      pairName: "XION/USDC",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdc.png",
    },
    {
      pairAddress: "xion1xngf3l8yk5flf9vwgczfswmzddhk5lrgrwlfwmd67fcazwtg03xqfxu6d8",
      pairName: "XION/SCLX",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/sclx.png",
    },
    {
      pairAddress: "xion1tvzdmngefga5q9gpjmllvpsefxythnq80az0h8vjmud3467kleaq7qjkt2",
      pairName: "XION/BTC",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/btc.png",
    },
    {
      pairAddress: "xion106lh5ec5v2p9dpu5h6efz4eq3x2z8tvrk08qf2r406axj5w0jukqesshul",
      pairName: "XION/USDT",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdt.png",
    },
    {
      pairAddress: "xion1gj0lhh8d0rpd3qgg6cm5pakh8u2h3cwx24nx6j60kmw60au3ge7qfs5xqk",
      pairName: "XION/SOL",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/sol.png",
    },
    {
      pairAddress: "xion1vr4xx240ueagdcd6evwa23a00d7z7cgmwklyu3xr2ech8kqfuhdq2nnlyg",
      pairName: "XION/INJ",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/INJ.png",
    },
    {
      pairAddress: "xion18yhne9nl5v3rmnvp3y4anduph7e2elfryg6pzdcnf89u0u029djqn2nn24",
      pairName: "INJ/USDT",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/INJ.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdt.png",
    },
    {
      pairAddress: "xion1lj262ymte9keemqxlweu7j8ak87w5sz5sm29r8e64ffn0csu8gvsz3kpsm",
      pairName: "ETH/USDC",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/eth.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdc.png",
    },
    {
      pairAddress: "xion120fsd96pp70j2dqyjvmtzuazrxgwgx788pvrnnh3qw3w30703j4qzhg4eu",
      pairName: "BTC/USDT",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/btc.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdt.png",
    },
    {
      pairAddress: "xion1yk983q9fzddlepcjv29ynmzs6zjk640d2pg9w6r5at2tkueu438s9n2sua",
      pairName: "SOL/USDT",
      logo1:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/sol.png",
      logo2:
        "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdt.png",
    },
  ];
  


export const POLYGON_TOKENS: Token[] = [
  {
    chainId: 137,
    name: "XION",
    symbol: "XION",
    type: "factory",
    decimals: 6,
    address: "uxion",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
  },
  {
    chainId: 137,
    name: "SCLX",
    symbol: "SCLX",
    type: "cw20",
    decimals: 6,
    address: "xion1y6mc2g6v62yhmt6t2dnazqn42peeg9ygtjuyag3nrztx9959vv8snuu8m6",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/sclx.png",
  },
  {
    chainId: 137,
    name: "Bitcoin",
    symbol: "BTC",
    type: "factory",
    decimals: 6,
    address: "factory/xion185dcpd9mjqwp5wha7teuqh6ngluldvzet8kmz7/btc",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/btc.png",
  },
  {
    chainId: 137,
    name: "INJ",
    symbol: "INJ",
    type: "factory",
    decimals: 6,
    address: "factory/xion185dcpd9mjqwp5wha7teuqh6ngluldvzet8kmz7/INJ",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/INJ.png",
  },
  {
    chainId: 137,
    name: "ETH",
    symbol: "ETH",
    type: "factory",
    decimals: 6,
    address: "factory/xion185dcpd9mjqwp5wha7teuqh6ngluldvzet8kmz7/ETH",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/eth.png",
  },
  {
    chainId: 137,
    name: "SOL",
    symbol: "SOL",
    type: "factory",
    decimals: 6,
    address: "factory/xion185dcpd9mjqwp5wha7teuqh6ngluldvzet8kmz7/SOL",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/sol.png",
  },
  {
    chainId: 137,
    name: "USDT",
    symbol: "USDT",
    type: "factory",
    decimals: 6,
    address: "factory/xion185dcpd9mjqwp5wha7teuqh6ngluldvzet8kmz7/USDT",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdt.png",
  },
  {
    chainId: 137,
    name: "USDC",
    symbol: "USDC",
    type: "factory",
    decimals: 6,
    address: "ibc/57097251ED81A232CE3C9D899E7C8096D6D87EF84BA203E12E424AA4C9B57A64",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdc.png",
  },
];

export const POLYGON_TOKENS_BY_SYMBOL: Record<string, Token> = {
  xion: {
    chainId: 137,
    name: "XION",
    symbol: "XION",
    type: "factory",
    decimals: 6,
    address: "uxion",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/xion.png",
  },
  sclx: {
    chainId: 137,
    name: "SCLX",
    symbol: "SCLX",
    type: "cw20",
    decimals: 6,
    address: "uxion",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/sclx.png",
  },
  osmo: {
    chainId: 137,
    name: "OSMO",
    symbol: "OSMO",
    type: "factory",
    decimals: 18,
    address: "uosmo",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/osmo.png",
  },
  inj: {
    chainId: 137,
    name: "INJ",
    symbol: "INJ",
    type: "factory",
    decimals: 18,
    address: "uinj",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/inj.png",
  },
  eth: {
    chainId: 137,
    name: "ETH",
    symbol: "ETH",
    type: "factory",
    decimals: 18,
    address: "ueth",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/eth.png",
  },
  sol: {
    chainId: 137,
    name: "SOL",
    symbol: "SOL",
    type: "factory",
    decimals: 18,
    address: "usol",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/sol.png",
  },
  usdt: {
    chainId: 137,
    name: "USDT",
    symbol: "USDT",
    type: "factory",

    decimals: 6,
    address: "uusdt",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdt.png",
  },
  usdc: {
    chainId: 137,
    name: "USDC",
    symbol: "USDC",
    type: "factory",
    decimals: 6,
    address: "uusdc",
    logoURI:
      "https://raw.githubusercontent.com/code-bajju/Project-Image/main/usdc.png",
  },
};

export const POLYGON_TOKENS_BY_ADDRESS: Record<string, Token> = {
  "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270": {
    chainId: 137,
    name: "Wrapped Matic",
    symbol: "WMATIC",
    type: "factory",
    decimals: 18,
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    logoURI:
      "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/polygon/assets/0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270/logo.png",
  },
  "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063": {
    chainId: 137,
    name: "DAI - PoS",
    symbol: "DAI",
    type: "factory",
    decimals: 18,
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg",
  },
  "0x2791bca1f2de4661ed88a30c99a7a9449aa84174": {
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    type: "factory",
    decimals: 6,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg",
  },
  "0xb33eaad8d922b1083446dc23f610c2567fb5180f": {
    chainId: 137,
    name: "Uniswap",
    symbol: "UNI",
    type: "factory",
    decimals: 18,
    address: "0xb33eaad8d922b1083446dc23f610c2567fb5180f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/uni.svg",
  },
  "0xc2132d05d31c914a87c6611c10748aeb04b58e8f": {
    chainId: 137,
    name: "Tether USD - PoS",
    symbol: "USDT",
    type: "factory",
    decimals: 6,
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    logoURI:
      "https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdt.svg",
  },
};

export const supportedPairs = [
  {
    pairAddress: "",
    tokenA: POLYGON_TOKENS.find(
      (token) => token.address.toLowerCase() === "sclx"
    ),
    tokenB: POLYGON_TOKENS.find(
      (token) => token.address.toLowerCase() === "uxion"
    ),
  },
];

export const FACTORY_CONTRACT_ADDRESS =
  "xion1l7y28la4mlzsqtuk689385gfd63n54eu9e6wuc304t92v3ksaafq5z36uk";
export const ROUTER_CONTRACT_ADDRESS =
  "xion1x6s0nvc7an05wfetlrhrqa63m3z0j480ugh3zld35tjsl2k4z9jqvlk8se";
export const PROXY_CONTRACT_ADDRESS =
  "xion16ytvxsktfu3csj9shddcpf8q7stzuamsygv9mcvfmffpdksluwnsd47qtf";