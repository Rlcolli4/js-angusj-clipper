/*
A script meant to be run on npm run prepublishOnly, it cleans out the fs and filepath files for the publish.
Note, this alter the files create by emscripten when converting clipper (C++) to javascript.
While it works in our specific use case, this may break other use cases of clipper.
*/

const replace = require('replace-in-file');

const replaceJSFile = {
    files: 'dist/clipper.js',
    from: 'if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");',
    to: ' '
}

const replaceWASMFile = {
    files: 'dist/clipper-wasm.js',
    from: '',
    to: ' '
}
const options = {

    //Multiple files
    files: [
      'dist/wasm/clipper.js',
      'dist/wasm/clipper-wasm.js',
      'src/wasm/clipper.js',
      'src/wasm/clipper-wasm.js'
    ],
  
    //Replacement to make (string or regex) 
    from: 'if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");',
    to: '',
  };
  
  try {
    let changedFiles = replace.sync(options);
    console.log('Modified files:', changedFiles.join(', '));
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
