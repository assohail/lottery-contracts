import path from "path";
import solc from "solc";
import fs from "fs-extra";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, 'build');
// uncomment
// fs.removeSync(buildPath);

const lotteryPath = path.resolve(__dirname, 'contracts', 'lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');
// console.log('source: '+ source);

const output = solc.compile(source,1).contracts;
console.log(output);
// const output = source;

// uncomment
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + '.json'), 
        output[contract]
    )
}


// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output) {
//   console.log(
//     contractName +
//       ': ' +
//       output.contracts['Campaign.sol'][contractName].evm.bytecode.object
//   );


//     fs.outputJSONSync(
//         path.resolve(buildPath, contractName, '.json'), output[contract]
//     )
// }


var input = {
    language: 'Solidity',
    sources: {
        'lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

// var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output);
// console.log(output.contracts["lottery.sol"]);
// console.log(output.contracts["lottery.sol"]["lottery"]);
// export default output.contracts["lottery.sol"];