/**
 *
 * @param {string with/without Link/a tags} props
 * @constructor
 */

function LinkParser(props){
    const linkRegex = /d(b+)d/g;
    const myArray = linkRegex.exec('cdbbdbsbz');
    console.log("------->");
    console.log(myArray);
}

export default LinkParser;