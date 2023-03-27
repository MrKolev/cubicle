const configPorts = {
    development:{
PORT: 5000,
SALT_ROUNDS: 1,
SECRET_TOKEN: "mySerkret"
    },
    production:{
PORT: 80,
SALT_ROUNDS: 10,
SECRET_TOKEN: "serkretInUser"
    }
}

export const config = configPorts[process.env.NODE_ENV.trim()]