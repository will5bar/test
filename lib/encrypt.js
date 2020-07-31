// const NodeRSA = require('node-rsa');
const forge = require("node-forge");
const { customError } = require("./error.js");

let privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAzx1HaS/PucFPk+JFuwZLQRfQ83IjKUAW0kzkuUVw292V2YK5
aZVm4ZGQqEos9n0gL4Zy2CMeexogMxQnnslMWjvpLGAS3c68rQRynf2/4lseeEA5
ckgjGQolYzKXwET2W/rHtOAXyPbAmjgU8UoUQWb8tbsTj7HL2BL8PAU7MB5xCaF8
VhXaAvROWuH9I91Xx7VSt7lXlMgTm/kFBl+cfxaTMXXtnkFEIYhLjPQxehL89X7O
Yh0cxwBvDF2LMC0qfn53E/dNAfy78qodY8fClDZx9VMa8Yq7ORQJ3s0DguGw98++
y7iBSt5Bv4DF1wBeyRrkamIZGt/ZEP57YKMFxQIDAQABAoIBAQCI8M76mYY7R7ma
Cg4Y7rxrOZgKnvjomVt9iSHh7iwE86nUuz5ktUfk9R40Z3b7MxhI1BizF+Vbd5a6
ryTTND2rm9k8YfmXds4Bh+NQ2yo4PA8Va0GQcmnicHbv88+qbO6HOnU4/sI7Ogt2
7IXMVDK4W6PTdPImHGSvZT4pYTwVP5pj21jMJG6WmypKmL8FEAw4EGz285H26SMf
3yieTJyROiXU13ODxktvLHFeyMMinlK9GOXP/oWOzcnXbP1sdSqFJuAXkS6WnNF5
aGp/v45KS/RdyE5zQf0NVmpIZAv7BP3WREajULmg7diOOhlfcHyGJu1HgGGlB+o/
UTW24yKBAoGBAPTSXaET80mFrzMG1aWMtiT+m5IsGjfvHQXHSIZyNv3GTuiZlYEP
0ydNkJ3JN3tKdC5RHXU9p1nKZdQ6eexg/6eO4F6YhTUXnflwgjbC94d9MBaAK7LW
wCupebKa3xAx3pw+8lQaf78iLOAEa6+68UNxnmQymmrtUP99bEtuHBMtAoGBANiS
KkiIjLNyLSmph23XMzITcQRlJXaYrRkSzZsFv318LDlVXrt3bQ3KKUEimuI3FEuD
rSocSBKkA2gZedEu3rrnw383r8hTamjcasFEDDINQHONLuV+9mtEVvhACkhNAze5
ialRcm/1doHGULYDzVcvStq8XdQA7romrikwLTv5AoGAExi1pPLhb0K2P8ywrZEk
RA54JBa8lNBZ+zFoPtR55aGqVgpk1wRc/BvYw/YGFd/g4BwDqDl+7EoVV1CYYg/O
4UsLxVUwTsvgzqwv/AWJOVBSh+7HedO2ebFmhL//1kuNibJ/RIAspsQLrA2sOLDk
UNZz/GzWDrEkOEmYQOn91qECgYBY8F3Q/9LYdtE5RNfLMg9iRz2okmk6NSURIPmy
6j9jpzT6LqcC0d7FRPqAN1foArqg8GiS3J50mUqU27F9SIRLuZY9jn7wA+G1Qp/M
0sc3Xt3TFm3l7agBEUWuGY6fdpEVt2pjUIFwnRuX2/uVZCZV4aQaBDV8NQ3VAMGR
RKmu8QKBgQC2IWQUojvVkd3pF17IRQ9+V+nQI2dzRzgQ8ESVmUo0hySi6ROQafaD
Y9PlDwl4S+t+KKdx8iBIXMe2KiGTc9B7TR++MiZjdRM8gVU3aTzua0hjLX06EMc1
1iSq6QMCtItuctB4zg+o+v62CMmYUYftHoQyDPXvP1el2+qeh414Ig==
-----END RSA PRIVATE KEY-----`;

let publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzx1HaS/PucFPk+JFuwZL
QRfQ83IjKUAW0kzkuUVw292V2YK5aZVm4ZGQqEos9n0gL4Zy2CMeexogMxQnnslM
WjvpLGAS3c68rQRynf2/4lseeEA5ckgjGQolYzKXwET2W/rHtOAXyPbAmjgU8UoU
QWb8tbsTj7HL2BL8PAU7MB5xCaF8VhXaAvROWuH9I91Xx7VSt7lXlMgTm/kFBl+c
fxaTMXXtnkFEIYhLjPQxehL89X7OYh0cxwBvDF2LMC0qfn53E/dNAfy78qodY8fC
lDZx9VMa8Yq7ORQJ3s0DguGw98++y7iBSt5Bv4DF1wBeyRrkamIZGt/ZEP57YKMF
xQIDAQAB
-----END PUBLIC KEY-----`;

// ----

//------------
// ENCRYPTION
//------------

const getPublicKey = () => {
  return publicKey;
};

const getPrivateKey = () => {
  return privateKey;
};

const createKeyPairs = () => {
  const keys = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  //console.log('Key-pair created.');

  // PEM-format keys and cert
  privateKey = forge.pki.privateKeyToPem(keys.privateKey);
  publicKey = forge.pki.publicKeyToPem(keys.publicKey);

  console.log( 'privateKey' , privateKey , 'publicKey' , publicKey )

};

// this function is used to desencrypt
const decryptData = text => {
  try {
    // const key = new NodeRSA(privateKey);
    // return key.decrypt(text, 'utf8');

    // convert a PEM-formatted public key to a Forge public key
    const key = forge.pki.privateKeyFromPem(privateKey);
    return key.decrypt(forge.util.decode64(text));
  } catch (e) {
    throw customError("Error ao descriptografar", "decryptData", 500, e);
  }
};

// this function is used to encrypt
const encryptData = text => {
  try {
    // const key = new NodeRSA(publicKey);
    // return key.encrypt(text, 'base64');

    // convert a PEM-formatted public key to a Forge public key
    const key = forge.pki.publicKeyFromPem(publicKey);
    return forge.util.encode64(key.encrypt(text));
  } catch (e) {
    throw customError("Error ao criptografar", "encryptData", 500, e);
  }
};

module.exports.decryptData = decryptData;
module.exports.encryptData = encryptData;
module.exports.getPublicKey = getPublicKey;
module.exports.getPrivateKey = getPrivateKey;
module.exports.createKeyPairs = createKeyPairs;

// module.exports.getFormatImage = getFormatImage;
