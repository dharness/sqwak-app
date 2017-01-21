const duck = `
                   ..
                  ( '\`<
                   ) (
            ( ----'  '.
            (         ;
            (_______,'
        ~^~^~^~^~^~^~^~^~^~^~   
`;

const title = `
   _____                     _    
  / ____|                   | |   
 | (___   __ ___      ____ _| | __
  \\___ \\ / _\` \\ \\ /\\ / / _\` | |/ /
  ____) | (_| |\ V  V | (_| |   < 
 |_____/ \\__, | \\_/\\_/ \\__,_|_|\\_\\
            | |                   
            |_|                   
`;

const _message = `
${title}
${duck}
`;


module.exports = function(sqwak) {
    return new Promise((resolve, reject) => {
        resolve({_message})
    });
};