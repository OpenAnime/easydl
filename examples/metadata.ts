/*
 *  You can import this module by using:
 *     import EasyDl from "easydl";
 *                 or
 *    const EasyDl = require('easydl');
 */
import EasyDl from "../dist";

(async () => {
  const dl = new EasyDl("https://proof.ovh.net/files/100Mb.dat", "/tmp");

  const metadata = await dl.metadata();
  console.log("got metadata", metadata);

  const completed = await dl.wait();
  console.log("success?", completed);
})();
