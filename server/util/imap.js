import Imap from 'imap';

export function initImap(config) {
  console.log('initImap');
  console.log(config);
  const imap = new Imap({
    user: config.email,
    password: config.password,
    host: config.host,
    port: config.port,
    tls: {
      secureProtocol: 'TLSv1_method',
    },
    debug: console.log,
  });

  return imap;
}
