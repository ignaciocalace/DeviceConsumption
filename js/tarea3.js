// Definiendo caracteristicas de Objeto
class Device {
  id;
  name;
  consumption;
  efficiency;
  time_on;
  room;
  constructor(name, consumption, efficiency, time_on, room) {
    this.name = name;
    this.consumption = consumption;
    this.efficiency = efficiency;
    this.time_on = time_on;
    this.room = room;
  }
}

function createDevice() {
  let up_device = new Device();
  up_device.name = document.getElementById("deviceName");
  up_device.consumption = document.getElementById("consumption");
  up_device.efficiency = document.getElementById("efficiency");
  up_device.time_on = document.getElementById("time_on");
  up_device.room = document.getElementById("room");
  return up_device;
}

let list = [];
function addDeviceToList() {
  list.push(createDevice());
}

function del_device(list) {}
