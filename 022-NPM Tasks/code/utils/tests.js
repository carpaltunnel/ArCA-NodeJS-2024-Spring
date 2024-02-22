console.log('tests');

let counter = 1;
const fakeTest = () => {
  console.log(`Running unit test #${counter++}...`);
  console.log(`\t${counter % 3 === 0 ? 'fail' : 'pass'}`)
  if (counter === 10) {
    process.exit(0);
  }
}

setInterval(fakeTest, 1000);