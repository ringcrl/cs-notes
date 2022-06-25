const interfaces = require('os').networkInterfaces();

function getLocalIp() {
  const ips = [];
  for (interface in interfaces) {
    const nets = interfaces[interface];
    for (let i = 0; i < nets.length; i++) {
      const net = nets[i];
      if (net.family === 'IPv4'
        && net.address !== '127.0.0.1'
        && !net.internal) {
        ips.push(net.address);
      }
    }
  }
  return ips;
}
module.exports = getLocalIp;
