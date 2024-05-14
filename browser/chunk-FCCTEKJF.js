import packages from '../package.json';
const version = packages.version;
const isBeta = packages.isBeta;
const isPrivate = packages.isPrivate;
function getType() {
  if (isBeta) {
    if (isPrivate) {
      return 'Private Beta';
    }
    return 'Beta';
  }
  if (isPrivate) {
    if (isBeta) {
      return 'Private Beta';
    }
    return 'Private Stable';
  }
  return 'Stable';
}

export { version, isBeta, isPrivate, getType };
