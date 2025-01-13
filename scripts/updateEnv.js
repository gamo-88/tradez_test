const fs = require('fs');
const os = require('os');

const getLocalIP = () => {
  const networkInterfaces = os.networkInterfaces();
//   console.log(networkInterfaces)
  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];
    for (const i of networkInterface) {
      if (i.family === 'IPv4' && !i.internal) {
        return i.address;
      }
    }
  }
  return 'localhost';
};

const ip = getLocalIP();
const envContent = `EXPO_PUBLIC_IP_API_URL = http://${ip}:3000`; 

fs.writeFileSync('.env', envContent, (err) => {
  if (err) {
    console.log('Error writing to .env file', err);
  } else {
    console.log(`.env file updated with IP: ${ip}`);
  }
});
