const configPorts = {
    development:{
PORT: 5000,
    },
    production:{
PORT: 80,
    }
}

export const config = configPorts[process.env.NODE_ENV.trim()]