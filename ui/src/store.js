import File from './File';
import Data from './Data';
import configIPC from './ipcEvents';
import configAutoruns from './autoruns';
export default (debug) => {
  const data = new Data();
  const file = new File();
  configIPC(data, file);
  configAutoruns(data, file, debug);
  return {data, file}
}
