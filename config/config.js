const configPorts = {
    development:{
PORT: 5000,
SALT_ROUNDS: 1
    },
    production:{
PORT: 80,
SALT_ROUNDS: 10
    }
}

export const config = configPorts[process.env.NODE_ENV.trim()]