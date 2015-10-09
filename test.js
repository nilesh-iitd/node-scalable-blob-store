var crispyStream = require('crispy-stream');
var opts = {
  blobStoreRoot: '/home/grant/blobs',
  dirDepth: 3,
  dirWidth: 3
}
var repeat = 2000
var sbs = require('./index').create(opts)

// sbs._linearBlobKey().then((result) => {
//   console.log('=============result=============');
//   console.log(result);
// })
// return

// sbs._buildChildPath('/home/grant/app-contacts').then((result) => {
//   console.log(result);
// })
function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', () => {
      resolve(chunks.join(''));
    });
  })
}


function tester(repeat) {
  var i = repeat
  var input = 'The quick brown fox jumped over the lazy dog';
  function recurse() {
    if (i < 1) { return }
    var readStream = crispyStream.createReadStream(input);
    var currentBlobPath = ''

    sbs.write(readStream).then((blobPath) => {
      currentBlobPath = blobPath
      return blobPath
    }).then((blobPath) => {
      return sbs.read(blobPath)
    }).then((rs) => {
      return streamToString(rs)
    }).then((data) => {
      // console.log(data + ' ' + i);
      //console.log('[Before Delay] index: ' + i);
    }).then(() => {
      i--
      recurse()
      return
    // }).then(() => {
    //   return sbs.remove(currentBlobPath)
    }).catch((err) => {
      console.error(err)
    })
  }
  recurse()
}
console.log('[Calling Tester]');
tester(repeat)
