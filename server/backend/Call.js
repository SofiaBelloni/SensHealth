'use strict';

function Call(id, status, location, time, name, surname, colorCode, ambStatus, img) {
    this.id = id, 
    this.status = status, 
    this. location = location, 
    this.time = time, 
    this.name = name,
    this.surname = surname, 
    this.colorCode = colorCode, 
    this.ambStatus = ambStatus, 
    this.img = img 
}

module.exports = Call;
