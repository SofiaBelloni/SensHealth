export const KitList = [
    {
        id: 1, name: "Kit #1", location: "Ambulance #1", maintenance: '2022-03-10', sensors: [
            { name: "Sensor#1", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"] },
            { name: "Sensor#2", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"] },
            { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%", additional: ["Need some maintenance", "Materials are degrading. Change it before 31 December 2022"] },
            { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%", additional: ["Need some maintenance", "Materials are degrading. Change it before 31 December 2022"] },
            { name: "Sensor#5", status: "BAD", details: "Battery level: 0%", additional: ["Need some maintenance", "Materials are degrading. Change it as soon as possible"] }
        ]
    },
    {
        id: 2, name: "Kit #2", location: "Ambulance #2", maintenance: '2022-04-17', sensors: [
            { name: "Sensor#1", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
            { name: "Sensor#2", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
            { name: "Sensor#3", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
            { name: "Sensor#4", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
            { name: "Sensor#5", status: "GOOD", details: "Battery level: 80%", additional: ["Change it before 31 December 2023"]}
        ]
    },
    {
        id: 3, name: "Kit #3", location: "Ambulance #3", maintenance: '2022-12-05', sensors: [
            { name: "Sensor#1", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
            { name: "Sensor#2", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
            { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%", additional: ["Need some maintenance", "Change it before 31 December 2023"]},
            { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%", additional: ["Need some maintenance", "Change it before 31 May 2023"]},
            { name: "Sensor#5", status: "BAD", details: "Sensor unreachable", additional: ["Sensor unreachable"]}
        ]
    },

    {
        id: 4, name: "Kit #4", location: "Ambulance #4", maintenance: '2022-10-11', sensors: [
            { name: "Sensor#1", status: "MEDIUM", details: "Battery level: 40%", additional: ["Need some maintenance", "Change it before 31 December 2023"]},
            { name: "Sensor#2", status: "MEDIUM", details: "Battery level: 45%", additional: ["Need some maintenance", "Materials are degrading. Change it before 31 December 2022"] },
            { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%", additional: ["Change it before 31 December 2023"] },
            { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%", additional: ["Change it before 31 December 2023"]},
            { name: "Sensor#5", status: "BAD", details: "Calibrate the sensor", additional: ["Calibrate the sensor", "Change it before 31 December 2023"]}
        ]
    },

    {
        id: 5, name: "Kit #5", location: "Ambulance #5", maintenance: '2021-11-21', sensors: [
            { name: "Sensor#1", status: "MEDIUM", details: "Battery level: 30%", additional: ["Need some maintenance", "Change it before 31 June 2022"]},
            { name: "Sensor#2", status: "BAD", details: "Sensor unreachable", additional: ["Change it as soon as possible"]},
            { name: "Sensor#3", status: "BAD", details: "Battery level: 0%", additional: ["Need some maintenance", "Materials are degrading. Change it as soon as possible"] },
            { name: "Sensor#4", status: "BAD", details: "Sensor unreachable", additional: ["Change it as soon as possible"]},
            { name: "Sensor#5", status: "BAD", details: "Battery level: 0%", additional: ["Need some maintenance", "Materials are degrading. Change it as soon as possible"]}
        ]
    }
];