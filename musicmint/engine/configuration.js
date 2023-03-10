/*

    ,·'´¨;.  '                              ,.         ,·´'; '           ,  . .,  °        ,-·-.          ,'´¨;
    ;   ';:\           .·´¨';\         ;'´*´ ,'\       ,'  ';'\°    ;'´    ,   ., _';\'      ';   ';\      ,'´  ,':\'
   ;     ';:'\      .'´     ;:'\        ;    ';::\      ;  ;::'\    \:´¨¯:;'   `;::'\:'\      ;   ';:\   .'   ,'´::'\'
   ;   ,  '·:;  .·´,.´';  ,'::;'       ;      '\;'      ;  ;:::;      \::::;   ,'::_'\;'      '\   ';::;'´  ,'´::::;'
  ;   ;'`.    ¨,.·´::;'  ;:::;       ,'  ,'`\   \      ;  ;:::;          ,'  ,'::;'  ‘          \  '·:'  ,'´:::::;' '
  ;  ';::; \*´\:::::;  ,':::;‘       ;  ;::;'\  '\    ;  ;:::;           ;  ;:::;  °           '·,   ,'::::::;'´
 ';  ,'::;   \::\;:·';  ;:::; '      ;  ;:::;  '\  '\ ,'  ;:::;'           ;  ;::;'  ‘             ,'  /::::::;'  '
 ;  ';::;     '*´  ;',·':::;‘       ,' ,'::;'     '\   ¨ ,'\::;'            ;  ;::;'‚             ,´  ';\::::;'  '
 \´¨\::;          \¨\::::;        ;.'\::;        \`*´\::\; °           ',.'\::;'‚             \`*ª'´\\::/‘
  '\::\;            \:\;·'         \:::\'          '\:::\:' '              \::\:;'‚              '\:::::\';  '
    '´¨               ¨'             \:'             `*´'‚                 \;:'      ‘            `*ª'´‘
                                                                           °                     '

Update values accordingly
xxnft is the NFT SmartContract Address
xxmarket is the NFT MarketPlace Address
xxresell is the NFT MarketResell Address
xxnftcol is the already create NFT Collection Address
*/

/*
Private Key Encryption
Replace ethraw with your private key "0xPRIVATEKEY" (Ethereum and other EVM)
Replace hhraw with your private key "0xPRIVATEKEY" (Hardhat)
*/

// this is for encryption-so ppl can't see the actual keys
import SimpleCrypto from "simple-crypto-js"

//this you just make up
const cipherKey = "#9fg3advcv430kljjkw38dfkyhjgt"
const ethraw = "0x8207b7bbf486039b455923a402560ed041ad4b7243e9f329d6e415c00aaa9ef2";
//hardhat wallet
const hhraw = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// ONLY EXPORT CIPHERED KEYS
export const simpleCrypto = new SimpleCrypto(cipherKey)
export const cipherEth = simpleCrypto.encrypt(ethraw)
export const cipherHH = simpleCrypto.encrypt(hhraw)

/*
HardHat Testnet
*/

export var hhresell = "0xCd55135cC103D7568056a828100D96603380DDbE";
export var hhnftcol = "0x45A755B058492558351f188e4362F0546Bc3d140";
var hhrpc = "http://localhost:8545";

/*
Global Parameters
*/
// for now still local host
export var mainnet = hhrpc