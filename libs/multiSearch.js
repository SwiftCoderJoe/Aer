export function multiSearchFor(text, searchWords) {
  var searchExp = new RegExp(searchWords.join(`|`), `gi`);
    return (searchExp.test(text));
}
