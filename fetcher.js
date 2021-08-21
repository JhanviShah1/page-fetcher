const request = require("request");

const fs = require("fs");
const readline = require("readline");
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

const fileDetails = process.argv.slice(2);
const filePath = fileDetails[1];
request(fileDetails[0], (error, response, body) => {
  if (error) return console.log(error);
  try {
    if (fs.existsSync(filePath)) {
      rl.question(
        "index.html already exists..want to overwrite it? ",
        (answer) => {
          console.log(`Thank you : ${answer}`);
          if (answer === "y" || answer === "yes") {
            fs.writeFile(filePath, body, "utf8", (err) => {
              const stats2 = fs.statSync(filePath);
              if (!err)
                return console.log(
                  `Downloaded and saved ${stats2.size} ${body.length} bytes to index.html`
                );
              else return console.log(err);
            });
          }
          rl.close();
        }
      );
    } else {
      fs.writeFile(filePath, body, "utf8", (err) => {
        const stats2 = fs.statSync(filePath);
        if (!err)
          return console.log(
            `Downloaded and saved ${stats2.size}--- ${body.length} bytes to index.html`
          );
        else console.log(err);
      });

    }
    
  } catch (err) {
    console.error(err);
  }

  //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response); // Print the response status code if a response was received
  //console.log("body:", body); // Print the HTML for the Google homepage.
});
