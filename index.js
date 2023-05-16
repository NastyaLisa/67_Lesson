//Task1
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "/files", "The Wind in the Willows (introductory fragment).txt");

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  const fileSizeInBytes = stats.size;
  console.log(`Filesize: ${fileSizeInBytes} байт`);


  const minChunkSize = 1; 
  const maxChunkSize = Math.floor(fileSizeInBytes / 2);

  let chunkCount = 0;
  
  const getRandomChunkSize = () => Math.floor(Math.random() * (maxChunkSize - minChunkSize + 1)) + minChunkSize;

  const readStream = fs.createReadStream(filePath, {
    highWaterMark:  getRandomChunkSize(),
  });

  const writeStream = fs.createWriteStream(path.join(__dirname, "/files", "output.txt"));

  readStream.on("data", (chunk) => {
    console.log("Introductory fragment, copying is prohibited!");
    writeStream.write("\nIntroductory fragment, copying is prohibited!\n");
    writeStream.write(chunk);
    writeStream.write("\n-----------------------\n");
    console.log(chunk);
    
    chunkCount++;
   
  });

  readStream.on("end", () => {
    console.log(`chankCount: ${chunkCount}`);
  });
});


// process.stdin.resume();
// process.on("SIGINT", () => {
//   console.log("Got SIGINT signal.");
// });

// //Task2
// const log = (data) =>{
//   process.stdout.write(data.toString());
// }

// log("Hello, world!");
// log({ key: 'value' }); 

// //Task3

// process.stdin.on("data", (data) => {
//   data = data.toString().toUpperCase();
//   process.stdout.write(data + "\n");
// });

// const ask = (question) => {
//   return new Promise((resolve, reject) => {
//     process.stdout.write(question);

//     process.stdin.once("data", (data) => {
//       const response = data.toString().trim().toLowerCase();
//       if (
//         response === "y" ||
//         response === "yes" ||
//         response === "n" ||
//         response === "no"
//       ) {
//         resolve(response);
//       } else {
//         reject(new Error("Invalid response format"));
//       }
//     });
//   });
// };

// (async () => {
//   try {
//     await ask("Do you want to use SCSS?");
//     await ask("Do you want to use ESLint?");

//     process.exit();
//   } catch (error) {
//     process.stderr.write(error.message);
//     process.exit(1);
//   }
// })();
